import { useTranslation } from "react-i18next";
import FadeLeft from "../animations/FadeLeft";
import BuyForm from "../BuyForm";

const HeaderSection = () => {
  const { t } = useTranslation();
  return (
    <section className="flex-1 py-6">
      <div className="container flex flex-col items-center justify-center gap-16 px-4 lg:flex-row lg:gap-4 lg:px-0">
        <FadeLeft className="w-full lg:w-1/2">
          <BuyForm />
        </FadeLeft>
      </div>
    </section>
  );
};

export default HeaderSection;
