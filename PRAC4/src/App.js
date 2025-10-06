import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div style={styles.container}>
      <h1 style={styles.count}>Count: {count}</h1>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => setCount(0)}>Reset</button>
        <button style={styles.button} onClick={() => setCount(count + 1)}>Increment</button>
        <button style={styles.button} onClick={() => setCount(count - 1)}>Decrement</button>
        <button style={styles.button} onClick={() => setCount(count + 5)}>Increment by 5</button>
      </div>

      <h2 style={styles.h2}>Welcome to CHARUSAT!</h2>
      <br />
      <div style={styles.inputGroup}>
        <label>First Name: </label>
        <input
          style={styles.input}
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br /><br />
        <label>Last Name: </label>
        <input
          style={styles.input}
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <h3 style={styles.output}>First Name: {firstName}</h3>
      <h3 style={styles.output}>Last Name: {lastName}</h3>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0f0f0',
    border: '2px solid #ccc',
    margin: '20px',
    padding: '40px',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
  },
  count: {
    marginBottom: '20px',
  },
  buttonGroup: {
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    backgroundColor: 'white',
    padding: '10px',
    fontSize: '15px',
    color: 'black',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
  },
h2: {
  backgroundColor: 'white',
  display: 'inline-block',
  marginTop: '40px',
  padding: '10px 20px',
  fontSize: '50px',
  fontFamily: 'Segoe UI, sans-serif',
  border: '3px solid #ccc',
  boxShadow: '0px 4px 6px rgba(0,0,0,0.8)',
  color: 'grey',
  borderRadius: '8px',
},

  inputGroup: {
    display: 'inline-block',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    border: '3px solid #ccc',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  input: {
    width: '200px',
    padding: '5px',
    marginTop: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  output: {
    marginTop: '30px',
  }
};

export default App;
