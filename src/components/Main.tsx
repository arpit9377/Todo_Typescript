import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, editTodo, completeTodo, selectTodos } from '../features/todos/todosSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  const [taskInput, setTaskInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editTodoText, setEditTodoText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      dispatch(addTodo(taskInput));
      setTaskInput('');
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditTodoText(todos[index].text);
  };

  const handleSaveEdit = () => {
    if (editTodoText.trim() !== '') {
      dispatch(editTodo({ index: editIndex, text: editTodoText }));
      setEditIndex(-1);
      setEditTodoText('');
    }
  };

  const handleComplete = (index: number) => {
    dispatch(completeTodo(index));
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card rounded-3">
                <div className="card-body p-4">
                  <h4 className="text-center my-3 pb-3">To Do App</h4>
                  <form
                    onSubmit={handleSubmit}
                    className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                  >
                    <div className="col-12">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form1"
                          className="form-control"
                          value={taskInput}
                          onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form1">
                          Enter a task here
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        Add
                      </button>
                    </div>
                  </form>
                  <table className="table mb-4">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Todo item</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todos.map((todo, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {editIndex === index ? (
                              <input
                                type="text"
                                value={editTodoText}
                                onChange={(e) => setEditTodoText(e.target.value)}
                                className="form-control mb-2"
                              />
                            ) : (
                              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.text}
                              </span>
                            )}
                          </td>
                          <td>
                            {editIndex === index ? (
                              <div className="d-flex justify-content-end">
                                <button
                                  onClick={handleSaveEdit}
                                  className="btn btn-success mr-2"
                                  disabled={!editTodoText.trim()}
                                >
                                  Save
                                </button>
                                <button className="btn btn-danger ml-2" onClick={() => setEditIndex(-1)}>
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <button onClick={() => handleEdit(index)} className="btn btn-secondary ml-4">
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleComplete(index)}
                                  className="btn btn-danger ml-4"
                                  disabled={editIndex !== -1}
                                >
                                  Done
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
