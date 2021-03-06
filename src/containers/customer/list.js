import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listCustomers as listCustomersAction } from '../../modules/customer';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { toast } from 'react-smart-toaster';

const CustomerList = props => {
    const { listCustomersAction: listCustomers, toastMessage } = props;
    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: 'name',
            text: 'Name',
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: 'phone',
            text: 'Phone',
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: 'status',
            text: 'Status',
            sort: true,
            filter: selectFilter({
                options: {
                    prospective: 'prospective',
                    current: 'current',
                    'non-active': 'non-active',
                },
            }),
        },
        {
            dataField: 'createdAt',
            text: 'CreatedAt',
            sort: true,
            filter: textFilter(),
        },
        {
            dataField: '',
            text: 'Edit',
            formatter: (cell, row, rowIndex, extraData) => (
                <button
                    className="btn btn-info"
                    onClick={() => extraData.props.editCustomer(row.id)}
                >
                    Edit
                </button>
            ),
            formatExtraData: { props },
        },
    ];

    useEffect(() => {
        listCustomers();
    }, [listCustomers]);
    useEffect(() => {
        if (toastMessage) {
            toast[toastMessage.type](toastMessage.msg);
        }
    }, [toastMessage]);

    return (
        <div data-testid="customer-list">
            <p>
                <button
                    type="button"
                    className="btn btn-info btn-action"
                    onClick={listCustomers}
                    disabled={props.loading}
                >
                    Refresh
                </button>
            </p>
            <BootstrapTable
                keyField="id"
                data={props.customers}
                columns={columns}
                bootstrap4={true}
                filter={filterFactory()}
            />
        </div>
    );
};

const mapStateToProps = ({ customer }) => ({
    loading: customer.loading,
    customers: customer.customers,
    toastMessage: customer.toastMessage,
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
