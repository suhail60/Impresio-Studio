import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePhotographers } from '../context/PhotographersContext';

export default function PhotographerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { photographers, loading } = usePhotographers();
  console.log(photographers)
  const [photographer, setPhotographer] = useState(null);
 
  useEffect(() => {
    if (!loading && photographers.length > 0) {
      const foundPhotographer = photographers.find(p => p.id === parseInt(id));
      if (foundPhotographer) {
        setPhotographer(foundPhotographer);
        
      } else {
        // navigate('/'); // Redirect to home if photographer not found
      }
    }
  }, [id, photographers, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!photographer) {
    return <div className="min-h-screen flex items-center justify-center">Photographer not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="relative h-64 w-full bg-gray-200 rounded-lg overflow-hidden">
                {photographer.profilePic && (
                  <img 
                    src={photographer.profilePic} 
                    alt={photographer.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold">{photographer.name}</h1>
              <p className="text-gray-600 mt-2">{photographer.location}</p>
              <p className="text-xl font-semibold mt-4">Starting from ₹{photographer.price.toLocaleString()}</p>
              
              <div className="mt-4">
                <h2 className="text-lg font-semibold">About</h2>
                <p className="mt-2">{photographer.bio}</p>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Styles</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {photographer.styles.map(style => (
                    <span key={style} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Tags</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {photographer.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photographer.portfolio.map((image, index) => (
              <div key={index} className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {photographer.reviews.length > 0 ? (
            <div className="space-y-4">
              {photographer.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{review.name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                  <p className="text-sm text-gray-400 mt-2">{review.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}