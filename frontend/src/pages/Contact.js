import React from 'react';

const Contact = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 className="home-title">Contact Us</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginTop: '20px' }}>
        Have a question, suggestion, or an issue with your order? Feel free to reach out to us!
        <br /><br />
        📧 Email: support@monsite.com<br />
        ☎️ Phone: +33 1 23 45 67 89<br />
        🕒 Availability: Monday to Friday, from 9 AM to 6 PM
      </p>
    </div>
  );
};

export default Contact;
