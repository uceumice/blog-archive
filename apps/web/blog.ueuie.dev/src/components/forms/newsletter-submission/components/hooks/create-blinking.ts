import { createSignal, onCleanup } from 'solid-js';

export function blinking() {
  const [direction, setDirection] = createSignal<'inc' | 'dec'>('inc');
  const [dots, setDots] = createSignal('');

  /* -------------------------------- interval -------------------------------- */
  const interval = setInterval(function () {
    setDots((previous) => {
      switch (direction()) {
        case 'inc':
          return (previous += '.');
        case 'dec':
          return previous.slice(0, -1);
      }
    });

    setDirection((previous) => {
      if (dots().length >= 3) {
        return 'dec';
      }
      if (dots.length === 0) {
        return 'inc';
      }
      return previous;
    });
  }, 300);
  onCleanup(() => clearInterval(interval));

  return dots;
}
