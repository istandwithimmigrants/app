'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

import store from './store'
import Main from './components/Main'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import App from './components/App'
import Lawyer from './components/Lawyer'
import AskQuestion from './components/AskQuestion'
import QuestionPage from './components/QuestionPage'

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path='lawyer' component={Lawyer} />
          <Route path='ask' component={AskQuestion} />
          <Route path='question' component={QuestionPage} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
)
