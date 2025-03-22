// server/classes/Hand.js
const Card = require("./cards");

class Hand {
    constructor(FirstCard, SecondCard) {
        this.cards = [FirstCard, SecondCard || "None"];
    }

    // getters

    getHand() {
        console.log(this.cards);

        const returnableCard = this.cards.map((card) => {
            if (card === "None") {
                return card;
            }
            return card.getCard();
        })

        return returnableCard;
    }

    // setters

    addCard(card) {
        this.cards.push(card);
    }

    handTotal() {
        //	Get cards values
        let cardsValues = [];
        let total = 0;
        let totalAces = 0;

        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i] === "None") {
                continue;
            }

            let cardValue = this.cards[i].getValue();

            if (cardValue === "A") {
                totalAces += 1;
            }

            cardValue = Card.getCardValue(cardValue); //	Give face cards Values

            cardsValues.push(cardValue); //	Add them together
            total += cardValue;
        }

        console.log("Total Aces: " + totalAces);

        //	Drop Ace value from 11 to 1 if over 21
        if (totalAces > 0) {
            console.log("true");
            for (let A = 0; A < totalAces; A++) {
                console.log("Ace");
                if (total < 21) {
                    total += 10;
                } else {
                    break;
                }
            }
        }

        return total;
    }

    //static functions
    static generateHand() {}

    static generateCard() {
        const suits = ["hearts", "diamonds", "clubs", "spades"];
        const cards = [
            "A",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "K",
            "Q",
            "J",
        ];
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        return new Card(randomCard, randomSuit);
    }
}

module.exports = Hand;
