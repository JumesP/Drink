import Result from "./index";

export default {
    title: "Components/BlackJack/Result",
    component: Result,
};

const Template = (args) => <Result {...args} />;
export const Default = Template.bind({});

Default.args = {
    result: {
        player: "Player 1",
        drinks: 1,
    }
};