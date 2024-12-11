import React from 'react';

const AboutPage = () => {
  return (
    
    <div>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-green-400 text-white text-center py-10">
        <h1 className="text-4xl font-bold">Welcome to Vinyl AI</h1>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 text-white py-4">
        <ul className="flex justify-center space-x-4">
          <li><a href="/" className="hover:text-green-400">Home</a></li>
          <li><a href="/about" className="hover:text-green-400">About</a></li>
          <li><a href="#services" className="hover:text-green-400">Services</a></li>
          <li><a href="#portfolio" className="hover:text-green-400">Portfolio</a></li>
          <li><a href="#contact" className="hover:text-green-400">Contact</a></li>
        </ul>
      </nav>

      {/* Home Section */}
      <section
        className="h-screen bg-cover bg-fixed bg-center text-white flex items-center justify-center"
        style={{ backgroundImage: "url('/images/music.jpg')" }}
      >
        <div className="text-center backdrop-blur-sm bg-white/30 p-50 rounded-lg p-10">
          <h2 className="text-5xl font-bold text-green-500">Discover the Beauty of Vinyl AI</h2>
          <p className="mt-4 text-lg text-gray-700">
            Your go-to destination for stunning music and creative AI solutions while listening to music through Spotify.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-600">
            Vinyl is a team of passionate designers and developers dedicated to bringing your ideas to life.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="h-screen bg-cover bg-fixed bg-center text-white flex items-center justify-center"
        style={{ backgroundImage: "url('/images/note.jpg')" }}
      >
        <div className="text-center px-4  backdrop-blur-sm bg-white/30 p-50 rounded-lg p-10">
          <h2 className="text-5xl font-bold text-green-500">Our Services</h2>
          <p className="mt-4 text-lg text-gray-700">
            Vinyl AI offers an AI song lyrics images generator where you can create unique, rhyming lyrics on any topic.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>Live Music</li>
            <li>Graphic Music</li>
            <li>4K Music</li>
            <li>App Development</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>&copy; 2024 Vinyl AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
