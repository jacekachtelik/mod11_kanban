import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
// import styles from '../Lane/Lane.css';
import { createLane , fetchLanes} from '../Lane/LaneActions';

const Kanban = (props) => (
    <div>
        <Lanes lanes={props.lanes} />
    </div>
);

// Kanban.need = [() => { return fetchLanes(); }];
Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
    lanes: PropTypes.array,
    // createLane: PropTypes.func,
};

const mapStateToProps = state => ({
    lanes: state.lanes,
});

const mapDispatchToProps = {
    // createLane,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);