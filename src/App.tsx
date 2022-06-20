import React from 'react';
import Todos from './features/todo/Todo';
// import AltCard from './AltCard';
// import BasicCard from './BasicCard';
import { Counter } from './features/counter/Counter';
import './App.css';
// import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Todos />
        {/*<AltCard />*/}
        {/*<BasicCard />*/}
        {/*<Button variant="contained">Hello World</Button>*/}
        {/*<Button color="primary">Hello World</Button>*/}
        <Counter />
      </header>
    </div>
  );
}

export default App;
