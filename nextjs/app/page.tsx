// pages/index.js
"use client"

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  
  const fetchImage = async () => {
    setError('');
    setImageUrl('');

    if (!url) {
      setError('Please provide a Pinterest URL');
      return;
    }

    try {
      const res = await fetch(`/api/fetch?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (res.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Error fetching the image');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>TitanDownloader - Pinterest Image Downloader</h1>
      <input
        type="text"
        placeholder="Enter Pinterest URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
      />
      <br />
      <button
        onClick={fetchImage}
        style={{
          padding: '10px 20px',
          marginTop: '10px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Fetch Image
      </button>

      {error && <div style={{ color: 'red', marginTop: '20px' }}>{error}</div>}

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Image Preview:</h3>
          <img src={imageUrl} alt="Pinterest Image" style={{ maxWidth: '100%', height: 'auto' }} />
          <br />
          <a
            href={imageUrl}
            download
            style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}
