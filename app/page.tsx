"use client";

import { useState, FormEvent } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', company: '', brief: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', brief: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <main className={styles.main}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.navContent}>
            <div className={styles.logo}>Bilal<span className="text-teal">.Hub</span></div>
            <div className={styles.navLinks}>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#contact" className="btn">Hire Me</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className={`section ${styles.heroSection}`}>
        <div className={styles.heroBackground}>
          <div className={styles.particlesContainer}></div>
        </div>
        <div className="container relative">
          <h1 className={styles.heroTitle}>
            Bilal | Engineering Intelligent <br />
            <span className="text-gradient">Web Ecosystems.</span>
          </h1>
          <p className={styles.heroTagline}>
            Merging 10x Web Performance with Machine Learning Insights. <br />
            Full-Stack Developer + ML Innovator.
          </p>
          <div className={styles.heroActions}>
            <a href="#projects" className="btn">View My Duality</a>
            <a href="#contact" className="btn btn-purple">Initiate Contact</a>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className={styles.sectionTitle}>The Duality of My Craft</h2>
          
          <div className={styles.projectsGrid}>
            {/* Web Dev Card */}
            <div className={`${styles.projectCard} ${styles.cardTeal}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTag}>Web Engineering</span>
              </div>
              <h3>Optimized E-commerce Platform</h3>
              <p>Next.js & AlloyDB architecture delivering unparalleled speed, scalability, and technical SEO resulting in a 40% conversion uplift.</p>
              <div className={styles.techStack}>
                <span>React</span>
                <span>Node.js</span>
                <span>Next.js</span>
              </div>
            </div>

            {/* ML Card */}
            <div className={`${styles.projectCard} ${styles.cardPurple}`}>
              <div className={styles.cardHeader}>
                <span className={`${styles.cardTag} ${styles.tagPurple}`}>Machine Intelligence</span>
              </div>
              <h3>Predictive Analytics Dashboard</h3>
              <p>Python/TensorFlow powered predictive insights interpreting real-time data streams to forecast market trends with 94% model accuracy.</p>
              <div className={styles.techStack}>
                <span>Python</span>
                <span>PyTorch</span>
                <span>MLflow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`section ${styles.contactSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>The Contact Engine</h2>
          <div className={styles.contactWrapper}>
            <div className={styles.contactInfo}>
              <h3>Let's build intelligence together.</h3>
              <p>Ready to integrate high-performance development and machine learning into your next product? Send your project brief directly to my core systems.</p>
              <p className={styles.emailDisplay}>
                <span className="text-teal">Email:</span> mhdb8535@gmail.com
              </p>
            </div>
            
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-input" 
                  placeholder="Your Full Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  className="form-input" 
                  placeholder="Your Company" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="brief">Project Brief</label>
                <textarea 
                  id="brief" 
                  className="form-textarea" 
                  placeholder="Describe the core objective of your project..." 
                  value={formData.brief}
                  onChange={(e) => setFormData({...formData, brief: e.target.value})}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`btn ${styles.submitBtn}`} 
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Transmitting...' : 'Execute Submission Sequence'}
              </button>
              
              {status === 'success' && <p style={{marginTop: '1rem', color: 'var(--accent-teal)'}}>Transmission Successful. I will review your core objectives.</p>}
              {status === 'error' && <p style={{marginTop: '1rem', color: '#ff3333'}}>Error during transmission. Please try again or email directly.</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
