import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="App">
      <Leaderboard />
    </div>
  );
}

export default App;
