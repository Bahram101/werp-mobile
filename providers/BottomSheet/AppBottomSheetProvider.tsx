import AppBottomSheet, {
  AppBottomSheetRef,
} from "@/components/ui/bottom-sheet/AppBottomSheet";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import { bottomSheetRegistry } from "./bottomSheetRegistry";

type BottomSheetType = "services" | "spareParts" | null;

type BottomSheetContextType = {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  updateModalProps: (value: any) => void;
  showBottomSheet: (
    type: BottomSheetType,
    props?: any,
    options?: { title?: string; snapPoints?: string[] }
  ) => void;
};

export const BottomSheetContext = createContext<BottomSheetContextType | null>(
  null
);

const AppBottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const modalRef = useRef<AppBottomSheetRef>(null);

  const [title, setTitle] = useState("");
  const [snapPoints, setSnapPoints] = useState(["75%"]);
  const [modalType, setModalType] = useState<BottomSheetType>(null);
  const [modalProps, setModalProps] = useState<any>({});

  const openBottomSheet = () => modalRef.current?.open();
  const closeBottomSheet = () => modalRef.current?.close();

  const updateModalProps = (nextProps: string[]) => {
    setModalProps((prev: any) => ({ ...prev, ...nextProps }));
  };

  const showBottomSheet = (
    type: BottomSheetType,
    props: any = {},
    options: { title?: string; snapPoints?: string[] } = {}
  ) => {
    setModalType(type);
    setModalProps(props);
    if (options.title) setTitle(options.title);
    if (options.snapPoints) setSnapPoints(options.snapPoints);
    openBottomSheet();
  };

  const renderContent = () => {
    if (!modalType) return null;
    const Component = bottomSheetRegistry[modalType];
    return Component ? <Component {...modalProps} /> : null;
  };

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
        showBottomSheet,
        updateModalProps,
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
