import { getTranslations } from "next-intl/server";
import Link from "@/src/Components/LocalizedLink";
import AboutCards from "@/src/Components/InfoCard/AboutCards";
import EmployCard from "@/src/Components/EmployCards/EmployCard";
import DiagonalCards from "@/src/Components/DiagnolCards/DiagonalCards";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "About",
  });
  return (
    <div className="pb-10">
      <section>
        <div className="h-max w-screen  py-15">
          <div className="justify-center align-middle items-center flex flex-col">
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-4xl md:text-6xl  font-montserrat">
                {t("hero.title1")}
                <br /> {t("hero.title2")}
              </h1>
              <div className="flex gap-2 mt-5 items-center justify-center">
                <Link href={"/learnMore"}>
                  <button className="w-max p-3 bg-green-700 text-white h-12 font-semibold rounded-2xl hover:bg-green-900 cursor-pointer shadow-xl active:shadow ">
                    {t("hero.btn1")}
                  </button>
                </Link>
                <Link href={"/services/order/1"}>
                  <button className="w-max p-3 bg-[#e7e7e3] text-black h-12 font-semibold rounded-2xl cursor-pointer shadow-xl active:shadow">
                    {t("hero.btn2")}
                  </button>
                </Link>
              </div>
            </div>
            <AboutCards />
            <div></div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-screen text-xl text-center  items-center justify-center flex">
          <h2 className="w-[75%] md:w-[70%] text-[#09220e]">
            {t("details.description")}
          </h2>
        </div>
        <EmployCard />
      </section>

      <section>
        <DiagonalCards />
      </section>
    </div>
  );
};

export default Page;
