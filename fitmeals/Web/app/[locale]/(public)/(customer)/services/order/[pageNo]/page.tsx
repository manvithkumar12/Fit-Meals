import Restaurants from "@/src/Components/ServiceComponent/order/Restaurants";

const Page = async ({
  params,
}: {
  params: Promise<{ locale: string; pageNo: string }>;
}) => {
  const { locale, pageNo } = await params;
  const numPage = Number(pageNo);

  return (
    <div className="w-screen h-max pt-10 overflow-hidden flex flex-col justify-center items-center ">
      <Restaurants locale={locale} pageNo={numPage} />
    </div>
  );
};
export default Page;
