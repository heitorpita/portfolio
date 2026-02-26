import React from 'react'
import styles from "./styles.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Heitor Pita</h1>
        <nav className={styles.nav}>
          <a href="#projects">Projetos</a>
          <a href="#resume">Resume</a>
          <a href="#sitemap">Sitemap</a>
        </nav>
      </div>
    </header>
  )
}

export default Header