import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as noteActions from '../Note/NoteActions';
import Edit from '../../components/Edit';

const Notes = ({ notes, laneId, editNote, onUpdate, deleteNote }) => {
    return (<ul className="notes">{notes.map((note) =>
        <Note
            id={note.id}
            key={note.id}
        >
        <Edit
            editing={note.editing}
            value={note.task}
            onValueClick={() => editNote(note.id)}
            onUpdate={(task) => onUpdate({
                    ...note,
                    task,
                    editing: false,
                }
            )}
            onDelete={() => deleteNote(note.id, laneId)}
        />
        </Note>
    )}</ul>);
};

Notes.propTypes = {
    deleteNote: PropTypes.func,
    onUpdate: PropTypes.func,
    laneId: PropTypes.string,
    editNote: PropTypes.func,
    notes: PropTypes.array,
};

const mapDispatchToProps = {
    ...noteActions,
};

export default connect(
    null,
    mapDispatchToProps
)(Notes);