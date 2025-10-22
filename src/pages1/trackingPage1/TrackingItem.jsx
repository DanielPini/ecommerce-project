import dayjs from "dayjs";

const TrackingItem = ({ item, order }) => {
  const totalDeliveryTimeMs = item.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  const deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent >= 100;

  return (
    <>
      <div className="delivery-date">
        {deliveryPercent >= 100 ? "Arriving on" : "Delivered on"}{" "}
        {dayjs(item.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
      </div>

      <div className="product-info">{item.product.name}</div>

      <div className="product-info">Quantity: {item.quantity}</div>

      <img
        className="product-image"
        src={item.product.image}
      />

      <div className="progress-labels-container">
        <div className={`progress-label ${isPreparing && "current-status"}`}>
          Preparing
        </div>
        <div className={`progress-label ${isShipped && "current-status"}`}>
          Shipped
        </div>
        <div className={`progress-label ${isDelivered && "current-status"}`}>
          Delivered
        </div>
      </div>

      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${Math.min(deliveryPercent, 100)}%` }}></div>
      </div>
    </>
  );
};
export default TrackingItem;
