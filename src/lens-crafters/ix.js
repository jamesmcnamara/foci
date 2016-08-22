
// ix:: Functor f => String -> (a -> f a) -> b -> f b
export default index => (
    f => (
        arr => (
            f(arr[index]).map(newValue => arr.slice(0, index).concat(newValue).concat(arr.slice(index)))
        )
    )
)
