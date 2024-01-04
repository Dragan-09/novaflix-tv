import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/organisms/hero";
import Section from "../components/organisms/section";
import PlanCard from "../components/molecules/plan-card";
import Footer from "../components/molecules/footer";
import BottomNavbar from "../components/molecules/bottom-navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SwiperCore from "swiper";
import { Autoplay, EffectCards, Navigation } from "swiper/modules";
import { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

import "swiper/css/effect-cards";
import "swiper/css";
import "@splidejs/react-splide/css";

import Features from "../components/organisms/features";
import config from "../config";
import Icon from "../components/atoms/icon";
import Support from "../components/atoms/support";
import About from "../components/organisms/about";
import Reviews from "../components/organisms/reviews";

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
        <Section title={"Popular Streams"} className={"container px-20"}>
          <Splide
            className="pt-5"
            aria-label="Movies"
            options={{
              type: "slide",
              rewind: true,
              perPage: 1,
              gap: 30,
              perMove: 1,
              pagination: false,
              arrows: false,
              autoplay: true,
              interval: 5000,
              mediaQuery: "min",
              breakpoints: {
                768: {
                  perPage: 2,
                  perMove: 2,
                  interval: 3000,
                },
                1024: {
                  perPage: 4,
                  perMove: 4,
                },
              },
            }}>
            {/* Please remove this fucking spagetti code, it's 2024 bro. */}
            <SplideSlide className="overflow-hidden">
              <img
                className="rounded-xl"
                src="https://tvmedia4k.com/wp-content/uploads/2023/06/WAPK44GzK0B-q6a93dtl9zirprp4niv02gxqc1qvp287939mm8jgq8.webp"
                alt=""
              />
            </SplideSlide>
            <SplideSlide className="overflow-hidden">
              <img
                className="rounded-xl"
                src="https://tvmedia4k.com/wp-content/uploads/2023/06/Untitled-design-52-q68u47pa0jb8d9dur9f0ykhpvv2diyqa9uc1rxkcv4.webp"
                alt=""
              />
            </SplideSlide>
            <SplideSlide className="overflow-hidden">
              <img
                className="rounded-xl"
                src="https://tvmedia4k.com/wp-content/uploads/2023/06/Untitled-design-65-q69b2rr9af49quilj6f0khwgu1phd6lkvti7ycab6o.webp"
                alt=""
              />
            </SplideSlide>
            <SplideSlide className="overflow-hidden">
              <img
                className="rounded-xl"
                src="https://tvmedia4k.com/wp-content/uploads/2023/06/Untitled-design-56-q69b3ak133u071rahejjyd5opr4tn4o7mejxjvifq8.webp"
                alt=""
              />
            </SplideSlide>
            <SplideSlide className="overflow-hidden">
              <img
                className="rounded-xl"
                src="https://tvmedia4k.com/wp-content/uploads/2023/06/WAPK44GzK0B-q6a93dtl9zirprp4niv02gxqc1qvp287939mm8jgq8.webp"
                alt=""
              />
            </SplideSlide>
            <SplideSlide className="overflow-hidden">
              <img
                className="rounded-xl"
                src="https://tvmedia4k.com/wp-content/uploads/2023/06/Untitled-design-52-q68u47pa0jb8d9dur9f0ykhpvv2diyqa9uc1rxkcv4.webp"
                alt=""
              />
            </SplideSlide>
            <SplideSlide className="overflow-hidden">
              <img
                className="rounded-xl"
                src="https://tvmedia4k.com/wp-content/uploads/2023/06/Untitled-design-65-q69b2rr9af49quilj6f0khwgu1phd6lkvti7ycab6o.webp"
                alt=""
              />
            </SplideSlide>
            <SplideSlide className="overflow-hidden">
              <img
                className="rounded-xl"
                src="https://tvmedia4k.com/wp-content/uploads/2023/06/Untitled-design-56-q69b3ak133u071rahejjyd5opr4tn4o7mejxjvifq8.webp"
                alt=""
              />
            </SplideSlide>
          </Splide>
        </Section>
        <div className="bg-slate-700/20">
          <Section title={`Welcome to ${config.app_name}`} className="about-us">
            <About />
          </Section>
        </div>
        <Section title="Get Yours Now" id="pricing">
          <div className="px-5 sm:px-5 my-5 md:my-10 w-full 2xl:px-30 relative">
            <Swiper
              style={{ overflow: "visible" }}
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
                const {
                  id,
                  title,
                  description,
                  price,
                  price_description,
                  features,
                } = plan;
                return (
                  <SwiperSlide key={index} style={{ overflow: "visible" }}>
                    <PlanCard
                      key={id}
                      id={id}
                      title={title}
                      description={description}
                      features={features}
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
              <div className="pagination xl:hidden">
                <button className="arrow-left arrow w-[40px] flex items-center justify-center rounded-full aspect-square bg-white/50 cursor-pointer -left-1 z-30 absolute top-1/2 disabled:opacity-60">
                  <Icon icon={"left"} color={"white"} width={20} />
                </button>
                <button className="arrow-right arrow w-[40px] flex items-center justify-center rounded-full aspect-square bg-white/50 cursor-pointer -right-1 z-30 absolute top-1/2 disabled:opacity-60">
                  <Icon icon={"right"} color={"white"} width={20} />
                </button>
              </div>
            )}
          </div>
        </Section>
        <div className="bg-slate-700/20">
          <Section title={"Features"} id={"features"} className="w-full">
            <Features />
          </Section>
        </div>
        <Section title={"how was our service"}>
          <Reviews />
        </Section>
        <Support />
        <Footer />
      </>
    )
  );
}

export default HomePage;
