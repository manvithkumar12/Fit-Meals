import { getUser } from "@/lib/CurrentUser";
import NotAuthorized from "@/src/Components/RedirectComponent/NotAuthorized";
import { redirect } from "next/navigation";

export default async function RestaurantOwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    return redirect("/login/Customer");
  }
  if (user.role !== "CUSTOMER") {
    return <NotAuthorized type="unauthorized" />;
  }

  return <>{children}</>;
}
