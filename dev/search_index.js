var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "page",
    "text": "This package provides a human readable interface to regular expressions. I\'ve left out a couple of regular expression features that I don\'t understand (recursion, conditionals, call-backs). If you understand these features I\'d love some help."
},

{
    "location": "#Tutorial-1",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "section",
    "text": "I\'ll follow the example from rex for url validation.julia> using RegularExpressions\n\njulia> invalids = raw.((\".\", \"/\", \" \", \"-\"));\n\njulia> url_pattern = pattern(\n            CONSTANTS.start,\n            capture(\n                or(\n                    kind(:group, \"http\", of(:maybe, \"s\")),\n                    \"ftp\"\n                ),\n                name = \"protocol\"\n            ),\n            raw(\"://\"),\n            of(:maybe,\n                capture(\n                    of(:some, one_of(not, short(:space))),\n                    name = \"username\"\n                ),\n                of(:maybe,\n                    raw(\":\"),\n                    capture(\n                        of(:none_or_some, one_of(not, short(:space))),\n                        name = \"password\"\n                    )\n                ),\n                raw(\"@\")\n            ),\n            capture(\n                of(:none_or_some,\n                    of(:some, one_of(not, invalids...)),\n                    of(:none_or_some, raw(\"-\"))\n                ),\n                of(:some, one_of(not, invalids...)),\n                name = \"host\"\n            ),\n            capture(\n                of(:none_or_some,\n                    raw(\".\"),\n                    of(:none_or_some,\n                        of(:some, one_of(not, invalids...)),\n                        of(:none_or_some, raw(\"-\"))\n                    ),\n                    of(:some, one_of(not, invalids...))\n                ),\n                name = \"domain\"\n            ),\n            raw(\".\"), capture(\n                between(2, Inf, one_of(not, invalids...)),\n                name = \"TLD\"\n            ),\n            of(:maybe, raw(\":\"), capture(\n                between(2, 5, short(:digit)),\n                name = \"port\"\n            )),\n            of(:maybe, raw(\"/\"), capture(\n                of(:none_or_some, one_of(not, short(:space))),\n                name = \"resource\"\n            )),\n            CONSTANTS.stop\n        );\n\njulia> goods = (\n            \"http://foo.com/blah_blah\",\n            \"http://foo.com/blah_blah/\",\n            \"http://foo.com/blah_blah_(wikipedia)\",\n            \"http://foo.com/blah_blah_(wikipedia)_(again)\",\n            \"http://www.example.com/wpstyle/?p=364\",\n            \"https://www.example.com/foo/?bar=baz&inga=42&quux\",\n            \"http://✪df.ws/123\",\n            \"http://userid:password@example.com:8080\",\n            \"http://userid:password@example.com:8080/\",\n            \"http://userid@example.com\",\n            \"http://userid@example.com/\",\n            \"http://userid@example.com:8080\",\n            \"http://userid@example.com:8080/\",\n            \"http://userid:password@example.com\",\n            \"http://userid:password@example.com/\",\n            \"http://➡.ws/䨹\",\n            \"http://⌘.ws\",\n            \"http://⌘.ws/\",\n            \"http://foo.com/blah_(wikipedia)#cite-1\",\n            \"http://foo.com/blah_(wikipedia)_blah#cite-1\",\n            \"http://foo.com/unicode_(✪)_in_parens\",\n            \"http://foo.com/(something)?after=parens\",\n            \"http://☺.damowmow.com/\",\n            \"http://code.google.com/events/#&product=browser\",\n            \"http://j.mp\",\n            \"ftp://foo.bar/baz\",\n            \"http://foo.bar/?q=Test%20URL-encoded%20stuff\",\n            \"http://مثال.إختبار\",\n            \"http://例子.测试\",\n            \"http://-.~_!&\'()*+,;=:%40:80%2f::::::@example.com\",\n            \"http://1337.net\",\n            \"http://a.b-c.de\",\n            \"http://223.255.255.254\"\n        );\n\njulia> bads = (\n            \"http://\",\n            \"http://.\",\n            \"http://..\",\n            \"http://../\",\n            \"http://?\",\n            \"http://??\",\n            \"http://??/\",\n            \"http://#\",\n            \"http://##\",\n            \"http://##/\",\n            \"http://foo.bar?q=Spaces should be encoded\",\n            \"//\",\n            \"//a\",\n            \"///a\",\n            \"///\",\n            \"http:///a\",\n            \"foo.com\",\n            \"rdar://1234\",\n            \"h://test\",\n            \"http:// shouldfail.com\",\n            \":// should fail\",\n            \"http://foo.bar/foo(bar)baz quux\",\n            \"ftps://foo.bar/\",\n            \"http://-error-.invalid/\",\n            \"http://-a.b.co\",\n            \"http://a.b-.co\",\n            \"http://0.0.0.0\",\n            \"http://3628126748\",\n            \"http://.www.foo.bar/\",\n            \"http://www.foo.bar./\",\n            \"http://.www.foo.bar./\"\n        );\n\njulia> all(occursin.(url_pattern, goods))\ntrue\n\njulia> any(occursin.(url_pattern, bads))\nfalse"
},

{
    "location": "#Interface-1",
    "page": "Tutorial",
    "title": "Interface",
    "category": "section",
    "text": ""
},

{
    "location": "#RegularExpressions.pattern",
    "page": "Tutorial",
    "title": "RegularExpressions.pattern",
    "category": "function",
    "text": "pattern(them..., options...)\n\nSplat of Regex. Options can be in OPTIONS\n\njulia> using RegularExpressions\n\njulia> p = pattern(\"a\", \"b\")\nr\"ab\"\n\njulia> occursin(p, \"ab\")\ntrue\n\njulia> p = pattern(\"A\", caseless = true)\nr\"A\"i\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.raw",
    "page": "Tutorial",
    "title": "RegularExpressions.raw",
    "category": "function",
    "text": "raw(it)\n\nEscape punctuation.\n\njulia> using RegularExpressions\n\njulia> p = pattern(raw(\"1.0\"))\nr\"1\\.0\"\n\njulia> occursin(p, \"v1.0\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.not",
    "page": "Tutorial",
    "title": "RegularExpressions.not",
    "category": "constant",
    "text": "not\n\nUse to negate a pattern. Use with short, option, class, one_of, property, or script.\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.CONSTANTS",
    "page": "Tutorial",
    "title": "RegularExpressions.CONSTANTS",
    "category": "constant",
    "text": "CONSTANTS\n\nPlain commands.\n\njulia> using RegularExpressions\n\njulia> p = pattern(CONSTANTS.any)\nr\".\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.or",
    "page": "Tutorial",
    "title": "RegularExpressions.or",
    "category": "function",
    "text": "or(them...)\n\nAt least one of them.\n\njulia> using RegularExpressions\n\njulia> p = pattern(or(\"a\", \"b\"))\nr\"a|b\"\n\njulia> occursin(p, \"b\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.kind",
    "page": "Tutorial",
    "title": "RegularExpressions.kind",
    "category": "function",
    "text": "kind(a_kind, them...)\n\nA variety of syntaxes: a_kind of them. Access KINDS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(kind(:before, \"a\"), \"b\")\nr\"(?<=a)b\"\n\njulia> occursin(p, \"ab\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.KINDS",
    "page": "Tutorial",
    "title": "RegularExpressions.KINDS",
    "category": "constant",
    "text": "KINDS\n\nAccess via kind.\n\n\n\n\n\n"
},

{
    "location": "#General-1",
    "page": "Tutorial",
    "title": "General",
    "category": "section",
    "text": "pattern\nraw\nnot\nCONSTANTS\nor\nkind\nKINDS"
},

{
    "location": "#RegularExpressions.short",
    "page": "Tutorial",
    "title": "RegularExpressions.short",
    "category": "function",
    "text": "short(it)\nshort(::Not, it)\n\nA short command. Access SHORTS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(short(:space))\nr\"\\s\"\n\njulia> occursin(p, \" \")\ntrue\n\njulia> p = pattern(short(not, :space))\nr\"\\S\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.SHORTS",
    "page": "Tutorial",
    "title": "RegularExpressions.SHORTS",
    "category": "constant",
    "text": "SHORTS\n\nAccess with short.\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.property",
    "page": "Tutorial",
    "title": "RegularExpressions.property",
    "category": "function",
    "text": "property([::Not], general, [specific])\n\nA character property. Access PROPERTIES.\n\njulia> using RegularExpressions\n\njulia> p = pattern(property(:seperator))\nr\"\\p{Z}\"\n\njulia> occursin(p, \" \")\ntrue\n\njulia> p = pattern(property(not, :seperator))\nr\"\\P{Z}\"\n\njulia> occursin(p, \"a\")\ntrue\n\njulia> p = pattern(property(:seperator, :space))\nr\"\\p{Zs}\"\n\njulia> occursin(p, \" \")\ntrue\n\njulia> p = pattern(property(not, :seperator, :space))\nr\"\\P{Zs}\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.PROPERTIES",
    "page": "Tutorial",
    "title": "RegularExpressions.PROPERTIES",
    "category": "constant",
    "text": "PROPERTIES\n\nAccess with property.\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.script",
    "page": "Tutorial",
    "title": "RegularExpressions.script",
    "category": "function",
    "text": "script([::Not], it\n\nA character from a script.\n\njulia> using RegularExpressions\n\njulia> p = pattern(script(:Han))\nr\"\\p{Han}\"\n\njulia> occursin(p, \"中\")\ntrue\n\njulia> p = pattern(script(not, :Han))\nr\"\\P{Han}\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.option",
    "page": "Tutorial",
    "title": "RegularExpressions.option",
    "category": "function",
    "text": "option([::Not]; options...)\n\noption. Access OPTIONS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(option(caseless = true, ignore_space = true), \"a \")\nr\"(?ix)a \"\n\njulia> occursin(p, \"A\")\ntrue\n\njulia> p = pattern(option(caseless = true), option(not, caseless = true), \"a\")\nr\"(?i)(?-i)a\"\n\njulia> occursin(p, \"A\")\nfalse\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.OPTIONS",
    "page": "Tutorial",
    "title": "RegularExpressions.OPTIONS",
    "category": "constant",
    "text": "OPTIONS\n\nAccess with option\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.extra",
    "page": "Tutorial",
    "title": "RegularExpressions.extra",
    "category": "function",
    "text": "extra(it)\nextra(it, value::Number)\n\nextra command. Access EXTRAS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(extra(:standard_newline), \"a\")\nr\"(*ANYCRLF)a\"\n\njulia> occursin(p, \"a\\r\")\ntrue\n\njulia> extra(:limit_match, 1)\n\"(*LIMIT_MATCH=1)\"\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.EXTRAS",
    "page": "Tutorial",
    "title": "RegularExpressions.EXTRAS",
    "category": "constant",
    "text": "EXTRAS\n\nAccess with extra.\n\n\n\n\n\n"
},

{
    "location": "#Shortcuts-1",
    "page": "Tutorial",
    "title": "Shortcuts",
    "category": "section",
    "text": "short\nSHORTS\nproperty\nPROPERTIES\nscript\noption\nOPTIONS\nextra\nEXTRAS"
},

{
    "location": "#RegularExpressions.one_of",
    "page": "Tutorial",
    "title": "RegularExpressions.one_of",
    "category": "function",
    "text": "one_of([::Not], them...)\n\nCreate a character class.\n\njulia> using RegularExpressions\n\njulia> p = pattern(one_of(\'a\', \'b\'))\nr\"[ab]\"\n\njulia> occursin(p, \"b\")\ntrue\n\njulia> p = pattern(one_of(not, \'a\', \'b\'))\nr\"[^ab]\"\n\njulia> occursin(p, \"c\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.class",
    "page": "Tutorial",
    "title": "RegularExpressions.class",
    "category": "function",
    "text": "class([::Not], it)\n\nCharacter classes. Access CLASSES.\n\njulia> using RegularExpressions\n\njulia> p = pattern(one_of(class(:space)))\nr\"[[:space:]]\"\n\njulia> occursin(p, \" \")\ntrue\n\njulia> p = pattern(one_of(class(not, :space)))\nr\"[[:^space:]]\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.CLASSES",
    "page": "Tutorial",
    "title": "RegularExpressions.CLASSES",
    "category": "constant",
    "text": "\"     CLASSES\n\nAccess with class.\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.through",
    "page": "Tutorial",
    "title": "RegularExpressions.through",
    "category": "function",
    "text": "through(start, stop)\n\nA range of characters\n\njulia> using RegularExpressions\n\njulia> p = pattern(one_of(through(\'a\', \'c\')))\nr\"[a-c]\"\n\njulia> occursin(p, \"b\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#Classes-1",
    "page": "Tutorial",
    "title": "Classes",
    "category": "section",
    "text": "one_of\nclass\nCLASSES\nthrough"
},

{
    "location": "#RegularExpressions.GREEDS",
    "page": "Tutorial",
    "title": "RegularExpressions.GREEDS",
    "category": "constant",
    "text": "GREEDS\n\nAccess with of or between.\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.of",
    "page": "Tutorial",
    "title": "RegularExpressions.of",
    "category": "function",
    "text": "of(quantity::Symbol, them...; greed = :greedy)\nof(quanitty::Number, them...)\n\nA quantity of it with a certain greed. Acccess QUANTITIES and GREEDS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(of(:some, \"a\"))\nr\"a+\"\n\njulia> occursin(p, \"aa\")\ntrue\n\njulia> p = pattern(of(2, \"a\"))\nr\"a{2}\"\n\njulia> occursin(p, \"aa\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.QUANTITIES",
    "page": "Tutorial",
    "title": "RegularExpressions.QUANTITIES",
    "category": "constant",
    "text": "QUANTITIES\n\nAccess with of.\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.between",
    "page": "Tutorial",
    "title": "RegularExpressions.between",
    "category": "function",
    "text": "between(low, high, them...; greed = :greedy)\n\nBetween low and high of it with a certain greed. Access GREEDS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(between(1, 3, \"a\"))\nr\"a{1,3}\"\n\njulia> occursin(p, \"aa\")\ntrue\n\njulia> p = pattern(between(2, Inf, \"a\"))\nr\"a{2,}\"\n\njulia> occursin(p, \"aaa\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#Quantifiers-1",
    "page": "Tutorial",
    "title": "Quantifiers",
    "category": "section",
    "text": "GREEDS\nof\nQUANTITIES\nbetween"
},

{
    "location": "#RegularExpressions.template",
    "page": "Tutorial",
    "title": "RegularExpressions.template",
    "category": "function",
    "text": "template(them...)\n\nSplat of SubstitutionString. See examples in captured.\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.capture",
    "page": "Tutorial",
    "title": "RegularExpressions.capture",
    "category": "function",
    "text": "capture(them...; name = nothing)\n\nCapture them with optional name. See examples in captured.\n\n\n\n\n\n"
},

{
    "location": "#RegularExpressions.captured",
    "page": "Tutorial",
    "title": "RegularExpressions.captured",
    "category": "function",
    "text": "captured(it::AbstractString)\ncaptured(it::Number; relative = false)\n\nRefer to a captured group.\n\njulia> using RegularExpressions\n\njulia> p = pattern(capture(\"a\"), capture(\"b\", name = \"second\"))\nr\"(a)(?<second>b)\"\n\njulia> t = template(captured(\"second\"), captured(1))\ns\"\\\\g<second>\\\\g<1>\"\n\njulia> replace(\"ab\", p => t)\n\"ba\"\n\njulia> p = pattern(captured(1, relative = true), capture(\"a\"))\nr\"\\g<+1>(a)\"\n\njulia> occursin(p, \"aa\")\ntrue\n\n\n\n\n\n"
},

{
    "location": "#Captures-1",
    "page": "Tutorial",
    "title": "Captures",
    "category": "section",
    "text": "template\ncapture\ncaptured"
},

]}
