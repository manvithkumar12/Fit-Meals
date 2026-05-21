import { getUser } from "@/lib/CurrentUser";
import ChatBotWrapper from "@/src/Components/ChatBot/ChatBotWrapper";
import DeliveryNav from "@/src/Components/Navbar/DeliveryNav";
import Navbar from "@/src/Components/Navbar/Navbar";
import RestaurantNav from "@/src/Components/Navbar/RestaurantNav";
import Footer from "@/src/Components/Footer/Footer";

import { unstable_noStore as noStore } from "next/cache";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore();

  const user = await getUser();

  if (!user || user.role === "CUSTOMER") {
    return (
      <>
        <Navbar user={user} />
        {children}
        <Footer />
        <ChatBotWrapper />
      </>
    );
  }

  if (user.role === "OWNER") {
    return (
      <>
        <RestaurantNav user={user} />
        {children}
        <Footer />
        <ChatBotWrapper />
      </>
    );
  }

  if (user.role === "DELIVERY") {
    return (
      <>
        <DeliveryNav user={user} />
        {children}
        <Footer />
        <ChatBotWrapper />
      </>
    );
  }

  return <>{children}</>;
}
