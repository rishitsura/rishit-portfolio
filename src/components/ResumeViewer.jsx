import { X, Download } from 'lucide-react';
import { useState } from 'react';

const ResumeViewer = ({ onClose }) => {
  const resumePath = '/Rishit_Sura_Resume.pdf';
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 
                 animate-[fadeIn_0.3s_ease-out]"
    >
      {/* Dark overlay with blur */}
      <div 
        className="fixed inset-0 bg-black/0 backdrop-blur-0 transition-all duration-300"
        onClick={onClose}
        style={{
          animation: 'overlayShow 0.3s ease forwards',
        }}
      />
      
      {/* PDF viewer container */}
      <div 
        className="relative w-full max-w-5xl h-[90vh] bg-white rounded-xl shadow-2xl 
                   overflow-hidden opacity-0 scale-95 transition-all duration-300"
        style={{
          animation: 'modalShow 0.4s ease forwards',
        }}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gray-900 flex items-center 
                      justify-between px-4 z-10 opacity-0 translate-y-[-20px]"
             style={{
               animation: 'slideDown 0.3s ease forwards 0.2s',
             }}>
          <div className="flex items-center gap-2">
            <a
              href={resumePath}
              download="Rishit_Sura_Resume.pdf"
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 
                       rounded-md transition-colors text-white text-sm group"
            >
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Download</span>
            </a>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 
                     rounded-lg transition-all hover:rotate-90 duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-600 
                          rounded-full animate-spin" />
          </div>
        )}

        {/* PDF Viewer */}
        <iframe
          src={`${resumePath}#toolbar=0`}
          className={`w-full h-full pt-12 transition-opacity duration-300 
                     ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          title="Resume PDF"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <style jsx global>{`
        @keyframes overlayShow {
          from { background-color: rgba(0, 0, 0, 0); backdrop-filter: blur(0px); }
          to { background-color: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); }
        }

        @keyframes modalShow {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ResumeViewer;
