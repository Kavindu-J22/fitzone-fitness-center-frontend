import React from 'react';
import { useNavigate } from 'react-router-dom';

const FitZoneMembershipPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic Membership Plan',
      description: 'A budget-friendly option for those who are looking to stay active and maintain general fitness.',
      access: [
        'Unlimited access to cardio and strength training equipment',
        'Free group fitness classes (up to 5 classes per month)',
      ],
      perks: [
        'One free personal training session upon registration',
        'Access to locker rooms and showers',
      ],
      price: '$20 per month',
      promotion: 'First month free for new members',
      planname: 'Basic',
    },
    {
      name: 'Standard Membership Plan',
      description: 'Ideal for fitness enthusiasts looking for a well-rounded fitness experience.',
      access: [
        'Unlimited access to all gym equipment',
        'Unlimited group fitness classes, including yoga, Zumba, HIIT, and more',
        'Two free personal training sessions upon registration',
      ],
      perks: [
        'Access to nutrition counseling and wellness workshops',
        'Priority booking for group classes',
        'Access to locker rooms and showers',
      ],
      price: '$40 per month',
      promotion: 'Sign up for a 6-month package and receive a 10% discount',
      planname: 'Standard',
    },
    {
      name: 'Premium Membership Plan',
      description: 'Designed for individuals who want a more personalized and comprehensive fitness experience.',
      access: [
        'All benefits from the Standard Plan',
        'Four free personal training sessions per month',
        'Access to exclusive members-only fitness workshops and events',
      ],
      perks: [
        'Free personalized workout and nutrition plans tailored by certified trainers',
        'Access to the VIP lounge with refreshments',
        'Priority support for queries and event registrations',
        'Free guest passes (up to 2 per month)',
      ],
      price: '$60 per month',
      promotion: 'Sign up for a 1-year package and receive 2 months free',
      planname: 'Premium',
    },
    {
      name: 'Family Membership Plan',
      description: 'Perfect for families who want to stay fit together.',
      access: [
        'All benefits from the Premium Plan',
        'Membership for up to 4 family members',
        'Access to family-friendly group classes and events',
      ],
      perks: [
        'Discounted rates on personal training sessions for additional members',
        'Family wellness and nutrition workshops',
        'Free babysitting service during workouts',
      ],
      price: '$100 per month for a family of four',
      promotion: 'Refer a family and get 1 month free',
      planname: 'Family',
    },
    {
      name: 'Student Membership Plan',
      description: 'A special discounted plan for students looking to stay fit and active.',
      access: [
        'Unlimited access to gym equipment and group fitness classes',
        'One free personal training session per month',
      ],
      perks: [
        'Discounted pricing on nutrition counseling',
        'Access to student-only wellness programs and fitness challenges',
      ],
      price: '$15 per month (with a valid student ID)',
      promotion: 'Join with a friend and both get 10% off the first three months',
      planname: 'Student',
    },
  ];

  const handleProceedToPayment = (packageName) => {
    navigate('/payments', { state: { packageName } });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>FitZone Membership Plans</h1>
      {plans.map((plan, index) => (
        <div key={index} style={styles.planCard}>
          <h2 style={styles.planName}>{plan.name}</h2>
          <p style={styles.description}>{plan.description}</p>
          <h3 style={styles.subheading}>Access:</h3>
          <ul>
            {plan.access.map((item, idx) => (
              <li key={idx} style={styles.listItem}>{item}</li>
            ))}
          </ul>
          <h3 style={styles.subheading}>Perks:</h3>
          <ul>
            {plan.perks.map((item, idx) => (
              <li key={idx} style={styles.listItem}>{item}</li>
            ))}
          </ul>
          <p style={styles.price}>Price: {plan.price}</p>
          <p style={styles.promotion}>Special Promotion: {plan.promotion}</p>
          <button style={styles.button} onClick={() => handleProceedToPayment(plan.planname)}>
            Proceed to Payment
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  planCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  planName: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '18px',
    marginTop: '15px',
  },
  listItem: {
    fontSize: '14px',
    marginLeft: '20px',
    listStyleType: 'disc',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  promotion: {
    fontSize: '14px',
    fontStyle: 'italic',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default FitZoneMembershipPlans;
