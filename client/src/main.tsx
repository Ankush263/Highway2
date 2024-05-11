import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotesListingPage from './pages/NotesListingPage.tsx';
import NotePage from './pages/NotePage.tsx';
import Varify from './pages/Varify.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router>
			<Switch>
				<Route path={'/auth/#'}>
					<App />
				</Route>
				<Route path={'/varify/:url/#'}>
					<Varify />
				</Route>
				<Route path={'/:id/#'}>
					<NotePage />
				</Route>
				<Route path={'/#'}>
					<NotesListingPage />
				</Route>
			</Switch>
		</Router>
	</React.StrictMode>
);
