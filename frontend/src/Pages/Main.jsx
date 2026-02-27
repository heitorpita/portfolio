import styles from "./styles.module.css";
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import resume from "../assets/HeitorPitaResume.pdf";
import codigoIcon from "../assets/codigo.png";
import linuxBadge from "../assets/linuxessentials.png";

function Main() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.hero}>
        <div className={styles.overlay}>
          <h1>Heitor Pita</h1>
          <h2>Software Engineer</h2>

          <a
            href={resume}
            download="HeitorPitaResume.pdf"
            className={styles.downloadBtn}
          >
            <img src={codigoIcon} alt="ícone" className={styles.icon} />
            Download CV
          </a>
        </div>
      </div>
      <div className={styles.about}>
        <p>Heitor Pita is an undergraduate student in Science and technologies at the Universidade Federal do Rio Grande do Norte UFRN. He focuses on Cloud Computing, Cybersecurity, and Artificial Intelligence applications in real-world systems. He earned the Linux Essentials certification and successfully passed the LPI certification exam, building a strong foundation in Linux systems administration and networking.

          During his academic journey, Heitor has developed automation and integration projects using Python, Django, and React, including systems for judicial process updates and cloud-based monitoring solutions. As a NOC Intern, he works with infrastructure observability tools such as Zabbix and Grafana, configuring alerts, dashboards, and monitoring strategies to ensure operational reliability. He also has hands-on experience with AWS environments, VPN configurations, and cybersecurity labs through platforms like TryHackMe.

          He is currently expanding his expertise in DevOps practices, CI/CD pipelines with GitHub Actions, containerization, and scalable cloud architecture, aiming to grow into a Senior Cloud Systems Engineer role.</p>
      </div>

      <div className={styles.knowledgeSection}>
        <div className={styles.cards}>

          {/* PROJECTS */}
          <div className={styles.card}>
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="Projects" />
            <h3>Projects</h3>
            <p>Cloud systems, automation, monitoring and AI applications.</p>
            <Link to="/projects" className={styles.cardBtn}>
              View Projects
            </Link>
          </div>

          {/* CERTIFICATIONS */}
          <div className={styles.card}>
            <img src={linuxBadge} alt="Certifications" />
            <h3>Certifications</h3>
            <p>Linux Essentials & LPI certification credentials.</p>
            <a
              href="https://www.credly.com/badges/d9e33ab0-d7e5-4fe2-a2ec-ecc8ee9d54eb/linked_in_profile"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardBtn}
            >
              View Credential
            </a>
          </div>

          {/* RESUME */}
          <div className={styles.card}>
            <img src="https://images.unsplash.com/photo-1492724441997-5dc865305da7" alt="Resume" />
            <h3>Resume</h3>
            <p>Professional experience, technical skills and certifications.</p>
            <Link to="/resume" className={styles.cardBtn}>
              View Resume
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Main