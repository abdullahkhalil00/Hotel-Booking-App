import React from 'react'
import Hero from '../component/Hero'
import FeaturedDestination from '../component/featureDestination'
import ExclusiveOffers from '../component/exclusiveOffers'
import Testimonial from '../component/Testimonial'
import NewsLetter from '../component/newsLetter'
export const Home = () => {
  return (
    <>

        <Hero/>
        <FeaturedDestination/>
        <ExclusiveOffers/>
        <Testimonial/>
        <NewsLetter/>
        
    </>
  )
}
