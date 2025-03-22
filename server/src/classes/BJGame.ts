const Card = require("./cards");
const Hand = require("./hand");

type Players = Player[];

type Dealer = {
    name: string;
    cards: Hand;
    total: number;
    status: "In Play" | "Busted" | "Stay" | "BlackJack";
};

type Player = {
    name: string;
    cards: Hand;
    total: number;
    status:
        | "In Play"
        | "Busted"
        | "Stay"
        | "BlackJack"
        | "Won"
        | "Lost"
        | "Drew";
};

type Hand = typeof Hand;

type Card = {
    value: "A" | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "Q" | "K";
    suit: "Hearts" | "Diamonds" | "Clubs" | "Spades";
};

class BlackJackGame {
    private dealer: Dealer;
    private players: Players;
    constructor(dealer: Dealer, players: Players) {
        this.dealer = dealer;
        this.players = players;
    }

    //getters
    getAllData() {
        return {
            dealerhand: this.dealer,
            hand: this.players
        }
    }

    //setter

    addPlayer(player: Player) {
        this.players.push(player);
    }

    addCardToDealer(card: Card) {
        this.dealer.cards.push(card);
        let cardValue = Card.getCardValue(card.value);
        this.dealer.total += cardValue;

        this.BustChecker("Dealer");
    }

    addCardToPlayer(player: string, card: Card) {
        this.players.forEach((p) => {
            if (p.name === player) {
                p.cards.push(card);
                let cardValue = Card.getCardValue(card.value);
                p.total += cardValue;
            }
        });

        this.BustChecker(player);
        if (this.CheckIfAnyPlayersRemainPlaying()) {
            // start Dealer's Turn
            this.DealersTurn();
        }
    }

    StandPlayer(player: string) {
        this.players.forEach((p) => {
            if (p.name === player) {
                p.status = "Stay";
            }
        });

        if (this.CheckIfAnyPlayersRemainPlaying()) {
            // start Dealer's Turn
            this.DealersTurn();
        }
    }

    BustChecker(player: string) {
        this.players.forEach((p) => {
            if (p.name === player) {
                while (
                    p.total > 21 &&
                    p.cards.some((card) => card.value === "A")
                ) {
                    p.cards.forEach((card) => {
                        if (card.value === "A" && p.total > 21) {
                            card.value = 1 as any; // Change Ace value to 1
                            p.total -= 10; // Adjust total score
                        }
                    });
                }
                if (p.total > 21) {
                    p.status = "Busted";
                } else if (p.total === 21) {
                    p.status = "BlackJack";
                }
            }
        });
    }

    CheckIfAnyPlayersRemainPlaying() {
        let players = this.players.filter((p) => p.status === "In Play");
        console.log("Players Remaining: ", players.length);
        return players.length === 0;
    }

    DealersTurn() {
        while (this.dealer.total < 17) {
            // Get a new card
            this.addCardToDealer(Card.generateCard());
            console.log("Dealer's Total: ", this.dealer.total);
        }

        if (this.dealer.total > 21) {
            this.dealer.status = "Busted";
        } else if (this.dealer.total === 21) {
            this.dealer.status = "BlackJack";
        } else {
            this.dealer.status = "Stay";
        }

        this.CheckWinners();
    }

    CheckWinners() {
        let winners = this.players.filter(
            (p) => p.status === "BlackJack" || p.status === "Stay",
        );
        let dealer = this.dealer;
        let dealerScore = dealer.total;
        let dealerStatus = dealer.status;

        winners.forEach((p) => {
            let playerScore = p.total;
            let playerStatus = p.status;

            if (dealerStatus === "Busted") {
                // Player Wins
                p.status = "Won";
            } else if (playerStatus === "BlackJack") {
                // Player Wins
                p.status = "Won";
            } else if (playerScore > dealerScore) {
                // Player Wins
                p.status = "Won";
            } else if (playerScore === dealerScore) {
                // Push
                p.status = "Drew";
            } else {
                // Dealer Wins
                p.status = "Lost";
            }
        });
    }
}

module.exports = BlackJackGame;
