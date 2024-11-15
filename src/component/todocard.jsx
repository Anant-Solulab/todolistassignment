import React from 'react';
import { Card, CardHeader, CardContent, Checkbox, IconButton, Typography, Box, Divider } from '@mui/material';
import { Edit, Delete, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

const TodoCard = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  onToggleSubtaskComplete,
  onEditSubtask,
  onDeleteSubtask,
}) => {
  const handleToggleComplete = () => onToggleComplete(todo.id);

  return (
    <div className="todocard">
      <Card variant="outlined" sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
        {/* Card Header for Title and Due Date */}
        <CardHeader
          title={todo.title}
          subheader={
            <Typography variant="body2" color="text.secondary">
              Due Date: {new Date(todo.dueDate).toLocaleDateString()}
            </Typography>
          }
          action={
            <Checkbox
              checked={todo.completed}
              onChange={handleToggleComplete}
              icon={<RadioButtonUnchecked />}
              checkedIcon={<CheckCircle />}
              color="primary"
            />
          }
        />

        {/* Card Content */}
        <CardContent>
          {todo.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {todo.description}
            </Typography>
          )}

          {/* Subtasks */}
          {todo.subtasks && todo.subtasks.length > 0 && (
            <Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Subtasks
              </Typography>
              {todo.subtasks.map((subtask) => (
                <Box
                  key={subtask.id}
                  display="flex"
                  alignItems="center"
                  sx={{ mb: 1, backgroundColor: subtask.completed ? 'action.selected' : 'transparent', padding: 1, borderRadius: 1 }}
                >
                  <Checkbox
                    checked={subtask.completed}
                    onChange={() => onToggleSubtaskComplete(todo.id, subtask.id)}
                    icon={<RadioButtonUnchecked />}
                    checkedIcon={<CheckCircle />}
                    color="primary"
                    size="small"
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: subtask.completed ? 'line-through' : 'none',
                      flexGrow: 1,
                      color: subtask.completed ? 'text.disabled' : 'text.primary',
                    }}
                  >
                    {subtask.title}
                  </Typography>

                  <IconButton onClick={() => onEditSubtask(todo.id, subtask.id)} color="primary" size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => onDeleteSubtask(todo.id, subtask.id)} color="error" size="small">
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>

        {/* Footer with Edit and Delete Buttons */}
        <Box display="flex" justifyContent="flex-end" sx={{ p: 1 }}>
          <IconButton onClick={() => onEdit(todo)} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={() => onDelete(todo.id)} color="error">
            <Delete />
          </IconButton>
        </Box>
      </Card>
    </div>
  );
};

export default TodoCard;
