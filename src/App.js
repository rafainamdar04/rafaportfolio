import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import {
  SiJavascript, SiPython, SiCplusplus, SiReact, SiNodedotjs,
  SiExpress, SiMongodb, SiHtml5, SiCss3, SiTailwindcss, SiGithub, SiPostman
} from "react-icons/si";
import { FaCode, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Rafa Inamdar</p>
      <div className="footer-icons">
        <a href="https://www.linkedin.com/in/rafa-inamdar-477162247/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/rafainamdar04" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const projects = [
    { name: "FinSight", desc: "Personal finance tracker with analytics" },
    { name: "RSVP App", desc: "MERN stack RSVP event manager" },
    { name: "Habit Tracker", desc: "Track your habits with streak history" },
  ];

  const skillGroups = [
    {
      title: "Languages",
      skills: [
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "Python", icon: <SiPython /> },
        { name: "C++", icon: <SiCplusplus /> },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: <SiReact /> },
        { name: "HTML", icon: <SiHtml5 /> },
        { name: "CSS", icon: <SiCss3 /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <SiNodedotjs /> },
        { name: "Express", icon: <SiExpress /> },
      ],
    },
    {
      title: "Databases",
      skills: [{ name: "MongoDB", icon: <SiMongodb /> }],
    },
    {
      title: "Tools",
      skills: [
        { name: "GitHub", icon: <SiGithub /> },
        { name: "VS Code", icon: <FaCode /> },
        { name: "Postman", icon: <SiPostman /> },
      ],
    },
  ];

  const experiences = [
  {
    title: "Supercore Student Council – Lady Representative",
    date: "2024–25",
    desc: "Led the female student body and launched Voices, organizing events like the PCOS Awareness Seminar and Nexus Challenge. Coordinated across teams to drive inclusion, health awareness, and community participation on campus.",
  },
  {
    title: "Editorial Board – Joint Secretary",
    date: "2023–24",
    desc: "Oversaw editorial content, team operations, social media, and creative direction. Awarded Best Joint Secretary for excellence in leadership, coordination, and timely execution of council communications.",
  },
  {
    title: "Taqneeq Tech Fest – Publicity Subhead",
    date: "2022–23",
    desc: "Managed publicity campaigns and cross-functional communication for the college’s annual tech fest. Ensured cohesive branding across platforms by collaborating with tech, logistics, and design teams.",
  },
  {
    title: "Social Conclave – Social Media & Content Writing Head",
    date: "2024",
    desc: "Led all digital communications, writing, and creative strategy for a large-scale student-led event. Created compelling narratives that elevated the conclave's social impact and outreach.",
  },
  {
    title: "Social Conclave – Publicity Subhead",
    date: "2023",
    desc: "Handled promotions, brand positioning, and visual identity for the event. Worked closely with design and outreach to maximize student engagement and visibility.",
  },
  {
    title: "Sattva – Publicity Subhead",
    date: "2024",
    desc: "Directed publicity efforts for the cultural fest by unifying messaging across teams. Strengthened brand presence through targeted outreach and event storytelling.",
  },
  {
    title: "Sattva – Workshops Head",
    date: "2025",
    desc: "Planned and led a diverse lineup of workshops, managing scheduling, communications, and logistics. Delivered engaging learning experiences in partnership with external collaborators.",
  },
  {
    title: "Voices (Student Council Initiative) – Organizer",
    date: "2024–25",
    desc: "Organized the PCOS Awareness Seminar and the Nexus Challenge, building impactful, women-centric platforms. Facilitated inclusive conversations and collaborated with experts to educate and empower students.",
  },
  {
    title: "Open Spaces Community – Core Member",
    date: "2024–25",
    desc: "Contributed to the formation of a safe space for dialogue on identity, mental health, and gender issues. Played a key role in event planning, communications, and student mobilization.",
  },
  {
    title: "Jankidevi Public School – Head Girl",
    date: "2019–20",
    desc: "Led the student body during a pivotal academic year, representing students in administration and school events. Directed the prefect council and encouraged inclusive participation.",
  },
  {
    title: "Eklavya House – Captain",
    date: "2018–19",
    desc: "Managed house teams for academic, cultural, and sports events. Fostered a spirit of collaboration and competitive integrity.",
  },
  {
    title: "Eklavya House – Prefect",
    date: "2017–18",
    desc: "Supported student discipline and activity coordination within house teams. Assisted seniors in organizing house-led programs and initiatives.",
  },
  {
    title: "Frank Anthony Memorial Debate – Best Speaker",
    date: "2018",
    desc: "Recognized for excellence in public speaking, argumentation, and structured expression at the national level.",
  },
  {
    title: "Frank Anthony Memorial Debate – Best Speaker Runner-Up",
    date: "2019",
    desc: "Secured second place nationally for persuasive speaking and structured argument delivery.",
  },
  {
    title: "Times of India – Student Contributor",
    date: "2019–20",
    desc: "Featured in two articles highlighting leadership, initiative, and student voice. Shared insights on education, school culture, and personal growth.",
  },
];

const internships = [
  {
    title: "Spark-A-Change Foundation – Design & Communication Intern",
    date: "May–June 2023",
    desc: "Designed digital creatives for outreach and community awareness campaigns. Worked with volunteers and communications teams to deliver consistent and impactful messaging.",
  },
  {
    title: "Affinity Sky Designs – Design Intern",
    date: " July 2023",
    desc: "Contributed to branding projects by assisting with layout, design consistency, and visual storytelling. Collaborated across teams to align visuals with client and campaign objectives.",
  },
  {
    title: "Open to Internships – Full Stack Roles",
    date: "2025",
    desc: "Currently seeking Full Stack internships. Equipped with hands-on project experience and a versatile creative approach.",
  },
];

  return (
    <div className="dark-theme">
      <nav className="navbar">
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#internships">Internships</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section section" id="about" data-aos="fade-up">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-name">Rafa Inamdar</h1>
            <p className="hero-role">Full Stack Developer.</p>
          </div>
          <div className="hero-right">
            <p className="section-text">
              I'm Rafa Inamdar, a final-year Computer Engineering student at NMIMS MPSTME with a passion for building tech that solves real problems.<br /><br />
              Whether it's full stack web development or exploring data science, I enjoy turning complex ideas into intuitive, impactful solutions.<br /><br />
              Beyond the code, I'm a strong communicator, a fast learner, and a natural collaborator—with experience leading teams, managing events, and contributing to social impact initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section" data-aos="fade-up">
        <h2 className="section-title">Skills</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <div key={i} className="content-card">
              <h3>{group.title}</h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, idx) => (
                  <div key={idx} className="skill-badge" data-aos="zoom-in" data-aos-delay={idx * 100}>
                    <span className="text-lg">{skill.icon}</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section" data-aos="fade-up">
        <h2 className="section-title">Projects</h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <div key={index} className="content-card" data-aos="zoom-in">
              <h3 className="project-title">{project.name}</h3>
              <p className="text-gray-300 mt-2">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="vertical-timeline section" data-aos="fade-up">
        <h2 className="section-title">Experience & Leadership</h2>
        <div className="timeline-container">
          {experiences.map((item, idx) => (
            <div className="content-card timeline-entry" key={idx}>
              <div className="timeline-text">
                <h4 className="timeline-title">{item.title}</h4>
                <span className="timeline-date">{item.date}</span>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internships */}
      <section id="internships" className="vertical-timeline section" data-aos="fade-up">
        <h2 className="section-title">Internships</h2>
        <div className="timeline-container">
          {internships.map((item, idx) => (
            <div className="content-card timeline-entry" key={idx}>
              <div className="timeline-text">
                <h4 className="timeline-title">{item.title}</h4>
                <span className="timeline-date">{item.date}</span>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
