import { connect } from 'react-redux';
import Lane from './Lane';
import { deleteLane, updateLane, editLane } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
    console.log('LaneContainer state', state);
    console.log('LaneContainer ownProps', ownProps);
    return {
        laneNotes: ownProps.lane.notes.map(noteId => state.notes.find(note => note.id === noteId)),
    };
};

const mapDispatchToProps = {
    editLane,
    deleteLane,
    updateLane,
    addNote: createNoteRequest,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lane);