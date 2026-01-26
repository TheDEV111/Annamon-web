import PacksHeroCarousel from "../../components/PacksHeroCarousel";
import PacksFilter from "../../components/PacksFilter";
import PacksGrid from "../../components/PacksGrid";

export default function PacksPage() {
  return (
    <div className="min-h-screen pt-6 sm:pt-8 lg:pt-10 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pb-4 sm:pb-6 lg:pb-8 xl:pb-10 2xl:pb-12">
      {/* Hero Carousel Section */}
      <section className="mb-6 sm:mb-8 lg:mb-10">
        <PacksHeroCarousel />
      </section>

      {/* Filter Buttons */}
      <section className="mb-6 sm:mb-8">
        <PacksFilter />
      </section>

      {/* Packs Grid Section */}
      <section>
        <PacksGrid />
      </section>
    </div>
  );
}
