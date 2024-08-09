import React, { useState } from 'react';

function MadLibForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    noun: '',
    verb: '',
    adjective: '',
    place: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Noun:
        <input name="noun" value={formData.noun} onChange={handleChange} />
      </label>
      <br />
      <label>Verb:
        <input name="verb" value={formData.verb} onChange={handleChange} />
      </label>
      <br />
      <label>Adjective:
        <input name="adjective" value={formData.adjective} onChange={handleChange} />
      </label>
      <br />
      <label>Place:
        <input name="place" value={formData.place} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Create Story</button>
    </form>
  );
}

export default MadLibForm;
