import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoList from '../component/todolist';
import CompletedTasks from '../component/completedtasks';
import Settings from '../component/settings';
import Auth from '../component/auth';

const RoutesConfig = ({isAuthenticated}) => {
  return (
    <Routes>
        <Route path="/" element={<Auth/>}/>
      <Route path="/todos" element={isAuthenticated? <TodoList />:<Auth/>} />
      <Route path="/completed" element={isAuthenticated? <CompletedTasks />:<Auth/>} />
      <Route path="/settings" element={isAuthenticated? <Settings />:<Auth/>} />
    </Routes>
  );
};

export default RoutesConfig;