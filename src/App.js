import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Edit from './components/Edit/Edit';
import './App.scss';

function App() {
  const [ editFlag, setEditFlag ] = useState('');
  const [ currentValue, setCurrentValue ] = useState('');
  const [ allTasks, setTask ] = useState([]);

  return (
    <div>
      <Switch>
        <Route path='/home'>
          <Home
            allTasks={allTasks}
            setTask={setTask}
            setEditFlag={setEditFlag}
            setCurrentValue={setCurrentValue}
            />
        </Route>
        <Route path='/edit:_id'>
          <Edit
            allTasks={allTasks}
            setTask={setTask}
            editFlag={editFlag}
            setEditFlag={setEditFlag}
            currentValue={currentValue}
          />
        </Route>
        
        <Redirect from='/' to='/home' />
      </Switch>  
    </div>
  );
}

export default App;