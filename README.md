## foci
Foci is a [lodash](https://github.com/lodash/lodash) inspired [lens](https://www.schoolofhaskell.com/school/to-infinity-and-beyond/pick-of-the-week/basic-lensing) library. 

A lens is a path into an object, which can be used to extract its values, or even "modify" them in place (by creating a new object with the value changed). 

When writing immutable code, we very commonly end up with deeply nested data stores, e.g.:

```

const store = {
	users: [
		{name: 'Jack Sparrow', 
		 posts: [
		 	{title: 'Why is the rum always gone? A dissertation on Carribean trade deficit'}
		 	],
		 	...
		 },
	...
	]
}

```

And updating a deeply nested structure will require heavy usage of the spread operator (or `Object.assign`). E.g. To capitalize the title of the first post of the first user, you would write:

```
const userIdx = 0;
const postIdx = 0;
const capitalize = (string) => {...}

{...store,
	users: store.users.map((user, idx) => (
		idx === userIdx 
		? {...user, 
			  posts: user.posts.map((post, idx) =>
					idx === postIdx
					? {...post,
	 						title: capitalize(post.title)
					  }
					: user)
		  }
		 : user
		)
}
```

This is an enormous amount of obfuscating boiler plate code for a very simple update. 

With lenses, we could write this update much more declaratively:

```
mod(`users[${userIdx}].posts[${postIdx}]`)
	(capitalize)
	(store)
	
```

## API
#### lens
A lens is simply a string which describes a path into an object. It can include object accesses and array indicies.

The `focus` of the lens is the final value referenced in the path.

Lenses can be constructed with the [lens](#lens) function, or passed as string literals into the lens consumer functions ([get](#get), [set](#set), [mod](#mod))

Combining lenses with ES6 template strings can be a concise way to use environment variables to create a dynamic path.

```
> "a.b[3].d" // focus is the d field

> const idx = 10
> `a.b[${idx}]` // focus is the 11th element of b
```

#### <a href='get'>get :: (string or lens) -> obj -> focus</a>
`get` consumes a lens and produces a function that takes in an object `obj` and outputs the focus of its lens.

``` 
> get('a.b.c')({a: {b: {c: 7}}})
7
```

#### <a href='set'>set :: (string or lens) -> const -> obj -> obj</a>
`set` consumes a lens and produces a function that takes in a constant value `const`, and produces a function consuming an object `obj` and outputs a clone of `obj` with the focus of the lens replaced with `const`

``` 
> set('a.b.c')(10)({a: {b: {c: 7}}})
{a: {b: {c: 10}}}
```

#### <a href='mod'>mod :: (string or lens) -> (a -> a) -> obj -> obj</a>
`mod` consumes a lens and produces a function that takes in a modifiying function `m` for the focus of the lens, and produces a function consuming an object `obj`, then outputs a clone of `obj` with the focus of the lens replaced with `m`'s output.

``` 
> const inc = n => n + 1
> mod('a.b.c')(inc)({a: {b: {c: 7}}})
{a: {b: {c: 8}}}
```

#### <a href='lens'>lens :: string -> lens</a>
`lens` consumes a path into an object and produces a corresponding lens function. All lens consumers ([get](#get), [set](#set), [mod](#mod)) will accept a literal string. However, lenses are composable via [compose](#compose), so lenses can be built piece by piece.


#### <a href='compose'>compose :: (lens or string)* -> lens</a>
`compose` composes the foci of multiple lenses

```
> const l = compose('a.b', 'c.d')
> get(l)({a: {b: {c: {d: 10}}}})
10
```