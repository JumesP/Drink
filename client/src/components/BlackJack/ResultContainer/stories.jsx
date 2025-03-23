import ResultContainer from "./index";

export default {
    title: "Components/BlackJack/ResultContainer",
    component: ResultContainer,
};

const Template = (args) => <ResultContainer {...args} />;
export const Default = Template.bind({});

Default.args = {
    results: [
        { player: "Player 1", drinks: 1 },
        { player: "Player 2", drinks: 2 },
    ]
};
