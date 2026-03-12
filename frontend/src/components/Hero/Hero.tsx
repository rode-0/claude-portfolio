import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle: string;
  compact?: boolean;
}

export default function Hero({ title, subtitle, compact = false }: HeroProps) {
  return (
    <section className={`${styles.hero} ${compact ? styles.compact : ''}`}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}
