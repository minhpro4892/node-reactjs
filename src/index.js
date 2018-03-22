import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
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
import DashBoard from './containers/DashBoard'
import User from './containers/User'
import Article from './containers/Article'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)
syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale(localStorage.getItem('language') || 'en'));

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/login' component={App} />
			<Route path="/" component={App}>
				<IndexRoute component={DashBoard} />
				<Route path="/users" component={User}>
				</Route>
				<Route path="/articles" component={Article}>
				</Route>
			</Route>
			<Route path="/page-not-found" component={NotFound} />
			<Route path="*" component={NotFound} />
		</Router>
	</Provider>,
	document.getElementById("root")
);
// registerServiceWorker();
