import React from "react";
import { useNavigate } from "react-router-dom";

function SkillsDisplay({ skills }) {
  const navigate = useNavigate();

  if (!skills || skills.length === 0) {
    return (
      <div className="text-center mt-6 text-gray-600 font-medium">
        No skills extracted yet.
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Extracted Skills</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full border border-blue-300"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")} // "/" ko change kar sakte hain agar alag route hai home ka
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        Back to Upload
      </button>
    </div>
  );
}

export default SkillsDisplay;
