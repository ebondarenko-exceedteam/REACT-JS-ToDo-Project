import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import editLogo from './img/edit.svg';
import closeLogo from './img/close.svg';

function App() {
  const [allTasks, setTask] = useState([]);
  const [valueInput, setValueInput] = useState('');

  useEffect(async () => {
    await axios.get('http://localhost:5000/allTasks')
      .then(res => setTask(res.data.data))
  })

  const onClickButton = async() => {
    await axios.post('http://localhost:5000/createTask', {
      text: valueInput,
			isCheck: false
    }).then(res => setTask(res.data.data))
  }

  const onChangeInput = (e) => {
    setValueInput(e.target.value);
  }

  return (
    <div className="App">
      <header className="main_navigation">
      <h1>To-Do List</h1>
				<div className="input_block">
					<input type="text" id="add_task" value={valueInput} onChange={onChangeInput} />
					<button onClick={onClickButton}>Добавить задачу</button>
					<button onClick='onClickButtonAll()'>Удалить все задачи</button>
				</div>
        {
          allTasks.map((item, index) => <div key={`task-${index}`} className='task_container'>
              <div className='task_value'>
                <input type='checkbox' className='task_value_checkbox' checked={item.isCheck}/>
                <p className='task_value_text'>{item.text}</p>
              </div>
              <div className='task_button'>
                <img src={editLogo} />
                <img src={closeLogo} />
              </div>
            </div>
            )
        }
    </header>
    </div>
  );
}

export default App;
