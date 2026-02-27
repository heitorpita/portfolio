import { Link } from 'react-router-dom';
import styles from "./styles.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Heitor Pita</Link>
        <nav className={styles.nav}>
          <Link to="/projects">Projects</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/sitemap">Sitemap</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
