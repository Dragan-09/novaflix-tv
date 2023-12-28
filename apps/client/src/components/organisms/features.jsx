import React, { useEffect, useState } from "react";
import Title from "../atoms/section-title";
import axios from "axios";
import ServiceCard from "../molecules/service-box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const features = await axios.get(
          `${import.meta.env.VITE_API_URL}/features`,
        );
        setFeatures(features.data.data);
        console.log(features.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeatures();
  }, []);
  return (
    <div className="services container px-0 sm:px-5 md:px-10 my-5 md:mt-10 w-full 2xl:px-30 px-5">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        grabCursor
        effect="slide"
        spaceBetween={20}
        slidesPerView={2}
        loop
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
        }}>
        {features.map((feature, index) => (
          <SwiperSlide key={index}>
            <ServiceCard icon={feature.icon} name={feature.name} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="services grid grid-cols-4 xl:grid-cols-6 gap-4 mt-4"></div> */}
    </div>
  );
}

export default Features;
