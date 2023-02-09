import { renderWithProviders } from "../store/utils/test-utils";

import { Pagination } from "../components/Pagination";
import { paymentMock } from "../mocks/payment-mock";

describe("Pagination", () => {
  it("renders", () => {
    const { container } = renderWithProviders(<Pagination />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="pagination"
        >
          <button
            class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorWarning MuiIconButton-sizeMedium css-1moznky-MuiButtonBase-root-MuiIconButton-root"
            tabindex="0"
            type="button"
          >
            <svg
              aria-hidden="true"
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
              data-testid="ChevronLeftIcon"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path
                d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
              />
            </svg>
            <span
              class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
            />
          </button>
          <button
            class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textWarning MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textWarning MuiButton-sizeMedium MuiButton-textSizeMedium css-wjixpo-MuiButtonBase-root-MuiButton-root"
            role="listitem"
            tabindex="0"
            type="button"
          >
            1
            <span
              class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
            />
          </button>
          <button
            class="MuiButtonBase-root Mui-disabled MuiIconButton-root Mui-disabled MuiIconButton-colorWarning MuiIconButton-sizeMedium css-1moznky-MuiButtonBase-root-MuiIconButton-root"
            disabled=""
            tabindex="-1"
            type="button"
          >
            <svg
              aria-hidden="true"
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
              data-testid="ChevronRightIcon"
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              />
            </svg>
          </button>
        </div>
      </div>
    `);
  });

  it("shows correct amount of pages", () => {
    const { getAllByRole } = renderWithProviders(<Pagination />, {
      preloadedState: {
        payments: {
          loading: false,
          error: null,
          data: paymentMock,
        },
      },
    });

    const pagesButtons = getAllByRole("listitem");
    expect(pagesButtons.length).toEqual(5);
  });

  it("prev button is disabled", () => {
    const { getAllByRole } = renderWithProviders(<Pagination />, {
      preloadedState: {
        payments: {
          loading: false,
          error: null,
          data: paymentMock,
        },
      },
    });

    const prevButton = getAllByRole("button")[0];
    expect(prevButton).toHaveAttribute("disabled");
  });

  it("next button is disabled", () => {
    const { getAllByRole } = renderWithProviders(<Pagination />, {
      preloadedState: {
        payments: {
          loading: false,
          error: null,
          data: {
            ...paymentMock,
            hasNext: false,
          },
        },
      },
    });

    const buttons = getAllByRole("button");
    expect(buttons[getAllByRole("button").length - 1]).toHaveAttribute("disabled");
  });
});
