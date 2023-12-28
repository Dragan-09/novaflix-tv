import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/organisms/hero";
import Section from "../components/organisms/section";
import PlanCard from "../components/molecules/plan-card";
import Footer from "../components/molecules/footer";
import BottomNavbar from "../components/molecules/bottom-navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, EffectCards, Navigation } from "swiper/modules";
import { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

import "swiper/css/effect-cards";
import "swiper/css";
import ServiceCard from "../components/molecules/service-box";
import Title from "../components/atoms/section-title";
import Features from "../components/organisms/features";
import Li from "../components/atoms/li";
import config from "../config";
import Icon from "../components/atoms/icon";
import Support from "../components/atoms/support";
import About from "../components/organisms/about";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const isCelebrating = new URLSearchParams(location.search).get("congrats");
  const { width, height } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const getData = async () => {
      console.log("Salam lkhout");
      try {
        const plans = await axios.get(`${import.meta.env.VITE_API_URL}/plans`);
        setPlans(plans.data.data);
        console.log(typeof plans.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setIsMobile(width < 768 ? true : false);
  }, [width]);

  return (
    !loading && (
      <>
        {isCelebrating && (
          <Confetti
            width={width}
            height={height}
            style={{ zIndex: 30, position: "fixed" }}
            recycle={false}
            numberOfPieces={500}
            gravity={0.04}
            tweenDuration={20000}
            initialVelocityY={1}
          />
        )}
        <Toaster
          toastOptions={{
            style: {
              textAlign: "center",
            },
          }}
        />
        <BottomNavbar />
        <Hero />
        <div className="about-us bg-slate-700/20">
          <Section title={`Welcome to ${config.app_name}`}>
            <About />
          </Section>
        </div>
        <Section title="Get Yours Now" id="pricing">
          <div className="px-0 sm:px-5 md:px-10 my-5 md:my-10 w-full 2xl:px-30 relative">
            <Swiper
              modules={isMobile && [EffectCards, Autoplay]}
              autoplay={{ delay: 5000 }}
              effect="cards"
              navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
              spaceBetween={40}
              breakpoints={{
                769: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  effect: "slide",
                  autoplay: { delay: 2000 },
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                  effect: "slide",
                },
                1360: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}>
              {plans.map((plan, index) => {
                const { id, title, description, price, price_description } =
                  plan;
                return (
                  <SwiperSlide key={index}>
                    <PlanCard
                      key={id}
                      id={id}
                      title={title}
                      description={description}
                      price={price}
                      resubdesc={price_description}
                      icon={plan.image}
                      main={id == 2 ? true : false}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {isMobile || (
              <div className="pagination">
                <button className="arrow-left arrow w-[40px] flex items-center justify-center rounded-full aspect-square bg-white/50 cursor-pointer left-5 z-30 absolute top-1/2 disabled:opacity-60">
                  <Icon icon={"left"} color={"white"} width={20} />
                </button>
                <button className="arrow-right arrow w-[40px] flex items-center justify-center rounded-full aspect-square bg-white/50 cursor-pointer right-5 z-30 absolute top-1/2 disabled:opacity-60">
                  <Icon icon={"right"} color={"white"} width={20} />
                </button>
              </div>
            )}
          </div>
        </Section>
        <div className="bg-gray-700/20 w-full">
          <Section title={"Features"} id={"features"}>
            <Features />
          </Section>
        </div>
        <Support />
        <Footer />
      </>
    )
  );
}

export default HomePage;
