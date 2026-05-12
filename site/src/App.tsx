import { useState, useEffect } from 'react';
import { EFFECTS } from 'agents-are-thinking';
import { Header } from './Header';
import { InfiniteCanvas } from './InfiniteCanvas';
import { Drawer } from './Drawer';
import s from './App.module.css';

function App() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const base = `${EFFECTS.length} agents are thinking`;
    let dots = 1;
    document.title = `${base}.`;
    const id = setInterval(() => {
      dots = dots % 3 + 1;
      document.title = `${base}${".".repeat(dots)}`;
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Header />
      <aside className={s.about} aria-label="About this project">
        <p className={s.kicker}>About</p>
        <h1 className={s.heading}>Agents Are Thinking</h1>
        <p className={s.body}>
          A live gallery of animated terminal-style effects built for sharing, embedding, and discovery. Created by{' '}
          <a href="https://x.com/warrioraashuu" target="_blank" rel="noopener noreferrer">
            aashuu
          </a>
          .
        </p>
      </aside>
      <InfiniteCanvas onSelect={setSelected} />
      <Drawer
        effectIndex={selected ?? 0}
        open={selected !== null}
        onClose={() => setSelected(null)}
        onPrev={() => setSelected(((selected ?? 0) - 1 + EFFECTS.length) % EFFECTS.length)}
        onNext={() => setSelected(((selected ?? 0) + 1) % EFFECTS.length)}
      />
    </>
  );
}

export default App;
