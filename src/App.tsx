import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [humilityScore, setHumilityScore] = useState(5);
  const [superheroes, setSuperheroes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/superheroes').then((res) => setSuperheroes(res.data));
  }, []);

  const addSuperhero = async () => {
    await axios.post('http://localhost:5000/superheroes', { name, superpower, humilityScore });
    const res = await axios.get('http://localhost:5000/superheroes');
    setSuperheroes(res.data);
  };

  return (
    <div>
      <h1>Humble Superheroes</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={superpower} onChange={(e) => setSuperpower(e.target.value)} placeholder="Superpower" />
      <input type="number" value={humilityScore} min="1" max="10" onChange={(e) => setHumilityScore(Number(e.target.value))} />
      <button onClick={addSuperhero}>Add Superhero</button>

      <h2>Leaderboard</h2>
      <ul>
        {superheroes.map((hero) => (
          <li key={hero.name}>{hero.name} ({hero.humilityScore})</li>
        ))}
      </ul>
    </div>
  );
}