import { useState, useEffect } from 'react'
import './App.css'
import Dog from './components/Dog'
import { Canvas } from '@react-three/fiber'
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

function App() {
  const [activeSection, setActiveSection] = useState('section-1')

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
              <a href="#overview" className="nav-link">Overview</a>
              <a href="#focus" className="nav-link">Focus</a>
              <a href="#products" className="nav-link">Products</a>
              <a href="#technology" className="nav-link">Technology</a>
              <a href="#pricing" className="nav-link">Pricing</a>
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
          <img id='background-l' src="/background-l.png" alt="" />
          <img id='branches_diffuse' src="/branches_diffuse.jpeg" alt="" />
          <img id='branches_normals' src="/branches_normals.jpeg" alt="" />
          <img id='dog_normals' src="/dog_normals.jpg" alt="" />
          <img id='kennedy' src="/kennedy.png" alt="" />
          <img id='kikk' src="/kikk.png" alt="" />
          <img id='msi-chicago' src="/msi-chicago.png" alt="" />
          <img id='navy-pier' src="/navy-pier.png" alt="" />
          <img id='opera' src="/opera.png" alt="" />
          <img id='phone' src="/phone.png" alt="" />
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
              <h1 className="display-title">ARCHITECTING <br /> AFRICA'S <span className="highlight" style={{ color: '#00d2ff' }}>INTELLIGENT</span><br /> FUTURE</h1>
            </div>
          </div>
          <div className="bottom hero-bottom" style={{ marginBottom: '8vh' }}>
            <div className="left"></div>
            <div className="right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <small className="pill" style={{ color: '#00d2ff', opacity: 0.6, letterSpacing: '4px', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '16px', border: '1px solid rgba(0, 210, 255, 0.2)', padding: '4px 12px', borderRadius: '4px' }}>COMPANY OVERVIEW</small>
              <p className="hero-p" style={{ fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.6, color: '#e2e8f0', maxWidth: '650px' }}>
                <span style={{ fontWeight: 700 }}>Clever Names XNTJ</span> is the vanguard defining the future of African autonomy. We are architecting the absolute <span style={{ color: '#00d2ff', fontWeight: 500 }}>sovereign intelligence layer</span> for emerging markets, engineering the high-octane AI infrastructure that transforms raw institutional data into the continent's most <span style={{ color: '#ffffff', fontWeight: 600 }}>unstoppable and scalable power.</span>
              </p>
              <div className="hero-tags" style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <span className="tag-pill">Retrieval-Augmented Generation</span>
                <span className="tag-pill">Conversational AI</span>
                <span className="tag-pill">SaaS Platforms</span>
                <span className="tag-pill">Cloud Infrastructure</span>
                <span className="tag-pill">Emerging Markets</span>
                <span className="tag-pill">Institutional Consultancy</span>
                <span className="tag-pill">Web Development</span>
                <span className="tag-pill">Sovereign AI Strategy</span>
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
                <h1>Cognitive Base</h1>
              </div>
              <div img-title="branches_diffuse" className="title">
                <small>02 — RESEARCH</small>
                <h1>Deep Branch</h1>
              </div>
              <div img-title="branches_normals" className="title">
                <small>03 — FOUNDATION</small>
                <h1>Vector Mapping</h1>
              </div>
              <div img-title="dog_normals" className="title">
                <small>04 — VISION</small>
                <h1>Neural Optics</h1>
              </div>
              <div img-title="kennedy" className="title">
                <small>05 — INFRASTRUCTURE</small>
                <h1>Model Ops</h1>
              </div>
              <div img-title="kikk" className="title">
                <small>06 — INTEGRATION</small>
                <h1>API Gateway</h1>
              </div>
              <div img-title="msi-chicago" className="title">
                <small>07 — ENTERPRISE</small>
                <h1>Consenso</h1>
              </div>
              <div img-title="navy-pier" className="title">
                <small>08 — HEALTHCARE</small>
                <h1>Cura Health</h1>
              </div>
              <div img-title="opera" className="title">
                <small>09 — DEPLOYMENT</small>
                <h1>African AI</h1>
              </div>
              <div img-title="phone" className="title">
                <small>10 — DATA PIPELINE</small>
                <h1>Data Engine</h1>
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

        <section id='section-6' className="story-section contact-section">
          <div className="contact-container" style={{ paddingTop: '2vh' }}>
            <small className="pill" style={{ color: '#00d2ff', letterSpacing: '4px', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}>THE NEXT CHAPTER</small>
            <h1 className="contact-title display-title" style={{ fontFamily: 'Space Grotesk', fontSize: '5.5rem', fontWeight: 800, marginTop: '24px', lineHeight: 0.95, textTransform: 'uppercase', textShadow: '0 15px 40px rgba(0,0,0,0.6)' }}>Shape the <br /><span className="highlight" style={{ color: '#00d2ff' }}>Continent.</span></h1>
            <a href="mailto:hello@clevernames.com" className="contact-btn" style={{ marginTop: '60px' }}>
              <span>hello@clevernames.com</span>
              <i className="ri-arrow-right-up-line"></i>
            </a>
          </div>

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
                  <a href="#" aria-label="LinkedIn"><i className="ri-linkedin-fill"></i></a>
                  <a href="#" aria-label="Twitter"><i className="ri-twitter-x-fill"></i></a>
                  <a href="#" aria-label="GitHub"><i className="ri-github-fill"></i></a>
                  <a href="#" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
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
      </main>
    </>
  )
}

export default App
