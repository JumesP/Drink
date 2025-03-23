import GroupOfCards from "./index";

export default {
	title: "BlackJack/GroupOfCards",
	component: GroupOfCards,
};

const Template = (args) => <GroupOfCards {...args} />;

export const TwoCards = Template.bind({});
TwoCards.args = {
	name: "Player",
	cards: [
		{
			value: "A",
			suit: "spades",
		},
		{
			value: "2",
			suit: "hearts",
		},
	],
	total: 3,
};

export const ThreeCards = Template.bind({});
ThreeCards.args = {
	cards: [
		{
			value: "A",
			suit: "spades",
		},
		{
			value: "2",
			suit: "hearts",
		},
		{
			value: "3",
			suit: "clubs",
		},
	],
};

export const FourCards = Template.bind({});
FourCards.args = {
	cards: [
		{
			value: "A",
			suit: "spades",
		},
		{
			value: "2",
			suit: "hearts",
		},
		{
			value: "3",
			suit: "clubs",
		},
		{
			value: "4",
			suit: "diamonds",
		},
	],
};

export const FiveCards = Template.bind({});
FiveCards.args = {
	cards: [
		{
			value: "A",
			suit: "spades",
		},
		{
			value: "2",
			suit: "hearts",
		},
		{
			value: "3",
			suit: "clubs",
		},
		{
			value: "4",
			suit: "diamonds",
		},
		{
			value: "5",
			suit: "spades",
		},
	],
};
