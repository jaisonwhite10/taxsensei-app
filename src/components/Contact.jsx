import React, { useState } from "react";
import "../styles/Contact.css";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      // Send to backend API endpoint
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus({
        loading: false,
        success: "Your message has been sent successfully. Thank you!",
        error: "",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ loading: false, success: "", error: "" });
      }, 5000);
    } catch (error) {
      setStatus({
        loading: false,
        success: "",
        error: "Something went wrong. Please try again.",
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
            <div className="flash-message flash-success">
              {status.success}
            </div>
          )}
          {status.error && (
            <div className="flash-message flash-error">
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
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your Email"
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
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              {status.loading ? (
                <div className="loading-text">Sending message...</div>
              ) : (
                <button type="submit" className="btn-submit">
                  Send Message
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;