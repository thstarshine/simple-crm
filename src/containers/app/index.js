import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import About from '../about';
import CustomerList from '../customer/list';
import CustomerDetail from '../customer/detail';

const App = () => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/about-us">About</Link>
            <Link to="/customers">Customers</Link>
        </header>

        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route exact path="/customers" component={CustomerList} />
            <Route exact path="/customer/:id" component={CustomerDetail} />
        </main>
    </div>
);

export default App;
