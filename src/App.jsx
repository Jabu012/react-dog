import { useState, useEffect } from 'react'
import './App.css'
import Dog from './components/Dog'
import { Canvas } from '@react-three/fiber'
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OfficeMap from './components/OfficeMap'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [activeSection, setActiveSection] = useState('section-1')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    contactEmail: '',
    message: ''
  })

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const company = formData.companyName
    const name = formData.contactName
    const email = formData.contactEmail
    const message = formData.message

    // Close the modal and reset form state immediately
    setIsModalOpen(false)
    setFormData({
      companyName: '',
      contactName: '',
      contactEmail: '',
      message: ''
    })

    // Submit AJAX request in the background
    fetch("https://formsubmit.co/ajax/hello@clever-names.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `Data Partnership Inquiry - ${company}`,
        "Organisation Name": company,
        "Contact Name": name,
        "Email": email,
        "Message": message,
        _captcha: "false"
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Form successfully submitted:", data)
      })
      .catch(error => {
        console.error("Error submitting form:", error)
      })
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.2 })

    document.querySelectorAll('.story-section').forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    const sections = gsap.utils.toArray('.story-section');
    sections.forEach((sec) => {
      const q = gsap.utils.selector(sec);
      gsap.from(q('.section-title, .section-desc, .display-title, .hero-p, .quote-text, .quote-author'), {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    });

    const titles = gsap.utils.toArray('.title');
    titles.forEach((titleElem) => {
      gsap.from(titleElem, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleElem,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, []);

  return (
    <>
      <main data-section={activeSection}>
        <div className="noise-overlay"></div>
        <nav className="global-nav">
          <div className="nav-elem logo-group">
            <img src="/logo.png" alt="Clever Names" className="logo-image" />
            <div className="logo-text">
              <div className="company-name">Clever Names</div>
              <div className="company-slogan">we only celebrate failure because success is a norm</div>
            </div>
          </div>
          <div className="nav-center-wrapper">
            <div className="nav-center">
              <a href="#section-1" className={`nav-link${activeSection === 'section-1' ? ' nav-link--active' : ''}`}>Overview</a>
              <a href="#section-2" className={`nav-link${activeSection === 'section-2' ? ' nav-link--active' : ''}`}>Focus</a>
              <a href="#section-3" className={`nav-link${activeSection === 'section-3' ? ' nav-link--active' : ''}`}>Products</a>
              <a href="#section-5" className={`nav-link${['section-4', 'section-5', 'section-strategy'].includes(activeSection) ? ' nav-link--active' : ''}`}>Technology</a>
              <a href="#section-companies" className={`nav-link${activeSection === 'section-companies' ? ' nav-link--active' : ''}`}>For Companies</a>
              <a href="#section-6" className={`nav-link${activeSection === 'section-6' ? ' nav-link--active' : ''}`}>Contact</a>
              <a href="#section-talent" className={`nav-link nav-link--talent${activeSection === 'section-talent' ? ' nav-link--active' : ''}`}>Careers ↗</a>
            </div>
            <div className="nav-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">South Africa · Africa-Focused · Global-Ready</span>
            </div>
          </div>
          <div className="nav-right">
            <button className="cta-button">Get Started</button>
          </div>
        </nav>
        <div className="images">
          <img id='background-l' src="/background-l.png" alt="Sovereign AI Infrastructure Background" />
          <img id='branches_diffuse' src="/branches_diffuse.jpeg" alt="Deep Branch research visualization diffuse map" />
          <img id='branches_normals' src="/branches_normals.jpeg" alt="Deep Branch research visualization normal map" />
          <img id='dog_normals' src="/dog_normals.jpg" alt="Dog normal map model vector mapping" />
          <img id='kennedy' src="/kennedy.png" alt="Enterprise Model Ops platform visualization" />
          <img id='kikk' src="/kikk.png" alt="API Gateway integration architecture" />
          <img id='msi-chicago' src="/msi-chicago.png" alt="Consenso Enterprise data partnership framework" />
          <img id='navy-pier' src="/navy-pier.png" alt="Cura Health care data intelligence platform" />
          <img id='opera' src="/opera.png" alt="African AI infrastructure deployment vector" />
          <img id='phone' src="/phone.png" alt="Mobile AI client data engine dashboard" />
        </div>
        <Canvas
          id='canvas-elem'
          camera={{ position: [0, 0, 0.55], fov: 45 }}
          gl={{
            toneMapping: Number(THREE.ReinhardToneMapping),
            outputColorSpace: THREE.SRGBColorSpace
          }}
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
          }} >
          <Dog />
        </Canvas>
        <section id='section-1' className="story-section">
          <div className="middle">
            <div className="left">
              <h1 className="display-title">ARCHITECTING <br /> AFRICA'S <span className="highlight" style={{ color: '#00d2ff' }}>INTELLIGENT</span> <br /> FUTURE</h1>
            </div>
          </div>
          <div className="bottom hero-bottom" style={{ marginBottom: '8vh' }}>
            <div className="left"></div>
            <div className="right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <small className="pill" style={{ color: '#00d2ff', opacity: 0.6, letterSpacing: '4px', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '16px', border: '1px solid rgba(0, 210, 255, 0.2)', padding: '4px 12px', borderRadius: '4px' }}>COMPANY OVERVIEW</small>
              <p className="hero-p" style={{ fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.6, color: '#e2e8f0', maxWidth: '650px' }}>
                We design and implement <span style={{ color: '#00d2ff', fontWeight: 500 }}>scalable AI systems</span>, SaaS platforms, workflow automation solutions, and custom software that solve real business challenges. Our expertise spans RAG, Conversational AI, data intelligence, cloud architectures, and digital transformation. We partner with startups, NGOs, educational institutions, healthcare organizations, and enterprises to improve efficiency, enhance decision-making, and accelerate growth. <span style={{ color: '#ffffff', fontWeight: 600 }}>Building intelligent technology that creates measurable impact.</span>
              </p>
              <div className="hero-tags" style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <span className="tag-pill">Retrieval-Augmented Generation</span>
                <span className="tag-pill">Conversational AI</span>
                <span className="tag-pill">SaaS Development</span>
                <span className="tag-pill">IT Consulting</span>
                <span className="tag-pill">Business Consulting</span>
                <span className="tag-pill">Cloud Infrastructure</span>
                <span className="tag-pill">Project Management</span>
                <span className="tag-pill">Web Development</span>
                <span className="tag-pill">User Experience Design (UED)</span>
                <span className="tag-pill">Institutional Consultancy</span>
                <span className="tag-pill">Sovereign AI Strategy</span>
                <span className="tag-pill">Software Testing</span>
                <span className="tag-pill">Technical Support</span>
                <span className="tag-pill">Corporate Training</span>
                <span className="tag-pill">Emerging Markets</span>
              </div>
            </div>
          </div>
        </section>

        <section id='section-2' className="story-section">
          <div className="focus-content" style={{ width: '45vw', marginLeft: '50vw', paddingTop: '28vh', paddingBottom: '10vh' }}>
            <small className="pill" style={{ color: '#00d2ff', letterSpacing: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>THE CORE MISSION</small>
            <h2 className="section-title" style={{ fontFamily: 'Space Grotesk', fontSize: '4rem', lineHeight: 1.05, marginTop: '24px', fontWeight: 700 }}>Computing the <br /> Continent's Potential.</h2>
            <p className="section-desc" style={{ fontFamily: 'Inter', fontSize: '1.3rem', fontWeight: 300, color: '#94a3b8', marginTop: '24px', lineHeight: 1.5 }}>Beyond mere consultation, we build the underlying engine layer. Our platforms enable African institutions to own their computation, ensuring that success is not just an outcome, but a structural norm.</p>
          </div>

          <div className="build-container" style={{ marginLeft: '10vw', width: '80vw', paddingBottom: '20vh' }}>
            <h3 className="build-label" style={{ fontFamily: 'Space Grotesk', fontSize: '2.5rem', fontWeight: 600, marginBottom: '60px', color: '#ffffff' }}>What We <span style={{ color: '#00d2ff' }}>Build:</span></h3>
            <div className="build-grid">
              <div className="build-card">
                <i className="ri-search-eye-line icon-box"></i>
                <h4>Retrieval-Augmented Generation</h4>
                <p>Document-grounded AI that retrieves relevant context before generating responses — ensuring accuracy and domain specificity.</p>
              </div>
              <div className="build-card">
                <i className="ri-chat-private-line icon-box"></i>
                <h4>Conversational AI Infrastructure</h4>
                <p>End-to-end conversational systems engineered for institutional deployment, from intake to structured output.</p>
              </div>
              <div className="build-card">
                <i className="ri-bar-chart-box-line icon-box"></i>
                <h4>Structured Data Intelligence</h4>
                <p>Pipelines that transform raw, unstructured inputs into clean, structured, decision-ready intelligence.</p>
              </div>
              <div className="build-card">
                <i className="ri-flashlight-line icon-box"></i>
                <h4>AI Workflow Automation</h4>
                <p>Intelligent automation layers that integrate directly into existing institutional processes and workflows.</p>
              </div>
              <div className="build-card">
                <i className="ri-bank-line icon-box"></i>
                <h4>Institutional-Grade SaaS</h4>
                <p>Production-ready platforms built for the reliability, security, and compliance standards of institutional environments.</p>
              </div>
              <div className="build-card">
                <i className="ri-cloud-line icon-box"></i>
                <h4>Cloud-Based Scalable Architecture</h4>
                <p>Secure, scalable cloud infrastructure designed to grow from pilot deployments to continental scale.</p>
              </div>
            </div>
          </div>
        </section>

        <section id='section-3' className="story-section">
          <div className="portfolio-content" style={{ paddingTop: '15vh' }}>
            <small className="pill" style={{ color: '#00d2ff', letterSpacing: '4px', fontWeight: 600, fontSize: '0.75rem', marginLeft: '10vw', textTransform: 'uppercase' }}>TECHNICAL FRONTIERS</small>
            <div className="titles">
              <div img-title="background-l" className="title">
                <small>01 — PLATFORM</small>
                <h2>Cognitive Base</h2>
              </div>
              <div img-title="branches_diffuse" className="title">
                <small>02 — RESEARCH</small>
                <h2>Deep Branch</h2>
              </div>
              <div img-title="branches_normals" className="title">
                <small>03 — FOUNDATION</small>
                <h2>Vector Mapping</h2>
              </div>
              <div img-title="dog_normals" className="title">
                <small>04 — VISION</small>
                <h2>Neural Optics</h2>
              </div>
              <div img-title="kennedy" className="title">
                <small>05 — INFRASTRUCTURE</small>
                <h2>Model Ops</h2>
              </div>
              <div img-title="kikk" className="title">
                <small>06 — INTEGRATION</small>
                <h2>API Gateway</h2>
              </div>
              <div img-title="msi-chicago" className="title">
                <small>07 — ENTERPRISE</small>
                <h2>Consenso</h2>
              </div>
              <div img-title="navy-pier" className="title">
                <small>08 — HEALTHCARE</small>
                <h2>Cura Health</h2>
              </div>
              <div img-title="opera" className="title">
                <small>09 — DEPLOYMENT</small>
                <h2>African AI</h2>
              </div>
              <div img-title="phone" className="title">
                <small>10 — DATA PIPELINE</small>
                <h2>Data Engine</h2>
              </div>
            </div>
          </div>
        </section>

        <section id='section-4' className="story-section">
          <div className="vision-quote" style={{ width: '65vw', margin: '0 auto', textAlign: 'center', paddingTop: '32vh' }}>
            <h2 className="quote-text" style={{ fontFamily: '"Space Grotesk"', fontSize: '3.2rem', fontWeight: 300, lineHeight: 1.25, letterSpacing: '-1px' }}>
              "We are not merely building technology; we are architecting the <span style={{ color: '#00d2ff' }}>sovereign intelligence</span> that allows African institutions to operate with the clarity they've always deserved."
            </h2>
            <div className="quote-author-wrapper" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
              <p className="quote-author" style={{ fontFamily: 'Inter', color: '#ffffff', fontSize: '1.1rem', fontWeight: 600 }}>Jabulani Dube</p>
              <p style={{ fontFamily: 'Inter', color: '#64748b', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Chief Infrastructure Architect</p>
            </div>
          </div>
        </section>

        <section id='section-5' className="story-section">
          <div className="tech-content" style={{ width: '45vw', marginLeft: '10vw', paddingTop: '20vh' }}>
            <small className="pill" style={{ color: '#00d2ff', letterSpacing: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>TECHNOLOGY ARCHITECTURE</small>
            <h2 className="section-title" style={{ fontFamily: 'Space Grotesk', fontSize: '4rem', marginTop: '24px', lineHeight: 1.0, fontWeight: 700 }}>The Technical <br /> Foundation</h2>
            <p className="section-desc" style={{ fontFamily: 'Inter', fontSize: '1.2rem', color: '#94a3b8', marginTop: '24px', fontWeight: 300, lineHeight: 1.5, maxWidth: '540px' }}>
              All platforms are engineered from the ground up by our specialized in-house team, ensuring architectural consistency and technical precision across our entire infrastructure.
            </p>
          </div>

          <div className="foundation-container" style={{ marginLeft: '10vw', width: '80vw', marginTop: '60px', paddingBottom: '20vh' }}>
            <div className="foundation-grid">
              <div className="foundation-card">
                <span className="foundation-number">01</span>
                <div className="foundation-text">
                  <h4>RAG Frameworks</h4>
                  <p>Retrieval-Augmented Generation</p>
                </div>
              </div>
              <div className="foundation-card">
                <span className="foundation-number">02</span>
                <div className="foundation-text">
                  <h4>Vector Database Search</h4>
                  <p>Semantic similarity retrieval</p>
                </div>
              </div>
              <div className="foundation-card">
                <span className="foundation-number">03</span>
                <div className="foundation-text">
                  <h4>Secure Cloud Infrastructure</h4>
                  <p>Scalable, enterprise-grade</p>
                </div>
              </div>
              <div className="foundation-card">
                <span className="foundation-number">04</span>
                <div className="foundation-text">
                  <h4>Conversational AI Engines</h4>
                  <p>Dialogue management & NLU</p>
                </div>
              </div>
              <div className="foundation-card">
                <span className="foundation-number">05</span>
                <div className="foundation-text">
                  <h4>Structured Output Pipelines</h4>
                  <p>Unstructured &rarr; actionable data</p>
                </div>
              </div>
              <div className="foundation-card">
                <span className="foundation-number">06</span>
                <div className="foundation-text">
                  <h4>Workflow-Integrated SaaS</h4>
                  <p>Institutional deployment-ready</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='section-strategy' className="story-section">
          <div className="strategy-content" style={{ width: '80vw', marginLeft: '10vw', paddingTop: '15vh' }}>
            <h2 className="section-title" style={{ fontFamily: 'Space Grotesk', fontSize: '3.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '24px' }}>Africa&rsquo;s AI Infrastructure Company</h2>
            <p className="section-desc" style={{ fontFamily: 'Inter', fontSize: '1.25rem', fontWeight: 300, color: '#94a3b8', lineHeight: 1.6, maxWidth: '700px', marginBottom: '60px' }}>
              Clever Names XNTJ aims to become a leading African AI infrastructure company, building sector-specific intelligence layers that improve lives at scale.
            </p>

            <div className="strategy-grid">
              <div className="strategy-column">
                <h3 className="column-title">Impact Areas</h3>
                <ul className="impact-list">
                  <li>Educational access and quality improvement</li>
                  <li>Healthcare system efficiency in low-resource settings</li>
                  <li>Institutional decision-making intelligence</li>
                  <li>Human capital development at scale</li>
                </ul>
              </div>

              <div className="strategy-column">
                <h3 className="column-title">Long-Term Strategy</h3>
                <ul className="strategy-list">
                  <li>Institutional partnerships with universities & hospitals</li>
                  <li>Public sector integration across African governments</li>
                  <li>Scalable B2B SaaS licensing model</li>
                  <li>AI systems grounded in local African contexts</li>
                  <li>Africa-first expansion before global scaling</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id='section-talent' className="story-section talent-section">
          <div className="talent-container">
            <div className="talent-layout">
              <div className="talent-header">
                <small className="pill" style={{ color: '#c4ff00', letterSpacing: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderColor: 'rgba(196,255,0,0.2)', background: 'rgba(196,255,0,0.05)' }}>EXTERNAL OPPORTUNITIES</small>
                <h2 className="section-title talent-title">Exceptional Roles for<br />Exceptional <span style={{ color: '#c4ff00' }}>Professionals.</span></h2>
                <p className="section-desc talent-desc">
                  Clever Names surfaces opportunities across domains &mdash; from technology and product to finance, operations, and beyond. We point professionals toward <strong>micro1</strong>, an AI-first hiring platform that values deep domain expertise above all else. You do not need to work in AI. You need to be exceptional at what you do.
                </p>
                <a
                  href="https://refer.micro1.ai/referral/jobs/?referralCode=936971ea-4dc6-4f0e-bc4d-df1d5e542d45&utm_source=referral&utm_medium=share&utm_campaign=job_referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="talent-cta-btn talent-cta-btn--hero"
                  id="micro1-referral-btn"
                >
                  <span>View Opportunities</span>
                  <i className="ri-arrow-right-up-line"></i>
                </a>
                <div className="talent-meta">
                  <span className="talent-meta-item"><i className="ri-map-pin-line"></i> Remote &amp; On-site Globally</span>
                  <span className="talent-meta-item"><i className="ri-user-star-line"></i> All Professional Domains</span>
                  <span className="talent-meta-item"><i className="ri-shield-check-line"></i> Expertise-Led Matching</span>
                </div>
                <p className="talent-cta-disclaimer">
                  <i className="ri-information-line"></i>
                  <span>Candidate applications are free of charge.</span>
                </p>
              </div>

              <div className="talent-cards">
                <div className="talent-feature-card">
                  <div className="talent-feature-icon"><i className="ri-award-line"></i></div>
                  <div className="talent-card-body">
                    <h4>Domain Expertise, Valued</h4>
                    <p>Roles span product, finance, operations, design, legal, and technology. What the platform looks for is mastery within your field &mdash; professionals who know their discipline with depth and can execute at a high level.</p>
                  </div>
                </div>
                <div className="talent-feature-card">
                  <div className="talent-feature-icon"><i className="ri-earth-line"></i></div>
                  <div className="talent-card-body">
                    <h4>Global-Scale Opportunities</h4>
                    <p>Positions across 50+ countries, spanning early-stage ventures and established organisations. African professionals are actively sought &mdash; your background is an asset, not a qualifier to overcome.</p>
                  </div>
                </div>
                <div className="talent-feature-card">
                  <div className="talent-feature-icon"><i className="ri-speed-up-line"></i></div>
                  <div className="talent-card-body">
                    <h4>Structured. Efficient. Serious.</h4>
                    <p>AI-assisted screening replaces drawn-out recruitment cycles. Candidates are assessed on substance &mdash; reducing time-to-offer without compromising on the quality of evaluation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id='section-companies' className="story-section companies-section">
          <div className="companies-container">
            <div className="companies-layout">

              <div className="companies-header">
                <small className="pill" style={{ color: '#00d2ff', letterSpacing: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderColor: 'rgba(0,210,255,0.2)', background: 'rgba(0,210,255,0.05)' }}>FOR ORGANISATIONS</small>
                <h2 className="section-title companies-title">Your Operations<br />Are an <span style={{ color: '#00d2ff' }}>Untapped Asset.</span></h2>
                <p className="section-desc companies-desc">
                  Most organisations generate enormous amounts of valuable process knowledge every day &mdash; and leave it entirely on the table. We act as an intermediary connecting you to a premier data partnership program that transforms your domain expertise into a recurring revenue stream.
                </p>
                <p className="section-desc companies-desc" style={{ marginTop: '1rem' }}>
                  If your company wants to monetise its operational data while accelerating its adoption of AI, we&rsquo;d love to facilitate a strategic introduction.
                </p>
                <div className="companies-cta-group">
                  <a
                    href="mailto:hello@clever-names.com?subject=Strategic%20Data%20Partnership&body=Hello%20Clever%20Names%2C%0A%0AWe%20are%20interested%20in%20learning%20more%20about%20monetising%20our%20operational%20data%20through%20your%20partnership%20program.%0A%0AOrganisation%3A%0AContact%20Name%3A"
                    className="companies-primary-btn"
                    id="companies-contact-btn"
                  >
                    <span>Start a Conversation</span>
                    <i className="ri-mail-send-line"></i>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="companies-secondary-btn"
                    id="companies-data-btn"
                  >
                    <span>Explore Data Partnerships</span>
                    <i className="ri-arrow-right-up-line"></i>
                  </button>
                </div>
                <p className="companies-note">
                  <i className="ri-lock-line"></i>
                  <span>All enquiries are handled with full confidentiality.</span>
                </p>
              </div>

              <div className="companies-value-grid">
                <div className="companies-value-card">
                  <div className="companies-value-icon"><i className="ri-database-2-line"></i></div>
                  <div className="companies-card-body">
                    <h4>Monetise Your Operations</h4>
                    <p>Your day-to-day workflows contain patterns and decisions that frontier AI labs actively seek. We connect you to pipelines that safely turn your proprietary process data into an ongoing, scalable revenue source.</p>
                  </div>
                </div>
                <div className="companies-value-card">
                  <div className="companies-value-icon"><i className="ri-rocket-line"></i></div>
                  <div className="companies-card-body">
                    <h4>Accelerate AI Integration</h4>
                    <p>Entering a strategic data partnership does more than generate revenue &mdash; it directly positions your organisation at the forefront of AI adoption, providing early access to the infrastructure of tomorrow.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id='section-6' className="story-section contact-section">
          <div className="contact-container" style={{ paddingTop: '2vh' }}>
            <small className="pill" style={{ color: '#00d2ff', letterSpacing: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>THE NEXT CHAPTER</small>
            <h2 className="contact-title display-title" style={{ fontFamily: 'Space Grotesk', fontSize: '5.5rem', fontWeight: 800, marginTop: '24px', lineHeight: 0.95, textTransform: 'uppercase', textShadow: '0 15px 40px rgba(0,0,0,0.6)' }}>Shape the <br /><span className="highlight" style={{ color: '#00d2ff' }}>Continent.</span></h2>
            <a href="mailto:hello@clever-names.com" className="contact-btn" style={{ marginTop: '60px' }}>
              <span>hello@clever-names.com</span>
              <i className="ri-arrow-right-up-line"></i>
            </a>
          </div>

          <OfficeMap />

          <footer className="footer">
            <div className="footer-top">
              <div className="footer-col">
                <h4>Johannesburg</h4>
                <p>Rosebank Link, 173 Oxford Rd<br />Rosebank, Johannesburg, 2196</p>
              </div>
              <div className="footer-col">
                <h4>Cape Town</h4>
                <p>Workshop 17, Watershed<br />V&A Waterfront, Cape Town, 8002</p>
              </div>
              <div className="footer-col">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="https://www.linkedin.com/company/clever-names" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="ri-linkedin-fill"></i></a>
                  <a href="#" aria-label="Twitter"><i className="ri-twitter-x-fill"></i></a>
                  <a href="#" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
                  <a href="https://www.tiktok.com/@clever_names" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="ri-tiktok-fill"></i></a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Clever Names XNTJ Pty Ltd. All rights reserved.</p>
              <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </footer>
        </section>

        {/* Sleek Glassmorphic Modal for Data Partnerships */}
        <div className={`modal-overlay${isModalOpen ? ' open' : ''}`} onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
              <i className="ri-close-line"></i>
            </button>
            
            <div className="modal-header">
              <h3>Explore Data Partnerships</h3>
              <p>Monetise your operational data and accelerate your AI strategy. Tell us about your company to get started.</p>
            </div>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="companyName">Organisation / Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  required
                  placeholder="e.g. Acme Corporation"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactName">Contact Name</label>
                <input
                  type="text"
                  id="contactName"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactEmail">Work Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  required
                  placeholder="e.g. john@company.com"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message / Scope of Data</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  placeholder="Tell us briefly about your operational data and business focus..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="form-submit-btn">
                <span>Send Message</span>
                <i className="ri-mail-send-line"></i>
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
