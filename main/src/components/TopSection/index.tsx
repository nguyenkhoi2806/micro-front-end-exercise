import React from 'react';

import { mountRemoteComponent } from '@/utils/loadComponent';
import CategoryMenu from './CategoryMenu';
import Search from './Search';

const TopSection = () => {
  const heroBannerProps = {
    title: 'FRESH FRUIT',
    content: 'Vegetable <br/>100% Organic',
    buttonTitle: 'SHOP NOW',
    description: 'Free Pickup and Delivery Available'
  };

  return (
    <section className="hero">
      <div className="row">
        <div className="col-lg-3">
          <CategoryMenu />
        </div>
        <div className="col-lg-9">
          <div className="hero__search">
            <Search />

            <div className="hero__search__phone">
              <div className="hero__search__phone__icon">
                <i className="fa fa-phone" />
              </div>
              <div className="hero__search__phone__text">
                <h5>704-768-7449</h5>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
          <div className='hero__item set-bg'>
            {mountRemoteComponent({ module: 'shared', component: 'HeroBanner', props: heroBannerProps })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
