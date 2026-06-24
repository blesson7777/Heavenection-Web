"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Home loan guidance",
    description:
      "Help families explore home loan options, compare lenders, and prepare the right paperwork with less stress.",
    accent: "Property support",
  },
  {
    title: "Personal loan assistance",
    description:
      "Guide customers toward suitable personal loan options for urgent needs, planned expenses, or debt consolidation.",
    accent: "Quick borrowing",
  },
  {
    title: "Business loan support",
    description:
      "Assist small businesses and entrepreneurs in finding lending options for working capital, growth, or equipment.",
    accent: "Business growth",
  },
  {
    title: "Eligibility review",
    description:
      "Review customer details, income profile, and requirements to suggest loan paths that better match their situation.",
    accent: "Smart screening",
  },
  {
    title: "Documentation help",
    description:
      "Support customers with the documents and details needed to move from enquiry to application smoothly.",
    accent: "Paperwork help",
  },
  {
    title: "Lender matching",
    description:
      "Connect customers with loan options that fit their goals instead of sending them through a confusing search.",
    accent: "Right fit",
  },
];

const metrics = [
  { value: "Loan", label: "consultancy focused on customer needs" },
  { value: "Fast", label: "response to new enquiries" },
  { value: "Clear", label: "guidance from enquiry to application" },
];

const process = [
  {
    step: "01",
    title: "Customer enquiry",
    description:
      "A visitor submits a request from the website and shares what kind of loan support they need.",
  },
  {
    step: "02",
    title: "Needs review",
    description:
      "The team checks the customer profile, loan purpose, and basic details to understand the best path forward.",
  },
  {
    step: "03",
    title: "Guidance shared",
    description:
      "Suitable loan options, document steps, and next actions are explained clearly to the customer.",
  },
  {
    step: "04",
    title: "Application support",
    description:
      "The consultancy helps the customer move through the application process until the lending journey is complete.",
  },
];

const highlights = [
  "Professional loan consultancy profile",
  "Built to inspire customer trust",
  "Premium dark theme with smooth motion",
  "Mobile-first and easy to browse",
  "Enquiry form routed to the company team",
];

const trustPoints = [
  {
    title: "Customer-first support",
    text: "We focus on matching people with loan guidance that feels practical, not confusing.",
  },
  {
    title: "Simple communication",
    text: "Customers can send an enquiry quickly and get a clear next step from the company team.",
  },
  {
    title: "Professional presentation",
    text: "The site is designed to make the company feel dependable, modern, and easy to contact.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState("");
  const [enquiryError, setEnquiryError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_interest: "Home loan guidance",
    message: "",
  });

  const navLinks = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#services", label: "Services" },
      { href: "#process", label: "Process" },
      { href: "#contact", label: "Contact" },
    ],
    [],
  );

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
        throw new Error(payload?.error || "Unable to submit your enquiry right now.");
      }

      setEnquiryStatus("Thanks. Your enquiry has been sent to Heavenection.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service_interest: "Home loan guidance",
        message: "",
      });
    } catch (error) {
      setEnquiryError(error.message || "Unable to submit your enquiry right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <strong>Heavenection</strong>
            <small>Loan consultancy</small>
          </span>
        </a>

        <button
          type="button"
          className="menu-button"
          aria-label="Toggle navigation"
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

        <a className="topbar-cta" href="#contact">
          Get consultation
        </a>
      </header>

      <main id="home">
        <section className="hero-grid">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span className="eyebrow" variants={fadeUp}>
              Helping people find the right loan guidance
            </motion.span>
            <motion.h1 variants={fadeUp}>
              A trusted loan consultancy website for customers who need clear
              borrowing advice.
            </motion.h1>
            <motion.p variants={fadeUp}>
              Heavenection helps people explore loan options, understand the
              next steps, and connect with a team that can guide them from
              enquiry to application with confidence.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="button button-primary" href="#services">
                Explore services
              </a>
              <a className="button button-secondary" href="#contact">
                Start enquiry
              </a>
            </motion.div>

            <motion.div className="metric-row" variants={fadeUp}>
              {metrics.map((metric) => (
                <article key={metric.label} className="metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </motion.div>

            <motion.ul className="hero-points" variants={fadeUp}>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="orb orb-one"
              animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="orb orb-two"
              animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.article
              className="visual-card visual-card-large"
              whileHover={{ y: -8, rotate: -1 }}
            >
              <span className="card-kicker">Consultancy profile</span>
              <h3>Loan guidance that feels clear and personal.</h3>
              <p>
                We help customers understand their options, prepare the right
                details, and move forward with the loan process calmly.
              </p>
              <div className="dashboard-bars">
                <span style={{ width: "74%" }} />
                <span style={{ width: "88%" }} />
                <span style={{ width: "68%" }} />
              </div>
            </motion.article>
            <motion.article
              className="visual-card visual-card-small"
              whileHover={{ y: -8 }}
            >
              <span className="card-kicker">Customer focus</span>
              <ul>
                <li>
                  <span>Clear advice</span>
                  <strong>Easy to understand</strong>
                </li>
                <li>
                  <span>Loan options</span>
                  <strong>Matched carefully</strong>
                </li>
                <li>
                  <span>Support</span>
                  <strong>Responsive</strong>
                </li>
              </ul>
            </motion.article>
            <motion.article
              className="visual-card visual-card-stack"
              whileHover={{ y: -8 }}
            >
              <span className="card-kicker">What customers receive</span>
              <div className="stack-row">
                <div>
                  <strong>Guidance</strong>
                  <span>On the right loan path</span>
                </div>
                <div>
                  <strong>Documentation</strong>
                  <span>Help with paperwork</span>
                </div>
              </div>
              <div className="stack-row">
                <div>
                  <strong>Transparency</strong>
                  <span>Simple communication</span>
                </div>
                <div>
                  <strong>Next step</strong>
                  <span>Clear enquiry follow-up</span>
                </div>
              </div>
            </motion.article>
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="section-split"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="split-copy" variants={fadeUp}>
            <span className="eyebrow">About Heavenection</span>
            <h2>Built as a loan consultancy brand, not a software demo.</h2>
            <p>
              Heavenection is presented here as a professional company profile
              for customers who want help understanding loan choices. The goal
              is to look trustworthy, easy to contact, and focused on real
              customer guidance.
            </p>

            <div className="feature-list">
              {trustPoints.map((feature) => (
                <article key={feature.title} className="feature-card">
                  <strong>{feature.title}</strong>
                  <span>{feature.text}</span>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div className="platform-panel" variants={fadeUp}>
            <article className="platform-card">
              <span className="card-kicker">Why customers trust us</span>
              <h3>Simple, steady, and professional loan support.</h3>
              <div className="platform-grid">
                <div>
                  <strong>Customer care</strong>
                  <span>Friendly response</span>
                </div>
                <div>
                  <strong>Loan clarity</strong>
                  <span>Practical guidance</span>
                </div>
                <div>
                  <strong>Fast enquiry</strong>
                  <span>Easy contact flow</span>
                </div>
                <div>
                  <strong>Professional look</strong>
                  <span>Strong company image</span>
                </div>
              </div>
            </article>
          </motion.div>
        </motion.section>

        <motion.section
          id="services"
          className="section-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div className="section-head" variants={fadeUp}>
            <span className="eyebrow">Services</span>
            <h2>Loan consultancy services designed around real customer needs.</h2>
            <p>
              The website presents the company as a helpful guide for people
              looking for loan options, document assistance, and a smoother
              borrowing journey.
            </p>
          </motion.div>

          <div className="service-grid">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className="service-card"
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <span className="service-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="service-accent">{service.accent}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="process"
          className="section-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div className="section-head" variants={fadeUp}>
            <span className="eyebrow">Process</span>
            <h2>A simple path from enquiry to loan guidance.</h2>
          </motion.div>

          <div className="workflow-grid">
            {process.map((item) => (
              <motion.article
                key={item.step}
                className="workflow-card"
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="contact-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="contact-copy">
            <span className="eyebrow">Enquiry</span>
            <h2>Request loan guidance from the Heavenection team.</h2>
            <p>
              Share your details and what kind of loan help you need. The team
              can review the enquiry and follow up with the next steps.
            </p>

            <div className="contact-points">
              <div>
                <strong>Easy enquiry</strong>
                <span>Send your name, contact number, and loan interest in one place.</span>
              </div>
              <div>
                <strong>Human response</strong>
                <span>The company team can review the request and reach out with guidance.</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleEnquirySubmit}>
            <div className="contact-grid">
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
                <span>Loan interest</span>
                <select
                  name="service_interest"
                  value={formData.service_interest}
                  onChange={handleEnquiryChange}
                >
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="contact-message">
                <span>Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleEnquiryChange}
                  placeholder="Tell us what you need help with"
                  rows={4}
                  required
                />
              </label>
            </div>

            {enquiryStatus ? <p className="contact-success">{enquiryStatus}</p> : null}
            {enquiryError ? <p className="contact-error">{enquiryError}</p> : null}

            <div className="contact-actions">
              <button type="submit" className="button button-primary" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit enquiry"}
              </button>
              <a className="button button-secondary" href="mailto:hello@heavenection.com">
                Email the team
              </a>
            </div>
          </form>
        </motion.section>
      </main>

      <footer className="footer">
        <div>
          <strong>Heavenection</strong>
          <p>Loan consultancy support for customers who want clear guidance and a professional experience.</p>
        </div>
        <div className="footer-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <small>© {new Date().getFullYear()} Heavenection. Built with Next.js.</small>
      </footer>
    </div>
  );
}
