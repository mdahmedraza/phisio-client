import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./About.module.css";

/**
 * About component for physiotherapist profile.
 * Props (optional):
 *  - onBook(fn)  : called when Book Consultation clicked
 *  - onContact(fn): called when Contact clicked
 *
 * Replace the image src with an actual photo at: /assets/images/physio.jpg
 */
const About = ({ onBook, onContact }) => {
  const navigate = useNavigate();
  const startYear = 2014;
  const yearsExp = new Date().getFullYear() - startYear;

  const handleBook = () => {
    if (typeof onBook === "function") return onBook();
    navigate("/appointment");
  };

  const handleContact = () => {
    if (typeof onContact === "function") return onContact();
    navigate("/contact");
  };

  return (
    <section className={styles.about} aria-labelledby="about-title">
      <div className={styles.inner}>
        <figure className={styles.photoWrap}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_UjpM7wE3tQ_ScsVv7vlk8SzrS1ZDQDrpg&s"
            alt="Physiotherapist — Dr. Ayesha Khan"
            className={styles.photo}
            loading="lazy"
            width="560"
            height="560"
          />
        </figure>

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 id="about-title" className={styles.title}>Dr. Ayesha Khan, MPT</h2>
            <div className={styles.subtitle}>Senior Physiotherapist — Musculoskeletal & Sports Rehab</div>
          </div>

          <p className={styles.lead}>
            Dr. Ayesha is a chartered physiotherapist specialising in back & neck pain, post-operative rehab,
            and sports injury management. She combines hands-on manual therapy with progressive exercise plans
            and education to help patients move without fear and return to their normal lives.
          </p>

          <div className={styles.quick}>
            <div className={styles.stat}>
              <div className={styles.statNum}>{yearsExp}+</div>
              <div className={styles.statLabel}>Years experience</div>
            </div>

            <div className={styles.stat}>
              <div className={styles.statNum}>8k+</div>
              <div className={styles.statLabel}>Patients treated</div>
            </div>

            <div className={styles.stat}>
              <div className={styles.statNum}>95%</div>
              <div className={styles.statLabel}>Patient satisfaction</div>
            </div>
          </div>

          <div className={styles.subSection}>
            <h3 className={styles.subTitle}>Qualifications</h3>
            <ul className={styles.qualList}>
              <li>MPT — Musculoskeletal Physiotherapy, University of Health</li>
              <li>BPT — Physiotherapy, National Medical College</li>
              <li>Cert. in Sports Rehabilitation (ISPR)</li>
            </ul>
          </div>

          <div className={styles.subSection}>
            <h3 className={styles.subTitle}>What I treat</h3>
            <ul className={styles.skills}>
              <li>Low back & neck pain</li>
              <li>Shoulder & knee injuries</li>
              <li>Post-operative rehabilitation</li>
              <li>Sports performance & injury prevention</li>
              <li>Tele-rehabilitation</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <button className={styles.bookBtn} onClick={handleBook} aria-label="Book consultation">Book Consultation</button>
            <button className={styles.contactBtn} onClick={handleContact} aria-label="Contact clinic">Contact Clinic</button>
          </div>

          <div className={styles.certRow} aria-hidden="true">
            <span className={styles.cert}>Manual Therapy</span>
            <span className={styles.cert}>Dry Needling</span>
            <span className={styles.cert}>Rehab Exercise</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
