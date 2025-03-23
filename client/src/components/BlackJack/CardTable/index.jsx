import react from "react";
import styled from "styled-components";
import Card from "../Card";
import React from "react";
import GroupOfCards from "../GroupOfCards";

// this all the card on the table
// dealing with the funky ass data

const CardTable = ({ allGameData, handleHit, handleStand, handleSplit }) => {
	const allGameDataStructure = {
		dealerHand: {
			Owner: "Dealer",
			Hand: [
				{
					value: "4",
					suit: "hearts",
				},
				"None",
			],
			Total: 4,
		},
		hands: [
			{
				Name: "s",
				cards: [
					{
						value: "4",
						suit: "hearts",
					},
					{
						value: "4",
						suit: "hearts",
					},
				],
				total: 10,
			},
			{
				Name: "s2",
				cards: [
					{
						value: "4",
						suit: "hearts",
					},
					{
						value: "4",
						suit: "hearts",
					},
				],
				total: 10,
			},
		],
	};

	const dealerData = allGameData.dealerhand;
	const playerData = allGameData.hand;

	const StyledGameTable = styled.div`
		background-color: #357a14;
		width: fit-content;
		height: fit-content;

		display: flex;
		flex-direction: row;

		border: 1px solid black;
	`;

	const StyledDealerSide = styled.div`
		display: flex;
	`;

	const StyledPlayerSide = styled.div`
		display: flex;
	`;

	// console.log("\n\n\n\n")
	// console.log(allGameData)
	// console.log("\n\n\n\n")
	// console.log(dealerData)
	// console.log(playerData)

	return (
		<StyledGameTable>
			<StyledDealerSide>
				<GroupOfCards
					name={dealerData.name}
					cards={dealerData.cards}
					total={dealerData.total}
					status={dealerData.status}
				/>
			</StyledDealerSide>

			<StyledPlayerSide>
				{playerData.map((hands, index) => (
					<GroupOfCards
						name={hands.name}
						cards={hands.cards}
						total={hands.total}
						status={hands.status}
						onHit={handleHit}
						onStand={handleStand}
						onSplit={handleSplit}
					/>
				))}
			</StyledPlayerSide>
		</StyledGameTable>
	);
};

export default CardTable