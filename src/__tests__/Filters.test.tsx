import { renderWithProviders } from "../store/utils/test-utils";
import { AppContext, AppContextProps } from "../context/AppContext";

import { Filters } from "../components/Filters";
import { fireEvent, within } from "@testing-library/react";

const contextDefaults: AppContextProps = {
  updateFilters: jest.fn(),
  filters: {
    paymentStatus: "",
    from: undefined,
    to: undefined,
  },
};

describe("Filters", () => {
  it("renders", () => {
    const { getByText } = renderWithProviders(<Filters />);

    const text = getByText("Filter by Date");
    expect(text).toBeInTheDocument();
  });

  it("select updates context ", async () => {
    const { getAllByRole, getByRole } = renderWithProviders(
      <AppContext.Provider value={contextDefaults}>
        <Filters />
      </AppContext.Provider>
    );

    const select = getAllByRole("button")[0];

    fireEvent.mouseDown(select);

    const listbox = within(getByRole("listbox"));

    fireEvent.click(listbox.getByText("CREATED"));

    expect(contextDefaults.updateFilters).toHaveBeenCalled();
  });
});
