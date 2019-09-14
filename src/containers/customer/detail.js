import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchCustomer as fetchCustomerAction,
    updateCustomer as updateCustomerAction,
} from '../../modules/customer';
import BootstrapTable from 'react-bootstrap-table-next';

const CustomerDetail = props => {
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

    // local actions
    const addNote = () => {
        updateNotes(prev => {
            const newNote = {
                idx: prev.length,
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

    const mainColumns = [
        {
            dataField: 'id',
            text: 'ID',
        },
        {
            dataField: 'name',
            text: 'Name',
        },
        {
            dataField: 'phone',
            text: 'Phone',
        },
        {
            dataField: 'address',
            text: 'Address',
        },
        {
            dataField: 'email',
            text: 'Email',
        },
        {
            dataField: '',
            text: 'Status',
            formatter: (cell, row, rowIndex, extraData) => (
                <select value={status} onChange={changeStatus}>
                    <option value="prospective">prospective</option>
                    <option value="current">current</option>
                    <option value="non-active">non-active</option>
                </select>
            ),
            formatExtraData: { status, changeStatus },
        },
    ];
    const noteColumns = [
        {
            dataField: 'notes',
            text: 'Notes',
            formatter: (cell, row, rowIndex, extraData) => {
                if (row.deleted) {
                    // return <tr key={i} style={{ display: 'none' }}></tr>;
                    return <></>;
                } else {
                    return (
                        <textarea
                            rows="1"
                            cols="50"
                            placeholder="write some descriptions here"
                            value={row.description}
                            onChange={e => extraData.updateNote(rowIndex, e)}
                        ></textarea>
                    );
                }
            },
            formatExtraData: { updateNote },
        },
        {
            dataField: 'id',
            text: 'Delete',
            formatter: (cell, row, rowIndex, extraData) => (
                <button onClick={() => extraData.deleteNote(rowIndex)}>Delete</button>
            ),
            formatExtraData: { deleteNote },
        },
    ];
    const hiddenRowKeys = notes
        .map((note, idx) => {
            return note.deleted ? idx : null;
        })
        .filter(idx => idx);

    // fetch customer data
    useEffect(() => {
        fetchCustomer(params.id);
    }, [fetchCustomer, params]);
    // pass data to local state
    useEffect(() => {
        updateNotes(
            currentCustomer.CustomerNotes.map((row, idx) => {
                row.idx = idx;
                return row;
            }),
        );
    }, [currentCustomer.CustomerNotes]);
    useEffect(() => {
        updateStatus(currentCustomer.status);
    }, [currentCustomer.status]);

    return (
        <div>
            <h1>CustomerDetail</h1>
            <p>
                <button onClick={() => goBack()}>Back</button>
            </p>
            <BootstrapTable
                keyField="id"
                data={[currentCustomer]}
                columns={mainColumns}
                bootstrap4={true}
            />
            <BootstrapTable
                keyField="idx"
                data={notes}
                columns={noteColumns}
                bootstrap4={true}
                hiddenRows={hiddenRowKeys}
            />
            <button onClick={addNote}>Add</button>
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
