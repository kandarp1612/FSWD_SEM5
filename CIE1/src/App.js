import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [time, setTime] = useState(new Date());
  const [feedbackCounts, setFeedbackCounts] = useState({
    Excellent: 0,
    Good: 0,
    Average: 0,
    Poor: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['Excellent', 'Good', 'Average', 'Poor'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      setFeedbackCounts(prev => ({
        ...prev,
        [randomType]: prev[randomType] + 1
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = (type) => {
    setFeedbackCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };


  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div></div>
        <div style={styles.clock}>{time.toLocaleTimeString()}</div>
      </div>

      <div style={styles.inputGroup}>
        <div style={styles.row}>
          <label>First Name:</label>
          <input
            style={styles.input}
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div style={styles.row}>
          <label>Surname:</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Surname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <h3 style={styles.output}>WELCOME, {firstName} {lastName} !</h3>


      <h2 style={styles.heading}>Submission Counter: {count}</h2>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => setCount(0)}>Reset</button>
        <button style={styles.button} onClick={() => setCount(count + 1)}>Increment</button>
        <button style={styles.button} onClick={() => setCount(count - 1)}>Decrement</button>
        <button style={styles.button} onClick={() => setCount(count + 5)}>Increment by 5</button>
      </div>

      <h2 style={styles.heading}>Rate the Session</h2>
      <div style={styles.buttonGroup}>
        {['Excellent', 'Good', 'Average', 'Poor'].map(type => (
          <button key={type} style={styles.button} onClick={() => handleVote(type)}>{type}</button>
        ))}
      </div>

      <div style={styles.feedbackDisplay}>
        {Object.entries(feedbackCounts).map(([type, val]) => (
          <p key={type} style={styles.feedbackItem}>{type}: {val}</p>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#grey',
    margin: '50px',
    padding: '40px',
    border: '1px solid black',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.7)'
  },
  header: {
    display: 'flex',
    marginBottom: '20px',
  },
  clock: {
    fontSize: '20px',
    color: 'black',
    fontWeight: 'bold'
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginBottom: '50px'
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  input: {
    width: '180px',
    padding: '8px',
    marginTop: '6px',
    border: '1px solid black',
    fontSize: '14px'
  },
  output: {
    marginTop: '10px',
    fontSize: '25px',
    color: 'black'
  },
  heading: {
    marginTop: '50px',
    fontSize: '22px',
    color: '#333'
  },
  buttonGroup: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  button: {
    backgroundColor: 'grey',
    padding: '10px',
    fontSize: '14px',
    color: 'white',
    cursor: 'pointer',
  },
  feedbackDisplay: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px'
  },
  feedbackItem: {
    fontFamily: 'Verdana',
    backgroundColor: '#fff',
    border: '1px solid black',
    padding: '10px 20px',
    borderRadius: '3px',
    fontSize: '16px'
  }
};

export default App;
