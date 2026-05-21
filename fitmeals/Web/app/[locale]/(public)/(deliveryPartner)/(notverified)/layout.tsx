import { getUser } from "@/lib/CurrentUser";
import NotAuthorized from "@/src/Components/RedirectComponent/NotAuthorized";

export default async function RestaurantOwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (user?.isVerified === "VERIFIED") {
    return (
      <NotAuthorized
        type="unauthorized"
        label="You do not have permission to access this page"
      />
    );
  }

  return <>{children}</>;
}
