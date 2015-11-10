import test from 'tape';
import twitterMentions from './index';
import tokens from 'twitter-tokens';
import { tweets, mentions } from './fixtures.json';
import R, { last, concat, prop, propEq, slice, findIndex, merge, isEmpty } from 'ramda';

test('npmProfileDownloads', { timeout: 30000 }, ({ equal, end } = t) => {
  const isLastMention = R.propEq('id_str', 424125604925956096);
  twitterMentions(tokens, isLastMention, (err, mentions) => {
    if (err) throw err;
    equal(mentions.length, 20, 'show fetch proper amount of mentions');
    end();
  });
});

test('npmProfileDownloads: isLastMention() ', ({ equal, end } = t) => {
  const firstTweet = R.last(tweets);
  const time = R.pipe(R.prop('created_at'), createdAt => new Date(createdAt).getTime());
  const isLastMention = item => time(item) < time(firstTweet);
  const findTargetIndex = R.findLastIndex(isLastMention);

  equal(
    '@jsunderhood правду говорят, что флюкс помер и большие проекты на нем делать уже нельзя?',
    mentions[findTargetIndex(mentions) - 1].text,
    'match proper mention'
  );
  end();
});
