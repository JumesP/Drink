var Card = require("./cards");
var BlackJackGame = /** @class */ (function () {
    function BlackJackGame(dealer, players) {
        this.dealer = dealer;
        this.players = players;
    }
    //getters
    BlackJackGame.prototype.getAllData = function () {
        return {
            dealerhand: this.dealer,
            hand: this.players
        };
    };
    //setter
    BlackJackGame.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    BlackJackGame.prototype.addCardToDealer = function (card) {
        this.dealer.cards.push(card);
        var cardValue = Card.getCardValue(card.value);
        this.dealer.total += cardValue;
        this.BustChecker("Dealer");
    };
    BlackJackGame.prototype.addCardToPlayer = function (player, card) {
        this.players.forEach(function (p) {
            if (p.name === player) {
                p.cards.push(card);
                var cardValue = Card.getCardValue(card.value);
                p.total += cardValue;
            }
        });
        this.BustChecker(player);
        if (this.CheckIfAnyPlayersRemainPlaying()) {
            // start Dealer's Turn
            this.DealersTurn();
        }
    };
    ;
    BlackJackGame.prototype.StandPlayer = function (player) {
        this.players.forEach(function (p) {
            if (p.name === player) {
                p.status = "Stay";
            }
        });
        if (this.CheckIfAnyPlayersRemainPlaying()) {
            // start Dealer's Turn
            this.DealersTurn();
        }
    };
    BlackJackGame.prototype.BustChecker = function (player) {
        this.players.forEach(function (p) {
            if (p.name === player) {
                while (p.total > 21 && p.cards.some(function (card) { return card.value === "A"; })) {
                    p.cards.forEach(function (card) {
                        if (card.value === "A" && p.total > 21) {
                            card.value = 1; // Change Ace value to 1
                            p.total -= 10; // Adjust total score
                        }
                    });
                }
                if (p.total > 21) {
                    p.status = "Busted";
                }
                else if (p.total === 21) {
                    p.status = "BlackJack";
                }
            }
        });
    };
    BlackJackGame.prototype.CheckIfAnyPlayersRemainPlaying = function () {
        var players = this.players.filter(function (p) { return p.status === "In Play"; });
        console.log("Players Remaining: ", players.length);
        return players.length === 0;
    };
    BlackJackGame.prototype.DealersTurn = function () {
        while (this.dealer.total < 17) {
            // Get a new card
            this.addCardToDealer(Card.generateCard());
            console.log("Dealer's Total: ", this.dealer.total);
        }
        if (this.dealer.total > 21) {
            this.dealer.status = "Busted";
        }
        else if (this.dealer.total === 21) {
            this.dealer.status = "BlackJack";
        }
        else {
            this.dealer.status = "Stay";
        }
        this.CheckWinners();
    };
    BlackJackGame.prototype.CheckWinners = function () {
        var winners = this.players.filter(function (p) { return p.status === "BlackJack" || p.status === "Stay"; });
        var dealer = this.dealer;
        var dealerScore = dealer.total;
        var dealerStatus = dealer.status;
        winners.forEach(function (p) {
            var playerScore = p.total;
            var playerStatus = p.status;
            if (dealerStatus === "Busted") {
                // Player Wins
                p.status = "Won";
            }
            else if (playerStatus === "BlackJack") {
                // Player Wins
                p.status = "Won";
            }
            else if (playerScore > dealerScore) {
                // Player Wins
                p.status = "Won";
            }
            else if (playerScore === dealerScore) {
                // Push
                p.status = "Drew";
            }
            else {
                // Dealer Wins
                p.status = "Lost";
            }
        });
    };
    return BlackJackGame;
}());
module.exports = BlackJackGame;
