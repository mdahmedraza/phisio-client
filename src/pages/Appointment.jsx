import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Appointment.module.css";

const defaultForm = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  appointmentDate: "",
  appointmentTime: "",
  sessionType: "Initial Assessment",
  preferredTherapist: "",
  symptoms: "",
  durationMins: 45,
  consent: false,
  notes: "",
};

const sessionOptions = [
  "Initial Assessment",
  "Follow-up",
  "Post-op Rehabilitation",
  "Sports Injury",
  "Back/Neck Pain",
  "Manual Therapy",
  "Home Exercise Program",
];

const therapistOptions = ["Any", "Dr. Neha Sharma", "Rajiv Kumar", "Sara Mehra"];

export default function BookAppointment() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");
  const [timeslots, setTimeslots] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Set minimum date
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Generate time slots
  useEffect(() => {
    const slots = [];
    for (let h = 9; h < 18; h++) {
      for (let m = 0; m < 60; m += 30) {
        slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    setTimeslots(slots);
  }, []);

  // VALIDATION
  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, "")))
      e.phone = "Enter a valid phone (10+ digits)";
    if (!form.appointmentDate) e.appointmentDate = "Choose appointment date";
    if (!form.appointmentTime) e.appointmentTime = "Choose appointment time";
    if (!form.consent) e.consent = "You must agree to the clinic policies";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("submit event:", {
      type: e.type,
      timeStamp: e.timeStamp,
      targetName: "bookingForm",
    });

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      console.warn("validation failed", validation);
      console.log("form (validation failed):", JSON.parse(JSON.stringify(form)));
      return;
    }

    const payload = {
      ...form,
      phone: form.phone.replace(/\s+/g, ""),
      submittedAt: new Date().toISOString(),
    };

    console.log("Booking Payload Sending to Backend:", payload);

    try {
      const res = await axios.post("https://a-phisiotherapy-server.onrender.com/api/appointments", payload, {
      // const res = await axios.post("http://localhost:5000/api/appointments", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Server Response:", res.data);

      setSubmitted(true);

      setTimeout(() => {
        setForm(defaultForm);
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error("Error submitting appointment:", err);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.header}>
          <h1>Book Appointment</h1>
          <p className={styles.subtitle}>
            Book a physiotherapy session at <strong>PureMotion Physio</strong>. Choose a date & time, and tell us about your concerns.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* BASIC INPUT DESIGN FOR FIRST TWO FIELDS */}
          
          <div className={styles.row}>
            <label className={styles.field}>
              <span>Full Name</span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Ahmed Raza"
                type="text"
              />
            </label>

            <label className={styles.field}>
              <span>Phone</span>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="text"
                placeholder="9876543210"
                inputMode="tel"
              />
            </label>
          </div>
          {/* OTHER FIELDS KEEP SAME UI THEME */}
          <div className={styles.row}>
            <label className={styles.field}>
              <span>Email (optional)</span>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                type="email"
              />
            </label>

            <label className={styles.field}>
              <span>Date of Birth (optional)</span>
              <input
                name="dob"
                value={form.dob}
                onChange={handleChange}
                type="date"
                max={minDate}
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Appointment Date</span>
              <input
                name="appointmentDate"
                value={form.appointmentDate}
                onChange={handleChange}
                type="date"
                min={minDate}
              />
              {errors.appointmentDate && <small className={styles.error}>{errors.appointmentDate}</small>}
            </label>

            <label className={styles.field}>
              <span>Appointment Time</span>
              <select name="appointmentTime" value={form.appointmentTime} onChange={handleChange}>
                <option value="">Select time</option>
                {timeslots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.appointmentTime && <small className={styles.error}>{errors.appointmentTime}</small>}
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Session Type</span>
              <select name="sessionType" value={form.sessionType} onChange={handleChange}>
                {sessionOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Duration (mins)</span>
              <input
                name="durationMins"
                value={form.durationMins}
                onChange={handleChange}
                type="number"
                min={15}
                max={180}
                step={15}
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.fieldFull}>
              <span>Preferred Therapist</span>
              <select name="preferredTherapist" value={form.preferredTherapist} onChange={handleChange}>
                {therapistOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.fieldFull}>
              <span>Symptoms / Reason for Visit</span>
              <textarea
                name="symptoms"
                value={form.symptoms}
                onChange={handleChange}
                placeholder="Describe your pain, injury, duration, etc."
                rows={4}
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.fieldFull}>
              <span>Notes (optional)</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Previous tests, medications, requests..."
                rows={3}
              />
            </label>
          </div>

          <div className={styles.rowInline}>
            <label className={styles.checkbox}>
              <input name="consent" type="checkbox" checked={form.consent} onChange={handleChange} />
              <span>I agree to clinic policies and consent to assessment & treatment.</span>
            </label>
            {errors.consent && <small className={styles.error}>{errors.consent}</small>}
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>
              {submitted ? "Booked ✓" : "Book Appointment"}
            </button>

            <button type="button" className={styles.clearBtn} onClick={() => {
              setForm(defaultForm);
              setErrors({});
              console.log("Form cleared by user");
            }}>
              Clear
            </button>
          </div>
        </form>

        <div className={styles.help}>
          <p>Prefer a callback? Leave your phone and we will call to confirm.</p>
        </div>
      </section>
    </main>
  );
}
