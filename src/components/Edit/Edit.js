import React, { useState } from "react";
import axios from 'axios';
import doneLogo from '../../img/done.svg';
import backLogo from '../../img/back.svg';
import './Edit.scss';

const Edit = (props) => {
  const { item, index, setTask, setEditFlag } = props;
  const { _id, text} = item
  const [ valueEditInput, setValueEditInput ] = useState(text);

  const onChangeEditInput = (e) => {
    setValueEditInput(e.target.value);
  }

  const onChangeTask = async (index) => {
    setEditFlag('');

    await axios.patch('http://localhost:5000/updateTask', {
      _id,
      text: valueEditInput
    }).then(res => setTask(res.data.data))
  }

  const closeTask = () => {
    setEditFlag('');
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
          onClick={() => onChangeTask(index, valueEditInput)}
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