import React from 'react'
import Hero from '../component/Hero'
import FeaturedDestination from '../component/featureDestination'
import ExclusiveOffers from '../component/exclusiveOffers'
import Testimonial from '../component/Testimonial'
import NewsLetter from '../component/newsLetter'
import recommendedHotels from '../component/recommendedHotels'
export const Home = () => {
  return (
    <>

        <Hero/>
        <recommendedHotels/>
        <FeaturedDestination/>
        <ExclusiveOffers/>
        <Testimonial/>
        <NewsLetter/>
        
    </>
  )
}
