import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import React, { createContext, ReactNode, useContext, useState } from "react";

const ActionSheetContext = createContext<any>(null);

const ActionSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const openSheet = (node: React.ReactNode) => {
    setContent(node);
    setIsOpen(true);
  };

  const closeSheet = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ActionSheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}
      <Actionsheet isOpen={isOpen} onClose={closeSheet}>
        <ActionsheetBackdrop />

        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {content}
        </ActionsheetContent>
      </Actionsheet>
    </ActionSheetContext.Provider>
  );
};

export const useActionSheet = () => useContext(ActionSheetContext);

export default ActionSheetProvider;
