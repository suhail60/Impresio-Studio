import { useState, useEffect } from 'react';
import { usePhotographers } from '../context/PhotographersContext';

export default function Filters() {
  const { filters, setFilters, photographers } = usePhotographers();
  const [priceRange, setPriceRange] = useState([0, 20000]);
  
  const allCities = [...new Set(photographers.map(p => p.location))];
  const allStyles = [...new Set(photographers.flatMap(p => p.styles))];
  
  useEffect(() => {
    if (photographers.length > 0) {
      const minPrice = Math.min(...photographers.map(p => p.price));
      const maxPrice = Math.max(...photographers.map(p => p.price));
      setPriceRange([minPrice, maxPrice]);
      setFilters(prev => ({
        ...prev,
        priceRange: [minPrice, maxPrice]
      }));
    }
  }, [photographers, setFilters]);
  
  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
    
    const timer = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        priceRange: newPriceRange
      }));
    }, 300);
    
    return () => clearTimeout(timer);
  };
  
  const handleStyleToggle = (style) => {
    setFilters(prev => {
      const newStyles = prev.styles.includes(style)
        ? prev.styles.filter(s => s !== style)
        : [...prev.styles, style];
      
      return {
        ...prev,
        styles: newStyles
      };
    });
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
        <select
          value={filters.city || ''}
          onChange={(e) => setFilters({ ...filters, city: e.target.value || null })}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Cities</option>
          {allCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
        <select
          value={filters.minRating || ''}
          onChange={(e) => setFilters({ ...filters, minRating: e.target.value ? parseFloat(e.target.value) : null })}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Any Rating</option>
          <option value="4">4+ ★</option>
          <option value="4.5">4.5+ ★</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={0}
            max={20000}
            step={1000}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full"
          />
          <input
            type="range"
            min={0}
            max={20000}
            step={1000}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Styles</label>
        <div className="space-y-2">
          {allStyles.map(style => (
            <div key={style} className="flex items-center">
              <input
                type="checkbox"
                id={`style-${style}`}
                checked={filters.styles.includes(style)}
                onChange={() => handleStyleToggle(style)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`style-${style}`} className="ml-2 text-sm text-gray-700">
                {style}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          value={filters.sortBy || ''}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value || null })}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
    </div>
  );
}