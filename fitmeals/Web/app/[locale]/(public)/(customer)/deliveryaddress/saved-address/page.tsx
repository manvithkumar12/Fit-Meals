import { getUser } from "@/lib/CurrentUser";
import AddressCard from "@/src/Components/AddressCards/AddressCard";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "SavedAddress",
  });
  const user = await getUser();
  if (!user?.id) redirect("/login/Customer");
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="px-4 py-6 w-[95%] md:w-[80%] flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-center">{t("title")}</h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          {t("description")}
        </p>
        <AddressCard />
        <p className="text-xs text-gray-500 text-center mt-4 flex justify-center items-center gap-1">
          🔒 {t("alert")}
        </p>
      </div>
    </div>
  );
};

export default Page;
