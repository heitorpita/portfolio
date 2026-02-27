import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import styles from './Sitemap.module.css';

const routes = [
  { path: '/', label: 'Home', desc: 'Página inicial com apresentação e cards de navegação.' },
  { path: '/projects', label: 'Projects', desc: 'Lista de todos os projetos com foto e descrição.' },
  { path: '/resume', label: 'Resume', desc: 'Experiência profissional e certificações.' },
  { path: '/sitemap', label: 'Sitemap', desc: 'Mapa de todas as rotas do site.' },
  { path: '/login', label: 'Login', desc: 'Acesso à área administrativa.' },
];

export default function Sitemap() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Sitemap</h1>
        <p className={styles.sub}>All pages available on this site.</p>
        <ul className={styles.list}>
          {routes.map((r) => (
            <li key={r.path} className={styles.item}>
              <Link to={r.path} className={styles.link}>{r.label}</Link>
              <span className={styles.path}>{r.path}</span>
              <p className={styles.desc}>{r.desc}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
