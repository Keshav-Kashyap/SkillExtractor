import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import UploadForm from '../components/UploadForm';

const Home = ({ skills, setSkills }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-blue-200 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Resume Skill Extractor</h1>
        <p className="text-gray-600 text-lg">
          Upload your resume in PDF format and let our tool analyze and extract your skills automatically.
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto bg-white/60 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/40">
        <UploadForm setSkills={setSkills} fileInputRef={fileInputRef} />
      </div>

      {/* Bottom Upload Resume Button */}
      <div className="mt-10">
        <button
          onClick={handleUploadClick}
          aria-label="Upload Resume or CV"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300"
        >
          Upload Resume / CV
        </button>
      </div>
    </div>
  );
};

Home.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string),
  setSkills: PropTypes.func.isRequired,
};

export default Home;
