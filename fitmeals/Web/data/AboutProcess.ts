type Translator=(Key:string)=>string;

export const ProcessData=(t:Translator) => [
    {
        "title":t("details.title1"),
        "info":t("details.info1"),
        "imgUrl":"https://drin721riupcf.cloudfront.net/web-assest/order.webp"
    },
    {
        "title":t("details.title2"),
        "info":t("details.info2"),
        "imgUrl":"https://drin721riupcf.cloudfront.net/web-assest/parcel.webp"
    },
    {
        "title":t("details.title3"),
        "info":t("details.info3"),
        "imgUrl":"https://drin721riupcf.cloudfront.net/web-assest/cooking.webp"
    },
]