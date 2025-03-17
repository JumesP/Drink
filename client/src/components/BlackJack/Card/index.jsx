import react from "react";
import styled from "styled-components";

const Card = ({ card }) => {
    let { value, suit } = card;

    switch (suit) {
        case "hearts":
            suit = "♥";
            break;
        case "diamonds":
            suit = "♦";
            break;
        case "clubs":
            suit = "♣";
            break;
        case "spades":
            suit = "♠";
            break;
        default:
            break;
    }

    const StyledCard = styled.div`
        background-color: white;
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        width: 100px;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `;

    const StyledValue = styled.div`
        font-size: 20px;
    `;

    const StyledSuit = styled.div`
        font-size: 20px;
    `;

    return (
        <StyledCard>
            <StyledValue>{value}</StyledValue>
            <StyledSuit>{suit}</StyledSuit>
        </StyledCard>
    );
}

export default Card;