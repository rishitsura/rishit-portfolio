import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Code2, PenTool, BrainCircuit, Award } from 'lucide-react';
import NeuralBackground from './components/NeuralBackground';
import ProjectCard from './components/ProjectCard';
import ResumeViewer from './components/ResumeViewer';
import { createPortal } from 'react-dom';
import './styles/Timeline.css';

const timelineItems = [
  {
    year: "2022",
    event: "Started B.Tech in CSE (AIML)",
    description: "Began my journey in Computer Science with specialization in AI & ML at SRMIST"
  },
  {
    year: "2023",
    event: "First Research Project",
    description: "Developed AI-powered delivery optimization system for India Post, reducing delivery times by 40%"
  },
  {
    year: "2024 Jan",
    event: "SIH Finalist (Top 2.4%)",
    description: "Led team to finals in Smart India Hackathon, competing among 13,000+ participants"
  },
  {
    year: "2024 Feb",
    event: "Data Science Intern",
    description: "Joined IBM SkillsBuild for hands-on experience in data analysis and visualization"
  }
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
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
        My Journey
      </h2>
      
      <div className="absolute left-[50%] top-32 bottom-0 w-0.5 bg-blue-500/30" />

      <div className="relative">
        {timelineItems.map((item, index) => (
          <div
            key={index}
            className="timeline-item relative flex items-center gap-8 mb-16 
              opacity-0 translate-y-10 transition-all duration-700 ease-out"
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'ml-auto pl-8'}`}>
              <div className="p-6 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-xl 
                              transition-transform duration-300 hover:scale-105 hover:bg-gray-700/80 
                              border border-blue-500/20 hover:border-blue-500/40">
                <div className="text-blue-400 font-mono mb-2">{item.year}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.event}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
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

  const FloatingResumeButton = () => (
    createPortal(
      <button
        onClick={() => setShowResumeModal(true)}
        className="fixed bottom-8 right-8 z-[9999] pointer-events-auto 
                   bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg shadow-lg flex
                   items-center gap-2 border border-white/10 backdrop-blur-sm
                   transition-all duration-300 hover:scale-105 hover:shadow-blue-500/25"
      >
        <span className="text-sm font-medium">View Resume</span>
      </button>,
      document.body
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <FloatingResumeButton />
      <NeuralBackground />
      
      {/* Interactive background effect */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(59, 130, 246, 0.5), transparent 50%)`
        }}
      />

      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-500 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full bg-opacity-90 bg-gray-900 backdrop-blur-sm z-40">
        <nav className="max-w-6xl mx-auto py-4 px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Rishit Sura
          </h1>
          <div className="flex gap-4">
            <a href="https://github.com/rishitsura" 
               target="_blank" 
               rel="noopener noreferrer">
              <Github className="w-6 h-6 hover:text-blue-400 transition-colors" />
            </a>
            <a href="https://linkedin.com/in/rishit-sura" 
               target="_blank" 
               rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 hover:text-blue-400 transition-colors" />
            </a>
            <a href="mailto:rishitsura@gmail.com">
              <Mail className="w-6 h-6 hover:text-blue-400 transition-colors" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-16 relative overflow-hidden">
        <div 
          className="text-center"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Tech Enthusiast & Developer
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            SIH&apos;24 Finalist | Python | Machine Learning | Full Stack
          </p>
          <div className="flex gap-4 justify-center">
            <Award className="w-8 h-8 text-yellow-400 animate-bounce" />
            <p className="text-lg text-gray-300">Top 2.4% among 13,000+ participants</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 relative">
        <div 
          className="max-w-6xl mx-auto space-y-16"
          style={{ transform: `translateY(${(scrollY - 800) * 0.1}px)` }}
        >
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
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
      <Timeline />

      {/* Experience Section */}
      <section className="py-20 px-6 bg-gray-900 bg-opacity-50 relative">
        <div 
          className="max-w-6xl mx-auto"
          style={{ transform: `translateY(${(scrollY - 1600) * 0.1}px)` }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-blue-500/20">
            <h3 className="text-xl font-semibold">Data Science Intern</h3>
            <p className="text-blue-400">IBM SkillsBuild and CSRBOX</p>
            <p className="text-gray-300 mt-4">
              Analyzed complex datasets using R, creating visualizations that increased actionable insights by 30% 
              and improved decision-making processes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-center">
        <p className="text-gray-400">
          © 2024 Rishit Sura. Built with React and Tailwind CSS.
        </p>
      </footer>

      {/* Resume Modal */}
      {showResumeModal && <ResumeViewer onClose={() => setShowResumeModal(false)} />}
    </div>
  );
};

export default Portfolio;