import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import { useState } from 'react';

function App() {
	const [login, setLogin] = useState(true);
	return (
		<div className="app">
			{login ? <Login setLogin={setLogin} /> : <Signup setLogin={setLogin} />}
		</div>
	);
}

export default App;
