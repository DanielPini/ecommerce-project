import dayjs from "dayjs";

const DeliveryDate = ({ selectedDeliveryOption }) => {
  return (
    <div className="delivery-date">
      Delivery date:{" "}
      {selectedDeliveryOption && selectedDeliveryOption.estimatedDeliveryTimeMs
        ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
            "dddd, MMMM D"
          )
        : "No delivery option found"}
    </div>
  );
};
export default DeliveryDate;
