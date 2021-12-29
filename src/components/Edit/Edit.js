import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import doneLogo from '../../img/done.svg';
import backLogo from '../../img/back.svg';
import './Edit.scss';

const Edit = ({ allTasks, setTask, editFlag, currentValue, setEditFlag}) => {
  const [ valueEditInput, setValueEditInput ] = useState(currentValue);
  const history = useHistory();

  const onChangeEditInput = (e) => {
    setValueEditInput(e.target.value);
  }

  const onChangeTask = () => {
    axios.patch('http://localhost:5000/updateTask', {
      _id: allTasks[editFlag]._id,
      text: valueEditInput
    }).then(res => setTask(res.data.data));
    history.push('/home');
  }

  const closeTask = () => {
    setEditFlag('');
    history.push('/home');
  }

  return (
    <div className='task_container'>
      <div className='task_value'>
        <input
          onChange={(e) => onChangeEditInput(e)}
          type='text'
          className='task_input_edit'
          value={valueEditInput}
        />
      </div>
      <div className='task_button'>
        <img
          onClick={() => onChangeTask()}
          src={doneLogo}
          alt='doneLogo'
        />
        <img
          onClick={() => closeTask()}
          src={backLogo}
          alt='backLogo'
        />
      </div>
    </div>
  )
}

export default Edit;