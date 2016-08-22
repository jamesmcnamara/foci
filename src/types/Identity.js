export const Identity = x => (
    {
        map: (f) => Identity(f(x)),
        run: x
    }
)

export default Identity
