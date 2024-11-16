import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import gymBanner from '../../assets/gymImage.jpg'; // Example banner image
import '../../components/Styles/Home.css'; // Custom CSS for styling

const Home = () => {
    const { user, logout } = useContext(AuthContext);  // Assuming your context provides 'user' and 'logout'
    const navigate = useNavigate();  // Using useNavigate hook to redirect

    const handleLogout = () => {
        logout(); // Assuming logout function is defined in context
        navigate('/'); // Navigate to the home page after logout
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero-section">
                <img src={gymBanner} alt="FitZone Gym Banner" className="hero-image" />
                <div className="hero-text">
                    <h1>Welcome to FitZone Fitness Center</h1>
                    <p>Transform Your Body and Mind with Us</p>
                    {!user && (
                        <Link to="/login" className="cta-button">
                            Login / Sign Up
                        </Link>
                    )}
                </div>
            </header>

            {/* User Dashboard Section */}
            <div className="user-dashboard-section">
                {user ? (
                    <div className="user-section">
                        <div className="user-info">
                            {/* User Icon (Inline SVG) */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 7c2.756 0 5 2.244 5 5s-2.244 5-5 5-5-2.244-5-5 2.244-5 5-5z"></path>
                                <path d="M2 20c0-4.418 3.582-8 8-8h4c4.418 0 8 3.582 8 8z"></path>
                            </svg>
                            <h2>Welcome, {user.name}</h2>
                            <button onClick={handleLogout} className="logout-button">
                                {/* Logout Icon (Inline SVG) */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 17l5-5-5-5"></path>
                                    <path d="M15 12H3"></path>
                                </svg> Logout
                            </button>
                        </div>
                        <div className="dashboard-links">
                            {user.role === 'admin' && (
                                <Link to="/admin-dashboard" className="dashboard-link">
                                    Admin Dashboard
                                </Link>
                            )}
                            {user.role === 'staff' && (
                                <Link to="/staff-dashboard" className="dashboard-link">
                                    Staff Dashboard
                                </Link>
                            )}
                            {user.role === 'customer' && (
                                <Link to="/customer-dashboard" className="dashboard-link">
                                    Customer Dashboard
                                </Link>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Overview Section */}
            <section className="overview-section">
                <h2>Why Choose FitZone?</h2>
                <p>
                    At FitZone Fitness Center, we are committed to helping you achieve your health and fitness goals.
                    Our certified trainers, diverse classes, and state-of-the-art facilities make us the perfect place to
                    start your journey to a healthier, stronger you.
                </p>
            </section>

            {/* Classes Section */}
            <section className="classes-section">
                <h2>Our Classes</h2>
                <div className="classes-list">
                    <div className="class-card">
                        {/* Cardio Icon (Inline SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 14l2-2-2-2"></path>
                            <path d="M15 7h2v10h-2z"></path>
                        </svg>
                        <h3>Cardio</h3>
                        <p>High-energy sessions to boost your endurance and burn calories.</p>
                    </div>
                    <div className="class-card">
                        {/* Strength Training Icon (Inline SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12h6v2H2z"></path>
                            <path d="M16 12h6v2h-6z"></path>
                            <path d="M6 7v6h12V7z"></path>
                        </svg>
                        <h3>Strength Training</h3>
                        <p>Build muscle and increase strength with expert guidance.</p>
                    </div>
                    <div className="class-card">
                        {/* Yoga Icon (Inline SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="8"></circle>
                            <path d="M12 8v4h4"></path>
                        </svg>
                        <h3>Yoga</h3>
                        <p>Enhance your flexibility and find your inner peace with our yoga classes.</p>
                    </div>
                </div>
            </section>

            {/* Personal Training Section */}
            <section className="personal-training-section">
                <h2>Personal Training</h2>
                <p>
                    Work one-on-one with our certified trainers to get a personalized workout plan. Our trainers are
                    here to help you achieve your specific goals, whether it's weight loss, muscle gain, or overall
                    wellness.
                </p>
                <Link to="/trainers" className="learn-more-link">Meet Our Trainers</Link>
            </section>

            {/* Membership Section */}
            <section className="membership-section">
                <h2>Membership Options</h2>
                <p>
                    We offer flexible membership plans to suit your lifestyle. Each membership level comes with its own
                    set of benefits and features, including access to our exclusive members-only content and promotions.
                </p>
                <div className="membership-tiers">
                    <div className="tier-card">
                        <h3>Basic Plan</h3>
                        <p>Access to gym facilities and standard classes.</p>
                        <p className="price">$30/month</p>
                    </div>
                    <div className="tier-card">
                        <h3>Premium Plan</h3>
                        <p>Includes personal training and all fitness classes.</p>
                        <p className="price">$50/month</p>
                    </div>
                    <div className="tier-card">
                        <h3>VIP Plan</h3>
                        <p>All-access pass with exclusive benefits and content.</p>
                        <p className="price">$80/month</p>
                    </div>
                </div>
                <Link to="/membership" className="cta-button">View Membership Plans</Link>
            </section>

            {/* Footer Section */}
            <footer className="home-footer">
                <p>&copy; 2024 FitZone Fitness Center. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
