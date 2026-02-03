import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";

/**
 * Hero props:
 *  - onBook: function when user clicks "Book Now"
 *  - onAsk:  function when user clicks "Ask a Question"
 */
const slides = [
  {
    id: 1,
    kicker: "PureMotion Physio",
    title: "Back pain & sports rehab —",
    highlight: "evidence-based physiotherapy that gets you moving",
    description:
      "Personalised assessment, hands-on treatment and progressive exercise plans to reduce pain, restore function and prevent re-injury.",
    badges: [
      "45-minute initial assessment",
      "In-clinic & teleconsult",
      "Custom exercise plans",
    ],
    bgImage: "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    kicker: "Sports Performance",
    title: "Stronger, faster, more resilient —",
    highlight: "performance physio for athletes at every level",
    description:
      "From weekend warriors to competitive athletes, build robust movement patterns, strength and agility tailored to your sport.",
    badges: [
      "Return-to-sport testing",
      "Strength & conditioning focus",
      "Injury risk screening",
    ],
    bgImage: "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    kicker: "Post‑surgery Rehab",
    title: "Recover with confidence —",
    highlight: "structured post‑operative rehabilitation programs",
    description:
      "Guided rehab after spinal, shoulder, knee or ankle surgery with clear milestones, education and ongoing support.",
    badges: [
      "Evidence-based protocols",
      "Close surgeon collaboration",
      "Home & clinic exercises",
    ],
    bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeU4Zr5zz3TX8UKYWQQoawPd8oQWEVdP7U4w&s",
  },
];

const AUTO_PLAY_INTERVAL = 5000; // 5 seconds

const Hero = ({ onBook = () => {}, onAsk = () => {} }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play
//   useEffect(() => {
//     if (isPaused) return;
//     const id = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, AUTO_PLAY_INTERVAL);
//     return () => clearInterval(id);
//   }, [isPaused]);

useEffect(() => {
  if (isPaused) return;
  const id = setInterval(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, AUTO_PLAY_INTERVAL);
  return () => clearInterval(id);
}, [isPaused]);


  // Swipe handling (mobile)
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX == null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    const threshold = 50; // px
    if (diff > threshold) {
      // swipe right -> previous
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    } else if (diff < -threshold) {
      // swipe left -> next
      setCurrent((prev) => (prev + 1) % slides.length);
    }
    setTouchStartX(null);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const activeSlide = slides[current];

  return (
    <section
      className={styles.hero}
      aria-labelledby="hero-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background layer */}
      <div
        className={styles.heroBg}
        style={{
          backgroundImage: `url(${activeSlide.bgImage})`,
        }}
        aria-hidden="true"
      />

      {/* Overlay for gradient & glass effect */}
      <div className={styles.heroOverlay} />

      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.kicker}>{activeSlide.kicker}</div>

          <h1 id="hero-title" className={styles.title}>
            {activeSlide.title}
            <span className={styles.hl}>{activeSlide.highlight}</span>
          </h1>

          <p className={styles.lead}>{activeSlide.description}</p>

          <div className={styles.ctaRow}>
            <button
              className={styles.primary}
              onClick={onBook}
              aria-label="Book an appointment"
            >
              Book Now
            </button>

            <button
              className={styles.ghost}
              onClick={onAsk}
              aria-label="Ask a question"
            >
              Ask a Question
            </button>
          </div>

          <ul className={styles.badges} aria-label="Key benefits">
            {activeSlide.badges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {/* Dots navigation */}
          <div className={styles.dots} aria-hidden="false">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={
                  index === current
                    ? `${styles.dot} ${styles.dotActive}`
                    : styles.dot
                }
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;




// import React from "react";
// import styles from "./Hero.module.css";

// /**
//  * Hero props:
//  *  - onBook: function called when user clicks "Book Now"
//  *  - onAsk:  function called when user clicks "Ask a Question"
//  */
// const Hero = ({ onBook = () => {}, onAsk = () => {} }) => {
//   return (
//     <section className={styles.hero} aria-labelledby="hero-title">
//       <div className={styles.inner}>
//         <div className={styles.content}>
//           <div className={styles.kicker}>PureMotion Physio</div>

//           <h1 id="hero-title" className={styles.title}>
//             Back pain & sports rehab —
//             <span className={styles.hl}> evidence-based physiotherapy that gets you moving</span>
//           </h1>

//           <p className={styles.lead}>
//             Personalised assessment, hands-on treatment and progressive exercise plans to reduce pain,
//             restore function and prevent re-injury.
//           </p>

//           <div className={styles.ctaRow}>
//             <button
//               className={styles.primary}
//               onClick={onBook}
//               aria-label="Book an appointment"
//             >
//               Book Now
//             </button>

//             <button
//               className={styles.ghost}
//               onClick={onAsk}
//               aria-label="Ask a question"
//             >
//               Ask a Question
//             </button>
//           </div>

//           <ul className={styles.badges} aria-hidden="true">
//             <li>45-minute initial assessment</li>
//             <li>In-clinic & teleconsult</li>
//             <li>Custom exercise plans</li>
//           </ul>
//         </div>

//         <figure className={styles.visual} aria-hidden="true">
//           {/* Replace with your hero image: <img src="/assets/images/hero.jpg" alt="" /> */}
//           <svg viewBox="0 0 600 420" className={styles.art} xmlns="http://www.w3.org/2000/svg" role="img" focusable="false">
//             <defs>
//               <linearGradient id="g1" x1="0" x2="1">
//                 <stop offset="0" stopColor="#e6f8fb" />
//                 <stop offset="1" stopColor="#f6fbff" />
//               </linearGradient>
//             </defs>
//             <rect x="0" y="0" width="600" height="420" rx="16" fill="url(#g1)"/>
//             <g fill="#0077b6" opacity="0.95">
//               <path d="M130 250c22-24 58-38 98-38s76 14 98 38v90H130v-90z"/>
//               <circle cx="420" cy="110" r="58"/>
//             </g>
//           </svg>
//         </figure>
//       </div>
//     </section>
//   );
// };

// export default Hero;
