import { useState, useEffect } from 'react';
import { usePhotographers } from '../context/PhotographersContext';

export default function SearchBar() {
  const { filters, setFilters } = usePhotographers();
  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ ...filters, searchQuery: searchTerm });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setFilters]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by name, location, or tag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}