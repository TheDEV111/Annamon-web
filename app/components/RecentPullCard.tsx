import Image from "next/image";

export interface RecentPullCardProps {
  id: number;
  name: string;
  image: string;
  leftBadgeNumber: number;
  rightBadgeNumber: number;
  timeAgo: string;
  type: string; // e.g., "Aqua"
  rarity: "Common" | "Uncommon" | "Rare" | "Elite";
  packName: string;
  packImage: string;
}

// Rarity badge color mapping
const rarityBadgeColors: Record<string, string> = {
  Common: "bg-[#4A4A4A]",
  Uncommon: "bg-[#22C55E]",
  Rare: "bg-[#3B82F6]",
  Elite: "bg-[#A855F7]",
};

// Frame images based on rarity
const frameImages: Record<string, string> = {
  Common: "/card-frames/frame-1.png",
  Rare: "/card-frames/frame-2.png",
  Uncommon: "/card-frames/frame-3.png",
  Elite: "/card-frames/frame-4.png",
};

export default function RecentPullCard({
  name,
  leftBadgeNumber,
  rightBadgeNumber,
  timeAgo,
  type,
  rarity,
  packName,
  packImage,
}: RecentPullCardProps) {
  const frameImage = frameImages[rarity] || frameImages.Common;

  return (
    <div className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[350px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[380px] xl:h-[420px] 2xl:h-[440px] flex-shrink-0 rounded-[10px] sm:rounded-[12px] md:rounded-[14px] border border-[#2A2A2A] bg-[#3E474C] overflow-hidden flex flex-col">
      {/* Top Section - Frame Area */}
      <div className="flex-1 flex items-center justify-center relative px-3 sm:px-4 md:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6">
        {/* Time tag - positioned at top right of card area */}
        <span className="absolute top-2 right-3 sm:top-3 sm:right-4 md:right-2 bg-[#3E474C] text-white text-[8px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap z-30 border border-[#2A2A2A]/30">
          {timeAgo}
        </span>

        {/* Frame Image Container */}
        <div className="relative">
          <Image
            src={frameImage}
            alt={name}
            width={200}
            height={267}
            className="object-contain rounded-md sm:rounded-lg w-[130px] h-[173px] sm:w-[150px] sm:h-[200px] md:w-[180px] md:h-[240px] lg:w-[200px] lg:h-[267px]"
            style={{
              boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}
          />

          {/* Left Badge - Blue gradient - positioned at top-left edge of frame */}
          <div 
            className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base shadow-lg z-30"
            style={{
              background: "linear-gradient(180deg, #7091FF 0%, #1436A9 100%)"
            }}
          >
            {leftBadgeNumber}
          </div>

          {/* Right Badge - positioned at top-right edge of frame */}
          <div 
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base shadow-lg z-30"
            style={{
              background: "linear-gradient(180deg, #E04548 0%, #B71959 100%)"
            }}
          >
            {rightBadgeNumber}
          </div>

          {/* Sparkle effects - positioned around the frame */}
          {/* Left side sparkle */}
          <Image
            src="/sparkles.svg"
            alt=""
            width={48}
            height={48}
            className="absolute top-1/4 -left-4 sm:-left-5 md:-left-6 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          {/* Bottom-right edge sparkle */}
          <Image
            src="/sparkles.svg"
            alt=""
            width={48}
            height={48}
            className="absolute -bottom-3 -right-4 sm:-bottom-4 sm:-right-5 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
        </div>
      </div>

      {/* Bottom Section - Info */}
      <div className="w-full h-[90px] sm:h-[100px] md:h-[110px] lg:h-[115px] xl:h-[130px] 2xl:h-[140px] bg-[#1D1D1D] border-t border-[#2A2A2A] px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 flex flex-col justify-center gap-2 sm:gap-3">
        {/* Name and Tags */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 md:gap-2">
          <h3 className="text-white font-semibold text-sm sm:text-base">{name}</h3>
          
          {/* Type Tag - Aqua colored */}
          <span className="bg-[#06B6D4] text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 md:px-2.5 py-0.5 rounded-full">
            {type}
          </span>
          
          {/* Rarity Tag */}
          <span className={`${rarityBadgeColors[rarity]} text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 md:px-2.5 py-0.5 rounded-full`}>
            {rarity}
          </span>
        </div>

        {/* Pack Info - rounded border container */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 rounded-full border border-[#2A2A2A]">
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded overflow-hidden flex-shrink-0">
            <Image
              src={packImage}
              alt={packName}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-[#939BAA] text-[10px] sm:text-xs md:text-sm truncate">{packName}</span>
        </div>
      </div>
    </div>
  );
}
