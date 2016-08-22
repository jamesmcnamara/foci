import Const from '../types/Const.js'
import compile from '../compiler/compile.js'

// get :: Lens<a, b> -> b -> a
export const get = lens => (
    obj => (
        compile(lens)(Const)(obj).run
    )
)
export const view = get
