import Twitter from 'twit';
import Bignum from 'bn.js';
import { last, concat, propEq, slice, findIndex, merge, isEmpty } from 'ramda';

function bignumDec(number) {
  return (new Bignum(number).sub(new Bignum('1'))).toString();
}

function getNextMentionsOptions(options, mentions) {
  if (isEmpty(mentions)) return options;
  return merge(options, { max_id: bignumDec(last(mentions).id_str) });
}

function accumulate(get, options, isLastMention, mentions, cb) {
  const findTargetIndex = findLastIndex(isLastMention);
  const nextMentionsOptions = getNextMentionsOptions(options, mentions);
  get(nextMentionsOptions, (err, res) => {
    if (err) return cb(err);
    if (isEmpty(res)) {
      return cb(new Error('Target mention is too far away'));
    }
    const accumulatedMentions = concat(mentions, res);
    if (findTargetIndex(accumulatedMentions) !== -1) {
      return cb(null, slice(0, findTargetIndex(accumulatedMentions) + 1, accumulatedMentions));
    }
    return accumulate(get, nextMentionsOptions, isLastMention, accumulatedMentions, cb);
  });
}

export default function getMentions(tokens, isLastMention, cb) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'statuses/mentions_timeline');
  const options = { trim_user: true, count: 200 };
  return accumulate(get, options, isLastMention, [], cb);
}
