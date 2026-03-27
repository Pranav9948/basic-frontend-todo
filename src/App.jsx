import { useEffect, useState } from 'react';
import axios from 'axios';

const API = '/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | completed | pending

  useEffect(() => {
    const loadTodos = async () => {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
    };

    loadTodos();
  }, []);

  const fetchTodos = async () => {
    let url = `${API}/todos?`;

    if (search) url += `search=${search}&`;
    if (filter !== 'all') {
      url += `completed=${filter === 'completed'}&`;
    }

    const res = await axios.get(url);
    setTodos(res.data);
  };

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

  useEffect(() => {
    const loadTodos = async () => {
      let url = `${API}/todos?`;

      if (search) url += `search=${search}&`;
      if (filter !== 'all') {
        url += `completed=${filter === 'completed'}&`;
      }

      const res = await axios.get(url);
      setTodos(res.data);
    };

    loadTodos();
  }, [search, filter]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo App</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

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
