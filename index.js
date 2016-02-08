import Twitter from 'twit';
import dec from 'bignum-dec';
import { pipe, last, prop, concat, merge, isEmpty } from 'ramda';

function getNextOptions(options, mentions) {
  return (isEmpty(mentions))
    ? options
    : merge(options, { max_id: pipe(last, prop('id_str'), dec)(mentions) });
}

function accumulate(client, options, mentions) {
  const nextOptions = getNextOptions(options, mentions);
  return client.get('statuses/mentions_timeline', nextOptions).then(({ data }) => {
    const accumulatedMentions = concat(mentions, data);
    return (isEmpty(data))
        ? accumulatedMentions
        : accumulate(client, nextOptions, accumulatedMentions);
  });
}

export default function getMentions(tokens, sinceId) {
  const client = new Twitter(tokens);
  const options = { trim_user: true, count: 200, since_id: sinceId };
  return accumulate(client, options, []);
}
