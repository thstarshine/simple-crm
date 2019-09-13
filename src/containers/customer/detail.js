import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCustomer as fetchCustomerAction } from '../../modules/customer';

const CustomerDetail = props => {
    console.log(props);
    const { fetchCustomerAction: fetchCustomer, currentCustomer, match, goBack } = props;
    const { params } = match;

    useEffect(() => {
        fetchCustomer(params.id);
    }, [fetchCustomer, params]);

    let notes = <></>;
    if (currentCustomer.CustomerNotes && currentCustomer.CustomerNotes.length) {
        notes = (
            <>
                <tr>
                    <td colspan="6">
                        <strong>Notes</strong>
                    </td>
                </tr>
                {currentCustomer.CustomerNotes.map((row, i) => {
                    return (
                        <tr>
                            <td colspan="5">{row.description}</td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    );
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
                        <td>{currentCustomer.status}</td>
                    </tr>
                    {notes}
                </tbody>
            </table>
            <button>Save</button>
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
            goBack: () => push(`/customers`),
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomerDetail);
