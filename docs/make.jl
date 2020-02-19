using RegularExpressions
using Documenter: deploydocs, makedocs

makedocs(
    sitename = "RegularExpressions.jl",
    modules = [RegularExpressions],
    doctest = false
)
deploydocs(repo = "github.com/bramtayl/RegularExpressions.jl.git")
