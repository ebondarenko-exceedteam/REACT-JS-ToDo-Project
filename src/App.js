import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Content from './components/Content/Content';
import Edit from './components/Edit/Edit';

function App() {
  const [ allTasks, setTask ] = useState([]);
  const [ editFlag, setEditFlag ] = useState(false);
  const [ valueInput, setValueInput ] = useState('');

  useEffect(async () => {
    await axios.get('http://localhost:5000/allTasks')
      .then(res => setTask(res.data.data))
  }, [])

  const onClickButton = async () => {
    await axios.post('http://localhost:5000/createTask', {
      text: valueInput,
			isCheck: false
    }).then(res => setTask(res.data.data))
    setValueInput('');
  }

  const onChangeInput = (e) => {
    setValueInput(e.target.value);
  }

  allTasks.sort((a, b) =>
		b.isCheck > a.isCheck ? -1 : b.isCheck < a.isCheck ? 1 : 0
	);

  return (
    <div className="App">
      <header className="main_navigation">
        <h1>To-Do List</h1>
				<div className="input_block">
					<input type="text" id="add_task" value={valueInput} onChange={(e) => onChangeInput(e)} />
					<button onClick={() => onClickButton()}>Добавить задачу</button>
				</div>
      </header>
      {allTasks.map((item, index) => 
          index !== editFlag
            ? <Content
                key={`task-${index}`} 
                item={item}
                index={index}
                setEditFlag={setEditFlag}
                setTask={setTask}
              />
            : <Edit
                key={`task-${index}`}
                item={item}

                setTask={setTask}
                setEditFlag={setEditFlag}
                index={index}
              />
          )
        }
    </div>
  );
}

export default App;
