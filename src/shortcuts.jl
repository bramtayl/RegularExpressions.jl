

"""
```
julia> special(:word_boundary)
\b

julia> special(:letter)
[:alpha:]

julia> special(:mark)
\p{M}

julia> special(:caseless)
(?i)

julia> special(:newline)
\n
```
"""
special(s::Symbol) =
    if haskey(ESCAPES, s)
        "\\$(ESCAPES[s])"
    elseif haskey(CLASSES, s)
        "[:$(CLASSES[s]):]"
    elseif haskey(PROPERTIES, s)
        "\\p{$(PROPERTIES[s][1])}"
    elseif haskey(OPTIONS, s)
        "(?$(OPTIONS_SUB_ROUTINE[s]))"
    elseif haskey(START_OPTIONS_BACKTRACKING, s)
        "(*$s)"
    elseif in(s, SCRIPTS)
        "\\p{$s}"

    else
        error("Regular expression component $s not found.")
    end


"""
```
    julia> shortcut(not, :digit)
    \\D

    julia> property(not, "symbol")
    \\p{S}

    julia> class(::Not, "punctuation")
    [:^punct:]
```
"""
not_special(s::Symbol) =
    if haskey(ESCAPES, s)
        "\\$(uppercase(ESCAPES[s]))"
    elseif haskey(CLASSES, s)
        "[:^$(CLASSES[s]):]"
    elseif haskey(PROPERTIES, s)
        "\\P{$(PROPERTIES[general][1])}"
    elseif haskey(OPTIONS, s)
        "(?-$(OPTIONS_SUB_ROUTINE[s]))"
    elseif in(s, SCRIPTS)
        "\\P{$s}"
    else
        error("Negated regular expression component $s not found.")
    end

function specific_property(general::Symbol, specific::Symbol)
    property = PROPERTIES[general]
    "$(property[1])$(property[2][specific])"
end

special(general::Symbol, specific::Symbol) =
    "\\p{$(specific_property(general, specific))}"

not_special(general::String, specific::String) =
    "\\P{$(specific_property(general, specific))}"

special(name::String, i::Int) = "(*$(KEYWORD_OPTION[name])=$i)"

transform(thing) = thing

function transform(e::Expr)
    head = e.head
    args = e.args
    if head == :cell1d
        special(args...)
    elseif e.head == :curly && length(args) > 1 && args[1] == :!
        not_special(args[2:end]...)
    else
        e
    end
end

transform(s::String) = replace(
    s,
    r"([[:punct:]])",
    s"\\\g<1>"
)

transform_walk(thing) = prewalk(transform, thing)

pattern(args...) = Regex(string(transform_walk.(args)...))

template(args...) = SubstitutionString(string(transform_walk.(args)...))

macro pattern(args...)
    esc(pattern(args...))
end

macro template(args...)
    esc(template(args...))
end
