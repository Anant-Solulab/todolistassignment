import React, { useEffect } from "react";

function CardModal({
  formik,
  subtasks,
  handleSubtaskChange,
  handleAddSubtask,
  handleRemoveSubtask,
  onSubmit,
  onClose,
  taskToEdit // This will be the task object to edit (if editing)
}) {
  // Effect to populate the form with existing task data when editing
  useEffect(() => {
    if (taskToEdit) {
      formik.setValues({
        taskTitle: taskToEdit.title,
        taskDescription: taskToEdit.description || "",
        dueDate: taskToEdit.dueDate || "",
        priority: taskToEdit.priority || "Medium",
        subtasks: taskToEdit.subtasks.map(subtask => subtask.title) || ['']
      });
    }
  }, [taskToEdit, formik]);

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-head">
          <h2>{taskToEdit ? "Edit Task" : "Create Task"}</h2>
          <button onClick={onClose}>X</button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {/* Task Title */}
          <div className="form-field">
            <label htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              id="taskTitle"
              name="taskTitle"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taskTitle}
            />
            {formik.touched.taskTitle && formik.errors.taskTitle && (
              <div className="error-message">{formik.errors.taskTitle}</div>
            )}
          </div>

          {/* Task Description */}
          <div className="form-field">
            <label htmlFor="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.taskDescription}
            />
          </div>

          {/* Due Date */}
          <div className="form-field">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dueDate}
            />
          </div>

          {/* Priority */}
          <div className="form-field">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.priority}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Subtasks */}
          <div className="form-field">
            <label>Subtasks</label>
            {formik.values.subtasks.map((subtask, index) => (
              <div key={index} className="subtask-item">
                <input
                  type="text"
                  name={`subtasks[${index}]`}
                  value={subtask}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  placeholder={`Subtask ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSubtask(index)}
                  className="remove-subtask-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubtask}
              className="add-subtask-btn"
            >
              Add Subtask
            </button>
          </div>

          <button type="submit">{taskToEdit ? "Update Task" : "Save Task"}</button>
        </form>
      </div>
    </div>
  );
}

export default CardModal;
