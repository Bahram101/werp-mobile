import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AuthProvider from "@/features/auth/components/AuthProvider";
import "@/global.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import RootLayout from "./RootLayout";

export default function RootlayoutWrapper() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ReactQueryProvider>
          <AuthProvider> 
            <GluestackUIProvider mode="light">
              <RootLayout />
            </GluestackUIProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
