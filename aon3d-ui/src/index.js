import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import AppContainer from './containers/AppContainer'
import './index.css'
import reducer from './reducers/index'

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware
    )
)

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
)
