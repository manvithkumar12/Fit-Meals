type Translation = (key:string) => string

export const contactPageData=(t:Translation)=>[
    {
        title:t("FeedBack.title"),
        info:t("FeedBack.sub-title"),
        btnTxt:t("FeedBack.btnTxt"),
        imgUrl:"https://drin721riupcf.cloudfront.net/web-assest/FeedbackLogo.webp",
        btnclr:"bg-green-700",
        type:"Feedback"
    },
    {
        title:t("Contact.title"),
        info:t("Contact.sub-title"),
        btnTxt:t("Contact.btnTxt"),
        imgUrl:"https://drin721riupcf.cloudfront.net/web-assest/contactLogo.webp",
        btnclr:"bg-yellow-400",
        type:"Contact"
    },
    {
        title:t("Query.title"),
        info:t("Query.sub-title"),
        btnTxt:t("Query.btnTxt"),
        imgUrl:"https://drin721riupcf.cloudfront.net/web-assest/queryLogo.webp",
        btnclr:"bg-blue-700",
        type:"Query"
    }
]