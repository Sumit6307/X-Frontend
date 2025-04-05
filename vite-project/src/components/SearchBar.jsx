import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setProfiles }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`https://x-backend-1-zhox.onrender.com/api/profiles/search?q=${query}`);
      setProfiles(res.data);
    } catch (err) {
      console.error('Search Error:', err);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search developers by name, skill, or location..."
        className="w-full max-w-md p-3 rounded-l bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neonBlue"
      />
      <button
        type="submit"
        className="shine-button text-white px-4 py-3 rounded-r"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;