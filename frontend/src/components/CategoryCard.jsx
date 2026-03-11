import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function CategoryCard({ category }) {
  const Icon = Icons[category.icon] || Icons.Wrench;

  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative bg-white rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-smooth hover:-translate-y-1 overflow-hidden"
    >
      {/* Background gradient accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${category.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-smooth`} />

      <div className={`w-14 h-14 ${category.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
        <Icon className={`w-7 h-7 bg-gradient-to-r ${category.color} bg-clip-text`} style={{ color: 'inherit' }} />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-primary-600 transition-smooth">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
        {category.description}
      </p>
      <div className="mt-3 text-xs font-medium text-primary-500">
        Starting at ${category.startingPrice}/hr →
      </div>
    </Link>
  );
}
