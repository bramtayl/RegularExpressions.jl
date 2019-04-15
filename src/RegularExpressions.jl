module RegularExpressions

using Base: SubstitutionString, Generator
using Base.Iterators: Filter

struct Not
end
"""
    not

Use to negate a pattern.

Use with [`short`](@ref), [`option`](@ref), [`class`](@ref), [`one_of`](@ref), [`property`](@ref), or [`script`](@ref).
"""
const not = Not()
export not

function group(them...)
    joined = join(them)
    if length(joined) == 1
        joined
    else
        kind(:group, joined)
    end
end

"""
    raw(it)

Escape punctuation.

```jldoctest
julia> using RegularExpressions

julia> p = pattern(raw("1.0"))
r"1\\.0"

julia> occursin(p, "v1.0")
true
```
"""
function raw(it)
    replace(it, r"([[:punct:]])" => s"\\\g<1>")
end
export raw

"""
    CONSTANTS

Plain commands.

```jldoctest
julia> using RegularExpressions

julia> p = pattern(CONSTANTS.any)
r"."

julia> occursin(p, "a")
true
```
"""
const CONSTANTS = (
    any = ".",
    start = "^",
    stop = "\$",
    define = "DEFINE",
    recur = "(?R)",
    recurred = "R"
)
export CONSTANTS

"""
    SHORTS

Access with [`short`](@ref).
"""
const SHORTS = (
    unit = "C",
    digit = "d",
    horizontal = "h",
    newline = "n",
    newlines = "R",
    space = "s",
    vertical = "v",
    word = "w",
    cluster = "X",
    boundary = "b",
    strict_start = "A",
    strict_stop = "z",
    chomp_stop = "Z",
    match_start = "G",
    reset = "K"
)
export SHORTS
"""
    short([::Not], it)

A short command. Access [`SHORTS`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(short(:space))
r"\\s"

julia> occursin(p, " ")
true

julia> p = pattern(short(not, :space))
r"\\S"

julia> occursin(p, "a")
true
```
"""
short(it) = "\\$(SHORTS[it])"
short(::Not, it) = "\\$(uppercase(SHORTS[it]))"
export short

"""
    PROPERTIES

Access with [`property`](@ref).
"""
const PROPERTIES = (
    other = ("C", (
        control = "c",
        format = "f",
        unassigned = "n",
        private = "o",
        surrogate = "s"
    )),
    letter = ("L", (
        lowercase = "l",
        modifier = "m",
        other = "o",
        titlecase = "t",
        uppercase = "u",
        cased = "&"
    )),
    mark = ("M", (
        spacing = "c",
        enclosing = "e",
        non_spacing = "n"
    )),
    number = ("N", (
        decimal = "d",
        letter = "l",
        other = "o"
    )),
    punctuation = ("P", (
        connector = "c",
        dash = "d",
        close = "e",
        final = "f",
        initial = "i",
        other = "o",
        open = "s"
    )),
    symbol = ("S", (
        currency = "c",
        modifier = "k",
        math = "m",
        other = "o"
    )),
    seperator = ("Z", (
        line = "l",
        paragraph = "p",
        space = "s"
    )),
    special = ("X", (
        letter_or_digit = "an",
        space = "sp",
        exists = "uc",
        word = "wd"
    ))
)
export PROPERTIES
"""
    property([::Not], general, [specific])

A character property. Access [`PROPERTIES`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(property(:seperator))
r"\\p{Z}"

julia> occursin(p, " ")
true

julia> p = pattern(property(not, :seperator))
r"\\P{Z}"

julia> occursin(p, "a")
true

julia> p = pattern(property(:seperator, :space))
r"\\p{Zs}"

julia> occursin(p, " ")
true

julia> p = pattern(property(not, :seperator, :space))
r"\\P{Zs}"

julia> occursin(p, "a")
true
```
"""
property(general) = "\\p{$(PROPERTIES[general][1])}"
property(::Not, general) = "\\P{$(PROPERTIES[general][1])}"
function specific_property(general, specific)
    general_code, specifics = PROPERTIES[general]
    "$(general_code)$(specifics[specific])"
end
property(general, specific) = "\\p{$(specific_property(general, specific))}"
property(::Not, general, specific) =
    "\\P{$(specific_property(general, specific))}"
export property

"""
    script([::Not], it)

A character from a script.

```jldoctest
julia> using RegularExpressions

julia> p = pattern(script(:Han))
r"\\p{Han}"

julia> occursin(p, "中")
true

julia> p = pattern(script(not, :Han))
r"\\P{Han}"

julia> occursin(p, "a")
true
```
"""
script(it) = "\\p{$it}"
script(::Not, it) = "\\P{$it}"
export script

"""
    one_of([::Not], them...)

Create a character class.

```jldoctest
julia> using RegularExpressions

julia> p = pattern(one_of('a', 'b'))
r"[ab]"

julia> occursin(p, "b")
true

julia> p = pattern(one_of(not, 'a', 'b'))
r"[^ab]"

julia> occursin(p, "c")
true
```
"""
one_of(them...) = "[$(them...)]"
one_of(::Not, them...) = "[^$(them...)]"
export one_of

"""
    through(start, stop)

A range of characters

```jldoctest
julia> using RegularExpressions

julia> p = pattern(one_of(through('a', 'c')))
r"[a-c]"

julia> occursin(p, "b")
true
```
"""
through(start, stop) = "$start-$stop"
export through

"""
    CLASSES

Access with [`class`](@ref).
"""
const CLASSES = (
    letter_or_digit = "alnum",
    letter = "alpha",
    standard = "ascii",
    blank = "blank",
    control = "cntrl",
    digit = "digit",
    prints = "graph",
    lowercase = "lower",
    prints_or_space = "print",
    punctuation = "punct",
    space = "space",
    uppercase = "upper",
    word = "word",
    hexadecimal = "xdigit"
)
export CLASSES
"""
    class([::Not], it)

Character classes. Access [`CLASSES`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(one_of(class(:space)))
r"[[:space:]]"

julia> occursin(p, " ")
true

julia> p = pattern(one_of(class(not, :space)))
r"[[:^space:]]"

julia> occursin(p, "a")
true
```
"""
class(it) = "[:$(CLASSES[it]):]"
class(::Not, it) = "[:^$(CLASSES[it]):]"
export class

"""
    GREEDS

Access with [`of`](@ref) or [`between`](@ref).
"""
const GREEDS = (
    possessive = "+",
    lazy = "?",
    greedy = ""
)
export GREEDS
"""
    QUANTITIES

Access with [`of`](@ref).
"""
const QUANTITIES = (
    maybe = "?",
    none_or_some = "*",
    some = "+"
)
export QUANTITIES
"""
    of(quantity::Symbol, them...; greed = :greedy)
    of(quantity::Number, them...)

A `quantity` `of` `it` with a certain `greed`. Acccess [`QUANTITIES`](@ref) and [`GREEDS`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(of(:some, "a"))
r"a+"

julia> occursin(p, "aa")
true

julia> p = pattern(of(2, "a"))
r"a{2}"

julia> occursin(p, "aa")
true
```
"""
of(quantity::Symbol, them...; greed = :greedy) =
    "$(group(them...))$(QUANTITIES[quantity])$(GREEDS[greed])"
of(quantity::Number, them...) = "$(group(them...)){$quantity}"
export of

"""
    between(low, high, them...; greed = :greedy)

Between `low` and `high` of `it` with a certain `greed`. Access [`GREEDS`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(between(1, 3, "a"))
r"a{1,3}"

julia> occursin(p, "aa")
true

julia> p = pattern(between(2, Inf, "a"))
r"a{2,}"

julia> occursin(p, "aaa")
true
```
"""
between(low, high, them...; greed = :greedy) =
    if isinf(high)
        "$(group(them...)){$low,}$(GREEDS[greed])"
    else
        "$(group(them...)){$low,$high}$(GREEDS[greed])"
    end
export between

"""
    or(them...)

One of `them`.

```jldoctest
julia> using RegularExpressions

julia> p = pattern(or("a", "b"))
r"a|b"

julia> occursin(p, "b")
true
```
"""
or(them...) = join(them, "|")
export or

"""
    capture(them...; name = nothing)

Capture `them` with optional `name`. See examples in [`captured`](@ref).
"""
capture(them...; name = nothing) =
    if name === nothing
        "($(them...))"
    else
        "(?<$name>$(them...))"
    end
export capture

"""
    KINDS

Access via [`kind`](@ref).
"""
const KINDS = (
    group = ":",
    reset = "|",
    atomic = ">",
    comment = "#",
    after = "=",
    not_after = "!",
    before = "<=",
    not_before = "<!",
    callout = "C"
)

export KINDS
"""
    kind(a_kind, them...)

A variety of syntaxes: `a_kind` of `them`. Access [`KINDS`](@ref). Use `repr` to
pass strings to callouts.

```jldoctest
julia> using RegularExpressions

julia> p = pattern(kind(:before, "a"), "b")
r"(?<=a)b"

julia> occursin(p, "ab")
true
```
"""
kind(kind, them...) = "(?$(KINDS[kind])$(them...))"
export kind

"""
    OPTIONS

Access with [`option`](@ref)
"""
const OPTIONS = (
    caseless = "i",
    duplicate_names = "J",
    multi_line = "m",
    no_auto_capture = "n",
    single_line = "s",
    lazy = "U",
    ignore_space = "x",
    ignore_all_space = "xx",
    unset = "^",
    recur = "R",
    callout = "C"
)
export OPTIONS
make_flags(options, OPTIONS) =
    join(Generator(
        pair -> OPTIONS[pair[1]],
        Filter(pair -> pair[2], options)
    ))
"""
    option([::Not]; options...)

`option`. Access [`OPTIONS`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(option(caseless = true, ignore_space = true), "a ")
r"(?ix)a "

julia> occursin(p, "A")
true

julia> p = pattern(option(caseless = true), option(not, caseless = true), "a")
r"(?i)(?-i)a"

julia> occursin(p, "A")
false
```
"""
option(; options...) = "(?$(make_flags(options, OPTIONS)))"
option(::Not; options...) = "(?-$(make_flags(options, OPTIONS)))"
export option

"""
    EXTRAS

Access with [`extra`](@ref).
"""
const EXTRAS = (
    limit_depth = "LIMIT_DEPTH",
    limit_heap = "LIMIT_HEAP",
    limit_match = "LIMIT_MATCH",
    not_empty = "NOTEMPTY",
    not_empty_at_start = "NOTEMPTY_ATSTART",
    no_auto_possess = "NO_AUTO_POSSESS",
    no_dot_star_anchor = "NO_DOTSTAR_ANCHOR",
    no_just_in_time = "NO_JIT",
    no_start_optimization = "NO_START_OPT",
    UTF = "UTF",
    unicode_properties = "UCP",
    carriage_return = "CR",
    linefeed = "LF",
    carriage_return_linefeed = "CRLF",
    standard_newline = "ANYCRLF",
    unicode_newline = "ANY",
    nul = "NUL",
    standard_boundary = "BSR_ANYCRLF",
    unicode_boundary = "BSR_UNICODE",
    accept = "ACCEPT",
    fail = "FAIL",
    mark = "MARK",
    commit = "COMMIT",
    prune = "PRUNE",
    skip = "SKIP",
    then = "THEN"
)
export EXTRAS
"""
    extra(it)
    extra(it, name)
    extra(it, value::Number)

`extra` command. Access [`EXTRAS`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(extra(:standard_newline), "a")
r"(*ANYCRLF)a"

julia> occursin(p, "a\\r")
true

julia> extra(:limit_match, 0)
"(*LIMIT_MATCH=0)"

julia> extra(:mark, "name")
"(*MARK:name)"
```
"""
extra(it) = "(*$(EXTRAS[it]))"
extra(it, name) = "(*$(EXTRAS[it]):$name)"
extra(it, value::Number) = "(*$(EXTRAS[it])=$value)"
export extra

"""
    relative(it)

Mark a reference as relative. For use with [`captured`](@ref) or [`whether`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(captured(relative(1)), capture("a"))
r"\\g<+1>(a)"

julia> occursin(p, "aa")
true

julia> p = pattern(capture("a"), captured(relative(-1)))
r"(a)\\g<-1>"

julia> occursin(p, "aa")
true
```
"""
relative(it) =
    if it < 0
        it
    else
        "+$it"
    end
export relative

"""
    captured(it)

Refer to a [`capture`](@ref)d group. See [`relative`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(capture("a"), captured(1))
r"(a)\\g<1>"

julia> occursin(p, "aa")
true
```
"""
captured(it) = "\\g<$it>"
export captured

"""
    pattern(them..., options...)

Splat of `Regex`. Options can be in [`OPTIONS`](@ref)

```jldoctest
julia> using RegularExpressions

julia> p = pattern("a", "b")
r"ab"

julia> occursin(p, "ab")
true

julia> p = pattern("A", caseless = true)
r"A"i

julia> occursin(p, "a")
true
```
"""
pattern(them...; options...) =
    Regex(string(them...), make_flags(options, OPTIONS))
export pattern

"""
    exists(it)

Check whether a capture group. For use with [`whether`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(
            CONSTANTS.start,
            of(:maybe, capture("a", name = "first")),
            whether(exists("first"), "b", "c")
        )
r"^(?:(?<first>a))?(?(<first>)b|c)"

julia> occursin(p, "ab")
true
```
"""
exists(it) = "<$it>"
export exists

"""
    template(them...)

Splat of `SubstitutionString`.

```jldoctest
julia> using RegularExpressions

julia> p = pattern(capture("a"))
r"(a)"

julia> t = template(captured(1), "b")
s"\\\\g<1>b"

julia> replace("a", p => t)
"ab"
```
"""
template(them...) = SubstitutionString(string(them...))
export template

"""
    version(it; at_least = false)

Check whether the version of PCRE2 is `it`, (or, `at_least` `it`). For use with [`whether`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(whether(version(1), "new", "old"))
r"(?(VERSION=1)new|old)"

julia> occursin(p, "new")
false

julia> p = pattern(whether(version(1, at_least = true), "new", "old"))
r"(?(VERSION>=1)new|old)"

julia> occursin(p, "new")
true
```
"""
version(it; at_least = false) = "VERSION$(if at_least
        ">"
    else
        ""
    end)=$it"
export version

"""
    whether(condition, yes, no = "")

Test for a condition. See [`relative`](@ref), [`exists`](@ref), [`recurred`](@ref), and [`version`](@ref).

```jldoctest
julia> using RegularExpressions

julia> p = pattern(
            CONSTANTS.start,
            of(:maybe, capture("a")),
            whether(1, "b", "c")
        )
r"^(?:(a))?(?(1)b|c)"

julia> occursin(p, "ab")
true
```
"""
whether(condition, yes, no = "") = "(?($condition)$yes|$no)"
export whether

"""
    recurred(it::Number)
    recurred(it)

Check for recursion. Use with [`whether`](@ref).

```jldoctest
julia> using RegularExpressions

julia> recurred(1)
"R1"

julia> recurred("name")
"R&name"
```
"""
recurred(it::Number) = "R$it"
recurred(it) = "R&$it"
export recurred

end
