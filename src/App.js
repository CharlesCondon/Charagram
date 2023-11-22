import './App.css';
import {Routes, Route, PrivateRoute} from 'react-router-dom';
import Start from './assets/components/Start/Start';
import Header from './assets/components/Header/Header';
import Signup from './assets/components/Signup/Signup';
import Footer from './assets/components/Footer/Footer';
import Login from './assets/components/Login/Login';
import NoPage from './assets/components/NoPage/NoPage';
import Home from './assets/components/Home/Home';
import PostPage from './assets/components/PostPage/PostPage';
import AccountPage from './assets/components/AccountPage/AccountPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<Start/>} />
				<Route path='login' element={<Login/>} />
				<Route path='signup' element={<Signup/>} />
				<Route path='/home' element={<Home/>} />
				<Route path='/post' element={<PostPage/>} />
				{/* <Route exact path="/:username" element={<AccountPage/>} /> */}
				<Route path='*' element={<NoPage/>} />
			</Routes>
		</div>
	);
}

export default App;
