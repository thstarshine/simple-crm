import { combineReducers } from 'redux';
import counter from './counter';
import customer from './customer';

export default combineReducers({
    counter,
    customer,
});
