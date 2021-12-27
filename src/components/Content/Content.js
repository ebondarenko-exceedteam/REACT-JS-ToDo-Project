import React from "react";
import editLogo from '../../img/edit.svg';
import closeLogo from '../../img/close.svg';
import './Content.scss';

const Content = (props) => {
  const {item, index} = props;

  return (
    <div key={`task-${index}`} className='task_container'>
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

export default Content;