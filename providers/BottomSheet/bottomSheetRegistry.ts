import CartridgeModalList from "@/features/master/requests/screens/RequestDetail/Work/components/Cartridges/CartridgeModalList";
import ServiceModalList from "@/features/master/requests/screens/RequestDetail/Work/components/Services/ServiceModalList";
import SparePartModalList from "@/features/master/requests/screens/RequestDetail/Work/components/SpareParts/SparePartModalList";

export const bottomSheetRegistry = {
  services: ServiceModalList,
  spareParts: SparePartModalList,
  cartridges: CartridgeModalList,
};
