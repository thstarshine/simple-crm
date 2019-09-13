import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchCustomer as fetchCustomerAction,
    updateCustomer as updateCustomerAction,
} from '../../modules/customer';

const CustomerDetail = props => {
    console.log(props);
    const {
        fetchCustomerAction: fetchCustomer,
        updateCustomerAction: updateCustomer,
        currentCustomer,
        match,
        goBack,
    } = props;
    const { params } = match;
    const [notes, updateNotes] = useState([]);
    const [status, updateStatus] = useState('current');

    // fetch customer data
    useEffect(() => {
        fetchCustomer(params.id);
    }, [fetchCustomer, params]);

    // pass data to local state
    useEffect(() => {
        updateNotes(currentCustomer.CustomerNotes);
    }, [currentCustomer.CustomerNotes]);
    useEffect(() => {
        updateStatus(currentCustomer.status);
    }, [currentCustomer.status]);

    const addNote = () => {
        updateNotes(prev => {
            const newNote = {
                description: '',
            };
            return prev.concat([newNote]);
        });
    };
    const updateNote = (idx, e) => {
        const val = e.target.value;
        updateNotes(prev => {
            prev[idx].description = val;
            return [...prev];
        });
    };
    const deleteNote = idx => {
        updateNotes(prev => {
            prev[idx].deleted = true;
            return [...prev];
        });
    };
    const changeStatus = e => {
        updateStatus(e.target.value);
    };

    let notesBlock = <></>;
    if (notes && notes.length) {
        notesBlock = (
            <>
                <tr>
                    <td colSpan="6">
                        <strong>Notes</strong>
                    </td>
                </tr>
                {notes.map((row, i) => {
                    if (row.deleted) {
                        return <tr key={i} style={{ display: 'none' }}></tr>;
                    } else {
                        return (
                            <tr key={i}>
                                <td colSpan="5">
                                    <textarea
                                        rows="1"
                                        cols="50"
                                        placeholder="write some descriptions here"
                                        value={row.description}
                                        onChange={e => updateNote(i, e)}
                                    ></textarea>
                                </td>
                                <td>
                                    <button onClick={() => deleteNote(i)}>Delete</button>
                                </td>
                            </tr>
                        );
                    }
                })}
            </>
        );
    }

    return (
        <div>
            <h1>CustomerDetail</h1>
            <p>
                <button onClick={() => goBack()}>Back</button>
            </p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{currentCustomer.id}</td>
                        <td>{currentCustomer.name}</td>
                        <td>{currentCustomer.phone}</td>
                        <td>{currentCustomer.address}</td>
                        <td>{currentCustomer.email}</td>
                        <td>
                            <select value={status} onChange={changeStatus}>
                                <option value="prospective">prospective</option>
                                <option value="current">current</option>
                                <option value="non-active">non-active</option>
                            </select>
                        </td>
                    </tr>
                    {notesBlock}
                    <tr>
                        <td colSpan="6">
                            <button onClick={addNote}>Add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => updateCustomer(currentCustomer.id, status, notes)}>Save</button>
        </div>
    );
};

const mapStateToProps = ({ customer }) => ({
    loading: customer.loading,
    currentCustomer: customer.currentCustomer,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchCustomerAction,
            updateCustomerAction,
            goBack: () => push(`/customers`),
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomerDetail);
