"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Minus, Plus } from "lucide-react";
import PurchaseModal from "./PurchaseModal";

interface PackCardProps {
  name: string;
  price: number;
  image: string;
}

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

export default function PackCard({ name, price, image }: PackCardProps) {
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const increment = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, MAX_QUANTITY));
  }, []);

  const decrement = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, MIN_QUANTITY));
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <>
      <div className="w-full h-106 bg-[#3E474C] rounded-[14px] border border-[#2A2A2A] overflow-hidden relative">
        {/* Pack Image - Clickable */}
        <button
          type="button"
          onClick={openModal}
          className="w-full flex justify-center pt-5 cursor-pointer hover:opacity-90 transition-opacity"
          aria-label={`View ${name} details`}
        >
          <Image
            src={image}
            alt={name}
            width={166}
            height={227}
            className="w-41.5 h-56.75 object-contain"
            priority
          />
        </button>

        {/* Pack Info Overlay */}
        <div className="absolute left-4 right-4 top-56 bg-[#1D1D1D] rounded-[14px] border border-[#2A2A2A] shadow-[0px_1px_2px_rgba(0,0,0,0.04),0px_2px_8px_rgba(0,0,0,0.08)] px-5 pt-4 pb-2.5">
          <p className="text-[#939BAA] text-xs font-medium">{name}</p>
          <p className="text-white text-lg font-semibold">{formattedPrice}</p>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#1D1D1D] border-t border-[#2A2A2A]">
          {/* Quantity Selector */}
          <div className="mx-4 mt-5 flex items-center justify-center gap-2.5 p-2.5 rounded-[14px] border border-[#2A2A2A] shadow-[0px_1px_2px_rgba(0,0,0,0.04),0px_2px_8px_rgba(0,0,0,0.08)]">
            <button
              type="button"
              onClick={decrement}
              disabled={quantity <= MIN_QUANTITY}
              aria-label="Decrease quantity"
              className="w-4 h-4 flex items-center justify-center text-[#939BAA] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span 
              className="flex-1 text-center text-[#939BAA] text-xs font-medium tabular-nums"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={increment}
              disabled={quantity >= MAX_QUANTITY}
              aria-label="Increase quantity"
              className="w-4 h-4 flex items-center justify-center text-[#939BAA] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Buy Button */}
          <button
            type="button"
            onClick={openModal}
            className="mx-4 mt-2 w-[calc(100%-32px)] p-2.5 rounded-[14px] border border-[#2A2A2A] shadow-[0px_1px_2px_rgba(0,0,0,0.04),0px_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center bg-linear-to-r from-[#B71959] to-[#E04548] hover:opacity-90 transition-opacity"
          >
            <span className="text-white text-xs font-medium">Buy</span>
          </button>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pack={{
          name,
          price,
          quantity,
          image,
        }}
      />
    </>
  );
}
