import React, { PropTypes } from 'react';
import Lane from './LaneContainer.js';

const Lanes = ({ lanes }) => {
    console.log('Linie',lanes);
    return (
        <div className="lanes">{lanes.map(lane =>
            <Lane className="lane" key={lane.id} lane={lane} />
        )}</div>
    );
};

Lanes.propTypes = {
    lanes: PropTypes.array,
};

export default Lanes;
