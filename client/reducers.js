/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
// import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import notes from './modules/Note/NoteReducer';
import lanes from './modules/Lane/LaneReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  																				                                        app,
  // posts,
  																				                                        intl,
  																				                                        notes,
  																				                                        lanes,
});
