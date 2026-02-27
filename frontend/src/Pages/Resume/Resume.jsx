import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { getExperiencias } from '../../services/api';
import styles from './Resume.module.css';

export default function Resume() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiencias()
      .then(setExperiencias)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Resume</h1>
        <h2 className={styles.section}>Professional Experience</h2>
        {loading && <p className={styles.loading}>Loading...</p>}
        {!loading && experiencias.length === 0 && (
          <p className={styles.empty}>No experience added yet.</p>
        )}
        <div className={styles.timeline}>
          {experiencias.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <div className={styles.dot} />
              <div className={styles.content}>
                <h3 className={styles.titulo}>{exp.titulo}</h3>
                <span className={styles.empresa}>{exp.empresa}</span>
                {exp.periodo && <span className={styles.periodo}> · {exp.periodo}</span>}
                {exp.descricao && <p className={styles.descricao}>{exp.descricao}</p>}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
