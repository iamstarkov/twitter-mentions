'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMentions;

var _twit = require('twit');

var _twit2 = _interopRequireDefault(_twit);

var _bn = require('bn.js');

var _bn2 = _interopRequireDefault(_bn);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bignumDec(number) {
  return new _bn2.default(number).sub(new _bn2.default('1')).toString();
}

function getNextMentionsOptions(options, mentions) {
  if ((0, _ramda.isEmpty)(mentions)) return options;
  return (0, _ramda.merge)(options, { max_id: bignumDec((0, _ramda.last)(mentions).id_str) });
}

function accumulate(get, options, isLastMention, mentions, cb) {
  var findTargetIndex = _ramda2.default.findLastIndex(isLastMention);
  var nextMentionsOptions = getNextMentionsOptions(options, mentions);
  get(nextMentionsOptions, function (err, res) {
    if (err) return cb(err);
    if ((0, _ramda.isEmpty)(res)) {
      return cb(new Error('Target mention is too far away'));
    }
    var accumulatedMentions = (0, _ramda.concat)(mentions, res);
    if (findTargetIndex(accumulatedMentions) !== -1) {
      return cb(null, (0, _ramda.slice)(0, findTargetIndex(accumulatedMentions) + 1, accumulatedMentions));
    }
    return accumulate(get, nextMentionsOptions, isLastMention, accumulatedMentions, cb);
  });
}

function getMentions(tokens, isLastMention, cb) {
  var client = new _twit2.default(tokens);
  var get = client.get.bind(client, 'statuses/mentions_timeline');
  var options = { trim_user: true, count: 200 };
  return accumulate(get, options, isLastMention, [], cb);
}
