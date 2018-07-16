using Chunks
import Documenter

Documenter.makedocs(
    modules = [Chunks],
    format = :html,
    sitename = "Chunks.jl",
    root = joinpath(dirname(dirname(@__FILE__)), "docs"),
    pages = Any["Home" => "index.md"],
    strict = true,
    linkcheck = true,
    checkdocs = :exports,
    authors = "Brandon Taylor"
)
