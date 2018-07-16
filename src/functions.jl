"""
    control(c::Char)

Control `c`

```jldoctest
julia> using RegularExpressions

julia> control('c')
\\cc
```
"""
control(c::Char) = "\\c$c"

"""
    one_of([::Not], args...)

A character that is one of `args`.

```jldoctest
julia> using RegularExpressions

julia> one_of('a', 'b')
[ab]

julia> one_of(not, 'a', 'b')
[^ab]
```
"""
one_of(args...) = "[$(args...)]"
one_of(::Not, args...) = "[^$(args...)]"

"""
    through(args...)

A range of characters

```jldoctest
julia> using RegularExpressions

julia> through('a', 'z')
a-z
```
"""
through(first::Char, second::Char) = "$first-$second"

"""
    greedy(thing)

Mark syntax as greedy.

```jldoctest
julia> using RegularExpressions

julia> greedy(maybe("a"))
a?+
```
"""
greedy(thing) = "$thing+"

"""
    lazy(thing)

Mark syntax as lazy.

```jldoctest
julia> using RegularExpressions

julia> greedy(maybe("a"))
[:^punct:]
```
"""
lazy(thing) = "$thing?"

"""
    between(low, high, args...)

Between `low` and `high` of `args`. Use `""` to remove bounds.

```jldoctest
julia> using RegularExpressions

julia> between(1, 2, "a", "b")
(?:ab){1,2}
```
"""

between(low, high, args...) = "$(group(args...)){$low,$high}"

"""
    or(args...)

At least one of `args`.

```jldoctest
julia> using RegularExpressions

julia> or("a", "b", "c")
a|b|c
```
"""
or(args...) = join(group.(args), "|")

"""
    capture(a_name, args...)

Capture `args` with `a_name`.

```jldoctest
julia> using RegularExpressions

julia> capture("", "a", "b")
(ab)

julia> capture("name", "a", "b")
(?<a>b)
```
"""
capture(a_name, args...) =
    if a_name == ""
        "($(args...))"
    else
        "(?<$a_name>$(args...))"
    end

"""
    group(args...)

Group `args`.

```jldoctest
julia> using RegularExpressions

julia> group("a")
a

julia> group("a", "b")
(?:ab)
```
"""
group(s::AbstractString) =
    if length(s) <= 1
        s
    else
        "(?:$s)"
    end
group(args...) = "(?:$(args...))"
capture_reset(thing) = "(?|$thing)"

# ATOMIC GROUPS
overlapping_group(thing) = "(?>$thing)"

# LOOKAHEAD AND LOOKBEHIND ASSERTIONS
after(thing) = "(?=$thing)"
not_after(thing) = "(?!$thing)"
before(thing) = "(?<=$thing)"
not_before(thing) = "(?<!$thing)"

mark_positive(thing, relative) = thing
mark_positive(i::Integer, relative = true) =
    if relative && i > 0
        "+$i"
    else
        "$i"
    end

# BACKREFERENCES
captured(thing) = "\\g<$thing>"

relative_capture(thing::Integer) = "\\g<$(mark_positive(thing))>"

basic_switch(condition, yes, no = "") =
    if no == ""
        "(?($condition) $yes)"
    else
        "(?($condition) $yes|$no)"
    end

switch(thing, yes, no = "") = basic_switch("<$thing>", yes, no)
relative_switch(i::Integer, yes, no = "") =
    basic_switch(mark_positive(i), yes, no)
recursive_switch(thing, yes, no = "") = basic_switch("R&$thing", yes, no)
define_switch(yes, no = "") = basic_switch("DEFINE", yes, no)
min_version_switch(version, yes, no = "") =
    basic_switch("VERSION>=$version", yes, no)
version_switch(version, yes, no = "") =
    basic_switch("VERSION>=$version", yes, no)

callout() = "(?C)"
callout(i::Int) = "(?C$i)"
callout(thing) = "(?C$thing)"
