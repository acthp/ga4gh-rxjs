# Client for Ga4gh APIs in javascript, with Rx

ga4gh-rxjs is a client library for the [Ga4gh](http://ga4gh.org/) [APIs](http://ga4gh.org/documentation/api/v0.5.1/ga4gh_api.html#/)
in javascript, using [rxjs](https://github.com/Reactive-Extensions/RxJS).

Ga4gh APIs are methods for exchanging genomic and clinical data. Rx is a library for taming asynchronous code.

## Methods

Ga4gh method references are [here](http://ga4gh.org/documentation/api/v0.5.1/ga4gh_api.html#/).

ga4gh-rxjs exports each ga4gh method as a property. Each exported method takes two
parameters: the url of the ga4gh server, and a javascript object with the properties
of the query. For example,

```javascript
// url: string
// params: GASearchVariantSetsRequest || undefined
// returns: Observable<GASearchVariantSetsResponse>

ga4gh.variantSets(url, params)

```

If no parameters are required, params can be omitted.

### Example usage
```javascript
ga4gh.variantSets(url).subscribe(d => console.log('One page of variantSets', d));
```

### Paging

The Ga4gh APIs are paged. To control the page size, include `pageSize` in
the param object, as per the ga4gh docs.

Available ga4gh methods are

```
ga4gh.variantSets
ga4gh.variants
ga4gh.referenceSets
ga4gh.references
ga4gh.reads
ga4gh.readGroupSets
ga4gh.callSets
```


### Walking all pages

Additionally, utility methods are provided to accumulate all pages of the query
results. These methods are under the property `all`, and return the concatenated data
properties from the results (i.e. the page tokens are dropped).

```javascript
ga4gh.all.variantSets(url).subscribe(d => console.log('All rows of variantSets', d));
```

## Demo

A few queries demonstrated [here]( http://rawgit.com/acthp/ga4gh-rxjs/master/index.html).

Source [here](http://rawgit.com/acthp/ga4gh-rxjs/master/demo.js).


## Installation

The library is built as a UMD module, and so should work as a CommonJS module, AMD
module, or with a `<script>` tag. If you have a choice, we recommend a build with
npm and webpack.

### webpack (and browserify?)

```sh
> npm install ga4gh-rxjs
```

```javascript
var ga4gh = require('ga4gh-rxjs');
ga4gh.variantSets("http://foo.bar").subscribe(console.log.bind(console));
```

### script tag

If including ga4gh-rxjs with a script tag, the methods will be exposed on
the `ga4gh` global. You must include rx.js, rx.experimental.js, rxjs-dom.js, and underscore.js.

```html
<script src="https://rawgit.com/reactive-extensions/rxjs/v2.5.2/dist/rx.js"></script>
<script src="https://rawgit.com/reactive-extensions/rxjs/v2.5.2/dist/rx.experimental.js"></script>
<script src="https://rawgit.com/reactive-extensions/rxjs-dom/v4.0.4/dist/rx.dom.js"></script>
<script src="https://rawgit.com/jashkenas/underscore/1.8.3/underscore.js"></script>
<script src="https://rawgit.com/acthp/ga4gh-rxjs/master/dist/ga4gh-rx.js"></script>
```

### Lint

Use `npm run lint` to run the lint rules. We lint with eslint and babel-eslint.
