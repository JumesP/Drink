import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import "./styles.css";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid black;
`;

const Wheel = styled.div`
	width: 300px;
	height: 300px;
	border: 10px solid #333;
	border-radius: 50%;
	position: relative;
	animation: ${(props) =>
		props.spinning
			? css`
					${spin} 2s linear infinite
				`
			: "none"};
	transform: ${(props) => `rotate(${props.angle}deg)`};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Number = styled.div`
	position: absolute;
	width: 30px;
	height: 30px;
	background-color: ${(props) => props.color};
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-weight: bold;
	transform: rotate(${(props) => props.angle}deg) translate(130px)
		rotate(-${(props) => props.angle}deg);
`;

const numbers = [
	{ number: "0", color: "green" },
	{ number: "00", color: "green" },
	{ number: 1, color: "red" },
	{ number: 2, color: "black" },
	{ number: 3, color: "red" },
	{ number: 4, color: "black" },
	{ number: 5, color: "red" },
	{ number: 6, color: "black" },
	{ number: 7, color: "red" },
	{ number: 8, color: "black" },
	{ number: 9, color: "red" },
	{ number: 10, color: "black" },
	{ number: 11, color: "black" },
	{ number: 12, color: "red" },
	{ number: 13, color: "black" },
	{ number: 14, color: "red" },
	{ number: 15, color: "black" },
	{ number: 16, color: "red" },
	{ number: 17, color: "black" },
	{ number: 18, color: "red" },
	{ number: 19, color: "red" },
	{ number: 20, color: "black" },
	{ number: 21, color: "red" },
	{ number: 22, color: "black" },
	{ number: 23, color: "red" },
	{ number: 24, color: "black" },
	{ number: 25, color: "red" },
	{ number: 26, color: "black" },
	{ number: 27, color: "red" },
	{ number: 28, color: "black" },
	{ number: 29, color: "black" },
	{ number: 30, color: "red" },
	{ number: 31, color: "black" },
	{ number: 32, color: "red" },
	{ number: 33, color: "black" },
	{ number: 34, color: "red" },
	{ number: 35, color: "black" },
	{ number: 36, color: "red" },
];

const Roulette = () => {
	const [spinning, setSpinning] = useState(false);
	const [result, setResult] = useState(null);
	const [angle, setAngle] = useState(0);

	const handleSpin = () => {
		setSpinning(true);
		const randomIndex = Math.floor(Math.random() * numbers.length);
		const randomAngle = 360 - (360 / numbers.length) * randomIndex - 90;
		setTimeout(() => {
			setSpinning(false);
			setAngle(randomAngle);
			setResult(numbers[randomIndex].number);
		}, 2000); // Stop spinning after 2 seconds
	};

	return (
		<Container>
			<p className="pointer">V</p>
			<Wheel spinning={spinning} angle={angle}>
				{numbers.map((num, index) => (
					<Number
						key={num.number}
						color={num.color}
						angle={(360 / numbers.length) * index}
					>
						{num.number}
					</Number>
				))}
			</Wheel>
			<button onClick={handleSpin} className="spinnerButton">Spin</button>
			{result !== null && <p>Result: {result}</p>}
		</Container>
	);
};

export default Roulette;
