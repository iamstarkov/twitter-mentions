import test from 'tape';
import twitterMentions from './index';
import tokens from 'twitter-tokens';

test('npmProfileDownloads', { timeout: 30000 }, ({ equal, assert, end } = t) => {
  twitterMentions(tokens, '662248638287110144', (err, res) => {
    if (err) throw err;
    console.log(res)
    // equal('424196654758375425', last(res).id_str);
    end();
  });
});
