"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building } from 'lucide-react';
import { SignedOut, SignOutButton } from '@clerk/nextjs';

const Page = () => {
  const [selectedType, setSelectedType] = useState<'user' | 'organization' | null>(null);

  const userTypes = [
    {
      type: 'user' as const,
      title: 'Individual',
      description: 'Personal account for individual use',
      icon: Users,
      background: 'bg-gradient-to-br from-blue-500 to-purple-600',
      iconBackground: 'bg-blue-600',
      textColor: 'text-blue-600'
    },
    {
      type: 'organization' as const,
      title: 'Business',
      description: 'Account for business or team',
      icon: Building,
      background: 'bg-gradient-to-br from-green-500 to-teal-600',
      iconBackground: 'bg-green-600',
      textColor: 'text-green-600'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Sign Out Button */}
      <div className="fixed bottom-4 right-4">
          <SignOutButton>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition">
              Sign Out
            </button>
          </SignOutButton>
        
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex"
      >
        {/* Left Side - Descriptive Section */}
        <div className="w-1/2 bg-gray-50 p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Choose Your Account Type</h1>
          <p className="text-gray-600 mb-8 text-lg">Select the account type that best fits your needs. Whether you're an individual or a business, we've got you covered.</p>
          
          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300"
                style={{
                  background: selectedType === 'user' 
                    ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)' 
                    : 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'
                }}
                onClick={() => {
                  console.log(`Navigating to ${selectedType} dashboard`);
                }}
              >
                Continue to {selectedType === 'user' ? 'Individual' : 'Business'} Dashboard
              </button>
            </motion.div>
          )}
        </div>
        
        {/* Right Side - User Type Selection */}
        <div className="w-1/2 p-12 flex space-x-6">
          {userTypes.map((type) => (
            <motion.div
              key={type.type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(type.type)}
              className={`
                flex-1 p-6 rounded-2xl text-center cursor-pointer transition-all duration-300 relative
                ${selectedType === type.type 
                  ? `${type.background} text-white shadow-2xl` 
                  : 'bg-white border border-gray-200 text-gray-700 hover:shadow-xl'}
              `}
            >
              {/* Icon Background */}
              <div className={`
                mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center
                ${selectedType === type.type 
                  ? 'bg-white/20' 
                  : type.iconBackground + ' bg-opacity-10'}
              `}>
                <type.icon 
                  size={48} 
                  className={selectedType === type.type ? 'text-white' : type.textColor}
                />
              </div>
              
              <h2 className="text-2xl font-bold mb-3">{type.title}</h2>
              <p className={`
                text-sm opacity-70
                ${selectedType === type.type ? 'text-white/80' : 'text-gray-500'}
              `}>
                {type.description}
              </p>
              
              {/* Selection Indicator */}
              {selectedType === type.type && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className={`w-4 h-4 ${type.textColor}`}
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
