import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Aurora from './components/Aurora';
import { useEffect, useState } from 'react';
import {
  SiJavascript, SiPython, SiHtml5, SiCss3, SiMongodb, SiPostman, SiReact,
  SiNodedotjs, SiExpress, SiTailwindcss, SiGithub, SiBootstrap, SiJupyter,
  SiNumpy, SiScikitlearn, SiPandas, SiPostgresql, SiStreamlit, SiMysql
} from "react-icons/si";
import {  FaPinterest, FaCode, FaLinkedin, FaGithub, FaExternalLinkAlt, FaSun, FaMoon, FaTerminal, FaDatabase } from "react-icons/fa";

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <p>© {new Date().getFullYear()} Rafa Inamdar</p>
      <p className="footer-email">rafainamdar2@gmail.com</p>
      <div className="footer-icons">
        <a href="https://www.linkedin.com/in/rafa-inamdar-477162247/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/rafainamdar04" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://in.pinterest.com/rafainamdar2/" target="_blank" rel="noopener noreferrer">
          <FaPinterest />
        </a>
      </div>
    </footer>
  );
}

function App() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    document.body.className = dark ? 'dark-theme' : 'light-theme';
  }, [dark]);

  const toggleTheme = () => setDark(!dark);

  const projects = [
  {
    name: "MERN Modular Auth App",
    desc: "A full-stack MERN authentication app with JWT, protected routes, Bootstrap 5 UI, reusable components, and dark/light mode.",
    github: "https://github.com/rafainamdar04/AuthApp",
    stack: ["MongoDB Atlas", "Express", "React", "Node.js"]
  },
  {
    name: "Big Data Exploration with Pandas, Dask & Polars",
    desc: "Benchmarked performance on the NYC Taxi dataset using Pandas, Dask, Polars, PyArrow, and Numba. Focused on memory use and computation speed with Parquet files.",
    github: "https://github.com/rafainamdar04/big_data_exploration",
    live: "",
    stack: ["Python", "Pandas", "Dask", "Polars", "PyArrow"]
  },
  {
    name: "Dice Game",
    desc: "A simple 2-player dice game using HTML, CSS, and JavaScript. Each page refresh rolls dice and declares a winner or draw.",
    github: "https://github.com/rafainamdar04/dice-game",
    live: "",
    stack: ["HTML", "CSS", "JavaScript"]
  },
  {
    name: "React Counter App",
    desc: "A basic React app with increment/decrement functionality and confetti animation every 10 counts. Mobile-friendly design.",
    github: "https://github.com/rafainamdar04/counterApp",
    live: "https://rafainamdar04.github.io/counterApp/",
    stack: ["React", "CSS"]
  },
  {
    name: "Customer Churn Prediction",
    desc: "Built ML models to predict telecom customer churn with a Streamlit dashboard for visualization and result interpretation.",
    github: "https://github.com/rafainamdar04/customerChurnPrediction",
    live: "",
    stack: ["Python", "Pandas", "Scikit-Learn", "Streamlit"]
  },
  {
    name: "Sleep Disorder Detection",
    desc: "Used KNN, SVM, and Logistic Regression to predict sleep disorders. Includes evaluation metrics and performance visualization. Supported project using a reserach paper",
    github: "https://github.com/rafainamdar04/mlProject",
    live: "",
    stack: ["Python", "Scikit-Learn", "Seaborn", "Pandas"]
  },
  {
    name: "Netflix Data Analysis",
    desc: "Exploratory data analysis of Netflix titles to uncover trends in genre, release year, and country using Python libraries.",
    github: "https://github.com/rafainamdar04/netflix-analysis",
    live: "",
    stack: ["Python", "Pandas", "Matplotlib", "Plotly", "Seaborn"]
  },
  {
    name: "DDoS Attacks & Defense Survey",
    desc: "A comprehensive research paper analyzing the evolution, taxonomy, and defense mechanisms of DDoS attacks with a focus on cloud, SDN, and IoT. Highlights AI/ML-based mitigation trends and future research directions.",
    github: "", // Add link if available
    live: "",
    stack: ["Research", "Survey", "Security"]
  }
];

const skillGroups = [
  {
    title: "Languages & Scripting",
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss3 /> },
      { name: "SQL", icon: <SiMysql /> },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "DOM Manipulation", icon: <FaCode /> },
      { name: "Responsive UI", icon: <FaCode /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "RESTful APIs", icon: <FaCode /> },
      { name: "JWT Authentication", icon: <FaCode /> },
      { name: "Mongoose", icon: <FaDatabase /> },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MongoDB Atlas", icon: <SiMongodb /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
  },
  {
    title: "Deployment & Tools",
    skills: [
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "VS Code", icon: <FaCode /> },
      { name: "Render", icon: <FaExternalLinkAlt /> },
      { name: "Vercel", icon: <FaExternalLinkAlt /> },
      { name: "Bash", icon: <FaTerminal /> },
    ],
  },
  {
    title: "Machine Learning & Data Science",
    skills: [
      { name: "Pandas", icon: <SiPandas /> },
      { name: "NumPy", icon: <SiNumpy /> },
      { name: "Scikit-Learn", icon: <SiScikitlearn /> },
      { name: "Matplotlib", icon: <SiPython /> },
      { name: "Seaborn", icon: <SiPython /> },
      { name: "Jupyter", icon: <SiJupyter /> },
    ],
  },
  {
    title: "Other Tools & Platforms",
    skills: [
      { name: "Streamlit", icon: <SiStreamlit /> },
      { name: "n8n", icon: <FaCode /> },
      { name: "LangChain", icon: <FaCode /> },
    ],
  },
];


  const experiences = [
    {
      title: "Lady Representative, Student Council",
      date: "2024–25",
      desc: "Represented the female student body, resolved campus grievances, and led inclusivity initiatives. Launched the Voices podcast discussing PCOS and gender awareness.Organized Venture Nexus, a female-centric startup pitch event with wide participation."
    },
    {
      title: "Head – Sattva Workshops",
      date: "2024–25",
      desc: "As Head of Sattva Workshops, my team and I organized hands-on student workshops focused on creativity and skills development. I curated engaging learning sessions and coordinated with teams to ensure effective participation, while also handling publicity to draw attention to each event."
    },
    {
      title: "Joint Secretary – Editorial Board",
      date: "2023–24",
      desc: "As Joint Secretary, I led the publicity efforts and content and creative direction of the committee, for which I was awarded Best Joint Secretary. During my tenure i helped organized flagship events like 'Blind Date with a Book' and 'The Editorial Project', a Literary Arts Festival featuring an Open Mic Night and Comic-Con, and oversaw end-to-end workflows for the team."
    },
    {
      title: "Head – Social Media & Content, Social Conclave",
      date: "2023–24",
      desc: "I led the content strategy for Social Conclave, completely revamping the event’s Instagram and LinkedIn presence. I designed a fresh visual identity, managed marketing campaigns, and created compelling content to amplify awareness about key social issues."
    },
    {
      title: "Publicity Subhead – Sattva Cultural Fest",
      date: "2023–24",
      desc: "As a Publicity Subhead, I led my team and worked to expand reach and visibility. Our efforts helped bring in significant engagement by communicating the event’s mission effectively."
    },
    {
      title: "Publicity Subhead – Taqneeq Tech Fest",
      date: "2022–23",
      desc: "Organised efforts to publicize MPSTME'S flagship tech fest, Taqneeq’s workshops and the Cyber Cypher hackathon, which saw over 300 participants. My responsibilities included campus outreach to ensure maximum participation and buzz."
    },
    {
      title: "Publicity Subhead – Social Conclave",
      date: "2022–23",
      desc: "Managed publicity strategies and organised outreach efforts for Social Conclave Conference, boosting engagement and visibility across platforms."
    },
    {
      title: "Executive – Editorial Board",
      date: "2022–23",
      desc: "In my first year as an Editorial Board Executive, I learned social media publicity, creative writing, and content design. I contributed to event promotions and built a strong foundation in team collaboration, laying the groundwork for my future leadership roles."
    },
    {
      title: "Content Executive – IETE Student Chapter",
      date: "2022–23",
      desc: "Wrote promotional content and managed communication for events."
    }
  ];

  const internships = [
    {
      title: "Design & Communication Intern – Spark-A-Change Foundation",
      date: "May–June 2023",
      desc: "Designed creatives for social media and supported youth empowerment campaigns. I worked closely with the content and outreach teams to deliver impactful digital content aligned with the foundation’s mission."
    },
    {
      title: "Design Intern – Affinity Sky Designs",
      date: "July 2023",
      desc: "Created graphics for digital campaigns, maintained design consistency, and contributed to branding and storytelling. Ensured that visual content aligned with marketing goals and brand identity."
    },
    {
      title: "Open to Internships – Full Stack Roles",
      date: "2025",
      desc: "Seeking hands-on experience in MERN stack. Proficient in React, Node.js, MongoDB, and deployment workflows like Render/Vercel."
    }
  ];
  const certifications = [
  {
    title: "The Complete 2025 Web Development Bootcamp – Angela Yu",
    date: "June 2025",
    desc: "Completed full stack development course covering HTML, CSS, JS, Node, MongoDB, APIs, and deployment.",
    link: "/certificates/webdev-certificate.pdf"
  },
  {
    title: "IBM Data Science Fundamentals – Coursera",
    date: "May 2025",
    desc: "Learned Python, data wrangling, Jupyter, and foundational machine learning with IBM tools.",
    link: "/certificates/ibm-ds.jpeg"
  }
];

  return (
    <div className={dark ? "dark-theme" : "light-theme"}>
      <nav className="navbar">
        <div className="navbar-container">
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#certifications">Certifications</a>
          <a href="#experience">Experience</a>
          <a href="#internships">Internships</a>
        </div>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {dark ? <FaSun /> : <FaMoon />}
        </button>
    
      </nav>
      <section className="hero-section section" id="about" data-aos="fade-up">
  <Aurora
    colorStops={["#FFD1FF", "#D9ACF5", "#A076F9"]}
    blend={0.5}
    amplitude={1.0}
    speed={0.5}
  />
  <div className="hero-content">
    <div className="hero-left">
      <h1 className="hero-name">Rafa Inamdar</h1>
      <p className="hero-role">Full Stack Developer</p>
    </div>
    <div className="hero-right">
      <p className="section-text">
        Hi, I’m Rafa — a final-year Computer Engineering student who enjoys building clean, useful, and user-focused tech. I like working on projects that bring ideas to life, whether it’s a web app, a small ML model, or something in between. I’ve also been involved in student-led initiatives and events that let me collaborate, lead, and learn outside the classroom. I’m always looking to pick up new skills, explore unfamiliar tools, and take on challenges that push me to grow. Right now, I’m focusing on full-stack development with the MERN stack, brushing up on DSA, and preparing for software engineering roles. I’m here to learn, build, and improve — one project at a time.
      </p>
    </div>
  </div>
</section>



      <section id="skills" className="section" data-aos="fade-up">
        <h2 className="section-title">Skills</h2>
        {skillGroups.map((group, i) => (
          <div key={i} className="content-card">
            <h3>{group.title}</h3>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, idx) => (
                <div key={idx} className="skill-badge" data-aos="zoom-in">
                  {skill.icon} {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="projects" className="section" data-aos="fade-up">
        <h2 className="section-title">Projects</h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <div key={index} className="content-card" data-aos="zoom-in">
              <h3 className="project-title">{project.name}</h3>
              <p>{project.desc}</p>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noreferrer" title="GitHub">
                  <FaGithub />
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" title="Live">
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
              <div className="project-tags">
                {project.stack.map((tech, i) => (
                  <span key={i} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="certifications" className="section" data-aos="fade-up">
  <h2 className="section-title">Certifications</h2>
  <div className="timeline-container">
    {certifications.map((item, idx) => (
      <div className="timeline-entry" key={idx}>
        <div className="timeline-text">
          <h4 className="timeline-title">
            {item.title}
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" className="certificate-link">
                <FaExternalLinkAlt style={{ marginLeft: "8px" }} />
              </a>
            )}
          </h4>
          <span className="timeline-date">{item.date}</span>
          <p className="timeline-desc">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>

      <section id="experience" className="section" data-aos="fade-up">
        <h2 className="section-title">Experience & Leadership</h2>
        <div className="timeline-container">
          {experiences.map((item, idx) => (
            <div className="timeline-entry" key={idx}>
              <div className="timeline-text">
                <h4 className="timeline-title">{item.title}</h4>
                <span className="timeline-date">{item.date}</span>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="internships" className="section" data-aos="fade-up">
        <h2 className="section-title">Internships</h2>
        <div className="timeline-container">
          {internships.map((item, idx) => (
            <div className="timeline-entry" key={idx}>
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
