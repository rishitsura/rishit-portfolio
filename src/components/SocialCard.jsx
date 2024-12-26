import './SocialCard.css';
import { Github, Linkedin, Mail } from 'lucide-react';

const SocialCard = () => {
  return (
    <div className="card">
      <div className="background" />
      <div className="logo">Socials</div>

      <a href="https://github.com/rishitsura" target="_blank" rel="noopener noreferrer">
        <div className="box box1">
          <span className="icon">
            <Github className="svg" />
          </span>
        </div>
      </a>

      <a href="https://linkedin.com/in/rishit-sura" target="_blank" rel="noopener noreferrer">
        <div className="box box2">
          <span className="icon">
            <Linkedin className="svg" />
          </span>
        </div>
      </a>

      <a href="mailto:rishitsura@gmail.com">
        <div className="box box3">
          <span className="icon">
            <Mail className="svg" />
          </span>
        </div>
      </a>

      <div className="box box4" />
    </div>
  );
};

export default SocialCard;
