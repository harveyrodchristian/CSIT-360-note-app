import React, { useState, useEffect } from 'react';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/notes';

  // 1. Fetch Notes from MySQL Backend on Component Load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Could not connect to database api.');
      }
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError('❌ Connection Error: Could not reach the backend server. Make sure your server is running (node server/index.js) and MySQL database is active!');
    }
  };

  // 2. Add a Note to the MySQL Database
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setError(null);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create note.');
      }

      const newNote = await response.json();
      // Add the new note to the top of our local state array
      setNotes([newNote, ...notes]);
      
      // Clear the input fields
      setTitle('');
      setContent('');
    } catch (err) {
      setError('❌ Failed to add note. Check that your MySQL server is running.');
    }
  };

  // 3. Delete a Note from the MySQL Database
  const handleDeleteNote = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete note.');
      }

      // Filter out the deleted note from our local state
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      setError('❌ Failed to delete note. Check database connection.');
    }
  };

  // Helper to format date nicely
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return '';
    }
  };

  // Assign clean pastel colors to notes based on their index
  const getNoteColor = (index) => {
    const colors = [
      'var(--pastel-peach)',
      'var(--pastel-pink)',
      'var(--pastel-yellow)',
      'var(--pastel-green)',
      'var(--pastel-blue)'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="app-wrapper">
      <header>
        <h1>Cozy Notes 🧸</h1>
        <p>Save notes directly to your local MySQL Database using Workbench</p>
      </header>

      {/* Show connection error alert if backend is offline */}
      {error && <div className="error-banner">{error}</div>}

      {/* Note Input Form */}
      <form onSubmit={handleAddNote} className="note-form-card">
        <h2>Write a Cozy Note ✍️</h2>
        <div>
          <input
            type="text"
            placeholder="Note Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
          />
        </div>
        <div>
          <textarea
            placeholder="Write details or lists here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
          />
        </div>
        <button type="submit" className="cute-btn">
          Add Note 🍡
        </button>
      </form>

      {/* Notes Grid */}
      <div className="notes-grid">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>Your database board is empty! Write a note above to insert it into MySQL. 🐬</p>
          </div>
        ) : (
          notes.map((note, index) => (
            <div 
              key={note.id} 
              className="note-card"
              style={{ backgroundColor: getNoteColor(index) }}
            >
              <button 
                className="delete-btn" 
                onClick={() => handleDeleteNote(note.id)}
                title="Delete note"
              >
                ✕
              </button>
              <div>
                <h3>{note.title}</h3>
                <p>{note.content || 'No description...'}</p>
              </div>
              <div className="note-card-footer">
                <span className="note-card-date">{formatDate(note.created_at)}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', opacity: 0.6 }}>ID: {note.id}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
