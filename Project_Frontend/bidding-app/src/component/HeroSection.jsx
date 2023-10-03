import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import HomeImage from './Homejpeg.jpeg';

export default function HeroSection() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <motion.h1
          className="text-[4rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-red-500"
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.9 }}
        >
          DREAM DEAL
          <span>
            <Typewriter
              words={[]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </motion.h1>
        <p>Start your dream deal here...</p>
      </div>
      <img src={HomeImage} alt="Home" className="mt-10" />
    </div>
  );
}