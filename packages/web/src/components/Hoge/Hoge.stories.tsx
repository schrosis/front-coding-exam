import type { Meta, StoryObj } from "@storybook/react";
import { Hoge } from "./Hoge";

const meta: Meta<typeof Hoge> = {
  component: Hoge,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Hoge>;

export const Default: Story = {
  args: {
    text: "hoge",
  },
};
