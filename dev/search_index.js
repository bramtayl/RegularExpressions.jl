var documenterSearchIndex = {"docs":
[{"location":"#Tutorial-1","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"#","page":"Tutorial","title":"Tutorial","text":"I'll follow the example from rex for url validation.","category":"page"},{"location":"#","page":"Tutorial","title":"Tutorial","text":"julia> using RegularExpressions\n\njulia> invalids = raw.((\".\", \"/\", \" \", \"-\"));\n\njulia> url_pattern = pattern(\n            CONSTANTS.start,\n            capture(\n                or(\n                    kind(:group, \"http\", of(:maybe, \"s\")),\n                    \"ftp\"\n                ),\n                name = \"protocol\"\n            ),\n            raw(\"://\"),\n            of(:maybe,\n                capture(\n                    of(:some, one_of(not, short(:space))),\n                    name = \"username\"\n                ),\n                of(:maybe,\n                    raw(\":\"),\n                    capture(\n                        of(:none_or_some, one_of(not, short(:space))),\n                        name = \"password\"\n                    )\n                ),\n                raw(\"@\")\n            ),\n            capture(\n                of(:none_or_some,\n                    of(:some, one_of(not, invalids...)),\n                    of(:none_or_some, raw(\"-\"))\n                ),\n                of(:some, one_of(not, invalids...)),\n                name = \"host\"\n            ),\n            capture(\n                of(:none_or_some,\n                    raw(\".\"),\n                    of(:none_or_some,\n                        of(:some, one_of(not, invalids...)),\n                        of(:none_or_some, raw(\"-\"))\n                    ),\n                    of(:some, one_of(not, invalids...))\n                ),\n                name = \"domain\"\n            ),\n            raw(\".\"), capture(\n                between(2, Inf, one_of(not, invalids...)),\n                name = \"TLD\"\n            ),\n            of(:maybe, raw(\":\"), capture(\n                between(2, 5, short(:digit)),\n                name = \"port\"\n            )),\n            of(:maybe, raw(\"/\"), capture(\n                of(:none_or_some, one_of(not, short(:space))),\n                name = \"resource\"\n            )),\n            CONSTANTS.stop\n        );\n\njulia> goods = (\n            \"http://foo.com/blah_blah\",\n            \"http://foo.com/blah_blah/\",\n            \"http://foo.com/blah_blah_(wikipedia)\",\n            \"http://foo.com/blah_blah_(wikipedia)_(again)\",\n            \"http://www.example.com/wpstyle/?p=364\",\n            \"https://www.example.com/foo/?bar=baz&inga=42&quux\",\n            \"http://✪df.ws/123\",\n            \"http://userid:password@example.com:8080\",\n            \"http://userid:password@example.com:8080/\",\n            \"http://userid@example.com\",\n            \"http://userid@example.com/\",\n            \"http://userid@example.com:8080\",\n            \"http://userid@example.com:8080/\",\n            \"http://userid:password@example.com\",\n            \"http://userid:password@example.com/\",\n            \"http://➡.ws/䨹\",\n            \"http://⌘.ws\",\n            \"http://⌘.ws/\",\n            \"http://foo.com/blah_(wikipedia)#cite-1\",\n            \"http://foo.com/blah_(wikipedia)_blah#cite-1\",\n            \"http://foo.com/unicode_(✪)_in_parens\",\n            \"http://foo.com/(something)?after=parens\",\n            \"http://☺.damowmow.com/\",\n            \"http://code.google.com/events/#&product=browser\",\n            \"http://j.mp\",\n            \"ftp://foo.bar/baz\",\n            \"http://foo.bar/?q=Test%20URL-encoded%20stuff\",\n            \"http://مثال.إختبار\",\n            \"http://例子.测试\",\n            \"http://-.~_!&'()*+,;=:%40:80%2f::::::@example.com\",\n            \"http://1337.net\",\n            \"http://a.b-c.de\",\n            \"http://223.255.255.254\"\n        );\n\njulia> bads = (\n            \"http://\",\n            \"http://.\",\n            \"http://..\",\n            \"http://../\",\n            \"http://?\",\n            \"http://??\",\n            \"http://??/\",\n            \"http://#\",\n            \"http://##\",\n            \"http://##/\",\n            \"http://foo.bar?q=Spaces should be encoded\",\n            \"//\",\n            \"//a\",\n            \"///a\",\n            \"///\",\n            \"http:///a\",\n            \"foo.com\",\n            \"rdar://1234\",\n            \"h://test\",\n            \"http:// shouldfail.com\",\n            \":// should fail\",\n            \"http://foo.bar/foo(bar)baz quux\",\n            \"ftps://foo.bar/\",\n            \"http://-error-.invalid/\",\n            \"http://-a.b.co\",\n            \"http://a.b-.co\",\n            \"http://0.0.0.0\",\n            \"http://3628126748\",\n            \"http://.www.foo.bar/\",\n            \"http://www.foo.bar./\",\n            \"http://.www.foo.bar./\"\n        );\n\njulia> all(occursin(url_pattern, url) for url in goods)\ntrue\n\njulia> any(occursin(url_pattern, url) for url in bads)\nfalse","category":"page"},{"location":"#Interface-1","page":"Tutorial","title":"Interface","text":"","category":"section"},{"location":"#","page":"Tutorial","title":"Tutorial","text":"Modules = [RegularExpressions]","category":"page"},{"location":"#","page":"Tutorial","title":"Tutorial","text":"Modules = [RegularExpressions]","category":"page"},{"location":"#RegularExpressions.CLASSES","page":"Tutorial","title":"RegularExpressions.CLASSES","text":"CLASSES\n\nAccess with class.\n\njulia> using RegularExpressions\n\njulia> show(CLASSES)\n(letter_or_digit = \"alnum\", letter = \"alpha\", standard = \"ascii\", blank = \"blank\", control = \"cntrl\", digit = \"digit\", prints = \"graph\", lowercase = \"lower\", prints_or_space = \"print\", punctuation = \"punct\", space = \"space\", uppercase = \"upper\", word = \"word\", hexadecimal = \"xdigit\")\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.CONSTANTS","page":"Tutorial","title":"RegularExpressions.CONSTANTS","text":"CONSTANTS\n\nPlain commands.\n\njulia> using RegularExpressions\n\njulia> show(CONSTANTS)\n(any = \".\", start = \"^\", stop = \"\\$\", define = \"DEFINE\", recur = \"(?R)\", recurred = \"R\")\n\njulia> p = pattern(CONSTANTS.any)\nr\".\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.EXTRAS","page":"Tutorial","title":"RegularExpressions.EXTRAS","text":"EXTRAS\n\nAccess with extra.\n\njulia> using RegularExpressions\n\njulia> show(EXTRAS)\n(limit_depth = \"LIMIT_DEPTH\", limit_heap = \"LIMIT_HEAP\", limit_match = \"LIMIT_MATCH\", not_empty = \"NOTEMPTY\", not_empty_at_start = \"NOTEMPTY_ATSTART\", no_auto_possess = \"NO_AUTO_POSSESS\", no_dot_star_anchor = \"NO_DOTSTAR_ANCHOR\", no_just_in_time = \"NO_JIT\", no_start_optimization = \"NO_START_OPT\", UTF = \"UTF\", unicode_properties = \"UCP\", carriage_return = \"CR\", linefeed = \"LF\", carriage_return_linefeed = \"CRLF\", standard_newline = \"ANYCRLF\", unicode_newline = \"ANY\", null = \"NUL\", standard_boundary = \"BSR_ANYCRLF\", unicode_boundary = \"BSR_UNICODE\", accept = \"ACCEPT\", fail = \"FAIL\", mark = \"MARK\", commit = \"COMMIT\", prune = \"PRUNE\", skip = \"SKIP\", then = \"THEN\")\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.GREEDS","page":"Tutorial","title":"RegularExpressions.GREEDS","text":"GREEDS\n\nAccess with of or between.\n\njulia> using RegularExpressions\n\njulia> show(GREEDS)\n(possessive = \"+\", lazy = \"?\", greedy = \"\")\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.KINDS","page":"Tutorial","title":"RegularExpressions.KINDS","text":"KINDS\n\nAccess via kind.\n\njulia> using RegularExpressions\n\njulia> show(KINDS)\n(group = \":\", reset = \"|\", atomic = \">\", comment = \"#\", after = \"=\", before = \"<=\", callout = \"C\")\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.OPTIONS","page":"Tutorial","title":"RegularExpressions.OPTIONS","text":"OPTIONS\n\nAccess with option\n\njulia> using RegularExpressions\n\njulia> show(OPTIONS)\n(caseless = \"i\", duplicate_names = \"J\", multi_line = \"m\", no_auto_capture = \"n\", single_line = \"s\", lazy = \"U\", ignore_space = \"x\", ignore_all_space = \"xx\", unset = \"^\", recur = \"R\", callout = \"C\")\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.PROPERTIES","page":"Tutorial","title":"RegularExpressions.PROPERTIES","text":"PROPERTIES\n\nAccess with property.\n\njulia> using RegularExpressions\n\njulia> show(PROPERTIES)\n(other = (\"C\", (control = \"c\", format = \"f\", unassigned = \"n\", private = \"o\", surrogate = \"s\")), letter = (\"L\", (lowercase = \"l\", modifier = \"m\", other = \"o\", titlecase = \"t\", uppercase = \"u\", cased = \"&\")), mark = (\"M\", (spacing = \"c\", enclosing = \"e\", non_spacing = \"n\")), number = (\"N\", (decimal = \"d\", letter = \"l\", other = \"o\")), punctuation = (\"P\", (connector = \"c\", dash = \"d\", close = \"e\", final = \"f\", initial = \"i\", other = \"o\", open = \"s\")), symbol = (\"S\", (currency = \"c\", modifier = \"k\", math = \"m\", other = \"o\")), seperator = (\"Z\", (line = \"l\", paragraph = \"p\", space = \"s\")), special = (\"X\", (letter_or_digit = \"an\", space = \"sp\", exists = \"uc\", word = \"wd\")))\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.QUANTITIES","page":"Tutorial","title":"RegularExpressions.QUANTITIES","text":"QUANTITIES\n\nAccess with of.\n\njulia> using RegularExpressions\n\njulia> show(QUANTITIES)\n(maybe = \"?\", none_or_some = \"*\", some = \"+\")\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.SHORTS","page":"Tutorial","title":"RegularExpressions.SHORTS","text":"SHORTS\n\nAccess with short.\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.not","page":"Tutorial","title":"RegularExpressions.not","text":"not\n\nUse to negate a pattern.\n\nUse with short, option, class, one_of, property, or script.\n\n\n\n\n\n","category":"constant"},{"location":"#RegularExpressions.between-Tuple{Any,Any,Vararg{Any,N} where N}","page":"Tutorial","title":"RegularExpressions.between","text":"between(low, high, them...; greed = :greedy)\n\nBetween low and high of it with a certain greed. Access GREEDS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(between(1, 3, \"a\"))\nr\"a{1,3}\"\n\njulia> occursin(p, \"aa\")\ntrue\n\njulia> p = pattern(between(2, Inf, \"a\"))\nr\"a{2,}\"\n\njulia> occursin(p, \"aaa\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.capture-Tuple","page":"Tutorial","title":"RegularExpressions.capture","text":"capture(them...; name = nothing)\n\nCapture them with optional name. See examples in captured.\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.captured-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.captured","text":"captured(it)\n\nRefer to a captured group. See relative.\n\njulia> using RegularExpressions\n\njulia> p = pattern(capture(\"a\"), captured(1))\nr\"(a)\\g<1>\"\n\njulia> occursin(p, \"aa\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.class-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.class","text":"class([::Not], it)\n\nCharacter classes. Access CLASSES. You can negate all classes with not.\n\njulia> using RegularExpressions\n\njulia> p = pattern(one_of(class(:space)))\nr\"[[:space:]]\"\n\njulia> occursin(p, \" \")\ntrue\n\njulia> p = pattern(one_of(class(not, :space)))\nr\"[[:^space:]]\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.exists-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.exists","text":"exists(it)\n\nCheck whether a capture group. For use with whether.\n\njulia> using RegularExpressions\n\njulia> p = pattern(\n            CONSTANTS.start,\n            of(:maybe, capture(\"a\", name = \"first\")),\n            whether(exists(\"first\"), \"b\", \"c\")\n        )\nr\"^(?:(?<first>a))?(?(<first>)b|c)\"\n\njulia> occursin(p, \"ab\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.extra-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.extra","text":"extra(it)\nextra(it, name)\nextra(it, value::Number)\n\nextra command. Access EXTRAS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(extra(:standard_newline), \"a\")\nr\"(*ANYCRLF)a\"\n\njulia> occursin(p, \"a\\r\")\ntrue\n\njulia> extra(:limit_match, 0)\n\"(*LIMIT_MATCH=0)\"\n\njulia> extra(:mark, \"name\")\n\"(*MARK:name)\"\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.kind-Tuple{Any,Vararg{Any,N} where N}","page":"Tutorial","title":"RegularExpressions.kind","text":"kind([::Not], a_kind, them...)\n\nA variety of syntaxes: a_kind of them. Access KINDS. Use repr to pass strings to callouts. You can negate look-ahead and look-behinds with not.\n\njulia> using RegularExpressions\n\njulia> p = pattern(kind(:before, \"a\"), \"b\")\nr\"(?<=a)b\"\n\njulia> occursin(p, \"ab\")\ntrue\n\njulia> negated = pattern(kind(not, :before, \"a\"), \"b\")\nr\"(?<!a)b\"\n\njulia> occursin(negated, \"ab\")\nfalse\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.of-Tuple{Symbol,Vararg{Any,N} where N}","page":"Tutorial","title":"RegularExpressions.of","text":"of(quantity::Symbol, them...; greed = :greedy)\nof(quantity::Number, them...)\n\nA quantity of it with a certain greed. Acccess QUANTITIES and GREEDS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(of(:some, \"a\"))\nr\"a+\"\n\njulia> occursin(p, \"aa\")\ntrue\n\njulia> p = pattern(of(2, \"a\"))\nr\"a{2}\"\n\njulia> occursin(p, \"aa\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.one_of-Tuple","page":"Tutorial","title":"RegularExpressions.one_of","text":"one_of([::Not], them...)\n\nCreate a character class.  You can negate all classes with not.\n\njulia> using RegularExpressions\n\njulia> p = pattern(one_of('a', 'b'))\nr\"[ab]\"\n\njulia> occursin(p, \"b\")\ntrue\n\njulia> p = pattern(one_of(not, 'a', 'b'))\nr\"[^ab]\"\n\njulia> occursin(p, \"c\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.option-Tuple{}","page":"Tutorial","title":"RegularExpressions.option","text":"option([::Not]; options...)\n\noption. Access OPTIONS.\n\njulia> using RegularExpressions\n\njulia> p = pattern(option(caseless = true, ignore_space = true), \"a \")\nr\"(?ix)a \"\n\njulia> occursin(p, \"A\")\ntrue\n\njulia> p = pattern(option(caseless = true), option(not, caseless = true), \"a\")\nr\"(?i)(?-i)a\"\n\njulia> occursin(p, \"A\")\nfalse\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.or-Tuple","page":"Tutorial","title":"RegularExpressions.or","text":"or(them...)\n\nOne of them.\n\njulia> using RegularExpressions\n\njulia> p = pattern(or(\"a\", \"b\"))\nr\"a|b\"\n\njulia> occursin(p, \"b\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.pattern-Tuple","page":"Tutorial","title":"RegularExpressions.pattern","text":"pattern(them..., options...)\n\nSplat of Regex. Options can be in OPTIONS\n\njulia> using RegularExpressions\n\njulia> p = pattern(\"a\", \"b\")\nr\"ab\"\n\njulia> occursin(p, \"ab\")\ntrue\n\njulia> p = pattern(\"A\", caseless = true)\nr\"A\"i\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.property-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.property","text":"property([::Not], general, [specific])\n\nA character property. Access PROPERTIES. You can negate all properties with not.\n\njulia> using RegularExpressions\n\njulia> p = pattern(property(:seperator))\nr\"\\p{Z}\"\n\njulia> occursin(p, \" \")\ntrue\n\njulia> p = pattern(property(not, :seperator))\nr\"\\P{Z}\"\n\njulia> occursin(p, \"a\")\ntrue\n\njulia> p = pattern(property(:seperator, :space))\nr\"\\p{Zs}\"\n\njulia> occursin(p, \" \")\ntrue\n\njulia> p = pattern(property(not, :seperator, :space))\nr\"\\P{Zs}\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.raw-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.raw","text":"raw(it)\n\nEscape punctuation.\n\njulia> using RegularExpressions\n\njulia> p = pattern(raw(\"1.0\"))\nr\"1\\.0\"\n\njulia> occursin(p, \"v1.0\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.recurred-Tuple{Number}","page":"Tutorial","title":"RegularExpressions.recurred","text":"recurred(it::Number)\nrecurred(it)\n\nCheck for recursion. Use with whether.\n\njulia> using RegularExpressions\n\njulia> recurred(1)\n\"R1\"\n\njulia> recurred(\"name\")\n\"R&name\"\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.relative-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.relative","text":"relative(it)\n\nMark a reference as relative. For use with captured or whether.\n\njulia> using RegularExpressions\n\njulia> p = pattern(captured(relative(1)), capture(\"a\"))\nr\"\\g<+1>(a)\"\n\njulia> occursin(p, \"aa\")\ntrue\n\njulia> p = pattern(capture(\"a\"), captured(relative(-1)))\nr\"(a)\\g<-1>\"\n\njulia> occursin(p, \"aa\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.script-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.script","text":"script([::Not], it)\n\nA character from a script. You can negate all scripts with not.\n\njulia> using RegularExpressions\n\njulia> p = pattern(script(:Han))\nr\"\\p{Han}\"\n\njulia> occursin(p, \"中\")\ntrue\n\njulia> p = pattern(script(not, :Han))\nr\"\\P{Han}\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.short-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.short","text":"short([::Not], it)\n\nA short command. Access SHORTS. You can negate some short commands with not.\n\njulia> using RegularExpressions\n\njulia> p = pattern(short(:space))\nr\"\\s\"\n\njulia> occursin(p, \" \")\ntrue\n\njulia> p = pattern(short(not, :space))\nr\"\\S\"\n\njulia> occursin(p, \"a\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.template-Tuple","page":"Tutorial","title":"RegularExpressions.template","text":"template(them...)\n\nSplat of SubstitutionString.\n\njulia> using RegularExpressions\n\njulia> p = pattern(capture(\"a\"))\nr\"(a)\"\n\njulia> t = template(captured(1), \"b\")\ns\"\\\\g<1>b\"\n\njulia> replace(\"a\", p => t)\n\"ab\"\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.through-Tuple{Any,Any}","page":"Tutorial","title":"RegularExpressions.through","text":"through(start, stop)\n\nA range of characters\n\njulia> using RegularExpressions\n\njulia> p = pattern(one_of(through('a', 'c')))\nr\"[a-c]\"\n\njulia> occursin(p, \"b\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.version-Tuple{Any}","page":"Tutorial","title":"RegularExpressions.version","text":"version(it; at_least = false)\n\nCheck whether the version of PCRE2 is it, (or, at_least it). For use with whether.\n\njulia> using RegularExpressions\n\njulia> p = pattern(whether(version(1), \"new\", \"old\"))\nr\"(?(VERSION=1)new|old)\"\n\njulia> occursin(p, \"new\")\nfalse\n\njulia> p = pattern(whether(version(1, at_least = true), \"new\", \"old\"))\nr\"(?(VERSION>=1)new|old)\"\n\njulia> occursin(p, \"new\")\ntrue\n\n\n\n\n\n","category":"method"},{"location":"#RegularExpressions.whether","page":"Tutorial","title":"RegularExpressions.whether","text":"whether(condition, yes, no = \"\")\n\nTest for a condition. See relative, exists, recurred, and version.\n\njulia> using RegularExpressions\n\njulia> p = pattern(\n            CONSTANTS.start,\n            of(:maybe, capture(\"a\")),\n            whether(1, \"b\", \"c\")\n        )\nr\"^(?:(a))?(?(1)b|c)\"\n\njulia> occursin(p, \"ab\")\ntrue\n\n\n\n\n\n","category":"function"}]
}