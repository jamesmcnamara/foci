import compile from '../compiler/compile.js'


// Lens composition is simply function composition
export default (...lenses) => (
    f => (
        lenses
            .reverse()
            .map(compile)
            .reduce((smallLens, biggerLens) => (
                biggerLens(smallLens)
            ), f)
    )
)
