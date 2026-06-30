import React, { useState, useEffect, useCallback } from 'react';

// --- INLINE SVG ICONS (Lightweight, reliable, package-free) ---
const IconBook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
    <path d="M6 6h10M6 10h10M6 14h10"/>
  </svg>
);

const IconSearch = () => (
  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconSun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const IconMoon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const IconGrid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

const IconList = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/>
  </svg>
);

const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
  </svg>
);

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5v14"/>
  </svg>
);

const IconClose = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);

const IconWarning = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>
  </svg>
);

const COLOR_TAGS = [
  { name: 'slate', colorCode: '#64748b', title: 'Default' },
  { name: 'indigo', colorCode: '#4f46e5', title: 'Work' },
  { name: 'emerald', colorCode: '#10b981', title: 'Personal' },
  { name: 'amber', colorCode: '#f59e0b', title: 'Urgent' },
  { name: 'rose', colorCode: '#f43f5e', title: 'Ideas' },
  { name: 'violet', colorCode: '#8b5cf6', title: 'Inspiration' }
];

// Read from .env file, or you can hardcode them directly here inside the quotes
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export default function App() {
  // --- STATE ---
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('slate');
  
  // Filtering & View Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState(() => localStorage.getItem('noteapp_view_mode') || 'grid');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('dark_theme') === 'true');
  
  // Loading & error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- API CALLS (MEMOIZED) ---
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!SUPABASE_URL || !SUPABASE_KEY) {
        throw new Error('Supabase URL and API Key are missing. Please add them to the .env file.');
      }
      
      // Fetch from Supabase REST API (order by created_at desc)
      const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/notes?select=*&order=created_at.desc`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Supabase returned status ${response.status}. Please check your credentials and make sure the notes table exists.`);
      }
      const data = await response.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Connection error:", err);
      setError(err.message || 'Failed to connect to the database.');
    } finally {
      setLoading(false);
    }
  }, []);

  // --- EFFECTS ---
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
    localStorage.setItem('dark_theme', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('noteapp_view_mode', viewMode);
  }, [viewMode]);

  // --- CRUD ACTIONS ---
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError(null);
    try {
      const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/notes`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation' // Returns the created row
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          color: color
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to save note to Supabase. Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data[0]) {
        setNotes(prevNotes => [data[0], ...prevNotes]);
      } else {
        // If return representation failed, re-fetch notes
        fetchNotes();
      }

      // Reset form fields
      setTitle('');
      setContent('');
      setColor('slate');
    } catch (err) {
      setError(err.message || 'Failed to save note.');
    }
  };

  const handleDeleteNote = async (id) => {
    setError(null);
    try {
      const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/notes?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note from Supabase. Status: ${response.status}`);
      }

      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete note.');
    }
  };

  // --- FILTERING LOGIC ---
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesTag = activeFilter === 'all' || (note.color && note.color === activeFilter);
    
    return matchesSearch && matchesTag;
  });

  const getNoteCount = (colorName) => {
    if (colorName === 'all') return notes.length;
    return notes.filter(note => note.color === colorName).length;
  };

  return (
    <div className="app-container">
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="app-sidebar">
        <div className="brand-section">
          <div className="brand-icon">
            <IconBook />
          </div>
          <span className="brand-name">NoteFlow</span>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-nav">
          <div 
            className={`nav-item ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <div className="nav-item-left">
              <span>🗂️</span>
              <span>All Notes</span>
            </div>
            <span className="nav-badge">{getNoteCount('all')}</span>
          </div>

          <div className="sidebar-divider" />
          <div className="tags-title">Categories</div>

          {COLOR_TAGS.map(tag => (
            <div
              key={tag.name}
              className={`nav-item ${activeFilter === tag.name ? 'active' : ''}`}
              onClick={() => setActiveFilter(tag.name)}
            >
              <div className="nav-item-left">
                <span className="color-tag-dot" style={{ backgroundColor: tag.colorCode, width: '12px', height: '12px' }} />
                <span>{tag.title}</span>
              </div>
              <span className="nav-badge">{getNoteCount(tag.name)}</span>
            </div>
          ))}
        </div>

        {/* Sidebar Controls */}
        <div className="sidebar-footer">
          <button className="control-btn" onClick={() => setIsDarkMode(!isDarkMode)} title="Toggle theme mode">
            {isDarkMode ? <IconSun /> : <IconMoon />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT */}
      <main className="main-content">
        {/* Main Header */}
        <header className="main-header">
          <div className="header-title-wrapper">
            <h1>Workspace</h1>
            <p>Serverless PostgreSQL powered by Supabase</p>
          </div>
          
          <div className="header-actions">
            <div className="connection-badge">
              <span className={`status-dot ${loading ? 'loading' : error ? 'error' : ''}`} />
              <span>{loading ? 'Syncing...' : error ? 'Database Offline' : 'Database Synced'}</span>
            </div>
          </div>
        </header>

        {/* Error Banner */}
        {error && (
          <div className="api-error-banner">
            <IconWarning />
            <div style={{ flex: 1 }}>
              <div className="error-title">Database Connection Issue</div>
              <div className="error-desc">{error}</div>
            </div>
          </div>
        )}

        {/* Search & Layout View Toggles */}
        <div className="search-filter-bar">
          <div className="search-input-wrapper">
            <IconSearch />
            <input
              type="text"
              placeholder="Search title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn" 
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                <IconClose />
              </button>
            )}
          </div>
          
          <div className="view-toggle-group">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} 
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <IconGrid />
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} 
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <IconList />
            </button>
          </div>
        </div>

        {/* Editor Form Card */}
        <form onSubmit={handleAddNote} className="note-editor-card">
          <input
            type="text"
            placeholder="New Note Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="editor-header-input"
            required
            maxLength={100}
          />
          
          <textarea
            placeholder="Start writing notes, lists, or tags..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="editor-textarea"
            maxLength={1000}
          />
          
          <div className="editor-footer">
            <div>
              <div className="color-picker-label">Assign Category Tag</div>
              <div className="color-options">
                {COLOR_TAGS.map(tag => (
                  <span
                    key={tag.name}
                    className={`color-radio ${color === tag.name ? 'selected' : ''}`}
                    style={{ backgroundColor: tag.colorCode }}
                    onClick={() => setColor(tag.name)}
                    title={tag.title}
                  />
                ))}
              </div>
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              <IconPlus />
              <span>Save Note</span>
            </button>
          </div>
        </form>

        {/* Notes Board Grid / List */}
        <div className={viewMode === 'grid' ? 'notes-board-grid' : 'notes-board-list'}>
          {filteredNotes.length === 0 ? (
            <div className="notes-empty-state">
              <div className="empty-icon">
                <IconBook />
              </div>
              <div>
                <div className="empty-text-title">
                  {searchQuery || activeFilter !== 'all' ? 'No matching notes found' : 'Workspace is empty'}
                </div>
                <div className="empty-text-desc">
                  {searchQuery || activeFilter !== 'all' 
                    ? 'Try adjusting your search keywords or filter category.'
                    : 'Start creating notes above to insert entries into your database.'}
                </div>
              </div>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div 
                key={note.id} 
                className={`note-item-card note-${note.color || 'slate'}`}
              >
                <div className="note-header">
                  <div className="note-title-wrapper">
                    <span className="color-tag-dot" />
                    <h3 className="note-title">{note.title}</h3>
                  </div>
                  
                  <button 
                    className="delete-card-btn" 
                    onClick={() => handleDeleteNote(note.id)}
                    title="Delete note entry"
                  >
                    <IconTrash />
                  </button>
                </div>
                
                <p className="note-body">{note.content || 'Empty description...'}</p>
                
                <div className="note-card-footer">
                  <span className="note-date">
                    {note.created_at ? new Date(note.created_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : ''}
                  </span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 'bold', opacity: 0.4 }}>ID: #{note.id}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

    </div>
  );
}
