import { AtpAgent } from '@atproto/api';
import * as dotenv from 'dotenv';

dotenv.config();

// Check if the environment variables are set
if (!process.env.BLUESKY_USERNAME || !process.env.BLUESKY_PASSWORD) {
  console.error('BLUESKY_USERNAME and BLUESKY_PASSWORD must be set');
  process.exit(1);
}

const main = async () => {
  // Create a Bluesky Agent
  const agent = new AtpAgent({
    service: 'https://bsky.social',
  });

  // Login to Bluesky
  try {
    await agent.login({
      identifier: process.env.BLUESKY_USERNAME as string,
      password: process.env.BLUESKY_PASSWORD as string,
    });
  } catch (e) {
    console.error('Login failed:', e);
    process.exit(1);
  }

  console.log('Logged in as:', agent.assertDid);

  // await agent.post({
  //   text: '🙂',
  // });

  const follows = await agent.getFollows({
    actor: agent.assertDid,
  });

  console.log('Your follows:', follows.data.follows);

  const followers = await agent.getFollowers({
    actor: agent.assertDid,
  });

  console.log('Your followers:', followers.data);
};

main();
