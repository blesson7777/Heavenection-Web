"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { companyContact, faqs, services, testimonials, trustReasons } from "./site-data";

const navLinks = [
  { href: "#support", label: "Support" },
  { href: "#trust", label: "Why us" },
  { href: "#journey", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: "#promise", label: "Promise" },
  { href: "#contact", label: "Contact" },
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

const supportOptions = services;

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
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const roadProgress = useTransform(scrollYProgress, [0.08, 0.62], ["0%", "100%"]);
  const heroMediaY = useTransform(scrollYProgress, [0, 0.24], ["0px", "-78px"]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.18], ["0px", "34px"]);

  const handleEnquiryChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedService = params.get("service");
    if (selectedService && supportOptions.some((item) => item.title === selectedService)) {
      setFormData((current) => ({ ...current, service_interest: selectedService }));
    }
  }, []);

  const buildTrackedPageUrl = () => {
    if (typeof window === "undefined") {
      return "";
    }
    const trackedUrl = new URL(window.location.href);
    trackedUrl.searchParams.set("source", "website");
    trackedUrl.searchParams.set("selected", formData.service_interest);
    return trackedUrl.toString();
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
          message: `${formData.message}\n\nWebsite selected service: ${formData.service_interest}`,
          page_url: buildTrackedPageUrl(),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: "Heavenection",
            url: "https://www.heavenection.com",
            telephone: companyContact.phone,
            email: companyContact.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: companyContact.addressLineOne,
              addressLocality: "Kattappana",
              addressRegion: "Kerala",
              postalCode: "685508",
              addressCountry: "IN",
            },
            areaServed: "Kerala",
            serviceType: services.map((service) => service.title),
          }),
        }}
      />
      <motion.div className="scroll-progress" style={{ scaleX: smoothScrollProgress }} />
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
            style={{ y: heroMediaY }}
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

          <motion.div
            className="hero-content"
            style={{ y: heroContentY }}
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
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
                Call {companyContact.phone}
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
            {supportOptions.map((item, index) => (
              <motion.article
                className="support-card"
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -10, rotate: index % 2 === 0 ? 0.45 : -0.45 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a className="text-link" href={`/services/${item.slug}`}>
                  View details
                </a>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="trust"
          className="section-band trust-band"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={stagger}
        >
          <motion.div className="section-heading" variants={fadeUp}>
            <span>Why customers choose us</span>
            <h2>Clear support before customers make important decisions.</h2>
          </motion.div>

          <div className="trust-grid">
            {trustReasons.map((item) => (
              <motion.article className="trust-card" key={item.title} variants={fadeUp}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>

          <div className="testimonial-row">
            {testimonials.map((item) => (
              <motion.figure className="testimonial-card" key={item.name} variants={fadeUp}>
                <blockquote>{item.text}</blockquote>
                <figcaption>{item.name}</figcaption>
              </motion.figure>
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
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
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
          id="faq"
          className="section-band faq-band"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={stagger}
        >
          <motion.div className="section-heading" variants={fadeUp}>
            <span>Questions customers ask</span>
            <h2>Simple answers before sending a request.</h2>
          </motion.div>

          <div className="faq-list">
            {faqs.map((item) => (
              <motion.details className="faq-item" key={item.question} variants={fadeUp}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </motion.details>
            ))}
          </div>
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
            <div className="location-panel">
              <strong>Visit us</strong>
              <p>{companyContact.addressLineOne}</p>
              <p>{companyContact.addressLineTwo}</p>
              <a href={companyContact.mapUrl} target="_blank" rel="noreferrer">
                Open location
              </a>
              <iframe
                className="map-frame"
                title="Heavenection location"
                src="https://maps.google.com/maps?q=Opposite%20CSI%20Church%20Kattappana%20Idukki%20Kerala%20685508&t=&z=14&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleEnquirySubmit}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
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

      <div className="floating-actions" aria-label="Quick contact">
        <a className="whatsapp-action" href={companyContact.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a className="call-action" href={`tel:${companyContact.phone}`}>
          Call
        </a>
      </div>

      <div className="mobile-sticky-actions">
        <a href={`tel:${companyContact.phone}`}>Call</a>
        <a href="#contact">Send request</a>
      </div>

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
              <p>{companyContact.addressLineOne}</p>
              <p>{companyContact.addressLineTwo}</p>
            </div>
            <div>
              <span>Phone</span>
              <a href={`tel:${companyContact.phone}`}>{companyContact.phone}</a>
            </div>
            <div>
              <span>Email</span>
              <a href={`mailto:${companyContact.email}`}>{companyContact.email}</a>
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
