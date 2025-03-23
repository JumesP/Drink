class BJDealer {
    constructor(name, hand, total) {
        this.name = name; // string
        this.cards = hand; // array of objects
        this.total = total; // int
        this.status = "In Play"; // string
    }

    //getters
    getDealerDetails() {
        return {
            name: this.name,
            cards: this.cards,
            total: this.total,
            status: this.status,
        };
    }

    //setters
    setTotal(total) {
        this.total = total;
    }
}

module.exports = BJDealer;
