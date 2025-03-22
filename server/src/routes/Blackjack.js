const express = require("express");
const router = express.Router();

const Card = require("../classes/cards.js");
const Hand = require("../classes/hand.js");
const BJPlayer = require("../classes/BJPlayer.js");
const BJDealer = require("../classes/BJDealer.js");
const BlackJackGame = require("../classes/BJGame.js");

let Game;

router.post("/game", (req, res) => {
    console.log("Game has started");

    const structureOfGame = {
        // for mental
        dealer: [
            { value: "A", suit: "spades" },
            { value: "2", suit: "clubs" },
        ],
        players: {
            names: ["Jimbob", "Liam", "Sienna", "Dylan"],
            hands: [
                {
                    owner: "Jimbob",
                    hand: [
                        { value: "A", suit: "spades" },
                        { value: "2", suit: "clubs" },
                    ],
                    total: 13,
                    status: "In Play",
                },
                {
                    owner: "Liam",
                    hand: [
                        { value: "K", suit: "hearts" },
                        { value: "Q", suit: "diamonds" },
                    ],
                    total: 20,
                    status: "Stand",
                },
                {
                    owner: "Sienna",
                    hand: [
                        { value: "5", suit: "hearts" },
                        { value: "5", suit: "diamonds" },
                    ],
                    total: 10,
                    status: "In Play",
                },
                {
                    owner: "Dylan",
                    hand: [
                        { value: "10", suit: "clubs" },
                        { value: "J", suit: "spades" },
                    ],
                    total: 20,
                    status: "Bust",
                },
            ],
        },
    };

    const { players, dealer } = req.body;
});

router.get("/generateHand", (req, res) => {
    console.log("Card is being generated");
    let FirstCard = Card.generateCard();
    let SecondCard = Card.generateCard();
    let PairOfCards = new Hand(FirstCard.getCard(), SecondCard.getCard());

    console.log("Hand has been generated");
    console.log(PairOfCards.getHand());

    try {
        res.json(PairOfCards.getHand());
    } catch {
        res.status(500).send("Error");
    }

    return {
        Owner: "Hand Owner",
        Hand: PairOfCards.getHand(),
        Total: PairOfCards.handTotal(),
    };
});

router.post("/dealHands", (req, res) => {
    console.log("Dealing Hands");
    const { players } = req.body;
    console.log("For " + players.length + " players");
    console.log("--------------------");

    let hands = [];

    for (let i = 0; i < players.length; i++) {
        let FirstCard = Card.generateCard();
        let SecondCard = Card.generateCard();
        let PairOfCards = new Hand(FirstCard, SecondCard);

        let Player = new BJPlayer(
            players[i],
            PairOfCards,
            PairOfCards.handTotal(),
            (status = "In Play"),
        );

        hands.push(Player.getPlayerDetails());
    }

    // Dealer's Hand
    let FirstCard = Card.generateCard();
    // let SecondCard = Card.generateCard();
    let PairOfCards = new Hand(FirstCard);

    let dealerHand = new BJDealer(
        "Dealer",
        PairOfCards,
        PairOfCards.handTotal(),
    );

    // Print Confirmation
    // console.log("\nHands have been dealt");
    // console.log(hands);
    // console.log("\nFirst Hand: ");
    // console.log(hands[0].cards);
    // console.log("\nDealers Hand: ");
    // console.log(dealerHand);

    // Create Game
    console.log("Hands", hands);
    Game = new BlackJackGame(dealerHand.getDealerDetails(), hands);
    console.log("\nGame has been created");
    console.log(Game.getAllData());

    // Return to Front End
    try {
        res.json(Game.getAllData());
    } catch {
        res.status(500).send("Error");
    }
});

router.post("/hit", (req, res) => {
    console.log("Player is hitting");

    const { player } = req.body;
    console.log("Player: " + player);

    let newCard = Card.generateCard();
    console.log("New Card: ");
    console.log(newCard);

    // add new card to the player's hand within the game class here
    // send the game class back to the front end

    Game.addCardToPlayer(player, newCard);

    try {
        res.json(Game.getAllData());
    } catch {
        res.status(500).send("Error");
    }
});

router.post("/stand", (req, res) => {
    console.log("Player is standing");

    const { player } = req.body;
    console.log("Player: " + player);

    // set the player's status to "Stand" within the game class here
    // send the game class back to the front end

    Game.StandPlayer(player);

    try {
        res.json(Game.getAllData());
    } catch {
        res.status(500).send("Error");
    }
});

module.exports = router;
