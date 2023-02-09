import { renderWithProviders } from "../store/utils/test-utils";
import { paymentMock } from "../mocks/payment-mock";

import { PaymentsListItem } from "../components/PaymentsListItem";

describe("Payments list item", () => {
  const prop = paymentMock.items[0];
  it("renders item", () => {
    const { getByText } = renderWithProviders(<PaymentsListItem item={prop} />);

    const status = getByText(prop.status);
    expect(status).toBeInTheDocument();
  });

  it("sets correct currency", () => {
    const { getByText } = renderWithProviders(<PaymentsListItem item={prop} />);

    const amount = getByText(`£${prop.amount}`);
    expect(amount).toBeInTheDocument();
  });
});
