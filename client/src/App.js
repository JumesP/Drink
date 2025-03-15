import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import Main from "./pages/Main";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<>
						<Route path="/Main" element={<Main />} />
						{/*<Route path="/About" element={<About />} />*/}
						{/*<Route path="/Projects" element={<Projects />} />*/}
					</>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
