import { TwitterApi } from 'twitter-api-v2';

export default async function handler(req, res) {
  const client = new TwitterApi({
    appKey: '9TWL3K8e1c2hOQRdOznFyeL8K',
    appSecret: 'wRXWGKbFmeqwSyfoKn52vfHSYy1Qtls7LOBsgkBc959Pt4Xx9j',
    accessToken: '1804271223112663042-ASBjti9dNUBqFgKBpcufEFMZI976sg',
    accessSecret: 'DwXlQ4vVoFyc4zr8C6fq1wc5V7tb1WYO1AaGMILa17wN2',
  });

  const usernames = ['CROvenSmash', 'CRKingdomEN', 'CookieRunTOA']; // Замените на нужные аккаунты
  const tweets = [];

  try {
    for (const username of usernames) {
      const user = await client.v2.userByUsername(username);
      const userTweets = await client.v2.userTimeline(user.data.id, { max_results: 5 });
      tweets.push({
        username,
        posts: userTweets.data.data.map(tweet => ({
          text: tweet.text,
          created_at: tweet.created_at,
        })),
      });
    }
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
}
