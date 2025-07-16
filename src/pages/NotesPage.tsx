import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import PageWrapper from '../components/PageWrapper';
import { type Note } from '../types/Note';
import NoteItem from '../components/NoteItem';

const NotesPage = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [text, setText] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const response = await api.get('/notes');
            setNotes(response.data);
        } catch (err) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editId === null) {
                await api.post('/notes', { text });
            } else {
                await api.put('/notes', { id: editId, text });
                setEditId(null);
            }
            setText('');
            fetchNotes();
        } catch (err) {
            console.error('Error saving note', err);
            navigate('/');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/notes/${id}`);
            fetchNotes();
        } catch (err) {
            console.error('Error deleting note', err);
            navigate('/');
        }
    };

    const handleEdit = (note: Note) => {
        setEditId(note.id);
        setText(note.text);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <PageWrapper>
            <div>
                <h2>Your Notes</h2>

                <form onSubmit={handleSubmit}>
                    <textarea
                        rows={4}
                        style={{ width: '100%' }}
                        placeholder="Write your note here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <button type="submit" style={{ marginTop: 10 }}>
                        {editId === null ? 'Create Note' : 'Update Note'}
                    </button>
                </form>

                <button onClick={handleLogout} style={{ marginTop: 20, background: 'red', color: 'white' }}>
                    Logout
                </button>

                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {notes.length === 0 ? (
                        <p>No notes yet.</p>
                    ) : (
                        notes.map(note => (
                            <NoteItem
                                key={note.id}
                                note={note}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

export default NotesPage;