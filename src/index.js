import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import configureStore from './store/configureStore'
import { translations } from './constants/languages/languages'
// import registerServiceWorker from './registerServiceWorker';
//All page related to Route
import App from './containers/App';
import NotFound from './containers/NotFound'
import Login from './containers/Login'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)
syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale(localStorage.getItem('language') || 'en'));

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/login' component={Login} />
			<Route path="/" component={App}>
			</Route>
			<Route path="/page-not-found" component={NotFound} />
			<Route path="*" component={NotFound} />
		</Router>
	</Provider>,
	document.getElementById("root")
);
// registerServiceWorker();
