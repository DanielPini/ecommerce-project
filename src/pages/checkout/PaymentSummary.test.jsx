import { render, screen } from "@testing-library/react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import axios from "axios";
import PaymentSummary from "./PaymentSummary";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";

const paymentSummary = {
  totalItems: 1,
  productCostCents: 1090,
  shippingCostCents: 0,
  totalCostBeforeTaxCents: 1090,
  taxCents: 109,
  totalCostCents: 1199,
};

const Location = () => {
  const location = useLocation();
  return <div data-testid="url-path">{location.pathname}</div>;
};

vi.mock("axios");

describe("PaymentSummary content", () => {
  let loadCart;
  let user;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/payment-summary") {
        return {
          totalItems: 1,
          productCostCents: 1090,
          shippingCostCents: 0,
          totalCostBeforeTaxCents: 1090,
          taxCents: 109,
          totalCostCents: 1199,
        };
      }
    });

    axios.post = vi.fn().mockResolvedValue({});

    user = userEvent.setup();
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>,
    );
  });

  it("displays the correct dollar amount", () => {
    expect(screen.getByTestId("itemsCost")).toHaveTextContent("$10.90");
    expect(screen.getByTestId("shipping")).toHaveTextContent("$0.00");
    expect(screen.getByTestId("totalBeforeTax")).toHaveTextContent("$10.90");
    expect(screen.getByTestId("tax")).toHaveTextContent("$1.09");
    expect(screen.getByTestId("orderTotal")).toHaveTextContent("$11.99");
  });

  it("accepts order placement by user", async () => {
    const orderButton = screen.getByTestId("order-button");

    await user.click(orderButton);

    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalled();

    const urlPath = await screen.findByTestId("url-path");
    expect(urlPath).toHaveTextContent("/orders");
  });
});
