import React from "react";
import Title from "./title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Take advantage of our limited time offers and special packages to enhance your stay and create unforgettable memories."
        />

        <button className="group flex items-center gap-2 font-medium cursor-pointer">
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="transition-all duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 mt-12">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="relative w-full max-w-[373px] h-[225px] rounded-2xl overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute inset-0 bg-black/35"></div>

            <p className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-medium bg-white text-gray-800 rounded-full">
              {item.priceOff}% OFF
            </p>

            <div className="relative z-10 flex flex-col justify-between h-full p-6">
              <div className="mt-8">
                <h3 className="text-2xl font-playfair font-semibold  text-gray-100">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-100">
                  {item.description}
                </p>

                <p className="mt-3 text-sm text-gray-200">
                  Expires {item.expiryDate}
                </p>
              </div>

              <button className="flex items-center gap-2 font-medium cursor-pointer text-gray-100 ">
                View Offers
                <img
                  src={assets.arrowIcon}
                  alt="arrow-icon"
                  className="invert transition-all duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExclusiveOffers;