# Ga4gh APIs in javascript, with Rx

ga4gh-rxjs is an implementation of the [Ga4gh](http://ga4gh.org/) [APIs](http://ga4gh.org/documentation/api/v0.5.1/ga4gh_api.html#/)
in javascript, using [rxjs](https://github.com/Reactive-Extensions/RxJS).

Ga4gh APIs are methods for exchanging genomic and clinical data. Rx is a library for taming asynchronous code.

## Methods

Ga4gh method references are [here](http://ga4gh.org/documentation/api/v0.5.1/ga4gh_api.html#/).

ga4gh-rxjs exports each method as a property. Each exported method takes two
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

Available methods are

```
ga4gh.variantSets
ga4gh.variants
ga4gh.referenceSets
ga4gh.refereences
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

## Installation

### webpack (and browserify?)

### <script>

### AMD

### Lint

Use `npm run lint` to run the lint rules. We lint with eslint and babel-eslint.
