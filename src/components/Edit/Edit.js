import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import doneLogo from '../../img/done.svg';
import backLogo from '../../img/back.svg';
import './Edit.scss';

const Edit = ({ currentValue, setEditFlag}) => {
  const [ valueEditInput, setValueEditInput ] = useState(currentValue);

  const onChangeEditInput = (e) => {
    setValueEditInput(e.target.value);
  }

  const onChangeTask = async () => {
    // await axios.patch('http://localhost:5000/updateTask', {
    //   _id,
    //   text: valueEditInput
    // }).then(res => setTask(res.data.data))
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
        <Link to='/home'><img
          onClick={() => onChangeTask()}
          src={doneLogo}
          alt='doneLogo'
        /></Link>
        <Link to='/home'><img
          onClick={() => closeTask()}
          src={backLogo}
          alt='backLogo'
        /></Link>
      </div>
    </div>
  )
}

export default Edit;