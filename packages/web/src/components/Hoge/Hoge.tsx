import type { FC } from "react";
import { className } from "./Hoge.css";

type Props = {
  text: string;
  onChange?: (text: string) => void;
};

export const Hoge: FC<Props> = ({ text, onChange }) => {
  const onChangeHandler = () => onChange?.(text);

  return (
    <label className={className}>
      {text}
      <input type="checkbox" onChange={onChangeHandler} />
    </label>
  );
};
