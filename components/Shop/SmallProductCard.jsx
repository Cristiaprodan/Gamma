"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { PiShoppingCartSimple, PiCursorClick } from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const SmallProductCard = ({ product, loading = false }) => {
  const t = useTranslations("productcard");
  const locale = useLocale();
  const router = useRouter();
  const apiUrl = "http://193.160.119.179";

  const getImage = (objString) => {
    if (!objString || !apiUrl) return null;
    try {
      const images = JSON.parse(objString);
      if (!images.length) return null;

      const imagePath = images[0]?.path;
      if (!imagePath) return null;

      return `${apiUrl}/${
        imagePath.startsWith("/") ? imagePath.slice(1) : imagePath
      }`;
    } catch (error) {
      console.error("Error parsing image data:", error);
      return null;
    }
  };

  const productData = useMemo(() => {
    if (!product || loading) return null;

    return {
      slug: product?.Nume_Produs_RO?.split(" ").join("-"),
      id: product.id,
      name: locale === "ro" ? product.Nume_Produs_RO : product.Nume_Produs_RU,
      image: getImage(product.Imagine_Principala),
      discount: product.Pret_Redus,
      price: product.Pret_Standard,
    };
  }, [product, loading, locale]);

  const isFiftyPercentOff = useMemo(() => {
    if (!productData) return false;
    const originalPrice = parseFloat(productData.price);
    const discountPrice = parseFloat(productData.discount);
    return (originalPrice - discountPrice) / originalPrice >= 0.5;
  }, [productData]);

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Adding to cart:", productData);
  };

  const buyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Buying now:", productData);
  };

  if (loading) {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden p-2 space-y-2">
        <div className="relative h-24 sm:h-32 flex items-center justify-center">
          <Skeleton className="h-[100px] w-[100px] sm:h-[120px] sm:w-[120px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-[28px] w-full" />
            <Skeleton className="h-[28px] w-[28px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!productData) return null;

  return (
    <div className="group relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden p-2 space-y-2 hover:border-[#47e194] dark:hover:border-[#47e194] transition-colors duration-200">
      <Link
        href={`/${locale}/product/${productData.slug}_${productData.id}`}
        className="block"
      >
        <div className="relative h-24 sm:h-32 flex items-center justify-center">
          {isFiftyPercentOff && (
            <div className="absolute top-[-10px] right-[-10px] bg-red-500 text-white px-1.5 py-0.5 rounded-bl-lg text-[10px] font-bold z-[6] group-hover:z-0">
              {t("fifty_percent_off")}
            </div>
          )}
          {productData.image ? (
            <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] group-hover:drop-shadow-[0_0_8px_rgba(71,225,148,0.5)] transition-all duration-300">
              <Image
                alt={productData.name}
                src={productData.image}
                className="max-w-full max-h-full w-auto h-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
                width={120}
                height={120}
              />
            </div>
          ) : (
            <div className="w-16 h-auto" />
          )}
        </div>

        <div className="space-y-2">
          <h2
            className="text-sm sm:text-base font-semibold line-clamp-1 group-hover:text-[#47e194] transition-colors duration-200"
            title={productData.name}
          >
            {productData.name}
          </h2>
          <div className="flex justify-between text-sm sm:text-base">
            <span
              className={
                productData.discount ? "line-through text-gray-500" : ""
              }
            >
              {productData.price} {t("lei")}
            </span>
            {productData.discount && (
              <span className="font-semibold text-red-500">
                {productData.discount} {t("lei")}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-1">
        <button
          onClick={buyNow}
          className="dark:bg-gray-500 bg-gray-600 hover:bg-charade-900 dark:hover:bg-charade-900 py-1 text-white text-xs sm:text-sm font-semibold px-2 rounded-lg flex items-center justify-center w-full transition-colors duration-200"
        >
          {t("buy_now")}
          <PiCursorClick className="ml-1" size={20} />
        </button>
        <button
          onClick={addToCart}
          className="transition-colors duration-200 hover:text-[#47e194]"
        >
          <PiShoppingCartSimple size={28} />
        </button>
      </div>
    </div>
  );
};

export default SmallProductCard;