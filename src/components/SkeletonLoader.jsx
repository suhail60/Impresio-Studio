export default function SkeletonLoader() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-gray-200"></div>
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="flex flex-wrap gap-1 mb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-1/4"></div>
          ))}
        </div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}