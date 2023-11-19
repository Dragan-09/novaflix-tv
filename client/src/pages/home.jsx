import React from 'react'
import Hero from '../components/organisms/hero'
import Section from '../components/organisms/section'
import PlanCard from '../components/molecules/plan-card'
import Footer from '../components/molecules/footer'
import BottomNavbar from '../components/molecules/bottom-navbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards } from 'swiper/modules'

import 'swiper/css/effect-cards';
import 'swiper/css'

function HomePage() {

  const plans = [
    {
      title: "Basic",
      description: "Publish a Single Ad, it never expires.",
      price: 4.98,
      resubscription_description: "Pay every 30 days",
      // icon: "basic",
      icon: "sport",
      main: false
    },
    {
      title: "Premium",
      description: "Publish a Single Ad, it never expires.",
      price: 24.98,
      resubscription_description: "Pay every year",
      // icon: "premium",
      icon: "sport",
      main: true
    },
    {
      title: "Standard",
      description: "Publish a Single Ad, it never expires.",
      price: 14.98,
      resubscription_description: "Pay every 6 months",
      // icon: "standard",
      icon: "sport",
      main: false
    },
  ]

  return (
    <>
      <BottomNavbar />
      <Hero />
      <Section title="Get Yours Now" id="plans">
        <div className="plans container px-0 sm:px-5 md:px-10 my-5 md:my-10 w-full">
          <Swiper
            modules={[EffectCards, Autoplay]}
            autoplay={{delay: 2000}}
            effect='cards'
            spaceBetween={40}
            breakpoints={{
              769: {
                slidesPerView: 2,
                spaceBetween: 50,
                effect: "slide"
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                effect: "slide"
              }
            }}>
            {plans.map((plan, index) => {
              const {title, description, price, resubscription_description, icon, main} = plan
              return (
                <SwiperSlide key={index}>
                  <PlanCard key={title} title={title} description={description} price={price} resubdesc={resubscription_description} icon={icon} main={main} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </Section>
      <Footer />
    </>
  )
}

export default HomePage