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
    private originalPlayers: String[];
    private drinkCalculations: any = null;

    constructor(dealer: Dealer, players: Players, originalPlayers: String[]) {
        this.dealer = dealer;
        this.players = players;
        this.originalPlayers = originalPlayers;
    }

    //getters
    getAllData() {
        const updatedPlayers = this.players.map((player) => {
            return {
                ...player,
                cards: player.cards.getHand(),
            };
        });

        const updatedDealer = {...this.dealer, cards: this.dealer.cards.getHand()};

        return {
            dealerhand: updatedDealer,
            hand: updatedPlayers,
            results: this.drinkCalculations,
        };
    }

    //setter
    addPlayer(player: Player) {
        this.players.push(player);
    }

    addCardToDealer(card: Card) {
        // this.dealer.cards.push(card);
        // let cardValue = Card.getCardValue(card.value);
        // this.dealer.total += cardValue;

        this.dealer.cards.addCard(card);
        this.dealer.total = this.dealer.cards.handTotal();

        this.BustChecker("Dealer");
    }

    addCardToPlayer(player: string, card: Card) {
        this.players.forEach((p) => {
            if (p.name === player) {
                // p.cards.push(card);
                // let cardValue = Card.getCardValue(card.value);
                // p.total += cardValue;
                p.cards.addCard(card);
                p.total = p.cards.handTotal();
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

    SplitPlayer(player: string) {

        console.log("Splitting Player: ", player);
        console.log(this.getAllData())
        console.log("concludes data")
        console.log(this.players)
        console.log("concludes players")

        this.players.forEach((p) => {
            if (p.name === player) {

                const newHand = p.cards.SplitHand();

                // split must ensure the new player name is unique
                let splitIndex = 1;
                let newPlayerName = `${player} ${splitIndex}`;
                while (this.players.some((p) => p.name === newPlayerName)) {
                    splitIndex++;
                    newPlayerName = `${player} ${splitIndex}`;
                }

                let newPlayer: Player = {
                    name: newPlayerName,
                    cards: newHand,
                    total: newHand.handTotal(),
                    status: "In Play",
                };
                this.players.splice(this.players.indexOf(p) + 1, 0, newPlayer);

                p.total = p.cards.handTotal();

                // old player needs to be recalculated
            }
        });
    }

    BustChecker(player: string) {
        this.players.forEach((p) => {
            if (p.name === player) {
                // while (
                //     p.total > 21 &&
                //     p.cards.getHand().some((card) => card.value === "A") // BROKEN??
                // ) {
                //     // p.cards.forEach((card) => {
                //     //     if (card.value === "A" && p.total > 21) {
                //     //         // card.value = 1 as any; // Change Ace value to 1
                //     //         p.total -= 10; // Adjust total score
                //     //     }
                //     // });
                // }
                if (p.total > 21) {
                    p.status = "Busted";
                } else if (p.total === 21) {
                    p.status = "BlackJack";
                } else {
                    p.status = "In Play";
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
                p.status = "BlackJack";
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

        this.GenerateScores();
    }

    GenerateScores() {
        console.log("Generating Scores");
        const Drinks = [];

        // iterate the original names, collect the status of each of their splits and determine how many drinks are offered based on all split hands
        this.originalPlayers.forEach((player: string) => {
            let playerTotal = 0;
            console.log("Player: ", player);
            for (const p of this.players.filter((p) => p.name.includes(player))) {
                switch (p.status) {
                    case "BlackJack":
                        playerTotal += 2;
                        break;
                    case "Won":
                        playerTotal += 1;
                        break;
                    case "Lost":
                        playerTotal -= 1;
                        break;
                    case "Drew":
                        break;
                    default:
                        break;
                }
            }
            Drinks.push({player: player, drinks: playerTotal});
        });
        this.drinkCalculations = Drinks;
    }
}

module.exports = BlackJackGame;
