import React, { useState, useEffect } from "react";

import Page from "../components/page";

import CardTable from "../components/BlackJack/CardTable";
import GroupOfCards from "../components/BlackJack/GroupOfCards";

import ResultContainer from "../components/BlackJack/ResultContainer";

const BlackJackPage = () => {
	const [playersAmount, setPlayersAmount] = useState("");
	const [playerNames, setPlayerNames] = useState([]);
	const [showPlayerInputs, setShowPlayerInputs] = useState(false);
	const [allData, setAllData] = useState(null);
	const [results, setResults] = useState(false);

	const handlePlayersAmountSubmit = (event) => {
		event.preventDefault();
		const amount = parseInt(playersAmount, 10);
		if (amount > 0) {
			setPlayerNames(Array(amount).fill(""));
			setShowPlayerInputs(true);
		}
	};

	const handlePlayerNameChange = (index, value) => {
		const newPlayerNames = [...playerNames];
		newPlayerNames[index] = value;
		setPlayerNames(newPlayerNames);
	};

	const handlePlayerNamesSubmit = (event) => {
		event.preventDefault();
		fetch("/blackjackRouter/dealHands", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ players: playerNames }),
		})
			.then((response) => response.json())
			.then((data) => {
				setAllData(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleHit = (playerName) => {
		fetch("/blackjackRouter/hit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ player: playerName }),
		})
			.then((response) => response.json())
			.then((data) => {
				setAllData(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleStand = (playerName) => {
		fetch("/blackjackRouter/stand", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ player: playerName }),
		})
			.then((response) => response.json())
			.then((data) => {
				setAllData(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const handleSplit = (playerName) => {
		fetch("/blackjackRouter/split", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ player: playerName }),
		})
			.then((response) => response.json())
			.then((data) => {
				setAllData(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	useEffect(() => {
		// This effect will run every time allData is updated
		console.log("allData has been updated", allData);
		if (allData && allData.results) {
			setResults(true);
		}
	}, [allData]);

	return (
		<Page>
			<div>
				<h1>BlackJack</h1>
				<p>Dealer must stand on 17 and must draw to 16</p>
			</div>
			{!showPlayerInputs ? (
				<form onSubmit={handlePlayersAmountSubmit}>
					<label>
						Players Amount:
						<input
							type="number"
							name="playersAmount"
							value={playersAmount}
							onChange={(e) => setPlayersAmount(e.target.value)}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
			) : (
				<form onSubmit={handlePlayerNamesSubmit}>
					{playerNames.map((name, index) => (
						<div key={index}>
							<label>
								Player {index + 1} Name:
								<input
									type="text"
									value={name}
									onChange={(e) =>
										handlePlayerNameChange(
											index,
											e.target.value,
										)
									}
								/>
							</label>
						</div>
					))}
					<input type="submit" value="Submit Players" />
				</form>
			)}
			{allData && (
				<CardTable
					allGameData={allData}
					handleHit={handleHit}
					handleStand={handleStand}
					handleSplit={handleSplit}
				/>
			)}
			{results && allData && allData.results && (
				<ResultContainer results={allData.results} />
			)}
		</Page>
	);
};

export default BlackJackPage;
