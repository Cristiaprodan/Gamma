"use client";

import React, { useEffect, useState } from "react";
import { useCartStore, DELIVERY_RULES } from "@/lib/store/useCart";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import { PiSealPercentFill } from "react-icons/pi";
import { AddressTab } from "@/components/Dashboard/AdressTab";
import { LoginForm } from "@/components/auth/LoginForm";
import { CouponSection } from "@/components/Checkout/CouponSection";
import { UserInfoForm } from "@/components/Checkout/UserInfoForm";

interface ExtendedUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string;
  phone?: string;
}

interface ExtendedSession {
  user?: ExtendedUser;
}

const CheckoutPage = () => {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const router = useRouter();
  const t = useTranslations();
  const { toast } = useToast();
  const params = useParams();

  const [mounted, setMounted] = useState(false);
  const { items, deliveryZone, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestAddress, setGuestAddress] = useState("");
  const [guestName, setGuestName] = useState("");
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCouponName, setAppliedCouponName] = useState<string | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState(
    params.locale === "ro"
      ? "Plata la livrare"
      : params.locale === "ru"
      ? "Оплата при доставке"
      : "cash_on_delivery"
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) setMounted(true);
    return () => {
      mounted = false;
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (session?.user) {
      setGuestName(session.user.name || "");
      setGuestPhone(session.user.phone || "");
      setGuestEmail(session.user.email || "");
    }
  }, [session]);

  const {
    subtotal,
    deliveryCost,
    total,
    discountPercentage,
    couponDiscountAmount,
    finalSubtotal,
  } = React.useMemo(() => {
    if (!mounted)
      return {
        subtotal: 0,
        deliveryCost: 0,
        total: 0,
        discountPercentage: 0,
        couponDiscountAmount: 0,
        finalSubtotal: 0,
      };

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discountedSubtotal = items.reduce(
      (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
      0
    );

    const deliveryRules = DELIVERY_RULES[deliveryZone];
    const deliveryCost =
      discountedSubtotal >= deliveryRules.freeDeliveryThreshold
        ? 0
        : deliveryRules.cost;

    const couponDiscountAmount =
      couponDiscount > 0 ? discountedSubtotal * (couponDiscount / 100) : 0;

    const finalSubtotal = discountedSubtotal - couponDiscountAmount;

    const total = finalSubtotal + deliveryCost;

    const discountPercentage =
      subtotal > 0
        ? Math.round(((subtotal - discountedSubtotal) / subtotal) * 100)
        : 0;

    return {
      subtotal,
      deliveryCost,
      total,
      discountPercentage,
      couponDiscountAmount,
      finalSubtotal,
    };
  }, [items, deliveryZone, mounted, couponDiscount]);

  const handleAddressChange = (newAddress: string) => {
    if (session) {
      setUserAddress(newAddress);
    } else {
      setGuestAddress(newAddress);
    }
  };

  const handleCouponApplied = (discount: number, couponName: string) => {
    setCouponDiscount(discount);
    setAppliedCouponName(couponName);
  };

  const handlePlaceOrder = async () => {
    if (!session) {
      if (!guestName || !guestEmail || !guestPhone || !guestAddress) {
        toast({
          title: t("checkout.error"),
          description: t("checkout.fill_all_fields"),
          variant: "destructive",
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestEmail)) {
        toast({
          title: t("checkout.error"),
          description: t("checkout.invalid_email"),
          variant: "destructive",
        });
        return;
      }

      const phoneRegex = /^\+?[0-9]{8,}$/;
      if (!phoneRegex.test(guestPhone.replace(/\s/g, ""))) {
        toast({
          title: t("checkout.error"),
          description: t("checkout.invalid_phone"),
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!userAddress) {
        toast({
          title: t("checkout.error"),
          description: t("checkout.address_required"),
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      if (session?.user?.id) {
        const shouldUpdateProfile =
          session.user.name !== guestName || session.user.phone !== guestPhone;

        if (shouldUpdateProfile) {
          const [firstName, ...lastNameParts] = guestName.trim().split(" ");
          const lastName = lastNameParts.join(" ");

          await fetch("/api/auth/update-profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Nume: lastName || firstName,
              Prenume: lastNameParts.length > 0 ? firstName : "",
              Numar_Telefon: guestPhone
                .replace(/\s/g, "")
                .replace(/^\+373/, "")
                .replace(/^373/, ""),
              Provider: session.user.provider || "credentials",
            }),
          });
        }
      }

      const products = items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      const formattedPhone = guestPhone
        .replace(/\s/g, "")
        .replace(/^\+373/, "")
        .replace(/^373/, "");

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id || null,
          numePrenume: guestName,
          numarTelefon: formattedPhone,
          products: products,
          deliveryZone,
          isFreeDelivery: deliveryCost === 0,
          address: session ? userAddress : guestAddress,
          couponCode: appliedCouponName,
          couponDiscount: couponDiscount,
          total: total,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error(t("checkout.order_failed"));
      }

      const data = await response.json();
      clearCart();

      const orderConfirmationData = {
        products: items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
          discountPrice: item.discountPrice,
        })),
        deliveryCost,
        total,
        couponDiscount,
        address: session ? userAddress : guestAddress,
        orderIds: data.orderIds,
        paymentMethod,
      };

      localStorage.setItem(
        "orderConfirmation",
        JSON.stringify(orderConfirmationData)
      );

      router.push(`/${params.locale}/checkout/order`);

      toast({
        title: t("checkout.success"),
        description: t("checkout.order_placed"),
      });
    } catch (error) {
      toast({
        title: t("checkout.error"),
        description:
          error instanceof Error ? error.message : t("checkout.generic_error"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => {
    if (!showLoginForm) return null;
    return <LoginForm onClose={() => setShowLoginForm(false)} />;
  };

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center">{t("checkout.empty_cart")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1250px] w-[90vw] mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">{t("checkout.title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white dark:bg-charade-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              {t("checkout.order_summary")}
            </h2>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b dark:border-charade-900 py-4"
              >
                <div className="relative w-20 h-20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {t("checkout.quantity")}: {item.quantity}
                  </p>
                  <div className="mt-2">
                    {item.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {item.discountPrice} {t("checkout.currency")}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {item.price} {t("checkout.currency")}
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium">
                        {item.price} {t("checkout.currency")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4 space-y-3">
              {couponDiscountAmount > 0 && (
                <div className="flex items-center justify-between text-xs bg-green-50 dark:bg-green-900/10 p-2.5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiSealPercentFill className="text-green-500" size={18} />
                    <span className="font-medium">
                      {t("checkout.coupon_discount", {})} ({couponDiscount}%)
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-green-500">
                      -{couponDiscountAmount.toFixed(2)}{" "}
                      {t("checkout.currency")}
                    </span>
                  </div>
                </div>
              )}
              {subtotal !== finalSubtotal && (
                <div className="flex items-center justify-between text-xs bg-red-50 dark:bg-red-900/10 p-2.5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <PiSealPercentFill className="text-red-500" size={18} />
                    <span className="font-medium">
                      {t("checkout.total_discount")}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-red-500">
                      -{(subtotal - finalSubtotal).toFixed(2)}{" "}
                      {t("checkout.currency")}
                    </span>
                  </div>
                </div>
              )}

              <div className="bg-white dark:bg-charade-950 p-2.5 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {t("checkout.subtotal")}:
                    </span>
                    <span>
                      {subtotal.toFixed(2)} {t("checkout.currency")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {t("checkout.delivery")}:
                    </span>
                    <span>
                      {deliveryCost === 0 ? (
                        <span className="text-green-500">
                          {t("checkout.free")}
                        </span>
                      ) : (
                        `${deliveryCost.toFixed(2)} ${t("checkout.currency")}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t dark:border-gray-700">
                    <span className="font-medium">{t("checkout.total")}:</span>
                    <span className="font-bold">
                      {total.toFixed(2)} {t("checkout.currency")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {!session && (
            <div className="bg-white dark:bg-charade-900 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <p>{t("checkout.have_account")}</p>
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="text-accent hover:text-charade-900 dark:text-accent dark:hover:text-gray-100 font-medium"
                >
                  {t("checkout.login_button")}
                </button>
              </div>
              {showLoginForm && (
                <LoginForm onClose={() => setShowLoginForm(false)} />
              )}
            </div>
          )}
          <div className="bg-white dark:bg-charade-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              {t("checkout.user_info")}
            </h2>
            <UserInfoForm
              guestName={guestName}
              setGuestName={setGuestName}
              guestEmail={guestEmail}
              setGuestEmail={setGuestEmail}
              guestPhone={guestPhone}
              setGuestPhone={setGuestPhone}
            />
          </div>

          <div className="bg-white dark:bg-charade-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              {t("checkout.delivery_address")}
            </h2>

            <AddressTab
              onAddressChange={handleAddressChange}
              isCheckout={true}
              guestMode={!session}
            />
          </div>

          <div className="bg-white dark:bg-charade-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              {t("checkout.payment_method")}
            </h2>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="cash"
                name="payment"
                value={
                  params.locale === "ro"
                    ? "Plata la livrare"
                    : params.locale === "ru"
                    ? "Оплата при доставке"
                    : "cash_on_delivery"
                }
                checked={
                  paymentMethod ===
                  (params.locale === "ro"
                    ? "Plata la livrare"
                    : params.locale === "ru"
                    ? "Оплата при доставке"
                    : "cash_on_delivery")
                }
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
              />
              <label htmlFor="cash">{t("checkout.cash_on_delivery")}</label>
            </div>
          </div>

          <CouponSection onDiscountApplied={handleCouponApplied} />

          <Button
            onClick={handlePlaceOrder}
            disabled={isLoading || (session ? !userAddress : false)}
            className="w-full bg-accent hover:bg-charade-900 hover:text-white text-charade-900 dark:hover:bg-gray-100 dark:hover:text-charade-900 h-10 text-sm font-semibold"
          >
            {isLoading ? t("checkout.processing") : t("checkout.place_order")}
          </Button>
        </div>
      </div>
      {renderLoginForm()}
    </div>
  );
};

export default CheckoutPage;