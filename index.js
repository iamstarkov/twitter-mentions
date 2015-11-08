import Twitter from 'twit';
import R, { last, concat, propEq, slice, findIndex, isEmpty } from 'ramda';

function bignumDec(i) {
  return (new bignum(i).sub(new bignum('1'))).toString();
}

function getNextMentionsOptions(options, mentions) {
  if (R.isEmpty(mentions)) return options;
  return R.merge(options, { max_id: bignumDec(R.last(mentions).id_str) });
}

function accumulate(get, options, lastMentionToGet, mentions, cb) {
  const isTarget = R.propEq('id_str', lastMentionToGet);
  const findTargetIndex = findIndex(isTarget);
  const nextMentionsOptions = getNextMentionsOptions(options, mentions);
  get(nextMentionsOptions, (err, res) => {
    if (err) return cb(err);
    if (R.isEmpty(res)) {
      return cb(new Error('Target mention is too far away'));
    }
    const accumulatedMentions = concat(mentions, res);
    if (findTargetIndex(accumulatedMentions) !== -1) {
      return cb(null, slice(0, findTargetIndex(accumulatedMentions) + 1, accumulatedMentions));
    }
    return accumulate(get, nextMentionsOptions, lastMentionToGet, accumulatedMentions, cb);
  });
}

export default function getMentions(tokens, lastMentionToGet, cb) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'statuses/mentions_timeline');
  const options = { trim_user: true, count: 200 };
  return accumulate(get, options, lastMentionToGet, [], cb);
};
