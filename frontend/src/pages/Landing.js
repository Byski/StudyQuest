import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const Landing = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const booksRef = useRef([]);

  useEffect(() => {
    // Animate title
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'
    });

    // Animate subtitle
    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });

    // Animate button
    gsap.from(buttonRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: 0.6,
      ease: 'back.out(1.7)'
    });

    // Floating books animation
    booksRef.current.forEach((book, index) => {
      if (book) {
        gsap.to(book, {
          y: -20,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.2
        });
      }
    });
  }, []);

  const handleStartQuest = () => {
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        navigate('/login');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center relative overflow-hidden">
      {/* Floating books */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (booksRef.current[i] = el)}
            className="absolute text-6xl opacity-20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
          >
            📚
          </div>
        ))}
      </div>

      <div className="text-center z-10 px-4">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg"
        >
          StudyQuest
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-indigo-200 mb-8"
        >
          Level up your learning journey
        </p>
        <button
          ref={buttonRef}
          onClick={handleStartQuest}
          className="px-8 py-4 bg-white text-indigo-900 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transform transition-all hover:scale-105"
        >
          Start Quest
        </button>
      </div>
    </div>
  );
};

export default Landing;

