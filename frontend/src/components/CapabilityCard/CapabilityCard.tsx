import { Link } from 'react-router-dom';
import type { Capability } from '../../types';
import { categoryIcons } from '../../types';
import styles from './CapabilityCard.module.css';

interface CapabilityCardProps {
  capability: Capability;
}

export default function CapabilityCard({ capability }: CapabilityCardProps) {
  const icon = categoryIcons[capability.category] || capability.icon;

  return (
    <Link to={`/capabilities/${capability.slug}`} className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <h3 className={styles.title}>{capability.title}</h3>
      <p className={styles.description}>{capability.description}</p>
      <div className={styles.category}>
        <span className={styles.categoryBadge}>{capability.category}</span>
      </div>
      <div className={styles.arrow}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
