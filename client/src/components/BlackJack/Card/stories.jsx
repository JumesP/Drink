import Card from "./index";

export default {
    title: "BlackJack/Card",
    component: Card,
};

const Template = (args) => <Card {...args} />;

export const AceOfSpades = Template.bind({});
AceOfSpades.args = {
    card: {
        value: "A",
        suit: "spades",
    },
};

export const TwoOfHearts = Template.bind({});
TwoOfHearts.args = {
    card: {
        value: "2",
        suit: "hearts",
    },
};

export const ThreeOfClubs = Template.bind({});
ThreeOfClubs.args = {
    card: {
        value: "3",
        suit: "clubs",
    },
};

export const FourOfDiamonds = Template.bind({});
FourOfDiamonds.args = {
    card: {
        value: "4",
        suit: "diamonds",
    },
};