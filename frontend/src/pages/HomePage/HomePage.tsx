import { useEffect, useState } from 'react';
import Hero from '../../components/Hero/Hero';
import CapabilityCard from '../../components/CapabilityCard/CapabilityCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { getCapabilities, getFeaturedProjects } from '../../services/api';
import type { Capability, Project } from '../../types';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingCaps, setLoadingCaps] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorCaps, setErrorCaps] = useState<string | null>(null);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);

  useEffect(() => {
    getCapabilities()
      .then((data) => {
        setCapabilities(data.sort((a, b) => a.order - b.order));
      })
      .catch((err) => setErrorCaps(err.message))
      .finally(() => setLoadingCaps(false));

    getFeaturedProjects()
      .then(setProjects)
      .catch((err) => setErrorProjects(err.message))
      .finally(() => setLoadingProjects(false));
  }, []);

  return (
    <>
      <Hero
        title="What Claude Can Do"
        subtitle="Explore a curated showcase of AI-powered development capabilities &mdash; from full-stack code generation to multi-agent orchestration, test-driven development, and beyond."
      />

      {/* Capabilities Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Capabilities</h2>
            <p className={styles.sectionSubtitle}>
              Each card represents a domain where Claude excels. Click to explore
              code examples, features, and real projects.
            </p>
          </div>

          {loadingCaps && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Loading capabilities...</p>
            </div>
          )}

          {errorCaps && (
            <div className={styles.error}>
              <p>Could not load capabilities.</p>
              <span className={styles.errorDetail}>{errorCaps}</span>
            </div>
          )}

          {!loadingCaps && !errorCaps && (
            <div className={styles.grid}>
              {capabilities.map((cap) => (
                <CapabilityCard key={cap.id} capability={cap} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <p className={styles.sectionSubtitle}>
              Real-world applications built with Claude, demonstrating practical
              AI-assisted development.
            </p>
          </div>

          {loadingProjects && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Loading projects...</p>
            </div>
          )}

          {errorProjects && (
            <div className={styles.error}>
              <p>Could not load projects.</p>
              <span className={styles.errorDetail}>{errorProjects}</span>
            </div>
          )}

          {!loadingProjects && !errorProjects && projects.length > 0 && (
            <div className={styles.grid}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {!loadingProjects && !errorProjects && projects.length === 0 && (
            <p className={styles.empty}>No featured projects yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
