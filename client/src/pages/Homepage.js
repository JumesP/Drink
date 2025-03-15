import React, { useEffect, useState } from "react";
import "./styles/styles.css";
import Product from "../components/product";

const Homepage = () => {
	const [content, setContent] = useState("");
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setContent(data));
	}, []);

	useEffect(() => {
		fetch("/getProducts")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	const product1 = {
		name: "product",
		price: 10,
		description: "This is a product",
		image: "https://via.assets.so/movie.png?id=1&q=95&w=360&h=360&fit=fill",
		rating: 5,
	};

	console.log("Homepage content:");
	console.log(products);

	return (
		<div className="Homepage">
			<h1>Homepage</h1>
			<p>{content}</p>
			<div className="products">
				{products.map((product) => (
					<Product item={product} />
				))}
				<Product item={product1} />
				<Product item={product1} />
				<Product item={product1} />
			</div>
		</div>
	);
};

export default Homepage;
