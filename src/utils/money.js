const formatMoney = (amountCents) => {
  return `${amountCents < 0 ? "-" : ""}$${Math.abs(amountCents / 100).toFixed(
    2
  )}`;
};

export default formatMoney;
