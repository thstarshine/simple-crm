import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchCustomer as fetchCustomerAction,
    updateCustomer as updateCustomerAction,
} from '../../modules/customer';
import BootstrapTable from 'react-bootstrap-table-next';
import { toast } from 'react-smart-toaster';

const CustomerDetail = props => {
    const {
        fetchCustomerAction: fetchCustomer,
        updateCustomerAction: updateCustomer,
        currentCustomer,
        toastMessage,
        match,
        goBack,
    } = props;
    const { params } = match;
    const [disableSave, updateDisableSave] = useState(false);
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
            dataField: 'createdAt',
            text: 'CreatedAt',
        },
        {
            dataField: '',
            text: 'Status',
            formatter: (cell, row, rowIndex, extraData) => (
                <select className="form-control" value={status} onChange={changeStatus}>
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
                    return <></>;
                } else {
                    return (
                        <textarea
                            rows="1"
                            cols="50"
                            className="form-control"
                            placeholder="write some descriptions here"
                            value={row.description}
                            onChange={e => extraData.updateNote(row.idx, e)}
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
                <button className="btn btn-dark" onClick={() => extraData.deleteNote(row.idx)}>
                    Delete
                </button>
            ),
            formatExtraData: { deleteNote },
        },
    ];
    const hiddenRowKeys = notes
        .map((note, idx) => {
            return note.deleted ? idx : null;
        })
        .filter(idx => idx !== null);

    // fetch customer data
    useEffect(() => {
        fetchCustomer(params.id);
    }, [fetchCustomer, params]);
    useEffect(() => {
        if (toastMessage) {
            toast[toastMessage.type](toastMessage.msg);
            updateDisableSave(true);
        } else {
            updateDisableSave(false);
        }
    }, [toastMessage]);
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
        <div data-testid="customer-detail">
            <p>
                <button type="button" className="btn btn-info btn-action" onClick={() => goBack()}>
                    Back to List
                </button>
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
            <button type="button" className="btn btn-warning btn-action" onClick={addNote}>
                Add Note
            </button>
            <div className="row h-100 justify-content-center align-items-center">
                <button
                    type="button"
                    disabled={disableSave}
                    className="btn btn-primary btn-save"
                    onClick={() => updateCustomer(currentCustomer.id, status, notes)}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ customer }) => ({
    loading: customer.loading,
    currentCustomer: customer.currentCustomer,
    toastMessage: customer.toastMessage,
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
