import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './assets/components/Home/Home';
import Header from './assets/components/Header/Header';
import Signup from './assets/components/Signup/Signup';
import Footer from './assets/components/Footer/Footer';
import Login from './assets/components/Login/Login';
import NoPage from './assets/components/NoPage/NoPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<Home/>} />
				<Route path='login' element={<Login/>} />
				<Route path='Signup' element={<Signup/>} />
				<Route path='*' element={<NoPage/>} />
			</Routes>
			<Footer/> 
		</div>
	);
}

export default App;
