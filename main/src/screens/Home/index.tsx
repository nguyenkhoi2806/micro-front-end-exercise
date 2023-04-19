import React  from 'react';
import Category from './Category';
import FeaturedProducts from './FeaturedProducts';
import ProductSmallSlider from './ProductSmallSlider';
import Banner from './Banner';


const Homepage = ({eventBus}: any) => {
  return (
    <>
      <Category />
      <FeaturedProducts eventBus={eventBus}/>
      <Banner />
      <ProductSmallSlider/>
    </>
  )
}

export default Homepage;
