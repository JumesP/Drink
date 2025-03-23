import CardTable from "./index";

export default {
	title: "BlackJack/CardTable",
	component: CardTable,
};

const Template = (args) => <CardTable {...args} />;

export const SmallTable = Template.bind({});
SmallTable.args = {};
