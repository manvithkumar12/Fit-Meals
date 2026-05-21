type Translator = (key : string) => string;

export const FaqData=(t:Translator)=>[
    {
        question:t("faq.q1"),
        solution:t("faq.s1")
    },
    {
        question:t("faq.q2"),
        solution:t("faq.s2")
    },
    {
        question:t("faq.q3"),
        solution:t("faq.s3")
    },
    {
        question:t("faq.q4"),
        solution:t("faq.s4")
    },
    {
        question:t("faq.q5"),
        solution:t("faq.s5")
    },


]
