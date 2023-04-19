import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import 'slicknav/dist/slicknav.css';
import 'slicknav/dist/jquery.slicknav.min';
import styles from './Hamburger.module.scss';

const Hamburger = () => {
  useEffect(() => {
    $(".hamburger__open").on('click', function () {
      $(".hamburger__menu__wrapper").addClass("show__hamburger__menu__wrapper");
      $(".hamburger__menu__overlay").addClass("active");
      $("body").addClass("over_hid");
    });

    $(".hamburger__menu__overlay").on('click', function () {
      $(".hamburger__menu__wrapper").removeClass("show__hamburger__menu__wrapper");
      $(".hamburger__menu__overlay").removeClass("active");
      $("body").removeClass("over_hid");
    });

    ($(".mobile-menu") as any).slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true
    });
  }, []);

  return (
    <>
      <div className={styles.hamburger__menu__overlay} />
      <div className={styles.hamburger__menu__wrapper}>
        <div className={styles.hamburger__menu__logo}>
          <Link to="/">
            <img src="/img/logo.png" alt="" />
          </Link>
        </div>
        <div className={styles.hamburger__menu__cart}>
          <ul>
            <li>
              <a href="#"><i className="fa fa-heart" /> <span>1</span></a>
            </li>
            <li>
              <a href="#"><i className="fa fa-shopping-bag" /> <span>3</span></a>
            </li>
          </ul>
          <div className={styles.header__cart__price}><span>$10.00</span></div>
        </div>
        <div className={styles.hamburger__menu__widget}>
          <div className={styles.header__top__right__language}>
            <img src="/img/language.png" alt="" />
            <div>English</div>
            <span className="arrow_carrot-down" />
            <ul>
              <li><a href="#">Spanish</a></li>
              <li><a href="#">English</a></li>
            </ul>
          </div>
          <div className={styles.header__top__right__auth}>
            <a href="#"><i className="fa fa-user" /> Login</a>
          </div>
        </div>
        <nav className={classNames(styles.hamburger__menu__nav, 'mobile-menu')}>
          <ul>
            <li className="active"><a href="./index.html">Home</a></li>
            <li><a href="./shop.html">Shop</a></li>
            <li><a href="#">Pages</a>
              <ul className={styles.header__menu__dropdown}>
                <li><a href="./shop-details.html">Shop Details</a></li>
                <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                <li><a href="./checkout.html">Check Out</a></li>
                <li><a href="./blog-details.html">Blog Details</a></li>
              </ul>
            </li>
            <li><a href="./blog.html">Blog</a></li>
            <li><a href="./contact.html">Contact</a></li>
          </ul>
        </nav>

        <div id="mobile-menu-wrap" />
        <div className={styles.header__top__right__social}>
          <a href="#"><i className="fa fa-facebook" /></a>
          <a href="#"><i className="fa fa-twitter" /></a>
          <a href="#"><i className="fa fa-linkedin" /></a>
          <a href="#"><i className="fa fa-pinterest-p" /></a>
        </div>
        <div className={styles.hamburger__menu__contact}>
          <ul>
            <li><i className="fa fa-envelope" /> info@ogani.com</li>
            <li>Free shipping for all orders over $50</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Hamburger;
