import AppBottomSheet, {
  AppBottomSheetRef,
} from "@/components/ui/bottom-sheet/AppBottomSheet";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

type BottomSheetContextType = {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  setBottomSheetTitle: (title: string) => void;
  setBottomSheetContent: (content: ReactNode) => void;
  setBottomSheetSnapPoints: (data: any) => void;
};

export const BottomSheetContext = createContext<BottomSheetContextType | null>(
  null
);

const AppBottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const modalRef = useRef<AppBottomSheetRef>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<ReactNode>(null);
  const [snapPoints, setSnapPoints] = useState(null);

  const openBottomSheet = () => modalRef.current?.open();
  const closeBottomSheet = () => modalRef.current?.close();
  const setBottomSheetTitle = (newTitle: string) => setTitle(newTitle);
  const setBottomSheetContent = (content: ReactNode) => setContent(content);
  const setBottomSheetSnapPoints = (data: any) => setSnapPoints(data);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
        setBottomSheetTitle,
        setBottomSheetContent,
        setBottomSheetSnapPoints,
      }}
    >
      {children}
      <AppBottomSheet
        ref={modalRef}
        title={title}
        snapPoints={snapPoints || ["75%"]}
      >
        {content}
      </AppBottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) {
    throw new Error(
      "useBottomSheet must be used within AppBottomSheetProvider"
    );
  }
  return ctx;
};

export default AppBottomSheetProvider;
