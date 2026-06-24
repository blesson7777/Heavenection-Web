"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { href: "#support", label: "Support" },
  { href: "#journey", label: "How it works" },
  { href: "#promise", label: "Promise" },
  { href: "#contact", label: "Contact" },
];

const supportOptions = [
  {
    title: "Personal & Home Loans",
    text: "Get quick approval support for personal and home loans with suitable rates and flexible repayment options.",
    tag: "Personal & home",
  },
  {
    title: "Business & Property Loans",
    text: "Secure funding for your business or unlock property value with expert guidance and easy processing.",
    tag: "Business & property",
  },
  {
    title: "Vehicle Loans",
    text: "Finance your dream car or bike with new, used, and top-up loan options at competitive rates.",
    tag: "Vehicle finance",
  },
  {
    title: "Loan Solutions",
    text: "We help with loan consolidation, takeover, and reducing interest burden through smart financial planning.",
    tag: "Smart planning",
  },
  {
    title: "Insurance Services",
    text: "Protect your future with health, life, and vehicle insurance plans tailored to your needs.",
    tag: "Protection",
  },
  {
    title: "Education & Financial Support",
    text: "Get assistance with college admissions, education loans, and credit card financial solutions.",
    tag: "Education support",
  },
];

const steps = [
  {
    label: "Share your need",
    text: "Send your name, phone number, and the type of financial help you are looking for.",
  },
  {
    label: "Get a clear call back",
    text: "The Heavenection team listens, understands the requirement, and explains the next step.",
  },
  {
    label: "Choose the right path",
    text: "You receive practical guidance that suits your profile, requirement, and comfort level.",
  },
  {
    label: "Move forward calmly",
    text: "The team helps you prepare the details and continue the process with confidence.",
  },
];

const promiseItems = [
  "Clear guidance before decisions",
  "Friendly support in local language",
  "Fast response for new requests",
  "Respectful follow-up without confusion",
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11 },
  },
};

const panelLeft = {
  hidden: { opacity: 0, x: -90 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 115, damping: 18 },
  },
};

const panelRight = {
  hidden: { opacity: 0, x: 90 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 115, damping: 18 },
  },
};

function LogoImage({ className, fallbackLabel, src, alt = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className={`logo-fallback ${className || ""}`}>{fallbackLabel}</span>;
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState("");
  const [enquiryError, setEnquiryError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_interest: "Personal & Home Loans",
    message: "",
  });
  const { scrollYProgress } = useScroll();
  const roadProgress = useTransform(scrollYProgress, [0.08, 0.62], ["0%", "100%"]);

  const handleEnquiryChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleEnquirySubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setEnquiryStatus("");
    setEnquiryError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          page_url: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "We could not send your request right now.");
      }

      setEnquiryStatus("Thank you. The Heavenection team will contact you soon.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service_interest: "Personal & Home Loans",
        message: "",
      });
    } catch (error) {
      setEnquiryError(error.message || "We could not send your request right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Heavenection home">
          <span className="brand-mark" aria-hidden="true">
            <LogoImage
              src="/brand/admin-heavenection-logo.png"
              className="brand-mark-image"
              fallbackLabel="H"
            />
          </span>
          <span className="brand-name">Heavenection</span>
        </a>

        <button
          type="button"
          className="menu-button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="topbar-action" href="#contact">
          Request a call
        </a>
      </header>

      <main id="home">
        <section className="hero-section">
          <motion.div
            className="hero-media"
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            aria-hidden="true"
          >
            <div className="hero-photo" />
            <div className="hero-road">
              <span />
              <span />
              <span />
            </div>
          </motion.div>

          <motion.div className="hero-content" initial="hidden" animate="visible" variants={stagger}>
            <motion.div className="hero-logo-panel" variants={fadeUp}>
              <span className="hero-logo-mark" aria-hidden="true">
                <LogoImage
                  src="/brand/admin-heavenection-logo.png"
                  className="hero-logo-mark-image"
                  fallbackLabel="H"
                />
              </span>
              <span className="hero-logo-copy">
                <strong>Heavenection</strong>
                <small>Connecting to happiness</small>
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp}>Financial support made easier for real people.</motion.h1>
            <motion.p variants={fadeUp}>
              Heavenection helps customers understand their options, prepare with confidence,
              and move toward the right financial path without pressure or confusion.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="button button-primary" href="#contact">
                Talk to us
              </a>
              <a className="button button-light" href="tel:9846262047">
                Call 9846262047
              </a>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          id="support"
          className="section-band support-band"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={stagger}
        >
          <motion.div className="section-heading" variants={fadeUp}>
            <span>Support customers can understand</span>
            <h2>Helpful guidance for different money needs.</h2>
          </motion.div>

          <div className="support-grid">
            {supportOptions.map((item) => (
              <motion.article className="support-card" key={item.title} variants={fadeUp}>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <section id="journey" className="journey-band">
          <motion.div
            className="section-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
          >
            <span>How it works</span>
            <h2>From first message to a clear next step.</h2>
          </motion.div>

          <div className="journey-road">
            <motion.div className="journey-line" style={{ height: roadProgress }} />
            {steps.map((step, index) => (
              <motion.article
                className="journey-step"
                key={step.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.32 }}
                variants={fadeUp}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.label}</h3>
                  <p>{step.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.section
          id="promise"
          className="promise-band"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div className="promise-copy" variants={fadeUp}>
            <span>Our promise</span>
            <h2>Your need and our support move toward one clear next step.</h2>
            <p>
              The experience is designed to feel personal, respectful, and steady from the
              first request to the final guidance.
            </p>
            <ul>
              {promiseItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="connection-stage" variants={fadeUp} aria-hidden="true">
            <motion.div className="connection-card need-card" variants={panelLeft}>
              <span>Customer need</span>
              <strong>Home, personal, or business support</strong>
            </motion.div>
            <motion.div className="connection-card support-card-visual" variants={panelRight}>
              <span>Heavenection support</span>
              <strong>Clear guidance and next steps</strong>
            </motion.div>
            <motion.div
              className="connection-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.18, duration: 0.75, ease: "easeOut" }}
            />
            <motion.div
              className="connection-center"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.42, type: "spring", stiffness: 180, damping: 15 }}
            >
              <span>Clear path</span>
            </motion.div>
            <motion.div
              className="connection-dot dot-one"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.55 }}
            />
            <motion.div
              className="connection-dot dot-two"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.68 }}
            />
            <motion.div
              className="connection-dot dot-three"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.81 }}
            />
          </motion.div>
        </motion.section>

        <motion.section
          id="contact"
          className="contact-band"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={stagger}
        >
          <motion.div className="contact-copy" variants={fadeUp}>
            <span>Send a request</span>
            <h2>Tell us what kind of help you need.</h2>
            <p>
              Share your details below. The Heavenection team will review it and get back
              to you with a clear next step.
            </p>
          </motion.div>

          <motion.form className="contact-form" onSubmit={handleEnquirySubmit} variants={fadeUp}>
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleEnquiryChange}
                placeholder="Your name"
                required
              />
            </label>
            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleEnquiryChange}
                placeholder="Mobile number"
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleEnquiryChange}
                placeholder="Email address"
              />
            </label>
            <label>
              <span>Need</span>
              <select
                name="service_interest"
                value={formData.service_interest}
                onChange={handleEnquiryChange}
              >
                {supportOptions.map((option) => (
                  <option key={option.title} value={option.title}>
                    {option.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="message-field">
              <span>Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleEnquiryChange}
                placeholder="Tell us a little about your requirement"
                rows={5}
                required
              />
            </label>

            {enquiryStatus ? <p className="form-success">{enquiryStatus}</p> : null}
            {enquiryError ? <p className="form-error">{enquiryError}</p> : null}

            <button type="submit" className="button button-primary" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send request"}
            </button>
          </motion.form>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-mark" aria-hidden="true">
              <LogoImage
                src="/brand/admin-heavenection-logo.png"
                className="footer-mark-image"
                fallbackLabel="H"
              />
            </span>
            <div>
              <strong>Heavenection</strong>
              <p>Connecting to happiness through clear financial guidance.</p>
            </div>
          </div>

          <div className="footer-contact">
            <div>
              <span>Address</span>
              <p>16/2561, Opposite CSI Church</p>
              <p>Kattappana, Idukki, Kerala - 685508</p>
            </div>
            <div>
              <span>Phone</span>
              <a href="tel:9846262047">9846262047</a>
            </div>
            <div>
              <span>Email</span>
              <a href="mailto:heavenection@gmail.com">heavenection@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <small>Copyright {new Date().getFullYear()} Heavenection. All rights reserved.</small>
          <small>Powered by INZSOFT TECHNOLOGIES</small>
        </div>
      </footer>
    </div>
  );
}
