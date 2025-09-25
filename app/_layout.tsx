import "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import AuthProvider from "@/features/auth/components/AuthProvider";
import "@/global.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import RootLayout from "./RootLayout";

export default function RootlayoutWrapper() {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <GluestackUIProvider mode="light">
          <RootLayout />
        </GluestackUIProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
