import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const handleNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.elements.email?.value;
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    // In production, send to your API or form provider (SendGrid, Netlify Forms, etc.)
    alert(`Thanks — we'll send updates to ${email}`);
    e.target.reset();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* About / Brand */}
        <div className={styles.col}>
          <div className={styles.brand}>
            <div className={styles.logo}>PureMotion Physio</div>
            <div className={styles.tagline}>Restore movement. Reduce pain. Live fully.</div>
          </div>
          <p className={styles.about}>
            PureMotion Physio offers evidence-based physiotherapy for back & neck pain,
            sports injuries, post-surgical rehab and teleconsultations — personalised plans
            that get you back to what matters.
          </p>

          <div className={styles.socials}>
            <a href="/privacy" aria-label="Facebook" className={styles.social}>FB</a>
            <a href="/privacy" aria-label="Instagram" className={styles.social}>IG</a>
            <a href="/privacy" aria-label="LinkedIn" className={styles.social}>LI</a>
            <a href="https://wa.me/919876543210" aria-label="WhatsApp" className={styles.social}>WA</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.heading}>Quick links</h4>
          <nav className={styles.links} aria-label="Footer Navigation">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/appointment" className={styles.ctaLink}>Book Appointment</a>
          </nav>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.heading}>Services</h4>
          <ul className={styles.services}>
            <li>Assessment & Diagnosis</li>
            <li>Manual Therapy</li>
            <li>Exercise Rehabilitation</li>
            <li>Sports Injury Rehab</li>
            <li>Teleconsultation</li>
          </ul>
        </div>

        {/* Contact / Newsletter */}
        <div className={styles.col}>
          <h4 className={styles.heading}>Contact</h4>
          <address className={styles.contact}>
            <div className={styles.contactLine}><strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></div>
            <div className={styles.contactLine}><strong>Address:</strong> 12 Wellness Street, YourCity</div>
            <div className={styles.contactLine}><strong>Hours:</strong> Mon–Sat • 9:00 AM – 6:00 PM</div>
          </address>

          <form className={styles.newsletter} onSubmit={handleNewsletter}>
            <label htmlFor="email" className={styles.label}>Newsletter</label>
            <div className={styles.inputRow}>
              <input id="email" name="email" type="email" placeholder="your@email.com" />
              <button type="submit" className={styles.newsBtn}>Subscribe</button>
            </div>
            <div className={styles.note}>We only send helpful tips & clinic updates.</div>
          </form>
        </div>
      </div>

      {/* Map + bottom bar */}
      <div className={styles.mapWrap}>
        {/* Replace with Google Maps iframe or embedded map when ready */}
        <div className={styles.mapPlaceholder} aria-hidden="true">
          Map placeholder — replace with Google Maps iframe
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>© {new Date().getFullYear()} PureMotion Physio — All rights reserved.</div>
        <div className={styles.legal}>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
