import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  getProjetos, createProjeto, updateProjeto, deleteProjeto,
  getExperiencias, createExperiencia, updateExperiencia, deleteExperiencia,
} from '../../services/api';
import styles from './Admin.module.css';

const EMPTY_PROJETO = { nome: '', descricao: '', foto: '', link: '' };
const EMPTY_EXP = { titulo: '', empresa: '', periodo: '', descricao: '', ordem: 0 };

export default function Admin() {
  const { signOut } = useAuth();
  const [aba, setAba] = useState('projetos');

  // Projetos
  const [projetos, setProjetos] = useState([]);
  const [formProjeto, setFormProjeto] = useState(EMPTY_PROJETO);
  const [editingProjeto, setEditingProjeto] = useState(null);
  const [showFormProjeto, setShowFormProjeto] = useState(false);

  // Experiências
  const [experiencias, setExperiencias] = useState([]);
  const [formExp, setFormExp] = useState(EMPTY_EXP);
  const [editingExp, setEditingExp] = useState(null);
  const [showFormExp, setShowFormExp] = useState(false);

  const [erro, setErro] = useState('');

  useEffect(() => { carregarProjetos(); carregarExperiencias(); }, []);

  async function carregarProjetos() {
    setProjetos(await getProjetos());
  }

  async function carregarExperiencias() {
    setExperiencias(await getExperiencias());
  }

  // ---- PROJETOS ----
  function abrirNovoProjeto() {
    setEditingProjeto(null);
    setFormProjeto(EMPTY_PROJETO);
    setShowFormProjeto(true);
    setErro('');
  }

  function abrirEditarProjeto(p) {
    setEditingProjeto(p.id);
    setFormProjeto({ nome: p.nome, descricao: p.descricao || '', foto: p.foto || '', link: p.link || '' });
    setShowFormProjeto(true);
    setErro('');
  }

  async function salvarProjeto(e) {
    e.preventDefault();
    setErro('');
    try {
      if (editingProjeto) {
        await updateProjeto(editingProjeto, formProjeto);
      } else {
        await createProjeto(formProjeto);
      }
      setShowFormProjeto(false);
      carregarProjetos();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function excluirProjeto(id, nome) {
    if (!confirm(`Excluir "${nome}"?`)) return;
    try {
      await deleteProjeto(id);
      carregarProjetos();
    } catch (err) {
      setErro(err.message);
    }
  }

  // ---- EXPERIÊNCIAS ----
  function abrirNovaExp() {
    setEditingExp(null);
    setFormExp(EMPTY_EXP);
    setShowFormExp(true);
    setErro('');
  }

  function abrirEditarExp(exp) {
    setEditingExp(exp.id);
    setFormExp({
      titulo: exp.titulo, empresa: exp.empresa,
      periodo: exp.periodo || '', descricao: exp.descricao || '', ordem: exp.ordem,
    });
    setShowFormExp(true);
    setErro('');
  }

  async function salvarExp(e) {
    e.preventDefault();
    setErro('');
    try {
      if (editingExp) {
        await updateExperiencia(editingExp, formExp);
      } else {
        await createExperiencia(formExp);
      }
      setShowFormExp(false);
      carregarExperiencias();
    } catch (err) {
      setErro(err.message);
    }
  }

  async function excluirExp(id, titulo) {
    if (!confirm(`Excluir "${titulo}"?`)) return;
    try {
      await deleteExperiencia(id);
      carregarExperiencias();
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Admin</h1>
        <button className={styles.logoutBtn} onClick={signOut}>Sair</button>
      </header>

      <main className={styles.main}>
        {erro && <p className={styles.erro}>{erro}</p>}

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${aba === 'projetos' ? styles.tabActive : ''}`}
            onClick={() => setAba('projetos')}
          >
            Projetos
          </button>
          <button
            className={`${styles.tab} ${aba === 'experiencias' ? styles.tabActive : ''}`}
            onClick={() => setAba('experiencias')}
          >
            Experiências
          </button>
        </div>

        {/* ---- ABA PROJETOS ---- */}
        {aba === 'projetos' && (
          <section>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Projetos</h2>
              <button className={styles.newBtn} onClick={abrirNovoProjeto}>+ Novo</button>
            </div>

            {showFormProjeto && (
              <form className={styles.form} onSubmit={salvarProjeto}>
                <h3 className={styles.formTitle}>{editingProjeto ? 'Editar Projeto' : 'Novo Projeto'}</h3>
                <label className={styles.label}>
                  Nome *
                  <input className={styles.input} value={formProjeto.nome}
                    onChange={(e) => setFormProjeto({ ...formProjeto, nome: e.target.value })} required />
                </label>
                <label className={styles.label}>
                  Descrição
                  <textarea className={styles.textarea} value={formProjeto.descricao}
                    onChange={(e) => setFormProjeto({ ...formProjeto, descricao: e.target.value })} rows={3} />
                </label>
                <label className={styles.label}>
                  URL da Foto
                  <input className={styles.input} value={formProjeto.foto}
                    onChange={(e) => setFormProjeto({ ...formProjeto, foto: e.target.value })} />
                </label>
                <label className={styles.label}>
                  Link do Projeto
                  <input className={styles.input} value={formProjeto.link} placeholder="https://github.com/..."
                    onChange={(e) => setFormProjeto({ ...formProjeto, link: e.target.value })} />
                </label>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveBtn}>Salvar</button>
                  <button type="button" className={styles.cancelBtn} onClick={() => setShowFormProjeto(false)}>Cancelar</button>
                </div>
              </form>
            )}

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {projetos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nome}</td>
                    <td className={styles.truncate}>{p.descricao || '—'}</td>
                    <td>
                      <button className={styles.editBtn} onClick={() => abrirEditarProjeto(p)}>Editar</button>
                      <button className={styles.deleteBtn} onClick={() => excluirProjeto(p.id, p.nome)}>Excluir</button>
                    </td>
                  </tr>
                ))}
                {projetos.length === 0 && (
                  <tr><td colSpan={3} className={styles.emptyRow}>Nenhum projeto cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </section>
        )}

        {/* ---- ABA EXPERIÊNCIAS ---- */}
        {aba === 'experiencias' && (
          <section>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Experiências</h2>
              <button className={styles.newBtn} onClick={abrirNovaExp}>+ Nova</button>
            </div>

            {showFormExp && (
              <form className={styles.form} onSubmit={salvarExp}>
                <h3 className={styles.formTitle}>{editingExp ? 'Editar Experiência' : 'Nova Experiência'}</h3>
                <label className={styles.label}>
                  Título *
                  <input className={styles.input} value={formExp.titulo}
                    onChange={(e) => setFormExp({ ...formExp, titulo: e.target.value })} required />
                </label>
                <label className={styles.label}>
                  Empresa *
                  <input className={styles.input} value={formExp.empresa}
                    onChange={(e) => setFormExp({ ...formExp, empresa: e.target.value })} required />
                </label>
                <label className={styles.label}>
                  Período
                  <input className={styles.input} value={formExp.periodo} placeholder="Ex: Jan 2024 – Atual"
                    onChange={(e) => setFormExp({ ...formExp, periodo: e.target.value })} />
                </label>
                <label className={styles.label}>
                  Descrição
                  <textarea className={styles.textarea} value={formExp.descricao}
                    onChange={(e) => setFormExp({ ...formExp, descricao: e.target.value })} rows={3} />
                </label>
                <label className={styles.label}>
                  Ordem
                  <input className={styles.input} type="number" value={formExp.ordem}
                    onChange={(e) => setFormExp({ ...formExp, ordem: Number(e.target.value) })} />
                </label>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveBtn}>Salvar</button>
                  <button type="button" className={styles.cancelBtn} onClick={() => setShowFormExp(false)}>Cancelar</button>
                </div>
              </form>
            )}

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Empresa</th>
                  <th>Período</th>
                  <th>Ordem</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {experiencias.map((exp) => (
                  <tr key={exp.id}>
                    <td>{exp.titulo}</td>
                    <td>{exp.empresa}</td>
                    <td>{exp.periodo || '—'}</td>
                    <td>{exp.ordem}</td>
                    <td>
                      <button className={styles.editBtn} onClick={() => abrirEditarExp(exp)}>Editar</button>
                      <button className={styles.deleteBtn} onClick={() => excluirExp(exp.id, exp.titulo)}>Excluir</button>
                    </td>
                  </tr>
                ))}
                {experiencias.length === 0 && (
                  <tr><td colSpan={5} className={styles.emptyRow}>Nenhuma experiência cadastrada.</td></tr>
                )}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}
