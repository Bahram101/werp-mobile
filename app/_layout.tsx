import { AppBottomSheetRef } from "@/components/ui/bottom-sheet/AppBottomSheet";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AuthProvider from "@/features/auth/components/AuthProvider";
import "@/global.css";
import AppBottomSheetProvider from "@/providers/AppBottomSheetProvider";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import RootLayout from "./RootLayout";

export default function RootlayoutWrapper() {
  const modalRef = useRef<AppBottomSheetRef>(null);

  useEffect(() => {
    modalRef.current?.open?.();
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <AppBottomSheetProvider>
            <GluestackUIProvider mode="light">
              <AuthProvider>
                <ReactQueryProvider>
                  <RootLayout />
                </ReactQueryProvider>
              </AuthProvider>
            </GluestackUIProvider>
          </AppBottomSheetProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}
