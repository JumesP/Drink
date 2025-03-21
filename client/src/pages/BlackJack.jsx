import React, { useState, useEffect } from "react";
import GroupOfCards from "../components/BlackJack/GroupOfCards";
import CardTable from "../components/BlackJack/CardTable";
import Page from "../components/page";

const BlackJackPage = () => {
    const [playersAmount, setPlayersAmount] = useState("");
    const [playerNames, setPlayerNames] = useState([]);
    const [showPlayerInputs, setShowPlayerInputs] = useState(false);
    const [allData, setAllData] = useState(null);

    const handlePlayersAmountSubmit = (event) => {
        event.preventDefault();
        const amount = parseInt(playersAmount, 10);
        if (amount > 0) {
            setPlayerNames(Array(amount).fill(""));
            setShowPlayerInputs(true);
        }
    };

    const handlePlayerNameChange = (index, value) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = value;
        setPlayerNames(newPlayerNames);
    };

    const handlePlayerNamesSubmit = (event) => {
        event.preventDefault();
        fetch("/blackjackRouter/dealHands", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ players: playerNames }),
        })
        .then(response => response.json())
        .then(data => {
            setAllData(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const handleHit = (playerName) => {
        fetch("/blackjackRouter/hit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ player: playerName }),
        })
        .then(response => response.json())
        .then(data => {
            setAllData(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const handleStand = (playerName) => {
        fetch("/blackjackRouter/stand", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ player: playerName }),
        })
        .then(response => response.json())
        .then(data => {
            setAllData(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    useEffect(() => {
        // This effect will run every time allData is updated
        console.log("allData has been updated", allData);
    }, [allData]);

    return (
        <Page>
            <h1>BlackJack</h1>
            {!showPlayerInputs ? (
                <form onSubmit={handlePlayersAmountSubmit}>
                    <label>
                        Players Amount:
                        <input
                            type="number"
                            name="playersAmount"
                            value={playersAmount}
                            onChange={(e) => setPlayersAmount(e.target.value)}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            ) : (
                <form onSubmit={handlePlayerNamesSubmit}>
                    {playerNames.map((name, index) => (
                        <div key={index}>
                            <label>
                                Player {index + 1} Name:
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                                />
                            </label>
                        </div>
                    ))}
                    <input type="submit" value="Submit Players" />
                </form>
            )}
            {allData && <CardTable allGameData={allData} handleHit={handleHit} handleStand={handleStand} />}
        </Page>
    );
}

export default BlackJackPage;