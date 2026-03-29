"use client";

import { useState, FormEvent } from 'react';
import styles from './page.module.css';
import { ThemeToggle } from '../components/ThemeToggle';

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
        <div className="container" style={{ width: '100%' }}>
          <div className={styles.navContent}>
            <div className={styles.logo}>Bilal<span className="text-teal">.Hub</span></div>
            <div className={styles.navLinks}>
              <a href="#about">About</a>
              <a href="#casestudies">Case Studies</a>
              <ThemeToggle />
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
            Engineering Intelligent <br />
            <span className="text-gradient">Web Ecosystems & ML-Driven Growth.</span>
          </h1>
          <p className={styles.heroTagline}>
            Merging 10x Web Performance with Machine Learning Insights. <br />
            High-Ticket Automation Consultant + Full-Stack Innovator.
          </p>
          <div className={styles.heroActions}>
            <a href="#casestudies" className="btn">View Architecture</a>
            <a href="#contact" className="btn btn-purple">Request an Audit</a>
          </div>
        </div>
      </section>

      {/* Case Studies Showcase */}
      <section id="casestudies" className="section">
        <div className="container">
          <h2 className={styles.sectionTitle}>High-Impact Case Studies</h2>
          
          <div className={styles.projectsGrid}>
            
            {/* Project 1 */}
            <div className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTag}>Machine Intelligence</span>
              </div>
              <h3>Smart Bridal Makeup Advisor</h3>
              <p className={styles.impactMetric}>Impact: Increased personalization efficiency by 40%.</p>
              <p>An intelligent computer vision and expert logic engine designed to assess facial features and recommend bespoke cosmetic strategies autonomously.</p>
              <div className={styles.techStack}>
                <span>Computer Vision</span>
                <span>Python</span>
                <span>Expert Systems</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <span className={`${styles.cardTag} ${styles.tagPurple}`}>Security & Verification</span>
              </div>
              <h3>Blockchain Academic Credential Verifier</h3>
              <p className={styles.impactMetric}>Impact: Reduced verification latency to near-zero.</p>
              <p>A decentralized, immutable ledger system built to securely issue, store, and instantly verify academic credentials without reliance on central authorities.</p>
              <div className={styles.techStack}>
                <span>Blockchain</span>
                <span>Smart Contracts</span>
                <span>Web3.js</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTag}>Hardware Integration</span>
              </div>
              <h3>Human Detecting System</h3>
              <p className={styles.impactMetric}>Impact: Enhanced facility security monitoring accuracy.</p>
              <p>An edge-computing IoT solution utilizing embedded microcontrollers to autonomously detect and classify human presence for highly secure facilities.</p>
              <div className={styles.techStack}>
                <span>IoT</span>
                <span>Microcontrollers</span>
                <span>C++</span>
              </div>
            </div>

            {/* Project 4 */}
            <div className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <span className={`${styles.cardTag} ${styles.tagPurple}`}>Geo-Platform Engineering</span>
              </div>
              <h3>Local Job Portal for Kerala</h3>
              <p className={styles.impactMetric}>Impact: Streamlined district-level hiring funnels.</p>
              <p>A highly-scalable regional platform employing advanced geolocation and granular district filtering rules to bridge hyper-local talent sets with employers.</p>
              <div className={styles.techStack}>
                <span>Next.js</span>
                <span>Geolocation API</span>
                <span>PostgreSQL</span>
              </div>
            </div>

             {/* Project 5 */}
             <div className={styles.projectCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTag}>Connected Automation</span>
              </div>
              <h3>Voice Controlled Home Automation</h3>
              <p className={styles.impactMetric}>Impact: Delivered seamless zero-touch residential ecosystems.</p>
              <p>A highly integrated home management architecture linking ESP8266 microcontrollers with Amazon Alexa skills for comprehensive end-to-end voice control.</p>
              <div className={styles.techStack}>
                <span>ESP8266</span>
                <span>Alexa Smart Home</span>
                <span>Node.js</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`section ${styles.contactSection}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Request an AI Automation Audit</h2>
          <div className={styles.contactWrapper}>
            <div className={styles.contactInfo}>
              <h3>Let's architect your next breakthrough.</h3>
              <p>Ready to deploy high-performance engineering and machine intelligence into your enterprise pipeline? Submit your immediate requirements.</p>
              
              <div className={styles.microCopy}>
                ✓ Every inquiry is parsed by a custom ML lead-scoring model and synced to my priority dashboard in &lt;3 seconds.
              </div>

              <p className={styles.emailDisplay}>
                <span className="text-teal">Direct Override:</span> mhdb8535@gmail.com
              </p>
            </div>
            
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Executive Name</label>
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
                <label className="form-label" htmlFor="company">Enterprise / Organization</label>
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
                <label className="form-label" htmlFor="brief">Core Objective / Architecture Needs</label>
                <textarea 
                  id="brief" 
                  className="form-textarea" 
                  placeholder="Describe the bottleneck or automation objective..." 
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
                {status === 'loading' ? 'Analyzing & Routing...' : 'Execute Audit Request'}
              </button>
              
              {status === 'success' && <p style={{marginTop: '1rem', color: 'var(--accent-teal)'}}>Transmission Secure. Priority payload routed to dashboard.</p>}
              {status === 'error' && <p style={{marginTop: '1rem', color: '#ff3333'}}>Anomaly detected during routing. Please retry or bypass via direct email.</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
