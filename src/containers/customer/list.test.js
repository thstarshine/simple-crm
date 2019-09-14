import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import * as History from 'history';
import { initialState } from '../../modules';
import reducer from '../../modules';
import List from './list';

export const history = History.createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];
const composedEnhancers = compose(applyMiddleware(...middleware));

jest.mock('axios');

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function renderWithRedux(
    ui,
    {
        initialState,
        store = createStore(connectRouter(history)(reducer), initialState, composedEnhancers),
    } = {},
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    };
}

test('can render with redux with defaults', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'my-name' }] });
    const { findByTestId } = renderWithRedux(<List />);
    const listPage = await findByTestId('customer-list');
    expect(listPage.textContent).toContain('my-name');
});
