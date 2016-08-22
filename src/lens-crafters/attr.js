// Attr :: Functor f => String -> (a -> f a) -> b -> f b
export default name => (
    f => ( 
        obj => do {
            f(obj[name]).map(newValue =>({...obj, [name]: newValue})) 
        }
    )
)
