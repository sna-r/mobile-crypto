import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gérer la soumission du formulaire ici
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="relative w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg border border-gray-700">
        {/* Effet de lueur */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-20 blur-3xl"></div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          🔐 Connexion Crypto
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label htmlFor="email" className="text-white">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="password" className="text-white">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-md shadow-md hover:opacity-80 transition duration-300"
          >
            🚀 Se connecter
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
