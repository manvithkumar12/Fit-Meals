import { getUser } from "@/lib/CurrentUser";
import NotAuthorized from "@/src/Components/RedirectComponent/NotAuthorized";
import { RestaurantIDProvider } from "@/src/context/RestaurantId/RestaurantId";

export default async function RestaurantOwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (user?.role !== "OWNER") {
    return (
      <NotAuthorized label="You do not have permission to access this page" />
    );
  }

  return (
    <RestaurantIDProvider>
      <>{children}</>
    </RestaurantIDProvider>
  );
}
