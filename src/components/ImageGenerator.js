import React, { useState } from 'react';
import axios from 'axios';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading screen while waiting for response
    setError(null); // Clear any previous error

    const options = {
      method: 'POST',
      url: 'https://openai80.p.rapidapi.com/images/generations',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'bb438b10afmshd734efc47e0394dp11e7a8jsn641bc21f219f',
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
      },
      data: {
        prompt: prompt,
        n: 2,
        size: '1024x1024'
      },
      timeout: 30000, // Set a timeout of 30 seconds (adjust as needed)
    };

    try {
      const response = await axios.request(options);
      setImages(response.data); // Assuming the API response contains image data
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching the data.'); // Set the error message
    } finally {
      setLoading(false); // Hide loading screen after the response is received
    }
  };

  return (
    <div>
      <h1>OpenAI Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Generate Images</button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          {images.map((image, index) => (
            <img key={index} src={image.url} alt={`Generated Image ${index}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGenerator;
