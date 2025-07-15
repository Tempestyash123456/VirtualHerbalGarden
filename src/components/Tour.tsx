import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TourProps {
  onFinish: () => void;
}

const Tour: React.FC<TourProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to the Virtual Herbal Garden!',
      content: 'Let\'s take a quick tour to get you familiar with the features of our garden.',
    },
    {
      title: 'Explore Plants',
      content: 'Here you can explore various medicinal plants, learn about their uses, and much more.',
    },
    {
      title: 'Plant Categories',
      content: 'Use the category menu to filter plants by their categories such as Ayurvedic, Immunity Boosters, Drugs, and Miscellaneous.',
    },
    {
      title: 'Search Plants',
      content: 'Use the search bar to quickly find plants by their name or other attributes.',
    },
    {
      title: 'Plant Details',
      content: 'Click on any plant card to view detailed information about the plant, including its botanical name, common names, habitat, medicinal uses, and more.',
    },
    {
      title: '3D Plant Models',
      content: 'View detailed 3D models of plants to examine their structure and identifying features.',
    },
    {
      title: 'Community Forum',
      content: 'Join our community forum to share your experiences, ask questions, and connect with other herbal enthusiasts.',
    },
    {
      title: 'Admin Features',
      content: 'If you are an admin, you can add new plants to the garden and manage existing ones.',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{steps[step].title}</h2>
        <p className="mb-4">{steps[step].content}</p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          <p>{steps[step].content}</p>
        </motion.div>
        <button
          onClick={handleNext}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
        >
          {step < steps.length - 1 ? 'Next' : 'Finish Tour'}
        </button>
      </div>
    </div>
  );
};

export default Tour;