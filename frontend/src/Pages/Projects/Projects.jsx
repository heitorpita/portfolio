import { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { getProjetos } from '../../services/api';
import styles from './Projects.module.css';

export default function Projects() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjetos()
      .then(setProjetos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Projects</h1>
        {loading && <p className={styles.loading}>Loading...</p>}
        {!loading && projetos.length === 0 && (
          <p className={styles.empty}>No projects yet.</p>
        )}
        <div className={styles.grid}>
          {projetos.map((p) => {
            const card = (
              <div className={`${styles.card} ${p.link ? styles.cardClickable : ''}`}>
                {p.foto && (
                  <img
                    src={p.foto}
                    alt={p.nome}
                    className={styles.img}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                )}
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{p.nome}</h2>
                  {p.descricao && <p className={styles.cardDesc}>{p.descricao}</p>}
                  {p.link && <span className={styles.cardLink}>Ver projeto →</span>}
                </div>
              </div>
            );

            return p.link ? (
              <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className={styles.cardAnchor}>
                {card}
              </a>
            ) : (
              <div key={p.id}>{card}</div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
