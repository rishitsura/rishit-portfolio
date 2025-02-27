import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { FaGraduationCap, FaBriefcase, FaAward, FaCode } from "react-icons/fa";

const TimelineItem = ({ item, isMobile, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case "education":
        return <FaGraduationCap className="w-4 h-4" />;
      case "work":
        return <FaBriefcase className="w-4 h-4" />;
      case "award":
        return <FaAward className="w-4 h-4" />;
      case "project":
        return <FaCode className="w-4 h-4" />;
      default:
        return <FaBriefcase className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`timeline-item ${isMobile ? "mobile" : ""} ${
        isVisible ? "show" : ""
      }`}
      onClick={() => isMobile && setIsExpanded(!isExpanded)}
    >
      <div className="timeline-marker">
        <div className="timeline-dot">{getIcon(item.type)}</div>
      </div>
      <div className={`timeline-content ${isExpanded ? "expanded" : ""}`}>
        <div className="timeline-year">{item.year}</div>
        <h3 className="timeline-title">{item.event}</h3>
        <p className="timeline-description">{item.description}</p>
        {isMobile && !isExpanded && (
          <div className="tap-hint">Tap to read more</div>
        )}
      </div>
    </div>
  );
};

TimelineItem.propTypes = {
  item: PropTypes.shape({
    year: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

const Timeline = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleItems, setVisibleItems] = useState({});
  const timelineRef = useRef();

  const timelineData = [
    {
      year: "2022",
      event: "Started B.Tech in CSE (AIML)",
      description:
        "Began my journey in Computer Science with specialization in AI & ML at VNRVJIET, Hyderabad",
      type: "education",
    },
    {
      year: "2023",
      event: "First Project",
      description:
        "Designed and engineered a responsive Task Manager web application using HTML, CSS, and JavaScript",
      type: "project",
    },
    {
      year: "2023",
      event: "Hackathons",
      description:
        "Participated in many Hackathons such as SIH'23, GDSC Solution Challenge and developed projects in AI, ML, and Full Stack",
      type: "project",
    },
    {
      year: "2024 Feb",
      event: "Data Science Intern",
      description:
        "Joined IBM SkillsBuild and CSRBOX for hands-on experience in data analysis and visualization",
      type: "work",
    },
    {
      year: "2024 Dec",
      event: "Smart India Hackathon 2024 Finalist",
      description:
        "Developed AI-powered delivery optimization system for India Post, reducing delivery times by 40%",
      type: "award",
    },
    {
      year: "2025 Feb",
      event: "GDGC Solution Challenge 2025 Winner",
      description:
        "Developed SportAI using RAG, ML, OpenCV and Flutter, enhancing athlete performance tracking by 50%",
      type: "award",
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = timelineRef.current.querySelectorAll(".timeline-item");
    elements.forEach((el, index) => {
      el.setAttribute("data-id", index);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-20">
      <motion.div variants={textVariant()}>
        <p className="text-secondary text-[17px] max-w-3xl leading-[30px]">
          My Journey So Far
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Timeline.
        </h2>
      </motion.div>

      <div className="timeline-container" ref={timelineRef}>
        {timelineData.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            isMobile={isMobile}
            isVisible={visibleItems[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Timeline, "timeline");
