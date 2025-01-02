import React from 'react';

const Features = () => {
  const features = [
    { id: 1, title: 'High Quality', description: 'We ensure top-notch quality in every aspect.' },
    { id: 2, title: 'Fast Performance', description: 'Experience blazing fast performance and reliability.' },
    { id: 3, title: 'Secure', description: 'Your safety is our priority with advanced security measures.' },
  ];

  return (
    <section id="features" className="features-section">
      <h2>Features</h2>
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
