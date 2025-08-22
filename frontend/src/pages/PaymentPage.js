import React from 'react';
import { FaCreditCard } from 'react-icons/fa';

const PaymentPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <FaCreditCard style={styles.icon} /> Secure Payment
      </h2>

      <form style={styles.form}>
        <label style={styles.label}>Cardholder Name</label>
        <input
          type="text"
          placeholder="e.g., Nourhen Bouranen"
          required
          style={styles.input}
        />

        <label style={styles.label}>Card Number</label>
        <input
          type="text"
          placeholder="0000 0000 0000 0000"
          required
          style={styles.input}
        />

        <div style={styles.row}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Expiration Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              required
              style={styles.input}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>CVV</label>
            <input
              type="password"
              placeholder="***"
              required
              style={styles.input}
            />
          </div>
        </div>

        <button type="submit" style={styles.button}>Pay Now</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '3rem auto',
    padding: '2rem',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    color: '#1a1a2e',
    fontFamily: 'Inter, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '1.8rem',
    fontWeight: 800,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  icon: {
    fontSize: '1.8rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 600,
    marginBottom: '0.3rem',
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '12px',
    fontSize: '1rem',
    outline: 'none',
  },
  row: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '1.2rem 3rem',
    background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 6px 20px rgba(67, 97, 238, 0.3)',
    marginTop: '1rem',
  },
};

export default PaymentPage;
