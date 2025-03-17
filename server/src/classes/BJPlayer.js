class BJPlayer {
    constructor(name, cards, total, status) {
        this.name = name;   // string
        this.cards = cards; // array of objects
        this.total = total; // int
        this.status = status;    // "In Play", "Stand", "Bust"
    }

    //getters
    getPlayerDetails() {
        return { name: this.name, cards: this.cards, total: this.total, status: this.status };
    }

    //setters
    addCard(card) {
        this.cards.push(card);
    }

    setTotal(total) {
        this.total = total;
    }
}

module.exports = BJPlayer;