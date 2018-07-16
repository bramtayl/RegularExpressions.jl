using Documenter, Chunks

deploydocs(;
    repo="github.com/bramtayl/Chunks.jl",
    target="build",
    julia="0.6",
    deps=nothing,
    make=nothing,
)
