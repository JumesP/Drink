var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s)
                        if (Object.prototype.hasOwnProperty.call(s, p))
                            t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var Card = require("./cards");
var Hand = require("./hand");
var BlackJackGame = /** @class */ (function () {
    function BlackJackGame(dealer, players, originalPlayers) {
        this.drinkCalculations = null;
        this.dealer = dealer;
        this.players = players;
        this.originalPlayers = originalPlayers;
    }
    //getters
    BlackJackGame.prototype.getAllData = function () {
        var updatedPlayers = this.players.map(function (player) {
            return __assign(__assign({}, player), {
                cards: player.cards.getHand(),
            });
        });
        var updatedDealer = __assign(__assign({}, this.dealer), {
            cards: this.dealer.cards.getHand(),
        });
        return {
            dealerhand: updatedDealer,
            hand: updatedPlayers,
            results: this.drinkCalculations,
        };
    };
    //setter
    BlackJackGame.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    BlackJackGame.prototype.addCardToDealer = function (card) {
        // this.dealer.cards.push(card);
        // let cardValue = Card.getCardValue(card.value);
        // this.dealer.total += cardValue;
        this.dealer.cards.addCard(card);
        this.dealer.total = this.dealer.cards.handTotal();
        this.BustChecker("Dealer");
    };
    BlackJackGame.prototype.addCardToPlayer = function (player, card) {
        this.players.forEach(function (p) {
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
    };
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
    BlackJackGame.prototype.SplitPlayer = function (player) {
        var _this = this;
        console.log("Splitting Player: ", player);
        console.log(this.getAllData());
        console.log("concludes data");
        console.log(this.players);
        console.log("concludes players");
        this.players.forEach(function (p) {
            if (p.name === player) {
                var newHand = p.cards.SplitHand();
                // split must ensure the new player name is unique
                var splitIndex = 1;
                var newPlayerName_1 = "".concat(player, " ").concat(splitIndex);
                while (
                    _this.players.some(function (p) {
                        return p.name === newPlayerName_1;
                    })
                ) {
                    splitIndex++;
                    newPlayerName_1 = "".concat(player, " ").concat(splitIndex);
                }
                var newPlayer = {
                    name: newPlayerName_1,
                    cards: newHand,
                    total: newHand.handTotal(),
                    status: "In Play",
                };
                _this.players.splice(
                    _this.players.indexOf(p) + 1,
                    0,
                    newPlayer,
                );
                p.total = p.cards.handTotal();
                // old player needs to be recalculated
            }
        });
    };
    BlackJackGame.prototype.BustChecker = function (player) {
        this.players.forEach(function (p) {
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
    };
    BlackJackGame.prototype.CheckIfAnyPlayersRemainPlaying = function () {
        var players = this.players.filter(function (p) {
            return p.status === "In Play";
        });
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
        } else if (this.dealer.total === 21) {
            this.dealer.status = "BlackJack";
        } else {
            this.dealer.status = "Stay";
        }
        this.CheckWinners();
    };
    BlackJackGame.prototype.CheckWinners = function () {
        var winners = this.players.filter(function (p) {
            return p.status === "BlackJack" || p.status === "Stay";
        });
        var dealer = this.dealer;
        var dealerScore = dealer.total;
        var dealerStatus = dealer.status;
        winners.forEach(function (p) {
            var playerScore = p.total;
            var playerStatus = p.status;
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
    };
    BlackJackGame.prototype.GenerateScores = function () {
        var _this = this;
        console.log("Generating Scores");
        var Drinks = [];
        // iterate the original names, collect the status of each of their splits and determine how many drinks are offered based on all split hands
        this.originalPlayers.forEach(function (player) {
            var playerTotal = 0;
            console.log("Player: ", player);
            for (
                var _i = 0,
                    _a = _this.players.filter(function (p) {
                        return p.name.includes(player);
                    });
                _i < _a.length;
                _i++
            ) {
                var p = _a[_i];
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
            Drinks.push({ player: player, drinks: playerTotal });
        });
        this.drinkCalculations = Drinks;
    };
    return BlackJackGame;
})();
module.exports = BlackJackGame;
