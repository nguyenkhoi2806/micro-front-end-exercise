import React from 'react';
import classNames from 'classnames';

import {createMountComponent} from "../../utils/mountComponent";
import styles from './HeroBanner.module.scss';

interface IHeroBannerProps {
  title: string;
  content: string;
  buttonTitle: string;
  description: string;
}

const HeroBanner = (props: IHeroBannerProps) => {
  return (
    <div
      className={classNames(styles.hero__item, 'set-bg')}
      style={{backgroundImage: 'url(/img/hero/banner.jpg)'}}
    >
      <div className={styles.hero__text}>
        <span>{ props.title }</span>
        <h2 dangerouslySetInnerHTML={{ __html: props.content }} />
        <p>{ props.description }</p>
        <a href="/shop" className="primary-btn">{ props.buttonTitle }</a>
      </div>
    </div>
  );
};

export default (el: any, props: IHeroBannerProps) => createMountComponent(HeroBanner, props, el);
