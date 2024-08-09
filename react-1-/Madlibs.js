import React, { useState } from 'react';
import MadLibForm from './MadLibForm';
import MadLibStory from './MadLibStory';

function MadLibs() {
  const [storyData, setStoryData] = useState(null);

  const handleSubmit = (data) => {
    setStoryData(data);
  };

  const handleReset = () => {
    setStoryData(null);
  };

  return (
    <div>
      <h1>React MadLibs Game</h1>
      {storyData ? (
        <MadLibStory data={storyData} onReset={handleReset} />
      ) : (
        <MadLibForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default MadLibs;
