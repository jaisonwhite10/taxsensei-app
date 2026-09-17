
import React from 'react';
import '../styles/Pricing.css';

function Pricing() {
  const plans = [
    {
      name: "Tax Advice / Return Review",
      description: "Get professional guidance or have your tax return reviewed for accuracy.",
      price: "$30 - $75",
      priceLabel: "Basic - Advanced",
      features: [
        "W-2 income",
        "Interest and dividend income reported on a 1099-INT or 1099-DIV",
        "IRS standard deduction",
        "Earned Income Tax Credit (EITC)",
        "Child Tax Credit (CTC)",
        "Student loan interest deduction",
        "Retirement plan distributions (1099-R)"
      ],
      buttonText: "Contact Us",
      buttonClass: "btn-outline"
    },

    {
      name: "Tax Return Preparation",
      description: "Professional preparation of individual tax returns based on your specific tax situation.",
      price: "$50 - $150",
      priceLabel: "Basic - Advanced",
      features: [
        "Itemized deductions claimed on Schedule A, like charitable contributions, medical expenses, mortgage interest and state and local tax deductions",
        "Unemployment income reported on a 1099-G",
        "Stock sales (including crypto investments) reported on a 1099-B",
        "Self-employment income and expenses",
        "Rental income and expenses reported on a Schedule E",
        "Other complex tax forms and schedules"
      ],
      buttonText: "Get Started",
      buttonClass: "btn-primary",
      featured: true
    },

    {
      name: "Bookkeeping Services",
      description: "Keep your business finances organized with straightforward bookkeeping support.",
      price: "$50 - $150",
      priceLabel: "Basic - Advanced",
      features: [
        "Transaction categorization",
        "Bank reconciliation",
        "General Ledger maintenance",
        "Accounts receivable and payable management",
        "Trial balance preparation",
        "Profit & Loss statements",
        "Balance sheet preparation",
        
      ],
      buttonText: "Contact Us",
      buttonClass: "btn-primary"
    },

    {
      name: "Tax Representation",
      description: "Assistance with IRS correspondence, notices, and routine tax matters.",
      price: "$50 - $150",
      priceLabel: "Basic - Advanced",
      features: [
        "IRS notices and correspondence",
        "Understanding and responding to IRS notices",
        "Routine IRS representation",
        "Representation for eligibleaudits and appeals",
      
      ],
      buttonText: "Contact Us",
      buttonClass: "btn-primary"
    }
  ];

  return (
    <section id="pricing">
      <div className="container pricing-container">

        <div className="pricing-header">
          <h2>Services</h2>
          <p>
            Professional and affordable tax help tailored to your needs.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
            >

              <div
                className={`card-header ${
                  plan.featured ? 'featured-header' : ''
                }`}
              >
                <h4>{plan.name}</h4>
              </div>

              <div className="card-body">

                <p className="service-description">
                  {plan.description}
                </p>

                <div className="price-section">
                  <h1 className="price">
                    {plan.price}
                  </h1>

                  <p className="price-label">
                    {plan.priceLabel}
                  </p>
                </div>

                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                {/* Button currently commented out
                <button className={`btn ${plan.buttonClass}`}>
                  {plan.buttonText}
                </button>
                */}

              </div>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          Pricing varies based on the complexity of your tax situation and
          the services needed. Contact us for a personalized quote.
        </p>

      </div>
    </section>
  );
}

export default Pricing;



