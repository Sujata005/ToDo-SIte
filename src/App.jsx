import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Chocolates', done: false, folder: 'Personal' },
    { id: 2, text: 'Oranges', done: true, folder: 'Work' },
  ]);
  const [input, setInput] = useState('');
  const [activeFolder, setActiveFolder] = useState('All');
  const [theme, setTheme] = useState('violet');

  // Define Theme CSS details
  const themes = {
    violet: { 
      bg: '#F0E7FF', card: '#FFFFFF', accent: '#8B5CF6', text: '#2E1065', 
      shadow: 'rgba(139, 92, 246, 0.2)', muted: '#6B7280', inputBg: '#F3F4F6' 
    },
    pink: { 
      bg: '#FFE4E6', card: '#FFFFFF', accent: '#FB7185', text: '#4C0519', 
      shadow: 'rgba(251, 113, 133, 0.2)', muted: '#9F1239', inputBg: '#FFF1F2' 
    },
    red: { 
      bg: '#FEF2F2', card: '#FFFFFF', accent: '#EF4444', text: '#450A0A', 
      shadow: 'rgba(239, 68, 68, 0.3)', muted: '#991B1B', inputBg: '#FEF2F2' 
    },
    wolf: { 
      bg: '#0F172A', card: '#1E293B', accent: '#38BDF8', text: '#F1F5F9', 
      shadow: 'rgba(0, 0, 0, 0.5)', muted: '#94A3B8', inputBg: '#334155' 
    },
  };

  const c = themes[theme];
  const folders = ['All', 'Personal', 'Work', 'Ideas'];

  // --- AUTO-REMOVE LOGIC ---
  useEffect(() => {
    const completedTasks = todos.filter(t => t.done);
    
    const timers = completedTasks.map(task => {
      return setTimeout(() => {
        setTodos(prev => prev.filter(t => t.id !== task.id));
      }, 5000); // 5 seconds
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, [todos]);

  // Helper functions
  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        text: input,
        done: false,
        folder: activeFolder === 'All' ? 'Personal' : activeFolder
      };
      setTodos([newTodo, ...todos]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTodo = (e, id) => {
    e.stopPropagation(); 
    setTodos(todos.filter(t => t.id !== id));
  };

  const filteredTodos = activeFolder === 'All' ? todos : todos.filter(t => t.folder === activeFolder);

  return (
    <div style={{
      padding: '40px 20px', 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: c.bg,
      color: c.text,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* Header and Theme Selector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', margin: 0 }}>Tasks</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="theme" style={{ fontSize: '0.8rem', color: c.muted, fontWeight: 'bold' }}>Theme:</label>
            <select 
              id="theme" 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '15px',
                backgroundColor: c.card,
                color: c.text,
                border: `2px solid ${c.accent}`,
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: `0 4px 10px ${c.shadow}`
              }}
            >
              <option value="violet">1. Violet Pop</option>
              <option value="pink">2. Pink Lollypop</option>
              <option value="red">3. Red Moon</option>
              <option value="wolf">4. Black Wolf</option>
            </select>
          </div>
        </div>

        {/* Folder Pills */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '5px' }}>
          {folders.map(f => (
            <button key={f} onClick={() => setActiveFolder(f)} style={{
              padding: '10px 20px', borderRadius: '25px', border: 'none', cursor: 'pointer',
              backgroundColor: activeFolder === f ? c.accent : c.card,
              color: activeFolder === f ? (theme === 'wolf' ? '#000' : '#fff') : c.text,
              fontWeight: '700', transition: '0.3s', boxShadow: `0 6px 12px ${c.shadow}`,
              flexShrink: 0
            }}>{f}</button>
          ))}
        </div>

        {/* Add Task Input Area */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '35px' }}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a bubbly task..."
            onKeyPress={(e) => { if(e.key === 'Enter') addTodo(); }} 
            style={{
              flexGrow: 1,
              padding: '15px 20px',
              borderRadius: '20px',
              border: `2px solid ${c.accent}`,
              backgroundColor: c.inputBg,
              color: c.text,
              fontSize: '1rem',
              transition: 'all 0.2s',
              boxShadow: `0 10px 20px ${c.shadow}`
            }}
          />
          <button 
            onClick={addTodo}
            style={{
              padding: '12px 24px',
              borderRadius: '20px',
              backgroundColor: c.accent,
              color: theme === 'wolf' ? '#000' : '#fff',
              fontWeight: 800,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 8px 15px ${c.shadow}`,
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            + Add
          </button>
        </div>

        {/* Task List Area */}
        <h2 style={{ fontSize: '1.2rem', color: c.muted, marginBottom: '20px', fontWeight: '800' }}>Task Dashboard</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {filteredTodos.map((todo) => (
            <div 
              key={todo.id} 
              onClick={() => toggleTodo(todo.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: c.card,
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: `0 10px 20px ${c.shadow}`,
                border: todo.done ? `2px solid ${c.accent}` : '2px solid transparent',
              }}
            >
              {/* Box Checkbox */}
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: `3px solid ${c.accent}`,
                marginRight: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme === 'wolf' ? '#000' : '#fff',
                fontSize: '1rem',
                backgroundColor: todo.done ? c.accent : 'transparent',
                transition: '0.2s',
              }}>
                {todo.done && '✓'}
              </div>

              {/* Task Text Area */}
              <div style={{ flexGrow: 1 }}>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: todo.done ? c.muted : c.text,
                  textDecoration: todo.done ? 'line-through' : 'none',
                  opacity: todo.done ? 0.6 : 1,
                  transition: 'all 0.3s',
                }}>
                  {todo.text}
                </span>
                {todo.done && (
                  <div style={{ fontSize: '0.7rem', color: c.accent, marginTop: '4px', fontWeight: 'bold' }}>
                    Cleaning up in 5s...
                  </div>
                )}
              </div>

              {/* Delete Button */}
              <button 
                onClick={(e) => removeTodo(e, todo.id)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#FF4D4D',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;