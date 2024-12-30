import PropTypes from 'prop-types';
import { ChevronRight, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div 
      className="group relative w-full min-h-[320px] overflow-hidden 
                 transition-transform duration-500 
                 hover:rotate-x-6 hover:scale-[0.95] 
                 perspective" 
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        className="absolute inset-0 p-6 bg-secondary/50 backdrop-blur-sm rounded-xl 
                   border border-primary/10 hover:border-primary/30 
                   hover:shadow-xl hover:shadow-primary/5 
                   transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 
                        opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {project.icon}
            </div>
            <h3 className="text-xl font-semibold text-text group-hover:text-primary transition-colors">
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
                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full
                  border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-2 text-text/80 text-sm">
                <ChevronRight className="w-4 h-4" />
                <span>{metric}</span>
              </div>
            ))}
          </div>
        </div>

        <a 
          href={project.repoLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute left-1/2 -translate-x-1/2 bottom-0 px-4 py-2 
                     bg-primary hover:bg-black text-black hover:text-primary rounded-lg 
                     transition-all duration-500 opacity-0 translate-y-full
                     group-hover:opacity-100 group-hover:translate-y-[-1rem]
                     flex items-center gap-2 whitespace-nowrap
                     border border-transparent hover:border-primary"
        >
          <Github className="w-4 h-4" />
          <span>Show Source Code</span>
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
