import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>My To-Do List</h1>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Add a task..." 
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
