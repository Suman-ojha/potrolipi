import axios from 'axios';
import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

// import TaskItem from './TaskItem';
// import classes from '../styles/task.css';


function Todos() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState('');

  const getTasks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/todos/all');
      setTaskList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.length <= 0) {
      toast.error('Task is empty');
      return;
    }
    try {
      const { data } = await axios.post('http://localhost:5000/todos', {
        title: newTask,
      });
      toast.success('New task added');
      setIsAddingNew(false);
      setNewTask('');
      setTaskList([{ ...data }, ...taskList]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      toast.success('Task deleted');
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className='todo_body'>
      <button type='button' className='btn text-success'>Add Todo</button>
    </div>

    {taskList.length > 0 ? (
        <table >
          <tbody>
          <p>Inside the TodoList</p>
            {taskList.map((task,idx) => (
             
              <div key={idx}>
                   <h6>{task}</h6>
                   <p>{task.description}</p>
              </div>
            ))}
          </tbody>
        </table>
      ) : (
        'No Task Found. Create a new task'
      )}
    </>
  );
}

export default Todos;
