import Twitter from 'twit';
import dec from 'bignum-dec';
import { pipe, last, prop, concat, merge, isEmpty } from 'ramda';

const getNextOptions = (options, mentions) =>
  (isEmpty(mentions))
    ? options
    : merge(options, { max_id: pipe(last, prop('id_str'), dec)(mentions) });

function accumulate(get, options, mentions) {
  const nextOptions = getNextOptions(options, mentions);
  return get(nextOptions).then(res => {
    const accumulatedMentions = concat(mentions, res);
    return (isEmpty(res))
        ? accumulatedMentions
        : accumulate(get, nextOptions, accumulatedMentions);
  });
}

export default function getMentions(tokens, sinceId) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'statuses/mentions_timeline');
  const options = { trim_user: true, count: 200, since_id: sinceId };
  return accumulate(get, options, []);
}
