// StatsCorner.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import './StatsCorner.css'
const StatsCorner = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [formatType, setFormatType] = useState('test');
  const [category, setCategory] = useState('batsmen');
  useEffect(() => {
    // Check if the user is logged in
    if (user) {
      // Fetch data from the API using the specified parameters
      fetchData(formatType, category); // You can customize the default parameters here
    }
  }, [user,formatType,category]);

  const fetchData = async (formatType, category) => {
    try {
      // Make an API call to fetch data
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/${category}`,
        params: {formatType: formatType},
        headers: {
          'X-RapidAPI-Key': '883d4be953msh491a4bc12419a9cp168e4ejsn2e895db5746c',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };
      const response = await axios.request(options);

      // Update the state with the fetched data
      setData(response.data.rank);
    } catch (error) {
      console.error('Error fetching stats data:', error);
    }
  };

  if (!user) {
    // If the user is not logged in, render a message to log in
    return <p>Please log in to view stats.</p>;
  }

  // If the user is logged in, render the stats data or any other content
  return (
    <div>
      <h1 className="stats-title">Statistics</h1>

{/* Dropdowns for category and formatType */}
<div className="dropdowns">
  <label htmlFor="category">Category:</label>
  <select
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="batsmen">Batsmen</option>
    <option value="bowlers">Bowlers</option>
    <option value="allrounders">Allrounders</option>
    <option value="teams">Teams</option>
  </select>

  <label htmlFor="formatType">Format Type:</label>
  <select
    id="formatType"
    value={formatType}
    onChange={(e) => setFormatType(e.target.value)}
  >
    <option value="test">Test</option>
    <option value="odi">ODI</option>
    <option value="t20">T20</option>
  </select>
</div>
      {data ? (
      // Render the fetched data here
      <table className="stats-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.country}</td>
              <td>{player.rank}</td>
            </tr>
          ))}
        </tbody>
      </table>  
    ) : (
        // Render loading or placeholder content
        <p>Loading stats data...</p>
      )}
    </div>
  );
};

export default StatsCorner;
