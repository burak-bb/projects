// MadLibStory.js
import React from 'react';

function MadLibStory({ data, onReset }) {
  const { noun, verb, adjective, place } = data;

  return (
    <div>
      <p>
        Once upon a time in a {place}, there was a {adjective} {noun} who loved to {verb}.
      </p>
      <button onClick={onReset}>Start Over</button>
    </div>
  );
}

export default MadLibStory;
