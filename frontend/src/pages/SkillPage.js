// pages/SkillPage.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';

const categorizeSkills = (skills) => {
  const categories = {
    Frontend: [],
    Backend: [],
    Database: [],
    DevOps: [],
    Languages: [],
    Others: [],
  };

  skills.forEach(skill => {
    const s = skill.toLowerCase();

    if (['html', 'css', 'javascript', 'react', 'vue'].includes(s)) {
      categories.Frontend.push(skill);
    } else if (['nodejs', 'express', 'django', 'flask'].includes(s)) {
      categories.Backend.push(skill);
    } else if (['mysql', 'mongodb', 'postgresql'].includes(s)) {
      categories.Database.push(skill);
    } else if (['docker', 'aws', 'ci/cd', 'jenkins'].includes(s)) {
      categories.DevOps.push(skill);
    } else if (['java', 'c++', 'python', 'c#', 'ruby', 'golang'].includes(s)) {
      categories.Languages.push(skill);
    } else {
      categories.Others.push(skill);
    }
  });

  return categories;
};

const SkillCard = ({ title, skills }) => (
  <div className="bg-white/40 backdrop-blur-md shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 border border-white/30">
    <h2 className="text-xl font-semibold mb-4 text-center border-b border-white/50 pb-2">{title}</h2>
    <div className="flex flex-wrap justify-center gap-3">
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className="bg-white/30 text-gray-900 px-4 py-1 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

SkillCard.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const SkillPage = ({ skills }) => {
  const navigate = useNavigate();
  const sections = categorizeSkills(skills);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Extracted Skills', 14, 22);

    let y = 35;
    Object.entries(sections).forEach(([category, items]) => {
      if (items.length > 0) {
        doc.setFontSize(14);
        doc.text(category, 14, y);
        y += 8;

        doc.setFontSize(12);
        items.forEach(skill => {
          doc.text(`- ${skill}`, 18, y);
          y += 7;
          if (y > 280) {
            // Add footer before page break
            doc.setFontSize(10);
            doc.text(`Page ${doc.getNumberOfPages()}`, 180, 290);
            
            doc.addPage();
            y = 20;
          }
        });
        y += 10;
      }
    });

    // Add footer on last page
    doc.setFontSize(10);
    doc.text(`Page ${doc.getNumberOfPages()}`, 180, y > 280 ? 20 : 290);

    doc.save('extracted_skills.pdf');
  };

  const noSkillsFound = Object.values(sections).every(arr => arr.length === 0);

  return (
    <div className="min-h-screen w-full p-10 bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 drop-shadow-md">
        Your Extracted Skills
      </h1>

      {noSkillsFound ? (
        <p className="text-center text-gray-700 text-lg">
          No skills extracted. Please upload your resume.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mb-12">
          {Object.entries(sections).map(([category, items]) =>
            items.length > 0 && <SkillCard key={category} title={category} skills={items} />
          )}
        </div>
      )}

      <div className="flex gap-8">
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-xl text-gray-900 font-semibold hover:bg-white/50 hover:scale-105 transition-transform duration-300 shadow-md"
        >
          Upload Resume
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={noSkillsFound}
          className={`px-8 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-xl text-gray-900 font-semibold hover:bg-white/50 hover:scale-105 transition-transform duration-300 shadow-md ${
            noSkillsFound ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

SkillPage.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillPage;
