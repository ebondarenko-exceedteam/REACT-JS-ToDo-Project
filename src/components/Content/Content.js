import React from "react";
import editLogo from '../../img/edit.svg';
import closeLogo from '../../img/done.svg';

const Content = (props) => {
  return (
    <div key className='task_container'>
      <div className='task_value'>
        <input type='checkbox' className='task_value_checkbox' />
        <p className='task_value_text'></p>
      </div>
      <div className='task_button'>
        <img src={editLogo} />
        <img src={closeLogo} />
      </div>
    </div>
  )
}

export default Content;