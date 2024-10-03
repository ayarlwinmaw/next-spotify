// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

// export default NextAuth({
//   providers: [
//     SpotifyProvider({
//       clientId: process.env.SPOTIFY_CLIENT_ID,
//       clientSecret: process.env.SPOTIFY_CLIENT_SECRET
//     })
//   ],
// });

const options = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: 'user-read-private user-read-email', // Specify the desired scope here
    }),
  ],
};

export default function handler(req, res) {
  return NextAuth(req, res, options);
}