import axios from 'axios';

export const LISTING_CUSTOMERS = 'LISTING_CUSTOMERS';
export const LIST_CUSTOMERS_SUCCESS = 'LIST_CUSTOMERS_SUCCESS';
export const LIST_CUSTOMERS_FAILED = 'LIST_CUSTOMERS_FAILED';
export const FETCHING_CUSTOMER = 'FETCHING_CUSTOMER';
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS';
export const FETCH_CUSTOMER_FAILED = 'FETCH_CUSTOMER_FAILED';
export const UPDATING_CUSTOMER = 'UPDATING_CUSTOMER';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_FAILED = 'UPDATE_CUSTOMER_FAILED';
export const CLEAR_TOAST = 'CLEAR_TOAST';

export const initialState = {
    customers: [],
    currentCustomer: { id: '', CustomerNotes: [] },
    loading: false,
    toastMessage: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LISTING_CUSTOMERS:
            return {
                ...state,
                loading: true,
            };

        case LIST_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: action.payload,
                loading: false,
            };

        case LIST_CUSTOMERS_FAILED:
            return {
                ...state,
                loading: false,
                toastMessage: { type: 'error', msg: 'failed to list customers' },
            };

        case FETCHING_CUSTOMER:
            return {
                ...state,
                loading: true,
            };

        case FETCH_CUSTOMER_SUCCESS:
            return {
                ...state,
                currentCustomer: action.payload,
                loading: false,
            };

        case FETCH_CUSTOMER_FAILED:
            return {
                ...state,
                loading: false,
                toastMessage: { type: 'error', msg: 'failed to get customer detail' },
            };

        case UPDATING_CUSTOMER:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                toastMessage: { type: 'success', msg: 'successfully updated' },
            };

        case UPDATE_CUSTOMER_FAILED:
            return {
                ...state,
                loading: false,
                toastMessage: { type: 'error', msg: 'failed to update' },
            };

        case CLEAR_TOAST:
            return {
                ...state,
                toastMessage: null,
            };

        default:
            return state;
    }
};

export const listCustomers = () => {
    return async dispatch => {
        dispatch({
            type: LISTING_CUSTOMERS,
        });
        try {
            const response = await axios.get('http://localhost:3000/customers');
            dispatch({
                type: LIST_CUSTOMERS_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            // console.log(e);
            dispatch({
                type: LIST_CUSTOMERS_FAILED,
            });
        } finally {
            setTimeout(() => {
                dispatch({
                    type: CLEAR_TOAST,
                });
            }, 1500);
        }
    };
};

export const fetchCustomer = id => {
    return async dispatch => {
        dispatch({
            type: FETCHING_CUSTOMER,
        });
        try {
            const response = await axios.get(`http://localhost:3000/customer/${id}`);
            dispatch({
                type: FETCH_CUSTOMER_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            // console.log(e);
            dispatch({
                type: FETCH_CUSTOMER_FAILED,
            });
        } finally {
            setTimeout(() => {
                dispatch({
                    type: CLEAR_TOAST,
                });
            }, 1500);
        }
    };
};

export const updateCustomer = (id, status, notes) => {
    return async dispatch => {
        dispatch({
            type: UPDATING_CUSTOMER,
        });
        try {
            const response = await axios.post(`http://localhost:3000/customer/${id}`, {
                status,
                notes,
            });
            dispatch({
                type: UPDATE_CUSTOMER_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            // console.log(e);
            dispatch({
                type: UPDATE_CUSTOMER_FAILED,
            });
        } finally {
            setTimeout(() => {
                dispatch({
                    type: CLEAR_TOAST,
                });
            }, 1500);
        }
    };
};
