import { equal } from 'assert';
import twitterMentions from './index';

it('should twitterMentions', () =>
  equal(twitterMentions('unicorns'), 'unicorns'));

it('should twitterMentions invalid input', () =>
  equal(twitterMentions(), undefined));
