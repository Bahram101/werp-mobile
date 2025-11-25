import AppBottomSheet, {
  AppBottomSheetRef,
} from "@/components/ui/bottom-sheet/AppBottomSheet";
import ServiceModalList from "@/features/master/requests/screens/RequestDetail/RequestWork/components/Services/ServiceModalList";
import SparePartModalList from "@/features/master/requests/screens/RequestDetail/RequestWork/components/SpareParts/SparePartModalList";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";

// ⭐ ДОБАВЛЕНО: Типы модалок
type BottomSheetType = "services" | "spareParts" | null;

type BottomSheetContextType = {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;

  // ⭐ ДОБАВЛЕНО: единый метод показа модалки
  showBottomSheet: (type: BottomSheetType, props?: any) => void;
};

export const BottomSheetContext = createContext<BottomSheetContextType | null>(
  null
);

const AppBottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const modalRef = useRef<AppBottomSheetRef>(null);

  const [title, setTitle] = useState("");
  const [snapPoints, setSnapPoints] = useState(["75%"]);

  // ⭐ ДОБАВЛЕНО: хранение типа модалки
  const [modalType, setModalType] = useState<BottomSheetType>(null);

  // ⭐ ДОБАВЛЕНО: хранение props для модалки
  const [modalProps, setModalProps] = useState<any>({});

  const openBottomSheet = () => modalRef.current?.open();
  const closeBottomSheet = () => modalRef.current?.close();

  // ⭐ ГЛАВНЫЙ МЕТОД — устанавливает модалку и её props
  const showBottomSheet = (type: BottomSheetType, props: any = {}) => {
    setModalType(type); // устанавливаем тип
    setModalProps(props); // устанавливаем данные
    openBottomSheet(); // открываем
  };

  // ⭐ Рендерим контент в зависимости от типа
  const renderContent = () => {
    if (modalType === "services") {
      return <ServiceModalList {...modalProps} />;
    }

    if (modalType === "spareParts") {
      return <SparePartModalList {...modalProps} />;
    }

    return null;
  };

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,

        // ⭐ ТЕПЕРЬ отдаём только 1 метод
        showBottomSheet,
      }}
    >
      {children}

      <AppBottomSheet ref={modalRef} title={title} snapPoints={snapPoints}>
        {renderContent()}
      </AppBottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx)
    throw new Error(
      "useBottomSheet must be used within AppBottomSheetProvider"
    );
  return ctx;
};

export default AppBottomSheetProvider;
