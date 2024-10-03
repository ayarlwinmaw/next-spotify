// pages/_app.js

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Provider as SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchData();
  }, [router.pathname]); // Re-fetch session data when route changes

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
