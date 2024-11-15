import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../style/todolist.css'; 
import Header from './header';
import CardModal from './modal'; 
import TodoCard from './todocard';
import { Tooltip } from '@mui/material';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [task,settask] = useState(null);

  // Formik for handling the task creation
  const formik = useFormik({
    initialValues: {
      taskTitle: '',
      taskDescription: '',
      dueDate: '',
      priority: 'Medium',
      subtasks: [''], // Initialize with one empty subtask
    },
    validationSchema: Yup.object({
      taskTitle: Yup.string().required('Task Title is required'),
      taskDescription: Yup.string().optional(),
      dueDate: Yup.date().optional(),
      priority: Yup.string().required('Priority is required'),
    }),
    onSubmit: (values) => {
      const newTodo = {
        id: Date.now(),
        title: values.taskTitle,
        description: values.taskDescription,
        dueDate: values.dueDate,
        priority: values.priority,
        subtasks: values.subtasks.map((subtask, index) => ({
          id: index,
          title: subtask,
          completed: false,
        })),
        completed: false,
      };
      setTodos([...todos, newTodo]); // Add new task
      setShowForm(false); // Close the form
      formik.resetForm(); // Reset form state
    },
  });

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (task) => {
    settask(task);
    setShowForm(true);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };


  const deleteSubtaskTodo = (todoId, subtaskId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter((subtask) => subtask.id !== subtaskId),
            }
          : todo
      )
    );
  };

  // Subtask management functions
  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...formik.values.subtasks];
    updatedSubtasks[index] = value;
    formik.setFieldValue('subtasks', updatedSubtasks);
  };

  const handleAddSubtask = () => {
    const updatedSubtasks = [...formik.values.subtasks, ''];
    formik.setFieldValue('subtasks', updatedSubtasks);
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = formik.values.subtasks.filter((_, i) => i !== index);
    formik.setFieldValue('subtasks', updatedSubtasks);
  };

  const handleSubtaskCompleteToggle = (todoId, subtaskId) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
              ),
            }
          : todo
      );
    });
  };

  const close = () => setShowForm(false);

  return (
    <div className="wrapper block">
      <Header />

      <div className="todo-list">
        {todos.length === 0 ? (
          <h1></h1>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggleComplete={toggleComplete}
              onEdit={editTodo}
              onDelete={deleteTodo}
              onToggleSubtaskComplete={handleSubtaskCompleteToggle}
              onEditSubtask={editTodo}
              onDeleteSubtask={deleteSubtaskTodo}
            />
          ))
        )}
      </div>

      {/* Create Task Button */}
      <Tooltip describeChild title="Create task">
  <button className='create-task-btn' onClick={()=>setShowForm(true)}>+</button>
</Tooltip>

      {/* Display Task Form Modal */}
      {showForm && (
        <CardModal
          formik={formik}
          handleAddSubtask={handleAddSubtask}
          handleSubtaskChange={handleSubtaskChange}
          handleRemoveSubtask={handleRemoveSubtask}
          subtasks={formik.values.subtasks}
          onClose={close}
          taskToEdit={task}
        />
      )}
    </div>
  );
};


export default TodoList;
