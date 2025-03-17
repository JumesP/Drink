class BJDealer {
    constructor(name, hand, total) {
        this.name = name;   // string
        this.cards = hand; // array of objects
        this.total = total; // int
    }

    //getters
    getDealerDetails() {
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

module.exports = BJDealer;