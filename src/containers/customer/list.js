import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listCustomers as listCustomersAction } from '../../modules/customer';

const CustomerList = props => {
    const { listCustomersAction: listCustomers } = props;

    useEffect(() => {
        listCustomers();
    }, [listCustomers]);

    return (
        <div>
            <h1>CustomerList</h1>
            <p>
                <button onClick={listCustomers} disabled={props.loading}>
                    Refresh
                </button>
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
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {props.customers.map((row, i) => (
                        <tr key={i}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.phone}</td>
                            <td>{row.address}</td>
                            <td>{row.email}</td>
                            <td>{row.status}</td>
                            <td>
                                <button onClick={() => props.editCustomer(row.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = ({ customer }) => ({
    loading: customer.loading,
    customers: customer.customers,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            listCustomersAction,
            editCustomer: id => push(`/customer/${id}`),
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomerList);
