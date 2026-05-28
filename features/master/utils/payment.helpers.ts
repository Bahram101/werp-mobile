type GroupedPayment = {
  services: PaymentItem[];
  spareParts: PaymentItem[];
  cartridges: PaymentItem[];
};

export const groupPaymentItems = (serviceAllList?: any[]) => {
  return (
    serviceAllList?.reduce(
      (acc, item) => {
        if (![1, 3, 4].includes(item.serviceTypeId)) {
          acc.services.push({
            title: item.serviceTypeName,
            sum: item.sum,
          });
        } else if (item.serviceTypeId === 3) {
          acc.spareParts.push({
            title: item.matnrName,
            sum: item.sum,
            quantity: item.quantity,
            price: item.matnrPrice,
          });
        } else if (item.serviceTypeId === 1) {
          acc.cartridges.push({
            title: item.matnrName,
            sum: item.sum,
            fno: item.fno,
          });
        }

        return acc;
      },
      {
        services: [],
        spareParts: [],
        cartridges: [],
      } as GroupedPayment,
    ) ?? {
      services: [],
      spareParts: [],
      cartridges: [],
    }
  );
};
