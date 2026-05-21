import HeroSectionLoading from "../../FoodComponents/HeroSectionLoading.";

const CookBookLoading = () => {
  return (
    <div className="pb-5  flex flex-col overflow-hidden justify-center items-center z-5">
      <div className="w-screen flex pt-10 flex-col lg:flex-row  lg:pl-20 ">
        <HeroSectionLoading />
      </div>
    </div>
  );
};

export default CookBookLoading;
