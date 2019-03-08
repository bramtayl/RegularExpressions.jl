using RegularExpressions
import Documenter: makedocs, deploydocs

makedocs(
    sitename = "RegularExpressions.jl",
    strict = true
)

deploydocs(
    repo = "github.com/bramtayl/RegularExpressions.jl.git"
)
