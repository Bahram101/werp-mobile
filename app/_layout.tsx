import "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AuthProvider from "@/features/auth/components/AuthProvider";
import "@/global.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootLayout from "./RootLayout";

export default function RootlayoutWrapper() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReactQueryProvider>
        <AuthProvider>
          <GluestackUIProvider mode="light">
            <RootLayout />
          </GluestackUIProvider>
        </AuthProvider>
      </ReactQueryProvider>
    </GestureHandlerRootView>
  );
}
