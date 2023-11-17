import React from 'react'
import Navbar from '../molecules/navbar'
import Button from '../atoms/button'
import CategoryCard from '../../components/molecules/category-box'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import ChannelCard from '../molecules/channel-box'

function Hero() {
  const categories = [
    { name: "movies", icon: "movies" },
    { name: "sport", icon: "sport" },
    { name: "Cuisine", icon: "cuisine" },
    { name: "documentary", icon: "documentary" },
    { name: "news", icon: "news" },
    { name: "other", icon: "other" }
  ]
  const channels = [
    { name: "bein sports", icon: "/images/channels/bein.webp" },
    { name: "f1", icon: "/images/channels/f1.webp" },
    { name: "hulu", icon: "/images/channels/hulu.webp" },
    { name: "netflix", icon: "/images/channels/netflix.webp" },
    { name: "prime video", icon: "/images/channels/prime.webp" },
    { name: "apple tv", icon: "/images/channels/appletv.webp" }
  ]
  return (
    <div className="hero border-b-2 border-slate-800 dark:border-white w-full h-[calc(100vh-55px)] sm:h-screen sm:min-h-[800px] pt-10 px-0 sm:px-2 lg:px-5 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      <div className="w-full h-full absolute bg-gradient-to-b from-white dark:from-slate-900 to-transparent top-0 left-0 z-0"></div>
      <div className="w-full h-full absolute bg-gradient-to-t from-white dark:from-slate-900 to-transparent top-0 left-0 z-0"></div>
      <div className="container mx-auto h-full z-10 relative">
        <Navbar />
        <div className="hero-content w-full h-[calc(100%-100px)] text-center content-center">
          <div className="flex w-full items-center h-1/2 px-10 lg:px-28">
            <div className="description w-full">
              <p className='capitalize text-5xl sm:text-7xl text-white font-bold drop-shadow-xl'>TeleVista</p>
              <p className='sm:leading-tight text-md sm:text-5xl md:text-3xl text-white font-bold pt-2 capitalize'>Revolutioning your investments with</p>
              <p className='dark:text-gray-100 text-gray-50 italic text-xs sm:text-base pt-3 pb-6 font-medium hidden lg:block'>Say goodbye to traditional investing and hello to our cutting-edge app designed for modern investors</p>
              <div className="flex justify-center mt-5">
                <Button style="filled" size="large" color="primary" content="Get 24 hours free" link="" className='shadow' />
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
                autoplay={{delay: 2000, disableOnInteraction:false}}
                breakpoints={{
                  769: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    autoplay: {
                      delay: 4000
                    }
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                  1281: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  }
                }}
              >
                {categories.map(category => {
                  return (
                    <SwiperSlide>
                      <CategoryCard name={category.name} icon={category.icon} key={category.name} />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
            <div className="channels mt-0 sm:mt-5 px-5 sm:px-10">
              <Swiper 
                modules={[Autoplay]}
                loop={true}
                grabCursor={true}
                reverseDirection={true}
                spaceBetween={20}
                slidesPerView={2}
                autoplay={{delay: 3000, disableOnInteraction:false}}
                breakpoints={{
                  769: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    autoplay: {
                      delay: 4000
                    }
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                  },
                  1281: {
                    slidesPerView: 6
                  }
                }}
              >
                {channels.map(category => {
                  return (
                    <SwiperSlide>
                      <ChannelCard name={category.name} icon={category.icon} key={category.name} />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero