import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { UploadCloud, Loader2 } from 'lucide-react';

function UploadForm({ setSkills, fileInputRef }) {
  const [file, setFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!file) {
      setPdfPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPdfPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload/", formData);
      setSkills(response.data.skills);
      navigate("/skills");
    } catch (err) {
      console.error("Upload mein dikkat aa gayi", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
      <div
        className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragOver ? 'bg-blue-100 border-blue-400' : 'bg-white/50 border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <UploadCloud className="mx-auto text-blue-600" size={48} />
        <p className="text-gray-700 mt-4">Drag & Drop your resume here</p>
        <p className="text-gray-500 mb-2">OR</p>

        <label className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg cursor-pointer transition duration-200">
          Browse Files
          <input
            type="file"
            id="resume-upload"
            accept=".pdf"
            className="hidden"
            ref={fileInputRef} // ✅ This enables the external trigger from Home.jsx
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && (
          <div className="mt-4 text-sm text-gray-800 font-medium">
            Selected File: {file.name}
          </div>
        )}
      </div>

      {pdfPreview && (
        <div className="w-full border rounded-lg overflow-hidden shadow">
          <embed src={pdfPreview} type="application/pdf" width="100%" height="400px" />
        </div>
      )}

      <button
        type="submit"
        disabled={!file || loading}
        className={`w-full py-2 rounded-lg font-semibold text-white transition duration-200 flex items-center justify-center ${
          file && !loading
            ? "bg-green-600 hover:bg-green-700"
            : "bg-green-300 cursor-not-allowed"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Uploading...
          </>
        ) : (
          'Extract Skills'
        )}
      </button>
    </form>
  );
}

UploadForm.propTypes = {
  setSkills: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
};

export default UploadForm;
