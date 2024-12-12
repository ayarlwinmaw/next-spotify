'use client';

import { useEffect, useState } from 'react';
// import SpotifyPlayer from '../components/SpotifyPlayer'; // Import the Spotify Player component
import { useRouter } from 'next/navigation';
import Slider from '../components/Slider';
import Dashboard from '../components/Dashboard'



export default function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();

  // Check for access token in the URL (e.g., after redirect from Spotify login)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleLogin = () => {
    router.push('/api/login'); // Redirect to Spotify login via API
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <Dashboard accessToken={accessToken} />
          {/* <Slider/> */}
        </div>
        
      ) : (
        <div>
          
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  {/* Logo */}
  <img 
    src="/images/logo512.png" 
    alt="Logo" 
    className="w-24 h-24 mb-6" 
  />
  {/* Login Button */}
  <button 
    type="button" 
    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" 
    onClick={handleLogin}
  >
    Login with Spotify
  </button>
</div>

        </div>
      )}
          
    </div>

  );
}
