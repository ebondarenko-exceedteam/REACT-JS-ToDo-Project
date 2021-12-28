import React from "react";
import axios from 'axios';
import editLogo from '../../img/edit.svg';
import closeLogo from '../../img/close.svg';
import './Content.scss';

const Content = (props) => {
  const { item, index, setTask, setEditFlag } = props;
  const { _id, isCheck, text } = item;

  const onChangeCheckbox = async () => {
    await axios.patch('http://localhost:5000/updateTask', {
      _id,
      isCheck: !isCheck
    }).then((res) => setTask([...res.data.data]))
  }

  const onDeleteTask = async () => {
    await axios.delete(`http://localhost:5000/deleteTask?_id=${_id}`)
      .then(res => setTask([...res.data.data]))
  }

  return (
    <div className='task_container'>
      <div className='task_value'>
        <input
          onChange={() => onChangeCheckbox()}
          type='checkbox'
          className='task_value_checkbox'
          checked={isCheck}
        />
        <p className={isCheck ? 'task_value_text_done' : 'task_value_text'}>{text}</p>
      </div>
      <div className='task_button'>
        {!isCheck && <img
          onClick={() => setEditFlag(index)}
          src={editLogo}
          alt='editLogo'
          />}
        <img
          onClick={() => onDeleteTask()}
          src={closeLogo}
          alt='closeLogo'
          />
      </div>
    </div>
  )
}

export default Content;