import React from 'react';
import './App.css';
// import Button from '@mui/material/Button';
// import AltCard from './AltCard';
// import BasicCard from './BasicCard';
// import { Counter } from './features/counter/Counter';
// import Todos from './features/todo/Todo';
import GameTable from "./features/gametable/GameTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameTable />
        {/*<Todos />*/}
        {/*<AltCard />*/}
        {/*<BasicCard />*/}
        {/*<Button variant="contained">Hello World</Button>*/}
        {/*<Button color="primary">Hello World</Button>*/}
        {/*<Counter />*/}
      </header>
    </div>
  );
}

export default App;
