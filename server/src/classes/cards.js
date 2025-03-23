// server/classes/Card.js

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }


    getCard() {
        return { value: this.value, suit: this.suit };
    }

    getValue() {
        return this.value;
    }

    getSuit() {
        return this.suit;
    }

    static generateCard() {
        const suits = ["hearts", "diamonds", "clubs", "spades"];
        const values = [
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
            "J",
            "Q",
            "K",
        ];
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        const randomValue = values[Math.floor(Math.random() * values.length)];
        return new Card(randomValue, randomSuit);
    }

    static generateSpecificCard(value) {
        const suits = ["hearts", "diamonds", "clubs", "spades"];
        const values = [
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
            "J",
            "Q",
            "K",
        ];

        return new Card(value, "hearts");
    }

    //static functions
    static getCardValue(value) {
        if (value === "A") {
            return 1;
        } else if (value === "K" || value === "Q" || value === "J") {
            return 10;
        } else {
            return parseInt(value);
        }
    }
}

module.exports = Card;
