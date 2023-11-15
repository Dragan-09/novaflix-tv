import React from 'react'
import Hero from '../components/organisms/hero'
import Section from '../components/organisms/section'
import CategoryCard from '../components/molecules/category-box'
import PlanCard from '../components/molecules/plan-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Grid } from 'swiper/modules'

import 'swiper/css'
import Footer from '../components/molecules/footer'
import BottomNavbar from '../components/molecules/bottom-navbar'

function HomePage() {
  const categories = [
    {
      name: "movies",
      icon: "movies"
    },
    {
      name: "sport",
      icon: "sport"
    },
    {
      name: "Cuisine",
      icon: "cuisine"
    },
    {
      name: "documentary",
      icon: "documentary"
    },
    {
      name: "news",
      icon: "news"
    },
    {
      name: "other",
      icon: "other"
    }
  ]

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
      <Section title="Content Categories" id="categories">
        <div className="categories mt-5 px-5 sm:px-10">
          <Swiper 
            modules={[Autoplay, Grid]}
            loop={true}
            spaceBetween={10}
            slidesPerView={2}
            autoplay={{delay: 2000, disableOnInteraction:false}}
            breakpoints={{
              769: {
                slidesPerView: 4,
                spaceBetween: 50,
                autoplay: {
                  delay: 4000
                }
              },
              1281: {
                slidesPerView: 5
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
      </Section>
      <Section title="Plans" id="plans">
        <div className="plans container px-10 my-10 grid grid-cols-3">
          {plans.map(plan => {
            const {title, description, price, resubscription_description, icon, main} = plan
            return <PlanCard key={title} title={title} description={description} price={price} resubdesc={resubscription_description} icon={icon} main={main} />
          })}
        </div>
      </Section>
      <Footer />
    </>
  )
}

export default HomePage