import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Services.module.css";

/**
 * Services component
 * - Shows summary cards for core services
 * - "Learn more" links point to /services (full services page)
 * - "Book" triggers navigation to /appointment
 */
const services = [
  {
    id: "assessment",
    title: "Assessment & Diagnosis",
    short: "Detailed movement screening, posture & pain analysis to find the root cause.",
    details: "45–60 min initial assessment including clinical tests, functional movement screening and goal setting.",
    icon: "M12 2a5 5 0 0 1 5 5v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"
  },
  {
    id: "manual",
    title: "Manual Therapy",
    short: "Hands-on techniques to restore mobility, reduce pain and improve tissue healing.",
    details: "Includes soft tissue release, joint mobilisations and specialised manual techniques.",
    icon: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"
  },
  {
    id: "exercise",
    title: "Exercise Rehabilitation",
    short: "Tailored progressive exercise plans to build strength, control and resilience.",
    details: "Personalised home programs, video demonstrations and progression tracking.",
    icon: "M4 6h16v2H4V6zm0 6h10v2H4v-2z"
  },
  {
    id: "tele",
    title: "Teleconsultation",
    short: "Remote assessment & guided rehab for when you can't make it to the clinic.",
    details: "Secure video consults, remote exercise prescription and follow-up reviews.",
    icon: "M7 7h10v6H7z"
  }
];

const ServiceCard = ({ s, onBook }) => {
  return (
    <article className={styles.card} aria-labelledby={`svc-${s.id}`}>
      <div className={styles.iconWrap} aria-hidden="true">
        <svg viewBox="0 0 24 24" className={styles.icon}><path d={s.icon} /></svg>
      </div>

      <div className={styles.cardBody}>
        <h3 id={`svc-${s.id}`} className={styles.cardTitle}>{s.title}</h3>
        <p className={styles.cardShort}>{s.short}</p>
        <p className={styles.cardDetails}>{s.details}</p>

        <div className={styles.cardActions}>
          <a href="/services" className={styles.learn}>Learn more</a>
          <button className={styles.book} onClick={() => onBook(s.id)} aria-label={`Book ${s.title}`}>Book</button>
        </div>
      </div>
    </article>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const handleBook = (serviceId) => {
    // Navigate to appointment page, optionally pass service as state or query
    navigate("/appointment", { state: { service: serviceId } });
  };

  return (
    <section className={styles.services} aria-labelledby="services-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="services-title" className={styles.title}>Our Services</h2>
          <p className={styles.intro}>
            Comprehensive physiotherapy care — from thorough assessment to hands-on treatment and progressive exercise plans.
          </p>
        </header>

        <div className={styles.grid}>
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} onBook={handleBook} />
          ))}
        </div>

        <div className={styles.ctaRow}>
          <a href="/services" className={styles.viewAll}>View full services</a>
          <button className={styles.primary} onClick={() => navigate("/appointment")}>Book an appointment</button>
        </div>
      </div>
    </section>
  );
};

export default Services;
