import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [expirationTime, setExpirationTime] = useState(1);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTimeChange = (e) => {
    setExpirationTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('expirationTime', expirationTime);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data.url);
      e.target.reset(); // Clear the input field
      setFile(null); // Clear the file state
    } catch (error) {
      console.error('Error uploading file', error);
      setResult('Error uploading file');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result).then(() => {
      alert('Link copied to clipboard');
    });
  };

  return (
    <div className="container">
      <h1>AzureShare - File Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <label>
          Link Expiration (hours):
          <input
            type="number"
            value={expirationTime}
            onChange={handleTimeChange}
            min="1"
            max="24"
            required
          />
        </label>
        <button type="submit">Upload</button>
      </form>
      {result && (
        <div id="result">
          File uploaded. Share this link: <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

export default App;
