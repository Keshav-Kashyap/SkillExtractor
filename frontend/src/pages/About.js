import React from 'react';

const TeamMemberCard = ({ photo, name, github, linkedin, role }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-transform duration-300">
      <img
        src={photo}
        alt={name}
        className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-indigo-200 shadow-sm"
      />
      <h3 className="text-xl font-semibold text-indigo-900 mb-1">{name}</h3>
      <p className="text-indigo-700 font-medium mb-3">{role}</p>
      <div className="flex space-x-4 mt-3">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub profile of ${name}`}
          className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          GitHub
        </a>
        <a
          href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn profile of ${name}`}
          className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

const team = [
  {
    name: 'Abhishek Shakya',
    photo: '/images/i1.jpg',
    github: 'https://github.com/CrackCode63',
    linkedin: 'https://www.linkedin.com/in/abhishakya/',
    role: 'Admin',
  },
  {
    name: 'Karan Veer Pal',
    photo: '/images/i2.jpg',
    github: 'https://github.com/Karan-Veer-Pal',
    linkedin: 'https://www.linkedin.com/in/karan-veer-pal/',
    role: 'Team Member',
  },
  {
    name: 'Keshav Kashyap',
    photo: '/images/i3.jpg',
    github: 'https://github.com/Keshav-Kashyap',
    linkedin: 'https://www.linkedin.com/in/keshav-kashyap-660a23309',
    role: 'Team Member',
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-indigo-100 to-blue-200 flex flex-col items-center py-16 px-4 sm:px-6">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-10 border border-white/40 mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-900 mb-6 text-center">TriCode</h1>
        <h2 className="text-4xl font-bold text-indigo-900 mb-10 text-center">About Us</h2>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-800">Our Mission</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to simplify the process of resume skill extraction, helping job seekers
            showcase their abilities clearly and accurately. We strive to provide a fast, reliable,
            and user-friendly tool that saves time and effort.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-800">Our Team</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Meet our passionate group of developers and designers dedicated to making career tools
            accessible and efficient.
          </p>
        </section>
      </div>

      <h2 className="text-3xl font-semibold text-indigo-900 mb-8">Our Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
        {team.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
