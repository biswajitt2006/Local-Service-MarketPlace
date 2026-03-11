import { Star } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-xl p-5 card-shadow">
      <div className="flex items-start gap-3">
        <img
          src={review.avatar}
          alt={review.user}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-800 text-sm">{review.user}</h4>
            <span className="text-xs text-gray-400">
              {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < review.rating
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-200 fill-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.text}</p>
        </div>
      </div>
    </div>
  );
}
