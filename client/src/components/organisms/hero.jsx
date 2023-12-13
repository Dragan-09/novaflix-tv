import React, { useState, useEffect } from "react";
import Navbar from "../molecules/navbar";
import Button from "../atoms/button";
import CategoryCard from "../../components/molecules/category-box";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ChannelCard from "../molecules/channel-box";
import axios from "axios";
import toast from "react-hot-toast";
import refreshAccountUtil from "../utils/refresh-account";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../features/auth/auth-slice";
import FreeTrial from "../molecules/free-trial";

function Hero() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const account = useSelector((state) => state.auth.account);
  const dispatch = useDispatch();

  useEffect(() => {
    return async () => {
      try {
        const categories = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        const channels = await axios.get(
          `${import.meta.env.VITE_API_URL}/channels`
        );
        setChannels(channels.data.data);
        setCategories(categories.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    loading || (
      <div className="hero border-b-2 border-slate-800 dark:border-white w-full h-[calc(100vh-55px)] sm:h-screen sm:min-h-[800px] pt-10 px-0 sm:px-2 lg:px-5 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="w-full h-full absolute bg-gradient-to-b from-white dark:from-slate-900 to-transparent top-0 left-0 z-0"></div>
        <div className="w-full h-full absolute bg-gradient-to-t from-white dark:from-slate-900 to-transparent top-0 left-0 z-0"></div>
        <div className="container mx-auto h-full z-10 relative">
          <Navbar />
          <div className="hero-content w-full h-[calc(100%-100px)] text-center content-center">
            <div className="flex w-full items-center h-1/2 px-10 lg:px-28">
              <div className="description w-full">
                <p className="capitalize text-5xl sm:text-7xl text-white font-bold drop-shadow-xl">
                  TeleVista
                </p>
                <p className="sm:leading-tight text-md sm:text-5xl md:text-3xl text-white font-bold pt-2 capitalize">
                  Revolutioning your investments with
                </p>
                <p className="dark:text-gray-100 text-gray-50 italic text-xs sm:text-base pt-3 pb-6 font-medium hidden lg:block">
                  Say goodbye to traditional investing and hello to our
                  cutting-edge app designed for modern investors
                </p>
                <div className="flex justify-center mt-5">
                  {isLoggedIn && account.plan ? (
                    <Button
                      style={"filled"}
                      color={"white"}
                      size={"large"}
                      onClick={() =>
                        dispatch(
                          authActions.showAccount({
                            normal: true,
                            mobile: true,
                          })
                        )
                      }
                    >
                      My Account
                    </Button>
                  ) : (
                    <FreeTrial />
                  )}
                </div>
              </div>
            </div>
            <div className="h-1/2">
              <div className="categories mt-5 px-5 sm:px-10">
                <Swiper
                  modules={[Autoplay]}
                  loop={true}
                  grabCursor={true}
                  spaceBetween={10}
                  slidesPerView={2}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  breakpoints={{
                    769: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                      autoplay: {
                        delay: 4000,
                      },
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                    1281: {
                      slidesPerView: 5,
                      spaceBetween: 50,
                    },
                  }}
                >
                  {categories.map((category) => {
                    return (
                      <SwiperSlide key={category.name}>
                        <CategoryCard
                          name={category.name}
                          icon={category.icon}
                          key={category.name}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="channels mt-0 sm:mt-5 px-5 sm:px-10">
                <Swiper
                  modules={[Autoplay]}
                  loop={true}
                  grabCursor={true}
                  spaceBetween={20}
                  slidesPerView={2}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  breakpoints={{
                    769: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                      autoplay: {
                        delay: 4000,
                      },
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 40,
                    },
                    1281: {
                      slidesPerView: 6,
                    },
                  }}
                >
                  {channels.map((channel) => {
                    return (
                      <SwiperSlide key={channel.name}>
                        <ChannelCard
                          name={channel.name}
                          icon={channel.icon}
                          key={channel.name}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Hero;
