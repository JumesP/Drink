import React from "react";
import styled from "styled-components";
import "./styles.css";
import Card from "../Card/index";

const GroupOfCards = ({ name, cards, total, status, onHit, onStand }) => {
    const StyledGroupOfCardsAll = styled.div`
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      max-width: 320px;

      border: 1px solid black;
      border-radius: 5px;
    `;

    const StyledGroupOfCards = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

      border: 1px solid black;
      border-radius: 5px;
    `;

    const StyledCardWrapper = styled.div`
        flex: 0 0 50%;
        display: flex;
        justify-content: center;
    `;

    const StyledButtonCluster = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `;


    console.log(name);
    console.log(cards);
    console.log(total);

    const canSplit = () => {
        if (cards.length !== 2) return false;
        const cardValues = ["10", "J", "Q", "K"];
        return (
            cards[0].value === cards[1].value ||
            (cardValues.includes(cards[0].value) && cardValues.includes(cards[1].value))
        );
    };

    return (
		<StyledGroupOfCardsAll>
			<h2>{name}</h2>
			<StyledGroupOfCards>
				{cards.map((card, index) => (
					<StyledCardWrapper key={index}>
						<Card card={card} />
					</StyledCardWrapper>
				))}
			</StyledGroupOfCards>
			<p>{total}</p>
			{status === "In Play" &&
				<StyledButtonCluster>
					<button onClick={() => onHit(name)}>Hit</button>
					<button onClick={() => onStand(name)}>Stand</button>
					{canSplit() && <button>Split</button>}
					<button>Beat up Dealer</button>
				</StyledButtonCluster>
			}
			<p>{status}</p>
		</StyledGroupOfCardsAll>
	);
}

export default GroupOfCards;