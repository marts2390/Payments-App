import { screen } from "@testing-library/react";
import { renderWithProviders } from "../store/utils/test-utils";

import App from "../App";

test("App screen renders", () => {
  renderWithProviders(<App />);

  const linkElement = screen.getByText(/Vyne App/i);
  expect(linkElement).toBeInTheDocument();
});
