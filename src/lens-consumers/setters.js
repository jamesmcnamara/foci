import Identity from '../types/Identity.js'
import compile from '../compiler/compile.js'


// mod :: Lens<a, b> -> (a -> a) -> b -> b
export const mod = lens => (
    f => (
        obj => (
            compile(lens)
                (x => Identity(f(x)))
                (obj) .run
        )
    )
)
export const over = mod

// set:: Lens<a, b> -> a -> b -> b
export const set = lens => newValue => obj => (compile(lens)(x => Identity(newValue))(obj).run)
