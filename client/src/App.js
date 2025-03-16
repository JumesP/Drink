import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./styles.css"

import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import Main from "./pages/Main";
import RoulettePage from "./pages/Roulette";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<>
						<Route path="/Main" element={<Main />} />
						<Route path="/Roulette" element={<RoulettePage />} />
						{/*<Route path="/Projects" element={<Projects />} />*/}
					</>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
