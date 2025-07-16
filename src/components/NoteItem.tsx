import { type Note } from '../types/Note';

interface NoteItemProps {
    note: Note;
    onDelete: (id: number) => void;
    onEdit: (note: Note) => void;
}

const NoteItem = ({ note, onDelete, onEdit }: NoteItemProps) => {
    return (
        <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px'
        }}>
            <p>{note.text}</p>
            <small>
                Created: {new Date(note.createdDate).toLocaleString()}<br />
                Updated: {new Date(note.updatedDate).toLocaleString()}
            </small>
            <div style={{ marginTop: 10 }}>
                <button onClick={() => onEdit(note)}>Edit</button>
                <button style={{ marginLeft: 10 }} onClick={() => onDelete(note.id)}>Delete</button>
            </div>
        </div>
    );
};

export default NoteItem;