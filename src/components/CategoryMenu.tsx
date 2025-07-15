import React from 'react';
import { Leaf, Flower, Grid } from 'lucide-react';

interface CategoryMenuProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  isDarkMode: boolean;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ 
  currentCategory, 
  onCategoryChange,
  isDarkMode
}) => {
  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'all': return 'All';
      case 'plant': return 'Plants';
      case 'herb': return 'Herbs';
      default: return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'all': return <Grid size={18} />;
      case 'plant': return <Flower size={18} />;
      case 'herb': return <Leaf size={18} />;
      default: return <Leaf size={18} />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden`}>
      <div className={`py-2 px-4 ${isDarkMode ? 'bg-gray-700' : 'bg-emerald-100'}`}>
        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-emerald-800'}`}>Categories</h3>
      </div>
      <ul>
        {['all', 'plant', 'herb'].map((category) => (
          <li key={category}>
            <button
              onClick={() => onCategoryChange(category)}
              className={`flex items-center w-full p-3 text-left ${
                currentCategory === category
                  ? isDarkMode
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-100 text-emerald-800'
                  : isDarkMode
                  ? 'text-white hover:bg-gray-700'
                  : 'text-gray-800 hover:bg-gray-100'
              } transition-colors duration-200`}
            >
              <span className="mr-3">{getCategoryIcon(category)}</span>
              <span>{getCategoryName(category)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;