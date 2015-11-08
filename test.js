import test from 'tape';
import twitterMentions from './index';
import tokens from 'twitter-tokens';

test('npmProfileDownloads', { timeout: 30000 }, ({ equal, end } = t) => {
  twitterMentions(tokens, '424125604925956096', (err, mentions) => {
    if (err) throw err;
    equal(mentions.length, 20, 'show fetch proper amount of mentions');
    end();
  });
});
