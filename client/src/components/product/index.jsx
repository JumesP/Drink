import React, { useState, useEffect } from "react";
import "./styles.css";

const Product = (item, ...props) => {
	const item2 = item.item;

	const content = {
		name: item2.name,
		price: item2.price,
		description: item2.description,
		image: item2.image,
		rating: item2.rating,
	};

	return (
		<div className="product">
			<h3 className="productHeader">{content.name}</h3>
			<div>
				<img
					src={content.image}
					alt={content.name}
					className="productImage"
				/>
			</div>
			<div>
				<p>${content.price}</p>
				<p>Description: {content.description}</p>
				<p>rating: {content.rating}</p>
			</div>
			<div>
				<button>Add to Cart</button>
				<button>Add to Wishlist</button>
			</div>
		</div>
	);
};

export default Product;
