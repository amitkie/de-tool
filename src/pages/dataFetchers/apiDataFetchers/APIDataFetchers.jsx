import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './APIDataFetchers.css';

const APIDataFetchers = () => {
  const { dataFetcher } = useParams(); // Extract route parameter
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/home");
  };

  const mockData = {
    email: 'amit',
    password: '123456'
  }
  const twitterScrapperUrl = 'https://5848-202-78-234-178.ngrok-free.app/status';
  const mockScrapDataForTwitter = {
    "brand_handles": ["@PUMA"],
    "start_date": "2024-05-01",
    "end_date": "2024-07-20",
    "scraping_type": "Comment"
}

  // Define the data based on your routes
  const data = {
    "page-speed-insights": {
      title: "Page Speed Insights",
      src: "https://didactic-memory-x5w97559pv6p255g-8501.app.github.dev/",
    },
    "facebook-insights": {
      title: "Facebook Insights",
      src: "https://didactic-memory-x5w97559pv6p255g-8502.app.github.dev/", // Update with the correct URL
    },
    "google-insights": {
      title: "Google Analytics",
      src: "https://didactic-memory-x5w97559pv6p255g-8503.app.github.dev/", // Update with the correct URL
    },
    "google-ads": {
      title: "Google Ads",
      src: "https://didactic-memory-x5w97559pv6p255g-8504.app.github.dev/", // Update with the correct URL
    },
    "dv-360": {
      title: "DV360",
      src: "https://didactic-memory-x5w97559pv6p255g-8505.app.github.dev/", // Update with the correct URL
    },
  };

  const currentData = data[dataFetcher] || { title: "Not Found", src: "" };

  return (
    <div className="page-speed-insights">
      <h1>{currentData.title}</h1>
      <iframe
        src={currentData.src}
        title={currentData.title}
        className="iframe"
      />
      <button onClick={handleNavigateHome} className="save-button btn">Return to Home</button>
    </div>
  );
};

export default APIDataFetchers;
