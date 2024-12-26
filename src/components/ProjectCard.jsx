import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    // Added hover tilt and relative container
    <div 
      className="group relative w-full min-h-[320px] overflow-hidden 
                 transition-transform duration-500 
                 hover:rotate-x-6 hover:scale-[0.95] 
                 perspective" 
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Main card content */}
      <div 
        className="absolute inset-0 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl 
                   border border-blue-500/10 hover:border-blue-500/30 
                   hover:shadow-xl hover:shadow-blue-500/5 
                   transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 
                        opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              {project.icon}
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
          </div>
          
          <p className="text-gray-300 mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full
                  border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-2 text-green-400/80 text-sm">
                <ChevronRight className="w-4 h-4" />
                <span>{metric}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Show Source Code button slides up from bottom */}
        <a 
          href={project.repoLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute left-1/2 -translate-x-1/2 bottom-[-3rem] px-4 py-2 
                     bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                     transition-all duration-500 group-hover:bottom-4"
        >
          Show Source Code
        </a>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    metrics: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.node.isRequired,
    repoLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectCard;
