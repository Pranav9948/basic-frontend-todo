import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    const loadTodos = async () => {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
    };

    loadTodos();
  }, []);

  const addTodo = async () => {
    await axios.post(`${API}/todos`, { title });
    setTitle('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${API}/todos/${todo.id}`, {
      title: todo.title,
      completed: !todo.completed,
    });
    fetchTodos();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo App</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {todo.title}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
