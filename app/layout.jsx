import "../styles/globels.css";
import Provider from "@/Components/Providers";
import { ReduxProvider } from "./GlobalRedux/ReduxProvider";

export const metadata = {
  title: "Globel Chat",
  description: "let's chat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Provider>
            <main>{children}</main>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
