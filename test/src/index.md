# Tutorial

I'll follow the example from `rex` for [url validation](https://cran.r-project.org/web/packages/rex/vignettes/url_parsing.html).

```jldoctest
julia> using RegularExpressions

julia> invalids = raw.((".", "/", " ", "-"));

julia> url_pattern = pattern(
            CONSTANTS.start,
            capture(
                or(
                    kind(:group, "http", of(:maybe, "s")),
                    "ftp"
                ),
                name = "protocol"
            ),
            raw("://"),
            of(:maybe,
                capture(
                    of(:some, one_of(not, short(:space))),
                    name = "username"
                ),
                of(:maybe,
                    raw(":"),
                    capture(
                        of(:none_or_some, one_of(not, short(:space))),
                        name = "password"
                    )
                ),
                raw("@")
            ),
            capture(
                of(:none_or_some,
                    of(:some, one_of(not, invalids...)),
                    of(:none_or_some, raw("-"))
                ),
                of(:some, one_of(not, invalids...)),
                name = "host"
            ),
            capture(
                of(:none_or_some,
                    raw("."),
                    of(:none_or_some,
                        of(:some, one_of(not, invalids...)),
                        of(:none_or_some, raw("-"))
                    ),
                    of(:some, one_of(not, invalids...))
                ),
                name = "domain"
            ),
            raw("."), capture(
                between(2, Inf, one_of(not, invalids...)),
                name = "TLD"
            ),
            of(:maybe, raw(":"), capture(
                between(2, 5, short(:digit)),
                name = "port"
            )),
            of(:maybe, raw("/"), capture(
                of(:none_or_some, one_of(not, short(:space))),
                name = "resource"
            )),
            CONSTANTS.stop
        );

julia> goods = (
            "http://foo.com/blah_blah",
            "http://foo.com/blah_blah/",
            "http://foo.com/blah_blah_(wikipedia)",
            "http://foo.com/blah_blah_(wikipedia)_(again)",
            "http://www.example.com/wpstyle/?p=364",
            "https://www.example.com/foo/?bar=baz&inga=42&quux",
            "http://✪df.ws/123",
            "http://userid:password@example.com:8080",
            "http://userid:password@example.com:8080/",
            "http://userid@example.com",
            "http://userid@example.com/",
            "http://userid@example.com:8080",
            "http://userid@example.com:8080/",
            "http://userid:password@example.com",
            "http://userid:password@example.com/",
            "http://➡.ws/䨹",
            "http://⌘.ws",
            "http://⌘.ws/",
            "http://foo.com/blah_(wikipedia)#cite-1",
            "http://foo.com/blah_(wikipedia)_blah#cite-1",
            "http://foo.com/unicode_(✪)_in_parens",
            "http://foo.com/(something)?after=parens",
            "http://☺.damowmow.com/",
            "http://code.google.com/events/#&product=browser",
            "http://j.mp",
            "ftp://foo.bar/baz",
            "http://foo.bar/?q=Test%20URL-encoded%20stuff",
            "http://مثال.إختبار",
            "http://例子.测试",
            "http://-.~_!&'()*+,;=:%40:80%2f::::::@example.com",
            "http://1337.net",
            "http://a.b-c.de",
            "http://223.255.255.254"
        );

julia> bads = (
            "http://",
            "http://.",
            "http://..",
            "http://../",
            "http://?",
            "http://??",
            "http://??/",
            "http://#",
            "http://##",
            "http://##/",
            "http://foo.bar?q=Spaces should be encoded",
            "//",
            "//a",
            "///a",
            "///",
            "http:///a",
            "foo.com",
            "rdar://1234",
            "h://test",
            "http:// shouldfail.com",
            ":// should fail",
            "http://foo.bar/foo(bar)baz quux",
            "ftps://foo.bar/",
            "http://-error-.invalid/",
            "http://-a.b.co",
            "http://a.b-.co",
            "http://0.0.0.0",
            "http://3628126748",
            "http://.www.foo.bar/",
            "http://www.foo.bar./",
            "http://.www.foo.bar./"
        );

julia> all(occursin.(url_pattern, goods))
true

julia> any(occursin.(url_pattern, bads))
false
```

# Interface

## General
```@docs
pattern
raw
not
CONSTANTS
or
kind
KINDS
```

## Shortcuts
```@docs
short
SHORTS
property
PROPERTIES
script
option
OPTIONS
extra
EXTRAS
```

## Classes
```@docs
one_of
class
CLASSES
through
```

## Quantifiers
```@docs
GREEDS
of
QUANTITIES
between
```

## Captures
```@docs
template
capture
captured
relative
```

## Conditions
```@docs
whether
exists
version
recurred
```
