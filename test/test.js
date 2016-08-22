import assert from 'assert'
import { get, set, mod, lens } from '../index.js'
import attr from '../src/lens-crafters/attr.js'
import ix from '../src/lens-crafters/ix.js'
import compose from '../src/lens-consumers/compose.js'

const fixture = {
    a: 1,
    b: [
        {c: 'hello'},
        {c: 'goodbye'}
    ],
    d: {
        e: 1,
        f: 'other'
    }
};

describe('Consumers', () => {
    describe('Low level API', () => (
        it('Should be composable to read properties of a structure', () => (
                assert.equal('hello', get(compose(attr('b'), ix('0'), attr('c')))(fixture))
        ))
    )) 

    describe('String shorthand', () => {
        it('should be able to extract using the DSL', () => (
            assert.equal('hello', get('b[0].c')(fixture))
        ))

        it('should be a able to set', () => {
            assert.deepStrictEqual({...fixture, d: {...fixture.d, e: 7}}, set('d.e')(7)(fixture)) 
        })

        it('should be able to set with indicies', () => {
            assert.equal(7, set('b[0].c')(7)(fixture).b[0].c)
        })
    })

    describe('Explicit lens creation', () => {
        it('should be usable in get function', () => {
            assert.equal('hello', get(lens('b[0].c'))(fixture))
        })

        it('should compose lenses of different types fluidly', () => {
            assert.equal('other', get(compose(lens('d'), 'f'))(fixture))
        })
    })
})
