import { CSSProperties, useMemo } from 'react';

type VariantButtonProps = {
  variant: 'SCISSORS' | 'PAPER' | 'ROCK' | 'LIZARD' | 'SPOCK';
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
};

export default function VariantButton({
  variant,
  onClick,
  className,
  style,
}: VariantButtonProps) {
  const src = useMemo(() => {
    return {
      SCISSORS: '/images/icon-scissors.svg',
      PAPER: '/images/icon-paper.svg',
      ROCK: '/images/icon-rock.svg',
      LIZARD: '/images/icon-lizard.svg',
      SPOCK: '/images/icon-spock.svg',
    }[variant];
  }, [variant]);

  return (
    <div
      onClick={onClick}
      className={`variant-button ${variant} ${className} ${!!onClick && 'interactive'}`}
      style={style}
    >
      <img src={src} />
    </div>
  );
}
