"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const services = [
  {
    title: "Lead management",
    description:
      "Capture, assign, recover, and organize leads with a clean pipeline that keeps the team moving.",
    accent: "Pipeline control",
  },
  {
    title: "Follow-up workflow",
    description:
      "Track callbacks, SLA alerts, overdue items, and customer interest without losing the context.",
    accent: "Follow-up clarity",
  },
  {
    title: "Staff performance",
    description:
      "Review calls, work hours, quality trends, and live activity in one simple command center.",
    accent: "Performance view",
  },
  {
    title: "Salary control",
    description:
      "Handle salary history, advances, bonus earnings, and payout summaries without spreadsheet chaos.",
    accent: "Payroll ready",
  },
  {
    title: "Mobile staff app",
    description:
      "Give staff a fast app for leads, calls, notifications, and daily work inside a clean mobile flow.",
    accent: "Field friendly",
  },
  {
    title: "Admin operations",
    description:
      "Use a strong admin layer for alerts, release management, work review, and support monitoring.",
    accent: "Control room",
  },
];

const metrics = [
  { value: "24/7", label: "visibility for operations" },
  { value: "1", label: "shared workspace for admin and staff" },
  { value: "360°", label: "customer journey tracking" },
];

const process = [
  {
    step: "01",
    title: "Lead arrives",
    description:
      "Every new lead enters the system and is ready for allocation, sorting, and first contact.",
  },
  {
    step: "02",
    title: "Staff calls",
    description:
      "The staff member speaks to the customer, notes the outcome, and updates the lead status.",
  },
  {
    step: "03",
    title: "Follow-up moves",
    description:
      "Callbacks, warnings, and SLA rules keep interested leads visible until the right outcome.",
  },
  {
    step: "04",
    title: "Office closes",
    description:
      "The office team reviews the pipeline, marks success or unsuccessful, and tracks reward impact.",
  },
];

const highlights = [
  "Animated hero and card motion",
  "Dark premium visual style",
  "Mobile-first responsive layout",
  "Clear service storytelling",
  "Railway-ready Next.js deployment",
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
    service_interest: "Lead management",
    message: "",
  });

  const navLinks = useMemo(
    () => [
      { href: "#services", label: "Services" },
      { href: "#platform", label: "Platform" },
      { href: "#workflow", label: "Workflow" },
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

      setEnquiryStatus("Thanks. Your enquiry has been sent to our admin team.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service_interest: "Lead management",
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
            <small>Operations software</small>
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
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="topbar-cta" href="#contact">
          Request a demo
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
              Built for modern operations teams
            </motion.span>
            <motion.h1 variants={fadeUp}>
              A premium company website for lead operations, staff control, and
              live workflow visibility.
            </motion.h1>
            <motion.p variants={fadeUp}>
              Heavenection connects lead management, follow-ups, salary
              summaries, and staff performance into one polished system that
              feels fast, clear, and ready for everyday work.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="button button-primary" href="#services">
                Explore services
              </a>
              <a className="button button-secondary" href="#workflow">
                See the workflow
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
              <span className="card-kicker">Live command center</span>
              <h3>Every team signal stays visible.</h3>
              <p>
                Leads, calls, follow-up pressure, and salary status stay easy to
                monitor from a single modern view.
              </p>
              <div className="dashboard-bars">
                <span style={{ width: "72%" }} />
                <span style={{ width: "88%" }} />
                <span style={{ width: "64%" }} />
              </div>
            </motion.article>
            <motion.article
              className="visual-card visual-card-small"
              whileHover={{ y: -8 }}
            >
              <span className="card-kicker">Current focus</span>
              <ul>
                <li>
                  <span>Lead flow</span>
                  <strong>Stable</strong>
                </li>
                <li>
                  <span>Follow-up alerts</span>
                  <strong>Active</strong>
                </li>
                <li>
                  <span>Staff status</span>
                  <strong>Visible</strong>
                </li>
              </ul>
            </motion.article>
            <motion.article
              className="visual-card visual-card-stack"
              whileHover={{ y: -8 }}
            >
              <span className="card-kicker">Team snapshot</span>
              <div className="stack-row">
                <div>
                  <strong>Calls</strong>
                  <span>Tracked live</span>
                </div>
                <div>
                  <strong>Work time</strong>
                  <span>Measured daily</span>
                </div>
              </div>
              <div className="stack-row">
                <div>
                  <strong>Quality</strong>
                  <span>Reviewed</span>
                </div>
                <div>
                  <strong>Salary</strong>
                  <span>History ready</span>
                </div>
              </div>
            </motion.article>
          </motion.div>
        </section>

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
            <h2>Services that fit the way Heavenection already works.</h2>
            <p>
              The site highlights the actual company strengths with a cleaner
              narrative, stronger visuals, and a more confident presentation.
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
          id="platform"
          className="section-split"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="split-copy" variants={fadeUp}>
            <span className="eyebrow">Platform</span>
            <h2>Designed to look premium and feel effortless on every screen.</h2>
            <p>
              The experience uses layered motion, glass surfaces, and strong
              typography so the company feels modern, trustworthy, and easy to
              understand.
            </p>

            <div className="feature-list">
              {[
                {
                  title: "Responsive layout",
                  text: "Optimized for phones, tablets, laptops, and large desktop screens.",
                },
                {
                  title: "Motion with purpose",
                  text: "Smooth entrance animations and hover lift effects keep the page feeling alive.",
                },
                {
                  title: "Clear storytelling",
                  text: "Services, workflow, and contact actions are easy to find without clutter.",
                },
              ].map((feature) => (
                <article key={feature.title} className="feature-card">
                  <strong>{feature.title}</strong>
                  <span>{feature.text}</span>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div className="platform-panel" variants={fadeUp}>
            <article className="platform-card">
              <span className="card-kicker">Why it feels premium</span>
              <h3>Dark, bold, and animated without being noisy.</h3>
              <div className="platform-grid">
                <div>
                  <strong>Glass surfaces</strong>
                  <span>Layered depth</span>
                </div>
                <div>
                  <strong>Gradient light</strong>
                  <span>Atmospheric glow</span>
                </div>
                <div>
                  <strong>Soft motion</strong>
                  <span>Comfortable pacing</span>
                </div>
                <div>
                  <strong>Strong type</strong>
                  <span>Clear hierarchy</span>
                </div>
              </div>
            </article>
          </motion.div>
        </motion.section>

        <motion.section
          id="workflow"
          className="section-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div className="section-head" variants={fadeUp}>
            <span className="eyebrow">Workflow</span>
            <h2>A clean journey from lead to outcome.</h2>
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
            <h2>Send a website enquiry and let the admin team review it instantly.</h2>
            <p>
              This form goes straight into the admin panel so your team can see
              new enquiries without checking email or WhatsApp first.
            </p>

            <div className="contact-points">
              <div>
                <strong>Fast review</strong>
                <span>Every submission is stored in the admin inbox.</span>
              </div>
              <div>
                <strong>Clear context</strong>
                <span>We capture service interest, contact details, and the page link.</span>
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
                  placeholder="Customer name"
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
                  placeholder="Phone number"
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
                <span>Service interest</span>
                <select name="service_interest" value={formData.service_interest} onChange={handleEnquiryChange}>
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
                  placeholder="Tell us what the customer needs"
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
          <p>Lead operations, staff visibility, and workflow control in one place.</p>
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
