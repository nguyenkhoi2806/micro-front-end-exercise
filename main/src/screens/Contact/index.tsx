import React from 'react';

const Contact = () => {
  return <div>
    <section className="breadcrumb-section set-bg" style={{ backgroundImage: 'url(img/breadcrumb.jpg)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb__text">
              <h2>Contact Us</h2>
              <div className="breadcrumb__option">
                <a href="./index.html">Home</a>
                <span>Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="contact spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6 text-center">
            <div className="contact__widget">
              <span className="icon_phone" />
              <h4>Phone</h4>
              <p>704-768-7449</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 text-center">
            <div className="contact__widget">
              <span className="icon_pin_alt" />
              <h4>Address</h4>
              <p>1317 Harry Place 28204 NC</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 text-center">
            <div className="contact__widget">
              <span className="icon_clock_alt" />
              <h4>Open time</h4>
              <p>10:00 am - 23:00 pm</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 text-center">
            <div className="contact__widget">
              <span className="icon_mail_alt" />
              <h4>Email</h4>
              <p>info@ogami.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10962.792225115849!2d15.6691062!3d46.6129698!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2cb1d6206b041%3A0x80c71d39fbc13e9!2sHarry%20Pl%2C%20Thonotosassa%2C%20FL%2033527%2C%20USA!5e0!3m2!1sen!2ssi!4v1592214730014!5m2!1sen!2ssi" width="600" height="450" frameBorder="0" style={{ border: 0 }} aria-hidden="false" tabIndex={0} />
      <div className="map-inside">
        <i className="icon_pin" />
        <div className="inside-widget">
          <h4>North Carolina</h4>
          <ul>
            <li>Phone: 704-768-7449</li>
            <li>Add: 1317 Harry Place, 28204 NC </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="contact-form spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="contact__form__title">
              <h2>Leave Message</h2>
            </div>
          </div>
        </div>
        <form action="#">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <input type="text" placeholder="Your name" />
            </div>
            <div className="col-lg-6 col-md-6">
              <input type="text" placeholder="Your Email" />
            </div>
            <div className="col-lg-12 text-center">
              <textarea placeholder="Your message" />
              <button type="submit" className="site-btn">SEND MESSAGE</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div >
}

export default Contact;
