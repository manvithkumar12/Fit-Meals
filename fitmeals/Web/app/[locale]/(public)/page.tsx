import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import SectionCard from "@/src/Components/Section/SectionCard";
import LanguagePopup from "@/src/Components/LanguagePopup/LanguagePopup";
import { getFeedbacks } from "@/app/api/actions/feedbacks/getFeedbacks";

const MembershipCards = dynamic(
  () => import("@/src/Components/Membership/MembershipCards")
);

const UpdatesCard = dynamic(
  () => import("@/src/Components/General/updatesCard/UpdatesCard")
);

const FeedBack = dynamic(
  () => import("@/src/Components/General/FeedBackCard/FeedBack")
);

const FaqCards = dynamic(
  () => import("@/src/Components/General/Faqs/FaqCards")
);

const ContactCard = dynamic(
  () => import("@/src/Components/General/ContactCard/ContactCard")
);

const Features = dynamic(
  () => import("@/src/Components/FeaturesPopup/Features")
);

export const revalidate = 3600;

export default async function HomePage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "homepage",
  });

  const feedbacksData = await getFeedbacks();

  return (
    <div>
      <LanguagePopup />

      <section className="hero-page">
        <div className="relative w-full aspect-[3/2] md:aspect-[5/2]">
          <Image
            src="/home-img.webp"
            alt="intro"
            fill
            priority
            quality={70}
            sizes="100vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="/blur.jpeg"
          />

          <div className="absolute top-30 left-10 hidden h-max w-max md:block">
            <div className="intro text-4xl font-bold leading-tight text-white backdrop-blur-sm font-montserrat lg:text-5xl">
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
            </div>

            <Features />
          </div>
        </div>
      </section>

      <SectionCard />

      <MembershipCards params={{ locale }} />

      <section className="updates py-10">
        <UpdatesCard />
      </section>

      <section className="feedback py-10 md:py-15">
        <FeedBack data={feedbacksData || []} />
      </section>

      <section className="faq py-10 md:py-10">
        <FaqCards />
      </section>

      <section className="questions-mail py-10 md:py-15">
        <ContactCard />
      </section>
    </div>
  );
}