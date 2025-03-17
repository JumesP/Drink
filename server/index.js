const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5002;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const apiRouter = require("./src/routes/api");
app.use("/api", apiRouter);

const RouletteRouter = require("./src/routes/Roulette");
app.use("/rouletteRouter", RouletteRouter);

const BlackJackRouter = require("./src/routes/Blackjack");
app.use("/blackjackRouter", BlackJackRouter);

app.get("/api", (req, res) => {
    res.json("Hello World!");
});

app.get("/getProducts", (req, res) => {
    const products = [
        {
            title: "Product 1",
            price: 100,
            description: "This is a description for product 1",
            image: "https://via.assets.so/furniture.png?id=1&q=95&w=360&h=360&fit=fill",
            rating: 4.5,
        },
        {
            title: "Product 2",
            price: 200,
            description: "This is a description for product 2",
            image: "https://via.assets.so/shoe.png?id=1&q=95&w=360&h=360&fit=fill",
            rating: 4.7,
        },
        {
            title: "Product 3",
            price: 300,
            description: "This is a description for product 3",
            image: "https://via.assets.so/watch.png?id=1&q=95&w=360&h=360&fit=fill",
            rating: 4.9,
        },
    ];

    res.json(products);
});

app.listen(port, () => {
    console.log("Server is running on port " + port + "...");
});
