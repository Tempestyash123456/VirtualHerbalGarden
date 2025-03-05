import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  MessageSquare,
  Camera as Camera3d,
  BookOpen,
  Send,
  Bold,
  Italic,
  List,
  AlignCenter,
  Image as ImageIcon,
} from 'lucide-react';
import { fetchForumMessages, addForumMessage } from '../services/forumService';
import type { ForumMessage } from '../types/forum';

interface LandingPageProps {
  onEnter: () => void;
  isDarkMode: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, isDarkMode }) => {
  const [activeSection, setActiveSection] = useState<'main' | 'about' | 'forum'>('main');
  const [forumMessages, setForumMessages] = useState<ForumMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isAlignCenter, setIsAlignCenter] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch forum messages when forum section is active
  useEffect(() => {
    const loadMessages = async () => {
      if (activeSection === 'forum') {
        setIsLoading(true);
        try {
          const messages = await fetchForumMessages();
          setForumMessages(messages);
        } catch (error) {
          console.error('Error loading forum messages:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadMessages();
  }, [activeSection]);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !newAuthor.trim()) return;

    setIsLoading(true);
    try {
      const message = {
        author: newAuthor,
        content: newMessage,
        isBold,
        isItalic,
        isAlignCenter,
        hasImage: hasImage && !!imageUrl,
        imageUrl: hasImage ? imageUrl : undefined
      };

      const newMessageData = await addForumMessage(message);
      if (newMessageData) {
        setForumMessages(prev => [newMessageData, ...prev]);
        setNewMessage('');
        setIsBold(false);
        setIsItalic(false);
        setIsAlignCenter(false);
        setHasImage(false);
        setImageUrl('');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMainSection = () => (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg"
        >
          <Leaf className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center"
        >
          <Leaf className="w-6 h-6 text-white transform rotate-45" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center"
        >
          <Leaf className="w-5 h-5 text-white transform -rotate-45" />
        </motion.div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className={`text-4xl md:text-6xl font-bold mt-8 text-center ${
          isDarkMode ? 'text-white' : 'text-emerald-800'
        }`}
      >
        Virtual Herbal Garden
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className={`text-lg md:text-xl mt-4 text-center max-w-md px-4 ${
          isDarkMode ? 'text-gray-300' : 'text-emerald-700'
        }`}
      >
        Explore the world of medicinal plants and their healing properties
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-4 mt-8"
      >
        <button
          onClick={onEnter}
          className={`px-8 py-3 rounded-full text-lg font-semibold shadow-lg ${
            isDarkMode
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          } transition-colors duration-200`}
        >
          Enter Garden
        </button>

        <button
          onClick={() => setActiveSection('about')}
          className={`px-8 py-3 rounded-full text-lg font-semibold shadow-lg ${
            isDarkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
          } transition-colors duration-200`}
        >
          About
        </button>

        <button
          onClick={() => setActiveSection('forum')}
          className={`px-8 py-3 rounded-full text-lg font-semibold shadow-lg ${
            isDarkMode
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
          } transition-colors duration-200`}
        >
          Forum
        </button>
      </motion.div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="min-h-screen py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <button
            onClick={() => setActiveSection('main')}
            className={`mb-8 px-4 py-2 rounded-full text-sm font-medium ${
              isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
            }`}
          >
            ← Back to Home
          </button>

          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-emerald-800'
            }`}
          >
            About Virtual Herbal Garden
          </h2>

          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-emerald-700'
            }`}
          >
            Discover the ancient wisdom of medicinal plants in a modern,
            interactive experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`rounded-xl p-8 text-center ${
              isDarkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-lg'
            }`}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500">
              <Camera3d className="w-10 h-10 text-white" />
            </div>

            <h3
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-emerald-800'
              }`}
            >
              3D Plant Models
            </h3>

            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Explore detailed 3D models of medicinal plants. Rotate, zoom, and
              examine plants from every angle to better understand their
              structure and identifying features.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`rounded-xl p-8 text-center ${
              isDarkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-lg'
            }`}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500">
              <BookOpen className="w-10 h-10 text-white" />
            </div>

            <h3
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-emerald-800'
              }`}
            >
              Comprehensive Database
            </h3>

            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Access detailed information about each plant including botanical
              names, medicinal uses, cultivation tips, and traditional
              applications in various healing systems.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`rounded-xl p-8 text-center ${
              isDarkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-lg'
            }`}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>

            <h3
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-emerald-800'
              }`}
            >
              Community Forum
            </h3>

            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Connect with other herbal enthusiasts, share your experiences, ask
              questions, and learn from a community of plant lovers and
              traditional medicine practitioners.
            </p>
          </motion.div>
        </div>

        <div
          className={`rounded-xl p-8 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}
        >
          <h3
            className={`text-2xl font-bold mb-4 text-center ${
              isDarkMode ? 'text-white' : 'text-emerald-800'
            }`}
          >
            Our Mission
          </h3>

          <p
            className={`text-lg mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            The Virtual Herbal Garden aims to preserve and promote traditional
            plant knowledge in the digital age. By creating an accessible,
            interactive platform, we hope to:
          </p>

          <ul
            className={`list-disc pl-6 mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <li className="mb-2">
              Document and preserve traditional herbal knowledge from various
              cultures
            </li>
            <li className="mb-2">
              Educate people about the medicinal properties of plants
            </li>
            <li className="mb-2">
              Create a community of plant enthusiasts and practitioners
            </li>
            <li className="mb-2">
              Promote sustainable cultivation and ethical harvesting practices
            </li>
          </ul>

          <div className="text-center mt-8">
            <button
              onClick={onEnter}
              className={`px-8 py-3 rounded-full text-lg font-semibold shadow-lg ${
                isDarkMode
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              } transition-colors duration-200`}
            >
              Explore the Garden
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-emerald-100 via-teal-100 to-emerald-200'
      }`}
    >
      {activeSection === 'main' && renderMainSection()}
      {activeSection === 'about' && renderAboutSection()}
      {activeSection === 'forum' && (
        <div className="min-h-screen py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <button
                onClick={() => setActiveSection('main')}
                className={`mb-8 px-4 py-2 rounded-full text-sm font-medium ${
                  isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                }`}
              >
                ← Back to Home
              </button>

              <h2
                className={`text-4xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-emerald-800'
                }`}
              >
                Community Forum
              </h2>

              <p
                className={`text-xl max-w-3xl mx-auto ${
                  isDarkMode ? 'text-gray-300' : 'text-emerald-700'
                }`}
              >
                Share your experiences and connect with other herbal enthusiasts
              </p>
            </div>

            {/* New Message Form */}
            <div
              className={`mb-10 rounded-xl p-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <h3
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-emerald-800'
                }`}
              >
                Post a Message
              </h3>

              <form onSubmit={handleSubmitMessage}>
                <div className="mb-4">
                  <label
                    className={`block mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className={`w-full p-3 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-gray-50 text-gray-900 border-gray-300'
                    } border`}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-2">
                  <label
                    className={`block mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Message
                  </label>
                  <div
                    className={`flex flex-wrap gap-2 mb-2 p-2 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setIsBold(!isBold)}
                      className={`p-2 rounded ${
                        isBold
                          ? 'bg-emerald-500 text-white'
                          : isDarkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Bold size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsItalic(!isItalic)}
                      className={`p-2 rounded ${
                        isItalic
                          ? 'bg-emerald-500 text-white'
                          : isDarkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Italic size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAlignCenter(!isAlignCenter)}
                      className={`p-2 rounded ${
                        isAlignCenter
                          ? 'bg-emerald-500 text-white'
                          : isDarkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      <AlignCenter size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasImage(!hasImage)}
                      className={`p-2 rounded ${
                        hasImage
                          ? 'bg-emerald-500 text-white'
                          : isDarkMode
                          ? 'bg-gray-600 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      <ImageIcon size={18} />
                    </button>
                  </div>

                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className={`w-full p-3 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-gray-50 text-gray-900 border-gray-300'
                    } border ${isBold ? 'font-bold' : ''} ${
                      isItalic ? 'italic' : ''
                    } ${isAlignCenter ? 'text-center' : ''}`}
                    rows={4}
                    placeholder="Share your thoughts, questions, or experiences..."
                    required
                  ></textarea>
                </div>

                {hasImage && (
                  <div className="mb-4">
                    <label
                      className={`block mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className={`w-full p-3 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 text-white border-gray-600'
                          : 'bg-gray-50 text-gray-900 border-gray-300'
                      } border`}
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    />
                    {imageUrl && (
                      <div className="mt-2 max-w-xs mx-auto">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="rounded-lg max-h-40 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="text-right">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : isDarkMode
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    } transition-colors duration-200`}
                  >
                    <div className="flex items-center">
                      <span>{isLoading ? 'Posting...' : 'Post Message'}</span>
                      <Send size={18} className="ml-2" />
                    </div>
                  </button>
                </div>
              </form>
            </div>

            {/* Messages List */}
            <div className="space-y-6">
              {isLoading && forumMessages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
                  <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Loading messages...
                  </p>
                </div>
              ) : forumMessages.length > 0 ? (
                forumMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-xl p-6 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4
                        className={`font-bold ${
                          isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                        }`}
                      >
                        {message.author}
                      </h4>
                      <span
                        className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>

                    <p
                      className={`mb-4 ${message.isBold ? 'font-bold' : ''} ${
                        message.isItalic ? 'italic' : ''
                      } ${message.isAlignCenter ? 'text-center' : ''} ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {message.content}
                    </p>

                    {message.hasImage && message.imageUrl && (
                      <div className="mt-4">
                        <img
                          src={message.imageUrl}
                          alt={`Shared by ${message.author}`}
                          className="rounded-lg max-h-80 object-cover mx-auto"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://via.placeholder.com/600x400?text=Image+Not+Available';
                          }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    No messages yet. Be the first to post!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3 + Math.random() * 0.4,
              scale: 0.5 + Math.random() * 1.5,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [
                null,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              rotate: [
                null,
                Math.random() * 360 + 180,
                Math.random() * 360 + 360,
              ],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className={`absolute w-8 h-8 rounded-full ${
              isDarkMode
                ? 'bg-emerald-900 bg-opacity-20'
                : 'bg-emerald-400 bg-opacity-20'
            }`}
          >
            <Leaf
              className={`w-full h-full ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              } opacity-30`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;