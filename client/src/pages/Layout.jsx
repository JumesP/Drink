import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./styles/Layout.css";

const Layout = () => {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/Roulette">RoulettePage</Link>
					</li>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/BlackJack">BlackJack</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</>
	);
};

export default Layout;
