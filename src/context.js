import React from 'react';

export const store = {
    allTasks =[],
    editFlag = '',
    setTasks(arr) {
        this.allTasks = arr;
    },
    setEditFlag(value) {
        this.editFlag = value;
    }
}


export const TodoContext = React.createContext(null);