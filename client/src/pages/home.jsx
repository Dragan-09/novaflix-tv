import React from 'react'
import Hero from '../components/organisms/hero'
import Section from '../components/organisms/section'
import CategoryCard from '../components/molecules/category-box'
import PlanCard from '../components/molecules/plan-card'

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
    // {
    //   name: "other",
    //   icon: "other"
    // }
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
      <Hero />
      <Section title="Content Categories" id="categories">
        <div className="categories mt-5 grid grid-cols-5 gap-5 px-10">
          {categories.map(category => <CategoryCard name={category.name} icon={category.icon} key={category.name} /> )}
        </div>
      </Section>
      <Section title="Plans" id="plans">
        <div className="plans container px-10 my-10 grid grid-cols-3">
          {plans.map(plan => {
            const {title, description, price, resubscription_description, icon, main} = plan
            return <PlanCard title={title} description={description} price={price} resubdesc={resubscription_description} icon={icon} main={main} />
          })}
        </div>
      </Section>
    </>
  )
}

export default HomePage