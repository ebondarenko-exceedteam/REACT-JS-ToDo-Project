import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import editLogo from './img/edit.svg';
import closeLogo from './img/close.svg';
import doneLogo from './img/done.svg';
import backLogo from './img/back.svg';

function App() {
  const [allTasks, setTask] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const [valueEditInput, setValueEditInput] = useState('');
  

  useEffect(async () => {
    await axios.get('http://localhost:5000/allTasks')
      .then(res => setTask(res.data.data))
  }, [])

  const onClickButton = async () => {
    await axios.post('http://localhost:5000/createTask', {
      text: valueInput,
			isCheck: false
    }).then(res => setTask(res.data.data))
  }

  const onChangeInput = (e) => {
    setValueInput(e.target.value);
  }

  const onChangeEditInput = (e) => {
    setValueEditInput(e.target.value);
  }

  const onChangeCheckbox = async (index) => {
    let { _id, isCheck } = allTasks[index];
    isCheck = !isCheck;

    await axios.patch('http://localhost:5000/updateTask', {
      _id,
      isCheck
    }).then(res => setTask(res.data.data))
  }

  const onDeleteTask = async (index) => {
    await axios.delete(`http://localhost:5000/deleteTask?_id=${allTasks[index]._id}`)
      .then(res => setTask(res.data.data))
  }

  const onEditTask = (index) => {
    let { text } = allTasks[index];
    
    setEditFlag(index);
    setValueEditInput(text); 
  }

  const onChangeTask = async (index) => {
    let { _id } = allTasks[index];
    setEditFlag('');

    await axios.patch('http://localhost:5000/updateTask', {
      _id,
      text: valueEditInput
    }).then(res => setTask(res.data.data))
  }

  const closeTask = () => {
    setEditFlag('');
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
            ? <div key={`task-${index}`} className='task_container'>
                <div className='task_value'>
                  <input
                    onChange={() => onChangeCheckbox(index)}
                    type='checkbox'
                    className='task_value_checkbox'
                    checked={item.isCheck}
                  />
                  <p className={item.isCheck ? 'task_value_text_done' : 'task_value_text'}>{item.text}</p>
                </div>
                <div className='task_button'>
                  {!item.isCheck && <img onClick={() => onEditTask(index)} src={editLogo} />}
                  <img onClick={() => onDeleteTask(index)} src={closeLogo} />
                </div>
              </div>
            : <div key={`task-${index}`} className='task_container'>
                <div className='task_value'>
                  <input
                    onChange={(e) => onChangeEditInput(e)}
                    type='text'
                    className='task_input_edit'
                    value={valueEditInput}
                  />
                </div>
                <div className='task_button'>
                  <img onClick={() => onChangeTask(index)} src={doneLogo} />
                  <img onClick={() => closeTask()} src={backLogo} />
                </div>
              </div>
          )
        }
    </div>
  );
}

export default App;
