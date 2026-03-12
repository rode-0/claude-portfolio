import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { getCapability } from '../../services/api';
import type { Capability, Project } from '../../types';
import { categoryIcons } from '../../types';
import styles from './CapabilityPage.module.css';

export default function CapabilityPage() {
  const { slug } = useParams<{ slug: string }>();
  const [capability, setCapability] = useState<Capability | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    getCapability(slug)
      .then((data) => {
        const { projects: relatedProjects, ...cap } = data;
        setCapability(cap as Capability);
        setProjects(relatedProjects || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner} />
        <p>Loading capability...</p>
      </div>
    );
  }

  if (error || !capability) {
    return (
      <div className={styles.errorPage}>
        <h2>Capability not found</h2>
        <p className={styles.errorDetail}>
          {error || 'The requested capability does not exist.'}
        </p>
        <Link to="/" className={styles.backLink}>
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  const icon = categoryIcons[capability.category] || capability.icon;

  return (
    <>
      <Hero
        title={`${icon} ${capability.title}`}
        subtitle={capability.description}
        compact
      />

      <div className={styles.page}>
        <div className={styles.container}>
          <Link to="/" className={styles.breadcrumb}>
            &larr; All Capabilities
          </Link>

          <div className={styles.content}>
            {/* Left column: Features */}
            <section className={styles.featuresSection}>
              <h2 className={styles.heading}>Features</h2>
              <ul className={styles.featuresList}>
                {capability.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.featureCheck}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className={styles.meta}>
                <span className={styles.categoryBadge}>
                  {capability.category}
                </span>
              </div>
            </section>

            {/* Right column: Code Example */}
            <section className={styles.codeSection}>
              <h2 className={styles.heading}>Code Example</h2>
              <CodeBlock
                code={capability.codeExample}
                language={capability.codeLanguage}
              />
            </section>
          </div>

          {/* Related Projects */}
          {projects.length > 0 && (
            <section className={styles.projectsSection}>
              <h2 className={styles.heading}>Related Projects</h2>
              <div className={styles.projectsGrid}>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
