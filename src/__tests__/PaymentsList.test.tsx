import { screen } from "@testing-library/react";
import { paymentMock } from "../mocks/payment-mock";

import { PaymentLists } from "../components/PaymentsList";
import { renderWithProviders } from "../store/utils/test-utils";

describe("Payment list screen", () => {
  it("renders no items", () => {
    renderWithProviders(<PaymentLists />);

    const noItems = screen.getByText("No Items");
    expect(noItems).toBeInTheDocument();
  });

  it("renders with items", () => {
    const { getAllByRole } = renderWithProviders(<PaymentLists />, {
      preloadedState: {
        payments: {
          loading: false,
          error: null,
          data: paymentMock,
        },
      },
    });

    const listItems = getAllByRole("list");
    expect(listItems.length).toEqual(5)
  });
});
