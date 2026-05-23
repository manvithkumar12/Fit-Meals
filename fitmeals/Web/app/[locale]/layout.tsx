export const dynamic = "force-dynamic";
import ToastProvider from "@/src/Components/Alerts/ToastProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getUser } from "@/lib/CurrentUser";
import { UserProvider } from "@/src/context/UserContext";
import { CoordsProvider } from "@/src/context/UseCoords";
import TanQueryProviders from "@/src/context/queryProvider";
import ScrollToTop from "./ScrollToTop";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const receivedUser = await getUser();
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <TanQueryProviders>
        <ScrollToTop />
        <UserProvider user={receivedUser}>
          <CoordsProvider>
            {children}
            <ToastProvider />
          </CoordsProvider>
        </UserProvider>
      </TanQueryProviders>
    </NextIntlClientProvider>
  );
}
