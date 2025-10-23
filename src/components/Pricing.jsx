import React from 'react';
import '../styles/Pricing.css';

function Pricing() {
  const plans = [
    {
      name: "Tax Advice / Return Review",
      price: "$30 - $75",
      period: "/mo",
      features: ["Example of situations included in a  basic return:","W2 income", 
        "Interest, dividends or original issue discounts (1099-INT/1099-DIV/1099-OID) that don’t require filing a Schedule B", 
        "IRS standard deduction",
        "Earned Income Tax Credit (EITC)",
        "Child Tax Credit (CTC)",
        "Student loan interest deduction",
        "Taxable qualified retirement plan distributions 1099-R"],
      buttonText: "Sign up",
      buttonClass: "btn-outline"
    },
    // {
    //   name: "Deluxe",
    //   price: "$15",
    //   period: "/mo",
    //   features: ["W2", "1098", "1099-Int"],
    //   buttonText: "Get started",
    //   buttonClass: "btn-primary",
    //   featured: false
    // },
    {
      name: "Tax Return Preparation",
      price: "$50 - $150",
      period: "/mo",
      features: ["Examples of situations not included in a basic return:","Itemized deductions claimed on Schedule A, like charitable contributions, medical expenses, mortgage interest and state and local tax deductions", 
        "Unemployment income reported on a 1099-G", 
        "Stock sales (including crypto investments) reported on a 1099-B",
        "Self-employment income and expenses",
        "Rental income and expenses reported on a Schedule E",
        "Other complicated Credits, deductions and income reported on other forms or schedules "
      ],
      buttonText: "Contact us",
      buttonClass: "btn-primary",
      featured: true
    }
  ];

  return (
    <section id="pricing">
      <div className="container pricing-container">
        <div className="pricing-header">
          <h2>Services</h2>
          <p>Simple and affordable price plans for your tax needs.</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
              <div className={`card-header ${plan.featured ? 'featured-header' : ''}`}>
                <h4>{plan.name}</h4>
              </div>
              <div className="card-body">
                <h1 className="price">
                  {plan.price}
                  <p style={{fontSize: 20, fontStyle:'italic',color:'GrayText'}}>Basic - Advanced</p>
  
                </h1>

                <ul className="features-list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                {/* <button className={`btn ${plan.buttonClass}`}>
                  {plan.buttonText}
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;