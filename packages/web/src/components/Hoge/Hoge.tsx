import type { FC } from "react";

type Props = {
  text: string;
};

export const Hoge: FC<Props> = ({ text }) => {
  return <div>{text}</div>;
};
