// pages/MyPage.js

import { getSession } from 'next-auth/react';
import SpotifyPlayer from '../components/SpotifyPlayer';

export default function MyPage({ accessToken }) {
  return (
    <div>
      <h1>My Page</h1>
      <SpotifyPlayer accessToken={accessToken} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const accessToken = session?.accessToken;

  return {
    props: {
      accessToken,
    },
  };
}
