import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Home = props => (
    <div className="container h-100 home-desc">
        <div className="row h-100 justify-content-center align-items-center">
            <h5>This is a simple CRM system.</h5>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
            <ul>
                <li>
                    Back end framework:{' '}
                    <a
                        href="https://github.com/fastify/fastify"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Fastify
                    </a>
                </li>
                <li>
                    Front end framework:{' '}
                    <a
                        href="https://github.com/facebook/react"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React
                    </a>
                </li>
                <li>
                    Database ORM:{' '}
                    <a
                        href="https://github.com/sequelize/sequelize"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Sequelize
                    </a>
                </li>
                <li>
                    Table display:{' '}
                    <a
                        href="https://github.com/react-bootstrap-table/react-bootstrap-table2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React-Bootstrap-Table2
                    </a>
                </li>
            </ul>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
            <button type="button" className="btn btn-info" onClick={props.changePage}>
                Live Demo
            </button>
        </div>
    </div>
);

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changePage: () => push('/customers'),
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
