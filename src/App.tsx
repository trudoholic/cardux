import React from 'react';
import BasicCard from './BasicCard';
import { Counter } from './features/counter/Counter';
import './App.css';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BasicCard />
        <Button variant="contained">Hello World</Button>
        <Button color="primary">Hello World</Button>
        <Counter />
      </header>
    </div>
  );
}

export default App;
