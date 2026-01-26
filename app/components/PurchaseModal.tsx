"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { X } from "lucide-react";

interface PackData {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  pack: PackData;
}

type PaymentMethod = "card" | "wallet";

interface FormData {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  email: string;
  nameOnCard: string;
  address: string;
  promoCode: string;
  saveInfo: boolean;
}

const SERVICE_FEE = 1.94;
const POINTS_PER_PURCHASE = 2000;

export default function PurchaseModal({ isOpen, onClose, pack }: PurchaseModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    email: "",
    nameOnCard: "",
    address: "",
    promoCode: "",
    saveInfo: false,
  });

  const subtotal = pack.price * pack.quantity;
  const total = subtotal + SERVICE_FEE;

  const handleInputChange = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleCheckboxChange = useCallback(() => {
    setFormData((prev) => ({ ...prev, saveInfo: !prev.saveInfo }));
  }, []);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[2.5px]"
        aria-hidden="true"
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-[856px] max-h-[90vh] overflow-y-auto bg-[#1D1D1D] rounded-[20px] border border-[#2A2A2A] shadow-[0px_3px_10px_rgba(0,0,0,0.10),0px_17px_50px_rgba(0,0,0,0.15)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-7 h-[74px] bg-[#1D1D1D] border-b border-[#2A2A2A]">
          <h2 id="modal-title" className="text-white text-xl font-medium">
            Buy a pack
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-[#4A5565] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 p-5 sm:p-7">
          {/* Left Side - Payment Form */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Payment Method */}
            <div className="flex flex-col gap-3">
              <label className="text-[#939BAA] text-base font-medium">
                Payment Method
              </label>
              <div className="flex flex-col gap-2.5">
                {/* Card Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full h-[50px] px-3.5 flex items-center gap-2.5 rounded-xl transition-all ${
                    paymentMethod === "card"
                      ? "bg-[#E04548]/5 border-2 border-[#E04548]"
                      : "bg-[#1D1D1D] border-2 border-[#2A2A2A]"
                  }`}
                >
                  {/* Radio */}
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "card" ? "border-[#E04548]" : "border-[#D1D5DB]"
                  }`}>
                    {paymentMethod === "card" && (
                      <div className="w-2 h-2 rounded-full bg-[#E04548]" />
                    )}
                  </div>
                  <Image src="/Card.svg" alt="Card" width={20} height={20} />
                  <span className="text-white text-sm font-medium">Card</span>
                </button>

                {/* Wallet Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`w-full h-[50px] px-3.5 flex items-center justify-between rounded-xl transition-all ${
                    paymentMethod === "wallet"
                      ? "bg-[#E04548]/5 border-2 border-[#E04548]"
                      : "bg-[#1D1D1D] border-2 border-[#2A2A2A]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Radio */}
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "wallet" ? "border-[#E04548]" : "border-[#D1D5DB]"
                    }`}>
                      {paymentMethod === "wallet" && (
                        <div className="w-2 h-2 rounded-full bg-[#E04548]" />
                      )}
                    </div>
                    <Image src="/wallet.svg" alt="Wallet" width={20} height={20} />
                    <span className="text-white text-sm font-medium">Wallet</span>
                  </div>
                  <span className="text-[#939BAA] text-sm font-medium">$0.00</span>
                </button>
              </div>
            </div>

            {/* Apple Pay / Google Pay */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                {/* Apple Pay */}
                <button
                  type="button"
                  className="flex-1 h-[44px] bg-black rounded-xl flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <Image src="/Applce-Icon.svg" alt="Apple" width={20} height={20} />
                  <span className="text-white text-sm font-medium">Pay</span>
                </button>

                {/* Google Pay */}
                <button
                  type="button"
                  className="flex-1 h-[44px] bg-white rounded-xl border-2 border-[#2A2A2A] flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <Image src="/google-Icon.svg" alt="Google" width={15} height={15} />
                  <span className="text-[#939BAA] text-sm font-medium">Pay</span>
                </button>
              </div>
              <p className="text-center text-[#939BAA] text-xs">or</p>
            </div>

            {/* Card Information */}
            <div className="flex flex-col gap-3.5">
              {/* Card Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-medium">
                  Card Information<span className="text-[#FB2C36]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleInputChange("cardNumber")}
                    placeholder="0000 0000 0000 0000"
                    className="w-full h-[44px] px-3.5 bg-transparent rounded-xl border-2 border-[#2A2A2A] text-white text-sm placeholder:text-[#939BAA] focus:border-[#E04548] focus:outline-none transition-colors"
                  />
                  {/* Card Icons */}
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {/* Mastercard Icon */}
                    <div className="w-[27px] h-[17px] flex items-center justify-center">
                      <div className="flex">
                        <div className="w-3 h-3 rounded-full bg-[#EB001B]" />
                        <div className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1.5" />
                      </div>
                    </div>
                    {/* Visa Icon */}
                    <div className="w-[27px] h-[17px] flex items-center justify-center">
                      <span className="text-[#1A1F71] text-[10px] font-bold italic">VISA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expiry & CVV Row */}
              <div className="flex gap-2">
                <div className="flex-1 flex items-center h-[44px] px-3.5 rounded-xl border-2 border-[#2A2A2A] gap-2">
                  <input
                    type="text"
                    value={formData.expiryMonth}
                    onChange={handleInputChange("expiryMonth")}
                    placeholder="MM"
                    maxLength={2}
                    className="w-8 bg-transparent text-center text-[#939BAA] text-sm placeholder:text-[#939BAA] focus:outline-none"
                  />
                  <span className="text-[#939BAA] text-sm">/</span>
                  <input
                    type="text"
                    value={formData.expiryYear}
                    onChange={handleInputChange("expiryYear")}
                    placeholder="YY"
                    maxLength={2}
                    className="w-8 bg-transparent text-center text-[#939BAA] text-sm placeholder:text-[#939BAA] focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={handleInputChange("cvv")}
                  placeholder="CVV"
                  maxLength={4}
                  className="w-24 h-[44px] px-3.5 bg-transparent rounded-xl border-2 border-[#2A2A2A] text-[#939BAA] text-sm placeholder:text-[#939BAA] focus:border-[#E04548] focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-medium">
                  Email<span className="text-[#FB2C36]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  placeholder="johndoe@gmail.com"
                  className="w-full h-[44px] px-3.5 bg-transparent rounded-xl border-2 border-[#2A2A2A] text-white text-sm placeholder:text-[#939BAA] focus:border-[#E04548] focus:outline-none transition-colors"
                />
              </div>

              {/* Name on Card */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-medium">
                  Name on card<span className="text-[#FB2C36]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nameOnCard}
                  onChange={handleInputChange("nameOnCard")}
                  placeholder="John Appleseed"
                  className="w-full h-[44px] px-3.5 bg-transparent rounded-xl border-2 border-[#2A2A2A] text-white text-sm placeholder:text-[#939BAA] focus:border-[#E04548] focus:outline-none transition-colors"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-medium">
                  Address<span className="text-[#FB2C36]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange("address")}
                  placeholder="123 Main St, New York, NY 10001"
                  className="w-full h-[44px] px-3.5 bg-transparent rounded-xl border-2 border-[#2A2A2A] text-white text-sm placeholder:text-[#939BAA] focus:border-[#E04548] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-1.5 pt-3.5 border-t border-[#2A2A2A]">
              <div className="flex justify-between">
                <span className="text-white text-sm">Subtotal</span>
                <span className="text-white text-sm">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white text-sm">Service fees</span>
                <span className="text-white text-sm">{formatPrice(SERVICE_FEE)}</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-[#2A2A2A]">
                <span className="text-[#939BAA] text-base font-medium">Total</span>
                <span className="text-[#939BAA] text-base font-medium">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Save Info & Encrypted Badge */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleCheckboxChange}
                className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-colors ${
                  formData.saveInfo 
                    ? "bg-[#E04548] border-[#E04548]" 
                    : "bg-[#9CA3AF] border-[#2A2A2A]"
                }`}
                aria-checked={formData.saveInfo}
                role="checkbox"
              >
                {formData.saveInfo && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <span className="text-white text-xs flex-1">Save my info for 1-click checkout</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#EFF6FF] rounded-md">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M4 7.33V5.33C4 3.12 5.79 1.33 8 1.33C10.21 1.33 12 3.12 12 5.33V7.33" stroke="#155DFC" strokeWidth="1.2" strokeLinecap="round"/>
                  <rect x="2" y="7.33" width="12" height="7.33" rx="1.5" stroke="#155DFC" strokeWidth="1.2"/>
                </svg>
                <span className="text-[#155DFC] text-xs font-medium">Encrypted</span>
              </div>
            </div>

            {/* Confirm Button - Left Side */}
            <button
              type="button"
              className="w-full h-[47px] rounded-xl flex items-center justify-center bg-gradient-to-r from-[#B71959] to-[#E04548] shadow-[0px_3px_13px_rgba(221,65,73,0.30)] hover:opacity-90 transition-opacity"
            >
              <span className="text-white text-sm font-medium">
                Confirm Purchase of {formatPrice(total)}
              </span>
            </button>
          </div>

          {/* Right Side - Order Summary */}
          <div className="w-full lg:w-[300px] flex flex-col gap-5">
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-[#939BAA] text-base font-medium">Order summary</span>
              <span className="text-[#939BAA] text-xs">{pack.quantity} item</span>
            </div>

            {/* Pack Item */}
            <div className="flex items-center justify-between p-3.5 bg-[#1D1D1D] rounded-xl border border-[#2A2A2A]">
              <div className="flex items-center gap-3.5">
                <div className="w-[54px] h-[54px] rounded-xl overflow-hidden shadow-[0px_2px_7px_rgba(0,0,0,0.10)] flex items-center justify-center bg-[#3E474C]">
                  <Image
                    src={pack.image}
                    alt={pack.name}
                    width={37}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#939BAA] text-sm font-medium">{pack.name.replace(" Anamons Pack", " Pack")}</span>
                  <span className="text-[#939BAA] text-xs">Quantity: {pack.quantity}</span>
                </div>
              </div>
              <span className="text-[#939BAA] text-sm font-medium">{formatPrice(subtotal)}</span>
            </div>

            {/* Summary Totals */}
            <div className="flex flex-col gap-2.5 pt-3.5 border-t border-[#2A2A2A]">
              <div className="flex justify-between">
                <span className="text-[#939BAA] text-[13px]">Subtotal</span>
                <span className="text-[#939BAA] text-[13px]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#939BAA] text-[13px]">Points</span>
                <span className="text-[#10B981] text-[13px] font-medium">+{POINTS_PER_PURCHASE.toLocaleString()}</span>
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex gap-1.5 pt-3.5 border-t border-[#2A2A2A]">
              <input
                type="text"
                value={formData.promoCode}
                onChange={handleInputChange("promoCode")}
                placeholder="Enter promo code"
                className="flex-1 min-w-0 h-[44px] px-3.5 bg-transparent rounded-xl border-2 border-[#2A2A2A] text-white text-[13px] placeholder:text-[#939BAA] focus:border-[#E04548] focus:outline-none transition-colors"
              />
              <button
                type="button"
                className="flex-shrink-0 w-[75px] h-[44px] rounded-xl bg-gradient-to-r from-[#B71959] to-[#E04548] text-white text-[13px] font-medium hover:opacity-90 transition-opacity"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
