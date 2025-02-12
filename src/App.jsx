import { useState, useEffect, useRef, memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  PenTool,
  BrainCircuit,
  Award,
  FileText,
  Home,
  Clock,
} from "lucide-react";
import ProjectCard from "./components/ProjectCard";
import ResumeViewer from "./components/ResumeViewer";
import { createPortal } from "react-dom";
import "./styles/Timeline.css";
import { TechCloud } from "./components/TechCloud";

const timelineItems = [
  {
    year: "2022",
    event: "Started B.Tech in CSE (AIML)",
    description:
      "Began my journey in Computer Science with specialization in AI & ML at VNRVJIET, Hyderabad",
  },
  {
    year: "2023",
    event: "First Project",
    description:
      "Designed and engineered a responsive Task Manager web application using HTML, CSS, and JavaScript",
  },
  {
    year: "2023",
    event: "Hackathons",
    description:
      "Participated in many Hackathons such as SIH'23, GDSC Solution Challenge and developed projects in AI, ML, and Full Stack",
  },
  {
    year: "2024 Feb",
    event: "Data Science Intern",
    description:
      "Joined IBM SkillsBuild and CSRBOX for hands-on experience in data analysis and visualization",
  },
  {
    year: "2024 Dec",
    event: "Smart India Hackathon 2024 Finalist (Top 2.4%)",
    description:
      "Developed AI-powered delivery optimization system for India Post, reducing delivery times by 40%",
  },
  {
    "year": "2025 Feb",
    "event": "GDGC Solution Challenge 2025 Winner",
    "description": "Developed SportAI using RAG, ML, OpenCV and Flutter, enhancing athlete performance tracking by 50% and reducing injury risk by 30%."
  },
];

const Timeline = () => {
  const renderedItems = useRef(new Set());

  useEffect(() => {
    const observers = [];
    const items = document.querySelectorAll(".timeline-item");

    items.forEach((item, index) => {
      if (!renderedItems.current.has(index)) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              item.classList.add("show");
              renderedItems.current.add(index);
              observer.unobserve(item);
            }
          },
          { threshold: 0.2 }
        );

        observer.observe(item);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
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
            <div
              className={`w-1/2 ${
                index % 2 === 0 ? "text-right pr-8" : "ml-auto pl-8"
              }`}
            >
              <div
                className="p-6 bg-secondary/80 backdrop-blur-sm rounded-lg shadow-xl 
                              transition-transform duration-300 hover:scale-105 hover:bg-secondary/90 
                              border border-primary/20 hover:border-primary/40"
              >
                <div className="text-primary font-mono mb-2">{item.year}</div>
                <h3 className="text-xl font-serif font-semibold mb-2 text-text">
                  {item.event}
                </h3>
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
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

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
              Have a project in mind or just want to chat? Feel free to reach
              out!
            </p>

            <div className="space-y-4">
              <a
                href="mailto:rishitsura@gmail.com"
                className="flex items-center gap-3 text-text hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>rishitsura@gmail.com</span>
              </a>
              <a
                href="https://github.com/rishitsura"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/rishit-sura"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full md:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="bg-secondary/30 backdrop-blur-md rounded-2xl p-8 border border-primary/10
                            shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text/80 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-primary/20 
                                  text-text placeholder-text/50 focus:border-primary
                                  transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text/80 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-primary/20 
                                  text-text placeholder-text/50 focus:border-primary
                                  transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text/80 mb-2"
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-primary/20 
                                text-text placeholder-text/50 focus:border-primary focus:outline-none
                                transition-colors duration-300 resize-none appearance-none selection:bg-primary/20
                                focus:ring-0 focus:shadow-none relative z-10"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        WebkitAppearance: "none",
                      }}
                      placeholder="Enter your message..."
                    />
                    {/* Add an absolute background layer */}
                    <div className="absolute inset-0 bg-black/50 rounded-lg -z-0" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden bg-primary/90 
                                 text-black font-medium py-3 rounded-lg
                                 transition-all duration-300 ease-out
                                 hover:bg-primary/80 active:scale-[0.98]"
                >
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 
                                 via-white/10 to-primary/0 
                                 translate-x-[-100%] group-hover:translate-x-[100%] 
                                 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    aria-hidden="true"
                  />
                  <span
                    className="relative inline-flex items-center justify-center 
                                 w-full gap-2 text-sm tracking-wide"
                  >
                    Send Message
                    <svg
                      className="w-4 h-4 transition-transform duration-400 
                                  group-hover:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 8h14M8 1l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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

const MobileNavItem = ({ href, icon, label }) => (
  <a
    href={href}
    className="flex flex-col items-center gap-1 text-text hover:text-primary transition-colors
               px-1.5 py-1 rounded-full hover:bg-secondary/50"
  >
    {icon}
    <span className="text-[10px] font-medium opacity-80">{label}</span>
  </a>
);

MobileNavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string
};

const MobileNavigation = () => (
  <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-secondary/70 backdrop-blur-xl 
                  border border-red-500 px-4 py-2 md:hidden z-50 rounded-full">
    <div className="flex justify-around items-center gap-4">
      <MobileNavItem href="#home" icon={<Home className="w-4 h-4" />} label="Home" />
      <MobileNavItem href="#projects" icon={<Code2 className="w-4 h-4" />} label="Projects" />
      <MobileNavItem href="#timeline" icon={<Clock className="w-4 h-4" />} label="Journey" />
      <MobileNavItem href="#contact" icon={<Mail className="w-4 h-4" />} label="Contact" />
    </div>
  </nav>
);

const FloatingResumeButton = memo(({ onClick }) =>
  createPortal(
    <button
      onClick={onClick}
      className={`
        fixed z-[9999] pointer-events-auto backdrop-blur-sm transition-all duration-500 
        transform hover:scale-105 active:scale-95 border bg-red-500 text-black
        
        md:bottom-8 md:right-8 md:px-5 md:py-2.5 md:text-base md:rounded-lg 
        md:border-transparent md:hover:border-red-500
        md:flex md:flex-row md:items-center md:gap-2
        
        bottom-[72px] right-0 px-2 py-2.5 text-xs
        border-red-500/50 flex flex-col items-center justify-center gap-0.5
        rounded-l-full rounded-r-none min-w-[44px]
      `}
    >
      <FileText className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
      <span className="text-sm font-medium hidden md:inline">View Resume</span>
      <span className="font-medium text-[10px] md:hidden inline">Resume</span>
    </button>,
    document.body
  )
);

FloatingResumeButton.displayName = "FloatingResumeButton";
FloatingResumeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Portfolio = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Handle scroll progress for progress bar only
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mouse movement for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects = [
    {
      title: "OptiDeliver",
      description: "AI-powered delivery optimization system for India Post",
      tech: ["Python", "AI", "ML"],
      metrics: ["40% faster deliveries", "15% reduced fuel consumption"],
      icon: <Code2 className="w-6 h-6" />,
      repoLink:
        "https://github.com/rishitsura/Optideliver-AI-Powered-Delivery-Optimization-System",
    },
    {
      title: "Hate Speech Recognition",
      description: "ML-based tweet classification system",
      tech: ["Python", "NLP", "ML"],
      metrics: ["90% accuracy", "Advanced text preprocessing"],
      icon: <BrainCircuit className="w-6 h-6" />,
      repoLink: "https://github.com/rishitsura/Hate-Speech-Recognition-System",
    },
    {
      title: "Nextpad",
      description: "Creative writing sharing platform",
      tech: ["React.js", "Node.js", "MongoDB"],
      metrics: ["50% user engagement", "40% content submissions"],
      icon: <PenTool className="w-6 h-6" />,
      repoLink: "https://github.com/PPraneesh/NextPad",
    },
  ];

  // TechCloud section with proper isolation
  const TechCloudSection = useMemo(
    () => (
      <section className="relative isolate">
        <TechCloud />
      </section>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-black text-text">
      {/* Desktop Navigation */}
      <header className="hidden md:block">
        <div className="navbar-bg">
          <nav className="pill-navbar">
            <a href="#home" className="pill-link hover:text-primary">Home</a>
            <a href="#projects" className="pill-link hover:text-primary">Projects</a>
            <a href="#timeline" className="pill-link hover:text-primary">Journey</a>
            <a href="#contact" className="pill-link hover:text-primary">Contact</a>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Blur Effect */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none md:hidden z-40" />

      {/* Mobile Navigation */}
      <MobileNavigation />

      <FloatingResumeButton onClick={() => setShowResumeModal(true)} />

      {/* Interactive background effect */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${
            50 + mousePosition.x * 50
          }% ${50 + mousePosition.y * 50}%,rgb(69, 135, 233), transparent 30%)`,
        }}
      />

      <div
        className="fixed top-0 left-0 h-2 bg-gradient-to-r from-pink-500 via-yellow-400 via-blue-500 via-violet-600 to-pink-500 shadow-lg transition-transform duration-75 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 md:px-6 relative overflow-hidden"
      >
        {/* Mobile-only hero section */}
        <div className="md:hidden text-center space-y-6">
          <div className="flex flex-col items-center">
            <p className="text-xl text-text mb-1">Hey, I&apos;m</p>
            <span className="text-7xl font-bold bg-gradient-to-r from-red-600 via-yellow-400 via-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent bg-[size:200%_auto] animate-[flow_3s_linear_infinite]">
              Rishit Sura
            </span>
          </div>
          <h1 className="text-4xl font-serif font-bold mb-6 bg-primary bg-clip-text text-transparent">
            Tech Enthusiast & Developer
          </h1>
          <p className="text-xl text-text mb-8">
            SIH&apos;24 Finalist | Python | Machine Learning | Full Stack
          </p>
          <div className="w-full text-center">
            <p className="inline-flex items-center text-lg text-text">
              <Award className="w-8 h-8 text-yellow-400 animate-bounce pr-0" />
              GDGC Solution Challenge 2025 Winner
            </p>
          </div>
        </div>

        {/* Desktop-only hero section */}
        <div className="hidden md:block text-center space-y-12">
          <p className="text-2xl md:text-3xl text-text mb-2">
            {" "}
            Hey, I&apos;m{" "}
            <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-600 via-yellow-400 via-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent bg-[size:200%_auto] animate-[flow_3s_linear_infinite]">
              Rishit Sura
            </span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 md:mb-8 bg-primary bg-clip-text text-transparent">
            {" "}
            Tech Enthusiast & Developer
          </h1>
          <p className="text-2xl text-text mb-10 max-w-3xl mx-auto">
            {" "}
            SIH&apos;24 Finalist | Python | Machine Learning | Full Stack
          </p>
          <div className="flex items-center justify-center gap-8">
            <Award className="w-10 h-10 text-yellow-400 animate-bounce" />{" "}
            <p className="text-2xl text-text">
            GDGC Solution Challenge 2025 Winner
            </p>{" "}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="w-full md:w-3/5 space-y-6">
              <h2 className="text-4xl font-serif font-bold bg-primary bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-lg leading-relaxed text-text/90">
                Hey! I&apos;m Rishit Sura, and I&apos;m driven by an endless curiosity to
                explore and create. Whenever I come across something interesting
                in tech, I dive right in - whether it&apos;s a fascinating article
                about new AI developments or figuring out how an app works under
                the hood. This passion for understanding and building things led
                me straight into the world of technology. Now, as a Computer
                Science student focused on AI/ML, I&apos;m not just learning to code
                - I&apos;m bringing ideas to life through technology, turning my
                &quot;what if?&quot; moments into &quot;why not?&quot; realities.
              </p>
            </div>

            {/* Terminal Component */}
            <div className="w-full md:w-2/5">
              <div className="relative bg-black/90 rounded-xl border border-primary/20 overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border-b border-primary/20">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-sm text-gray-400">
                    terminal@portfolio
                  </span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="text-green-500">$ whoami</div>
                  <div className="ml-2 text-text/90">tech_enthusiast <span className="text-primary">&lt;and&gt;</span> sih24_finalist ~</div>
                  <div className="text-green-500 mt-2">$ awards</div>
                  <div className="ml-2 text-text/90">
                    <div>GDGC Solution Challenge 2025 Winner</div>
                  </div>
                  <div className="text-green-500 mt-2">$ skills --list</div>
                  <div className="ml-2 text-text/90">
                    <div>→ Python, JavaScript, React</div>
                    <div>→ Machine Learning</div>
                    <div>→ Full Stack Development</div>
                  </div>
                  <div className="text-green-500 mt-2">$ current --focus</div>
                  <div className="ml-2 text-text/90">
                    <div>→ AI/ML Development</div>
                    <div>→ Web Applications</div>
                  </div>
                  <div className="text-green-500 mt-2">$ interests</div>
                  <div className="ml-2 text-text/90">
                    <div>→ Problem Solving</div>
                    <div>→ Innovation</div>
                    <div>→ Continuous Learning</div>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500">$</span>
                    <span className="ml-2 w-2 h-4 bg-primary/50 animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Cloud Section */}
      {TechCloudSection}

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto space-y-16">
          <h2 className="text-4xl font-serif font-bold text-center bg-primary bg-clip-text text-transparent">
            {" "}
            {/* Reverted gradient classes */}
            Featured Projects
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
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
                © 2025 Built with ❤️ by{" "}
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
      {showResumeModal && (
        <ResumeViewer onClose={() => setShowResumeModal(false)} />
      )}
    </div>
  );
};

export default Portfolio;
