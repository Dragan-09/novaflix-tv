import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/organisms/hero";
import Section from "../components/organisms/section";
import PlanCard from "../components/molecules/plan-card";
import Footer from "../components/molecules/footer";
import BottomNavbar from "../components/molecules/bottom-navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

import "swiper/css/effect-cards";
import "swiper/css";
import ServiceCard from "../components/molecules/service-box";
import Title from "../components/atoms/section-title";
import Features from "../components/organisms/features";
import Li from "../components/atoms/li";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const isCelebrating = new URLSearchParams(location.search).get("congrats");
  const { width, height } = useWindowSize();

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
          <Section>
            <div className="about grid grid-cols-1 lg:grid-cols-2 gap-y-7">
              <div className="about-list flex items-center justify-center">
                <div className="text p-7 bg-slate-200 rounded-xl w-10/12 2xl:w-9/12 relative backdrop-blur-lg shadow-xl">
                  <div className="title text-center p-3 absolute -top-10 left-1/2 translate-x-[-50%] text-xl lg:-left-10 lg:translate-x-0 bg-slate-200 uppercase lg:text-3xl font-bold rounded-xl shadow-md px-5">
                    about our iptv
                  </div>
                  <ul className="pt-4 font-semibold leading-7 text-justify">
                    <Li icon={"check"}>
                      Experience unforgettable moments with your family and
                      dearones.
                    </Li>
                    <Li icon={"check"}>Tune in to the biggest events.</Li>
                    <Li icon={"check"}>
                      Enjoy top-notch animal, news, and kids' channels.
                    </Li>
                    <Li icon={"check"}>
                      Stream the newest global movies and TV shows.
                    </Li>
                    <Li icon={"check"}>
                      Channels available in FULL HD, HD, and 4K.
                    </Li>
                    <Li icon={"check"}>
                      We promise a 100% satisfaction guarantee.
                    </Li>
                  </ul>
                </div>
              </div>{" "}
              <div className="tv overflow-hidden flex items-center justify-center h-full order-2 lg:order-none aspect-video">
                <div
                  style={{
                    backgroundImage:
                      "url(https://media.istockphoto.com/id/1066472014/photo/rear-view-of-a-family-watching-tv-on-sofa-at-home.webp?s=2048x2048&w=is&k=20&c=ebpzWWaccbYeg8EHSCryJk6UH5k9bYFLVhXAkriIZo4=)",
                  }}
                  className="image relative w-10/12 h-full rounded-lg border-4 bg-cover bg-no-repeat bg-center">
                  <div className="absolute bottom-3 w-1/2 h-[7px] bg-white rounded-full left-1/2 translate-x-[-50%]"></div>
                </div>
              </div>
            </div>
          </Section>
        </div>
        <Section title="Get Yours Now" id="pricing">
          <div className="px-0 sm:px-5 md:px-10 my-5 md:my-10 w-full 2xl:px-30">
            <Swiper
              modules={[EffectCards, Autoplay]}
              autoplay={{ delay: 5000 }}
              effect="cards"
              spaceBetween={40}
              breakpoints={{
                769: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                  effect: "slide",
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  effect: "slide",
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
          </div>
        </Section>
        <div className="bg-gray-700/20 w-full">
          <Section title={"Features"} id={"features"}>
            <Features />
          </Section>
        </div>
        <Footer />
      </>
    )
  );
}

export default HomePage;
