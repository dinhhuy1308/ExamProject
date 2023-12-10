import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';
import './index.css';
import { store } from './redux/configureStore';
import reportWebVitals from './reportWebVitals';







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	</Provider>
);

reportWebVitals();
