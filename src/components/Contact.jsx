
import React, { useState } from "react";
import "../styles/Contact.css";

// Set these environment variables in your React project.
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const CONTACT_API_URL = SUPABASE_URL
  ? `${SUPABASE_URL}/functions/v1/contact-email`
  : "";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status.loading) return;

    if (!CONTACT_API_URL || !SUPABASE_ANON_KEY) {
      setStatus({
        loading: false,
        success: "",
        error: "The contact form is not configured yet. Please try again later.",
      });
      return;
    }

    setStatus({
      loading: true,
      success: "",
      error: "",
    });

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to send your message. Please try again."
        );
      }

      setStatus({
        loading: false,
        success:
          "Your message has been sent successfully. Thank you for contacting TaxSensei!",
        error: "",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear the success message after 5 seconds.
      setTimeout(() => {
        setStatus((previous) => ({
          ...previous,
          success: "",
        }));
      }, 5000);
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        loading: false,
        success: "",
        error:
          error.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section id="contact">
      <div className="contact-container">
        <div className="contact-title">
          <h2>Contact Me</h2>
          <p>
            Have any questions about tax services?
            Feel free to message me and I'll get back to you as soon as possible!
          </p>
        </div>

        <div className="contact-form-wrapper">
          {status.success && (
            <div
              className="flash-message flash-success"
              role="status"
              aria-live="polite"
            >
              {status.success}
            </div>
          )}

          {status.error && (
            <div
              className="flash-message flash-error"
              role="alert"
            >
              {status.error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your Name"
                autoComplete="name"
                maxLength={100}
                required
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
                autoComplete="email"
                maxLength={254}
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="Subject"
                maxLength={200}
                required
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                rows="6"
                className="form-control"
                placeholder="Message"
                maxLength={10000}
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-submit"
                disabled={status.loading}
              >
                {status.loading ? "Sending message..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
