import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import CustomerList from '../customer/list';
import CustomerDetail from '../customer/detail';
import { SmartToaster, toast } from 'react-smart-toaster';

const App = () => (
    <div>
        <SmartToaster
            store={toast}
            lightBackground={true}
            position={'top_center'}
            fadeOutTimer={1500}
        />
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand">CRM</span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/customers">
                                Customers
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/customers" component={CustomerList} />
            <Route exact path="/customer/:id" component={CustomerDetail} />
        </main>
    </div>
);

export default App;
