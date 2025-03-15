import React from "react";
import Roulette from "./index";

export default {
	title: "Components/Roulette",
	component: Roulette,
};

const Template = (args) => <Roulette {...args} />;

export const Default = Template.bind({});
Default.args = {};
