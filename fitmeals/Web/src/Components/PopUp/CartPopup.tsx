import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { forceAddTocart } from "@/app/api/actions/cart/addToCart";
import { useTranslations } from "next-intl";

interface PlainPopUpProps {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  formData: {
    itemId: number;
    userId: number;
    restaurantId: number;
  };
}
const CartPopup = ({ setPopUp, setSelected, formData }: PlainPopUpProps) => {
  const router = useRouter();
  const t = useTranslations("Cart");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <style>
        {`
          @keyframes popupUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div
        className="fixed inset-0 flex items-end justify-center z-20 p-4"
        onClick={() => setPopUp(false)}
      >
        <div
          className="max-h-[95vh] p-5 w-120 h-55 relative shadow border-gray-200 border bg-white rounded-lg gap-3 flex flex-col z-30 animate-[popupUp_0.3s_ease-out]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div>
            <h1 className="font-bold text-xl">{t("conflict.title")}</h1>
          </div>
          <div>
            <h3>{t("conflict.description")}</h3>
          </div>
          <div className="w-full flex  items-center gap-4 mt-5">
            <button
              className="border-2 border-green-600 font-bold hover:shadow-2xl cursor-pointer  w-40 h-12 text-green-600"
              onClick={() => {
                setPopUp(false);
              }}
            >
              {t("conflict.no")}
            </button>
            <button
              disabled={loading}
              className={`bg-green-600 w-40 h-12 text-white  hover:shadow-2xl cursor-pointer font-bold ${loading ? " animate-pulse opacity-30 cursor-not-allowed" : null}`}
              onClick={async () => {
                try {
                  setLoading(true);
                  await forceAddTocart(
                    formData.itemId,
                    formData.userId,
                    formData.restaurantId,
                  );
                  setPopUp(false);
                  setSelected?.(true);
                  router.refresh();
                } catch (err) {
                  setLoading(true);
                  setSelected?.(false);
                  toast.error("Failed to add item to cart");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {t("conflict.yes")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartPopup;
