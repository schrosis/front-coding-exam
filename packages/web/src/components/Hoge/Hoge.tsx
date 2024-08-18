import type { FC } from "react";
import { className } from "./Hoge.css";

type Props = {
  text: string;
};

export const Hoge: FC<Props> = ({ text }) => {
  return <div className={className}>{text}</div>;
};
