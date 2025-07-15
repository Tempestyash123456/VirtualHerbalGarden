import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import doodleImage from '../vite.svg';

const faqs = [
  {
    question: 'How do I explore plants?',
    answer:
      'You can explore plants by browsing the categories or using the search bar to find specific plants.',
  },
  {
    question: 'How do I view plant details?',
    answer:
      'Click on any plant card to view detailed information about the plant, including its botanical name, common names, habitat, medicinal uses, and more.',
  },
  {
    question: 'How do I use the plant scanner?',
    answer:
      'Click on the camera icon in the header to open the plant scanner. Position a plant in the frame and click "Scan" to identify the plant.',
  },
  {
    question: 'How do I add a new plant?',
    answer:
      'If you are an admin, click on the plus icon in the header to open the add plant form. Fill in the details and submit to add a new plant.',
  },
  {
    question: 'How do I switch between light and dark mode?',
    answer:
      'Click on the sun/moon icon in the header to toggle between light and dark mode.',
  },
];

const steps = [
  {
    title: 'Welcome to the Virtual Herbal Garden!',
    content:
      "Let's take a quick tour to get you familiar with the features of our garden.",
  },
  {
    title: 'Explore Plants',
    content:
      'Here you can explore various medicinal plants, learn about their uses, and much more.',
  },
  {
    title: 'Plant Categories',
    content:
      'Use the category menu to filter plants by their categories such as Ayurvedic, Immunity Boosters, Drugs, and Miscellaneous.',
  },
  {
    title: 'Search Plants',
    content:
      'Use the search bar to quickly find plants by their name or other attributes.',
  },
  {
    title: 'Plant Details',
    content:
      'Click on any plant card to view detailed information about the plant, including its botanical name, common names, habitat, medicinal uses, and more.',
  },
  {
    title: '3D Plant Models',
    content:
      'View detailed 3D models of plants to examine their structure and identifying features.',
  },
  {
    title: 'Community Forum',
    content:
      'Join our community forum to share your experiences, ask questions, and connect with other herbal enthusiasts.',
  },
  {
    title: 'Admin Features',
    content:
      'If you are an admin, you can add new plants to the garden and manage existing ones.',
  },
];

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'tour' | 'faq'>('tour');
  const [currentFaq, setCurrentFaq] = useState(0);

  const handleNext = () => {
    if (activeTab === 'tour') {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    } else if (activeTab === 'faq') {
      setCurrentFaq((prevFaq) => (prevFaq + 1) % faqs.length);
    }
  };

  const handlePrevious = () => {
    if (activeTab === 'tour') {
      setCurrentStep(
        (prevStep) => (prevStep - 1 + steps.length) % steps.length
      );
    } else if (activeTab === 'faq') {
      setCurrentFaq((prevFaq) => (prevFaq - 1 + faqs.length) % faqs.length);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-colors z-50"
        title="Assistant"
      >
        <HelpCircle size={24} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="fixed inset-x-0 bottom-0 bg-gray-900 text-gray-100 rounded-t-lg shadow-lg p-6 max-w-lg w-full mx-auto overflow-y-auto max-h-[80vh]"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setActiveTab('tour')}
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === 'tour'
                  ? 'bg-gray-800 text-emerald-400'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              Tour Guide
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === 'faq'
                  ? 'bg-gray-800 text-emerald-400'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              FAQs
            </button>
          </div>

          <div className="overflow-y-auto max-h-[60vh]">
            {activeTab === 'tour' ? (
              <div>
                <img
                  src={doodleImage}
                  alt="Doodle"
                  className="w-20 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-emerald-400">
                  {steps[currentStep].title}
                </h2>
                <p className="mt-2 text-gray-200">
                  {steps[currentStep].content}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-emerald-400">
                  {faqs[currentFaq].question}
                </h3>
                <p className="text-gray-200 mt-2">{faqs[currentFaq].answer}</p>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                className="bg-gray-600 text-gray-300 px-4 py-2 rounded hover:bg-gray-500 transition-colors"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Assistant;
