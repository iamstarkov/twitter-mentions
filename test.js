import test from 'tape';
import twitterMentions from './index';
import tokens from 'twitter-tokens';
import { last } from 'ramda';
import dec from 'bignum-dec';

test('twitterMentions', { timeout: 30000 }, ({ equal, end }) => {
  twitterMentions(tokens, '424125604925956096').then(mentions => {
    equal(mentions.length, 19, 'proper mention’s number');
    end();
  });
});

test('twitterMentions including since_id', { timeout: 30000 }, ({ equal, end }) => {
  twitterMentions(tokens, dec('424125604925956096')).then(mentions => {
    equal(mentions.length, 20, 'proper mention’s number');
    equal(last(mentions).id_str, '424125604925956096', 'including since_id');
    end();
  });
});
