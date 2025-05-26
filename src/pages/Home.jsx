import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotographerCard from '../components/PhotographerCard';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components//SkeletonLoader';
import { usePhotographers } from '../context/PhotographersContext';

export default function Home() {
  const { photographers, loading, filters, setFilters } = usePhotographers();
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);


  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleViewProfile = (id) => {
    navigate(`/photographers/${id}`);
  };
console.log(photographers)
 const filteredPhotographers = photographers.filter(photographer => 
  (!filters.city || photographer.location === filters.city) &&
  (!filters.minRating || photographer.rating >= filters.minRating) &&
  (!filters.priceRange || (
    photographer.price >= filters.priceRange[0] && 
    photographer.price <= filters.priceRange[1]
  )) &&
  (
    !filters.styles.length || filters.styles.some(style => 
      photographer.styles.includes(style)
    )
  ) &&
  (
    !filters.searchQuery || 
    photographer.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
    photographer.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
    photographer.tags.some(tag => 
      tag.toLowerCase().includes(filters.searchQuery.toLowerCase())
    )
  )
);


  const sortedPhotographers = [...filteredPhotographers].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'rating-desc') return b.rating - a.rating;
    if (filters.sortBy === 'recent') return b.id - a.id;
    return 0;
  });


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {filters.city ? `Photographers in ${filters.city}` : 'Impresio Studio'}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <Filters />
          </div>
          
          <div className="w-full md:w-3/4">
            <SearchBar />
            
          {isClient && loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => <SkeletonLoader key={i} />)}
    </div>
  ) : (
    <>
      {sortedPhotographers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPhotographers.slice(0, visibleCount).map(photographer => (
              <PhotographerCard 
                key={photographer.id} 
                photographer={photographer} 
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>

          {visibleCount < sortedPhotographers.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-6 py-2  bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No photographers found matching your criteria.</p>
        </div>
      )}
    </>
  )}

          </div>
        </div>
      </main>
    </div>
  );
}