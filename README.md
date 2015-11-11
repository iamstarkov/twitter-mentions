# twitter-mentions

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> get latest mentions for target username

## Install

    npm install --save twitter-mentions

## Usage

```js
import twitterMentions from 'twitter-mentions';
import tokens from 'twitter-tokens';

twitterMentions(tokens, '424119506508980224', (err, mentions) => {
  if (err) throw err;
  console.log(mentions); // [{…}, {…}, …]
});
```

## API

### getMentions(tokens, sinceId, cb)

As far as `statuses/mentions_timeline` endpoint requires authentication with user context only, it means there is no way to specify which mentions you want to get, once you get tokens after some user authentication, you will be able to get mentions only for this user.

#### tokens

*Required*  
Type: `Object`

Valid [Twitter developer credentials (tokens)][how-to-get]
in the form of a set of consumer and access tokens/keys.
You can use [twitter-tokens][tokens], to simplify getting tokens.

[how-to-get]: https://iamstarkov.com/get-twitter-tokens/
[tokens]: https://www.npmjs.com/package/twitter-tokens

#### sinceId

*Required*  
Type: `String`



> Return results with an ID greater than (that is, more recent than) the specified ID. There are limits to the number of Tweets which can be accessed through the API. If the limit of Tweets has occured since the `since_id`, the `since_id` will be forced to the oldest ID available.  
> — [Twitter API `statuses/mentions_timeline`](https://dev.twitter.com/rest/reference/get/statuses/mentions_timeline)


#### cb(err, mentions)

*Required*  
Type: `Function`

Callback for you.

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/twitter-mentions
[npm-image]: https://img.shields.io/npm/v/twitter-mentions.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/twitter-mentions
[travis-image]: https://img.shields.io/travis/iamstarkov/twitter-mentions.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/iamstarkov/twitter-mentions
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/twitter-mentions.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/twitter-mentions
[depstat-image]: https://david-dm.org/iamstarkov/twitter-mentions.svg?style=flat-square
