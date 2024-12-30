import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Github, Linkedin, Mail, Code2, PenTool, BrainCircuit, Award, FileText } from 'lucide-react';
import NeuralBackground from './components/NeuralBackground';
import ProjectCard from './components/ProjectCard';
import ResumeViewer from './components/ResumeViewer';
import { createPortal } from 'react-dom';
import './styles/Timeline.css';

const timelineItems = [
  {
    year: "2022",
    event: "Started B.Tech in CSE (AIML)",
    description: "Began my journey in Computer Science with specialization in AI & ML at VNRVJIET, Hyderabad"
  },
  {
    year: "2023",
    event: "First Project",
    description: "Designed and engineered a responsive Task Manager web application using HTML, CSS, and JavaScript"
  },
  {
    year: "2023",
    event: "Hackathons",
    description: "Participated in many Hackathons such as SIH'23, GDSC Solution Challenge and developed projects in AI, ML, and Full Stack"
  },
  {
    year: "2024 Feb",
    event: "Data Science Intern",
    description: "Joined IBM SkillsBuild and CSRBOX for hands-on experience in data analysis and visualization"
  },
  {
    year: "2024 Dec",
    event: "Smart India Hackathon 2024 Finalist (Top 2.4%)",
    description: "Developed AI-powered delivery optimization system for India Post, reducing delivery times by 40%"
  },
];

const Timeline = () => {
  const renderedItems = useRef(new Set());

  useEffect(() => {
    const observers = [];
    const items = document.querySelectorAll('.timeline-item');

    items.forEach((item, index) => {
      if (!renderedItems.current.has(index)) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            item.classList.add('show');
            renderedItems.current.add(index);
            observer.unobserve(item);
          }
        }, { threshold: 0.2 });

        observer.observe(item);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-24 relative px-6 z-0">
      <h2 className="text-4xl font-serif font-bold text-center mb-16 bg-primary bg-clip-text text-transparent">
        My Journey
      </h2>
      
      <div className="absolute left-[50%] top-32 bottom-0 w-0.5 bg-primary/30" />

      <div className="relative">
        {timelineItems.map((item, index) => (
          <div
            key={index}
            className="timeline-item relative flex items-center gap-8 mb-16 
              opacity-0 translate-y-10 transition-all duration-700 ease-out"
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'ml-auto pl-8'}`}>
              <div className="p-6 bg-secondary/80 backdrop-blur-sm rounded-lg shadow-xl 
                              transition-transform duration-300 hover:scale-105 hover:bg-secondary/90 
                              border border-primary/20 hover:border-primary/40">
                <div className="text-primary font-mono mb-2">{item.year}</div>
                <h3 className="text-xl font-serif font-semibold mb-2 text-text">{item.event}</h3>
                <p className="text-text text-sm">{item.description}</p>
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactMe = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    window.location.href = `mailto:rishitsura@gmail.com?subject=Message from ${name}&body=${message} (${email})`;
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background Effect - Enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/30 to-black opacity-70" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Column - Contact Info */}
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl font-serif font-bold bg-primary bg-clip-text text-transparent">
              Let&apos;s Connect
            </h2>
            <p className="text-lg text-text/80">
              Have a project in mind or just want to chat? Feel free to reach out!
            </p>
            
            <div className="space-y-4">
              <a href="mailto:rishitsura@gmail.com" 
                 className="flex items-center gap-3 text-text hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>rishitsura@gmail.com</span>
              </a>
              <a href="https://github.com/rishitsura" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 text-text hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/rishit-sura" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 text-text hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} 
                  className="bg-secondary/30 backdrop-blur-md rounded-2xl p-8 border border-primary/10
                            shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text/80 mb-2">
                    Your Name
                  </label>
                  <input type="text" id="name" name="name" required 
                         className="w-full px-4 py-3 rounded-lg bg-black/50 border border-primary/20 
                                  text-text placeholder-text/50 focus:border-primary
                                  transition-colors duration-300" 
                         placeholder="John Doe" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text/80 mb-2">
                    Email Address
                  </label>
                  <input type="email" id="email" name="email" required 
                         className="w-full px-4 py-3 rounded-lg bg-black/50 border border-primary/20 
                                  text-text placeholder-text/50 focus:border-primary
                                  transition-colors duration-300"
                         placeholder="john@example.com" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text/80 mb-2">
                    Your Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="4" 
                    required 
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-primary/20 
                            text-text placeholder-text/50 focus:border-primary
                            transition-colors duration-300 resize-none"
                    placeholder="Enter your message..." 
                  />
                </div>

                <button type="submit" 
                        className="group relative w-full overflow-hidden bg-primary/90 
                                 text-black font-medium py-3 rounded-lg
                                 transition-all duration-300 ease-out
                                 hover:bg-primary/80 active:scale-[0.98]">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 
                                 via-white/10 to-primary/0 
                                 translate-x-[-100%] group-hover:translate-x-[100%] 
                                 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" 
                        aria-hidden="true" />
                  <span className="relative inline-flex items-center justify-center 
                                 w-full gap-2 text-sm tracking-wide">
                    Send Message
                    <svg className="w-4 h-4 transition-transform duration-400 
                                  group-hover:translate-x-1" 
                         viewBox="0 0 16 16" fill="none" 
                         xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" 
                            strokeWidth="2" strokeLinecap="round" 
                            strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingResumeButton = memo(({ onClick }) => (
  createPortal(
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-[9999] pointer-events-auto 
                 bg-red-500 text-black px-6 py-3 
                 rounded-lg shadow-lg flex items-center gap-2 border border-transparent 
                 hover:border-red-500 backdrop-blur-sm transition-all duration-500 
                 transform hover:scale-105 active:scale-95"
    >
      <FileText className="w-5 h-5 animate-bounce" />
      <span className="text-sm font-medium">View Resume</span>
    </button>,
    document.body
  )
));

FloatingResumeButton.displayName = 'FloatingResumeButton';
FloatingResumeButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

const Portfolio = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Handle scroll progress for progress bar only
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse movement for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "OptiDeliver",
      description: "AI-powered delivery optimization system for India Post",
      tech: ["Python", "AI", "ML"],
      metrics: ["40% faster deliveries", "15% reduced fuel consumption"],
      icon: <Code2 className="w-6 h-6" />,
      repoLink: "https://github.com/rishitsura/Optideliver-AI-Powered-Delivery-Optimization-System"
    },
    {
      title: "Hate Speech Recognition",
      description: "ML-based tweet classification system",
      tech: ["Python", "NLP", "ML"],
      metrics: ["90% accuracy", "Advanced text preprocessing"],
      icon: <BrainCircuit className="w-6 h-6" />,
      repoLink: "https://github.com/rishitsura/Hate-Speech-Recognition-System"
    },
    {
      title: "Nextpad",
      description: "Creative writing sharing platform",
      tech: ["React.js", "Node.js", "MongoDB"],
      metrics: ["50% user engagement", "40% content submissions"],
      icon: <PenTool className="w-6 h-6" />,
      repoLink: "https://github.com/PPraneesh/NextPad"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-text">
      <header>
        {/* Full-width glass background now centered */}
        <div className="navbar-bg">
          <nav className="pill-navbar">
            <a href="#home" className="pill-link hover:text-primary">Home</a>
            <a href="#projects" className="pill-link hover:text-primary">Projects</a>
            <a href="#timeline" className="pill-link hover:text-primary">Journey</a>
            <a href="#contact" className="pill-link hover:text-primary">Contact</a>
          </nav>
        </div>
      </header>

      <FloatingResumeButton onClick={() => setShowResumeModal(true)} />
      <NeuralBackground />
      
      {/* Interactive background effect */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 50}% ${50 + mousePosition.y * 50}%,rgb(69, 135, 233), transparent 30%)`
        }}
      />

      {/* Progress bar with red, yellow, blue gradient */}
      <div 
        className="fixed top-0 left-0 h-2 bg-gradient-to-r from-pink-500 via-yellow-400 via-blue-500 via-violet-600 to-pink-500 shadow-lg transition-transform duration-75 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="text-center space-y-12">
          <p className="text-3xl text-text mb-2"> {/* Increased from text-2xl, reduced top margin */}
            Hey, I&apos;m <span className="text-8xl font-bold bg-gradient-to-r from-red-600 via-yellow-400 via-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent bg-[size:200%_auto] animate-[flow_3s_linear_infinite]">
              Rishit Sura
            </span>
          </p>
          <h1 className="text-5xl font-serif font-bold mb-8 bg-primary bg-clip-text text-transparent"> {/* Increased from text-4xl */}
            Tech Enthusiast & Developer
          </h1>
          <p className="text-2xl text-text mb-10 max-w-3xl mx-auto"> {/* Increased from text-xl and max-w-2xl */}
            SIH&apos;24 Finalist | Python | Machine Learning | Full Stack
          </p>
          <div className="flex gap-6 justify-center"> {/* Increased gap from gap-4 */}
            <Award className="w-10 h-10 text-yellow-400 animate-bounce" /> {/* Increased from w-8 h-8 */}
            <p className="text-xl text-text">Top 2.4% among 13,000+ participants in SIH&apos;24</p> {/* Increased from text-lg */}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <h2 className="text-4xl font-serif font-bold text-center bg-primary bg-clip-text text-transparent"> {/* Reverted gradient classes */}
            Featured Projects
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                project={project}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 relative bg-transparent">
        <Timeline />
      </section>

      {/* Contact Me Section */}
      <ContactMe />

      {/* Footer */}
      <footer className="relative bg-gradient-to-t from-secondary/80 to-transparent flex items-center">
        <div className="w-full border-t border-primary/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="h-[80px] flex items-center justify-center">
              <p className="text-text/70 text-sm">
                © 2024 Built with ❤️ by{' '}
                <span className="relative inline-block">
                  <span className="relative inline-block text-text hover:text-primary transition-colors duration-300">
                    Rishit Sura
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 ease-out origin-left group-hover:w-full hover:w-full"></span>
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      {showResumeModal && <ResumeViewer onClose={() => setShowResumeModal(false)} />}
    </div>
  );
};

export default Portfolio;