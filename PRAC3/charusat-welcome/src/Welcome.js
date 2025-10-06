import React, { useState, useEffect } from 'react';

function Welcome() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Welcome to CHARUSAT!!!!</h1>
        <h2>It is {currentTime.toLocaleDateString()}</h2>
        <h2>It is {currentTime.toLocaleTimeString()}</h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f0f2f5',
  },
  card: {
    background: '#ffffff',
    padding: '40px 60px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
};

export default Welcome;
