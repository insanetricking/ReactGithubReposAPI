import React from "react";
import "./app.less";
import { useDispatch } from "react-redux/es/exports";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/Main";
import Card from "./card/Card";
import Error from "./main/Error";



const App = () => {
	const dispatch = useDispatch();

	return (
		<BrowserRouter>
			<div className="container">
				<Routes>
					<Route exact path="/" element={<Main />} />
					<Route exact path="/card/:username/:reponame" element={<Card />} />
					<Route exact path="/error" element={<Error />} />
					<Route path="*" element={<Main />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
