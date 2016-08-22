const Const = x => (
    {
        map: (f) => Const(x),
        run: x
    
    }
)

export default Const
