export const dynamic = "force-dynamic";
import ProfileCard from "@/src/Components/Profile/ProfileCard";
import { getTranslations } from "next-intl/server";
import { getUser } from "@/lib/CurrentUser";
import UpdateSection from "@/src/Components/Profile/UpdateSection";
import { redirect } from "next/navigation";
import { getUserById } from "@/app/api/actions/userDetails/getUser";
import SubscriptionCookieUpdater from "../(validations)/SubscriptionCookieUpdater";
import ProfileImage from "@/src/Components/Profile/ProfileImage";

const page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const user = await getUser();
  if (!user?.id) redirect("/login/Customer");
  const UserDetails = await getUserById(user?.id);
  const t = await getTranslations({
    locale,
    namespace: "Profile",
  });
  const t2 = await getTranslations({
    locale,
    namespace: "Profile.role",
  });
  return (
    <>
      {user.role === "OWNER" && <SubscriptionCookieUpdater />}
      {user.role === "CUSTOMER" && <SubscriptionCookieUpdater />}
      <div className="w-screen flex flex-col items-center pb-20 bg-[#f9f8fa] justify-center">
        <section className="w-[90%] flex flex-col">
          <div className="pt-10">
            <div className="w-full h-max p-4 rounded-2xl bg-[#EAF2F8] pb-6 gap-5 flex flex-col justify-center items-center">
              <ProfileImage user={user} />
              <h1 className="text-4xl font-semibold font-montserrat text-center">
                {t("main.title")} {UserDetails?.name || "User"}
              </h1>
              <div className="flex gap-2">
                <div className="w-30 bg-[#2E86C1] text-white text-center rounded-2xl p-2">
                  {t2(UserDetails?.role!) || "N/A"}
                </div>
                <div className="w-30 bg-[#2E86C1] text-white text-center rounded-2xl p-2">
                  {UserDetails?.subscriptionsType || "NONE"}
                </div>
              </div>
              <h3 className="text-center">{t("main.sub-title")}</h3>
            </div>
          </div>
        </section>

        <UpdateSection userDetails={UserDetails} />

        <section className="w-[90%] h-max flex flex-col mt-10 p-5 bg-white rounded-lg ">
          <h2 className="text-2xl font-semibold font-montserrat">
            {t("account.title")}
          </h2>
          <h4 className="text-md ">{t("account.sub-title")}</h4>
          <ProfileCard user={user} />
        </section>
      </div>
    </>
  );
};

export default page;
