import { useState, useEffect } from 'react';
import PasswordCard from '../components/PasswordCard';
import SuccessMessage from '../components/SuccessMessage';
import api from '../services/api.js';
import decodePassword from '../services/decodePassword'; // Import the decode function
import '../styles/homepage.css'; // Ensure this file is created or updated
import '../styles/hint.css'; // New CSS file for hint styles

const HomePage = () => {
  const [saltedPassword, setSaltedPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [progress, setProgress] = useState(0); // Progress state
  const [showCard, setShowCard] = useState(false); // State to control card visibility
  const [hintCount, setHintCount] = useState(0); // Count of hints used
  const [hints, setHints] = useState([]); // Array to store hints
  const [hintMessage, setHintMessage] = useState(''); // Hint message
  const [showHintCard, setShowHintCard] = useState(false); // State to control hint card visibility
  const [hintCardClass, setHintCardClass] = useState(''); // Class for hint card animation

  useEffect(() => {
    const fetchSaltedPassword = async () => {
      setLoading(true); // Set loading to true when fetching
      setProgress(0); // Reset progress
      try {
        const { data } = await api.getSaltedPassword();
        setSaltedPassword(data.saltedPassword);
        console.log(data.saltedPassword); // Log the fetched salted password
        
        // Generate hints based on the salted password
        const decryptedPassword = decodePassword(data.saltedPassword);
        setHints(generateHints(decryptedPassword));
      } catch (error) {
        console.error('Error fetching salted password:', error);
      } finally {
        // Simulate loading progress
        const totalDuration = 1800; // Total duration for loading in milliseconds
        const intervalTime = 5; // Update interval in milliseconds
        const totalSteps = totalDuration / intervalTime; // Total steps for the animation
        const increment = 100 / totalSteps; // Increment for each step

        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setLoading(false); // Set loading to false when complete
              setShowCard(true); // Show the card after loading is complete
              return 100;
            }
            return prev + increment; // Increase progress smoothly
          });
        }, intervalTime); // Adjust interval time as needed
      }
    };

    fetchSaltedPassword();
  }, []);

  const generateHints = (decryptedPassword) => {
    const hints = [];
    
    // Generate hints based on the decrypted password
    if (decryptedPassword.length >= 2) {
      hints.push(`Hint: The first two characters of the decoded password are "${decryptedPassword.slice(0, 2)}".`);
    }
    if (decryptedPassword.length >= 4) {
      hints.push(`Hint: The first four characters of the decoded password are "${decryptedPassword.slice(0, 4)}".`);
    }
    if (decryptedPassword.length >= 6) {
      hints.push(`Hint: The first six characters of the decoded password are "${decryptedPassword.slice(0, 6)}".`);
    }

    return hints;
  };

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleHintClick = () => {
    if (hintCount < 3) {
      setHintCount(hintCount + 1);
      setHintMessage(hints[hintCount]); // Display the hint corresponding to the hint count
    } else {
      setHintMessage('You have used all your hints.'); // Message when all hints are used
    }
    setShowHintCard(true); // Show the hint card
    setHintCardClass('show'); // Add animation class for showing the card
  };

  const closeHintCard = () => {
    setShowHintCard(false); // Close the hint card
    setHintMessage(''); // Clear hint message
    setHintCardClass(''); // Reset animation class
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="page-title">Tech Shuttle 🚀 Event</h1>
      </header>
      <div className="hint-container">
        <button 
          className={`hint-button ${hintCount >= 3 ? 'disabled' : ''}`} 
          onClick={handleHintClick} 
        >
          💡
        </button>
        {showHintCard && (
          <div className={`hint-card ${hintCardClass}`}>
            <button className="close-button" onClick={closeHintCard}>✖️</button>
            <h3>Hints</h3>
            <p>{hintMessage}</p>
            <p>Remaining hints: {3 - hintCount}</p>
          </div>
        )}
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
      ) : success ? (
        <SuccessMessage />
      ) : showCard ? ( // Only show the card if loading is complete
        <PasswordCard saltedPassword={saltedPassword} onSuccess={handleSuccess} />
      ) : null} {/* Prevent rendering before the card is ready */}
    </div>
  );
};

export default HomePage;