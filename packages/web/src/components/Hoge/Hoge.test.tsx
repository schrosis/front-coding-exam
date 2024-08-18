import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hoge } from "./Hoge";

describe("Hoge", () => {
  test("text プロパティの文字列が表示されている", async () => {
    const text = "aaaaaaaaaaaa";
    const mockOnChange = jest.fn();

    const { getByText } = render(<Hoge text={text} onChange={mockOnChange} />);

    const dom = getByText(text);
    expect(dom).toBeInTheDocument();

    await userEvent.click(dom);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(text);
  });
});
