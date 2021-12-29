import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import editLogo from '../../img/edit.svg';
import closeLogo from '../../img/close.svg';
import './Home.scss';

const Home = ({ allTasks, setTask, setEditFlag, setCurrentValue}) => {
  const [ valueInput, setValueInput ] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:5000/allTasks')
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

  allTasks.sort((a, b) => b.isCheck > a.isCheck ? -1 : b.isCheck < a.isCheck ? 1 : 0 );

  const onChangeCheckbox = async (index) => {
    const { _id, isCheck } = allTasks[index];

    await axios.patch('http://localhost:5000/updateTask', {
      _id,
      isCheck: !isCheck
    }).then((res) => setTask([...res.data.data]));
  }

  const onDeleteTask = async (index) => {
    await axios.delete(`http://localhost:5000/deleteTask?_id=${allTasks[index]._id}`)
      .then(res => setTask([...res.data.data]));
  }

  const editClick = (index, text) => {
    setEditFlag(index);
    setCurrentValue(text);
    history.push(`/edit/:${allTasks[index]._id}`);
  }

  return (
    <div className="App">
      <header className="main_navigation">
        <h1>To-Do List</h1>
				<div className="input_block">
					<input type="text" id="add_task" value={valueInput} onChange={(e) => onChangeInput(e)} />
					<button onClick={() => onClickButton()}>Добавить задачу</button>
				</div>
      </header>
      {allTasks.map((item, index) => <div key={`task-${index}`} className='task_container'>
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
          {!item.isCheck && <img
            onClick={() => {editClick(index, item.text)}}
            src={editLogo}
            alt='editLogo'
            />}
          <img
            onClick={() => onDeleteTask(index)}
            src={closeLogo}
            alt='closeLogo'
            />
        </div>
      </div>
      )}
    </div>
  )
}

export default Home;