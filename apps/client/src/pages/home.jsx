import React, { useEffect, useState } from "react"
import axios from "axios"
import Hero from "../components/organisms/hero"
import Section from "../components/organisms/section"
import PlanCard from "../components/molecules/plan-card"
import Footer from "../components/molecules/footer"
import BottomNavbar from "../components/molecules/bottom-navbar"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectCards } from "swiper/modules"
import { Toaster } from "react-hot-toast"
import Confetti from "react-confetti"
import { useWindowSize } from "@uidotdev/usehooks"

import "swiper/css/effect-cards"
import "swiper/css"

function HomePage() {
  const [loading, setLoading] = useState(true)
  const [plans, setPlans] = useState([])
  const isCelebrating = new URLSearchParams(location.search).get("congrats")
  const { width, height } = useWindowSize()

  useEffect(() => {
    const getData = async () => {
      console.log("Salam lkhout")
      try {
        const plans = await axios.get(`${import.meta.env.VITE_API_URL}/plans`)
        setPlans(plans.data.data)
        console.log(typeof plans.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

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
        <Section title="Get Yours Now" id="pricing">
          <div className="plans container px-0 sm:px-5 md:px-10 my-5 md:my-10 w-full 2xl:px-30">
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
                  plan
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
                )
              })}
            </Swiper>
          </div>
        </Section>
        <Footer />
      </>
    )
  )
}

export default HomePage
