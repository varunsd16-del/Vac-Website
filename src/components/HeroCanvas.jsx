import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from 'framer-motion';

const NAVY = '#002D62';
const BROWN = '#541D02';
const SLATE = '#64748B';
const LIGHTBLUE = '#1E4FA0';
const WHITE = '#ffffff';
const BGCARD = 'rgba(0,45,98,0.07)';
const BORDER = 'rgba(0,45,98,0.15)';

const spring = { type: 'spring', stiffness: 260, damping: 25 };

/* ── Shared primitives ─────────────────────────────────── */
function FloatingTag({ delay, style, icon, label, val }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, ...spring }}
      style={{
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        minWidth: 130,
        boxShadow: '0 4px 20px rgba(0,45,98,0.08)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 13 }}>{icon}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: NAVY, letterSpacing: '0.02em' }}>{label}</span>
      </div>
      <div style={{ fontSize: 9, color: SLATE, paddingLeft: 20 }}>{val}</div>
    </motion.div>
  );
}

/* ── SCENE 1: ANALYZE ──────────────────────────────────── */
function Scene1() {
  const [prog, setProg] = useState(0);
  const [tags, setTags] = useState([false, false, false, false]);

  useEffect(() => {
    const iv = setInterval(() => setProg(p => Math.min(p + 1, 100)), 38);
    [0, 1, 2, 3].forEach(i => setTimeout(() => setTags(t => { const n = [...t]; n[i] = true; return n; }), (i + 1) * 900));
    return () => clearInterval(iv);
  }, []);

  const tagData = [
    { label: 'Audience profile', val: 'SME & Enterprise', icon: '👥', style: { top: '13%', left: '2%' } },
    { label: 'Product vectors', val: 'ERP + Consulting', icon: '🎯', style: { top: '36%', right: '2%' } },
    { label: 'Market demand', val: '+24% YoY growth', icon: '📈', style: { bottom: '28%', left: '2%' } },
    { label: 'Competitor gaps', val: '3 gaps identified', icon: '🔍', style: { bottom: '10%', right: '2%' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.45 }}
      style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}
    >
      {/* Wireframe mockup */}
      <div style={{
        width: 210, background: '#f8fafc',
        border: `1.5px solid ${BORDER}`, borderRadius: 16,
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 8px 32px rgba(0,45,98,0.12)',
      }}>
        {/* Navbar */}
        <div style={{ background: NAVY, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 28, height: 14, borderRadius: 3, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 6, fontWeight: 700, color: NAVY }}>VAC</span>
          </div>
          <div style={{ flex: 1, height: 5, borderRadius: 4, background: 'rgba(255,255,255,0.15)' }} />
          <div style={{ width: 30, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.3)' }} />
        </div>
        {/* Body */}
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 8, background: 'rgba(0,45,98,0.12)', borderRadius: 4, width: '65%' }} />
          <div style={{ height: 6, background: 'rgba(0,45,98,0.07)', borderRadius: 4, width: '80%' }} />
          <div style={{ height: 44, background: 'rgba(0,45,98,0.06)', borderRadius: 8, marginTop: 2 }} />
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ flex: 1, height: 28, background: 'rgba(0,45,98,0.06)', borderRadius: 6 }} />
            <div style={{ flex: 1, height: 28, background: 'rgba(0,45,98,0.06)', borderRadius: 6 }} />
          </div>
          <div style={{ height: 5, background: 'rgba(0,45,98,0.08)', borderRadius: 4, width: '88%' }} />
          <div style={{ height: 5, background: 'rgba(0,45,98,0.05)', borderRadius: 4, width: '55%' }} />
          <div style={{ height: 18, background: NAVY, borderRadius: 6, width: '50%', marginTop: 2 }} />
        </div>
        {/* Scan line */}
        <motion.div
          animate={{ top: ['0%', 'calc(100% - 2px)', '0%'] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
          style={{
            position: 'absolute', left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg,transparent,${NAVY},transparent)`,
            boxShadow: `0 0 10px 2px ${NAVY}55`,
          }}
        />
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', width: 190, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <div style={{ width: '100%', height: 4, background: 'rgba(0,45,98,0.1)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: prog + '%', background: NAVY, borderRadius: 4, transition: 'width 0.05s linear' }} />
        </div>
        <div style={{ fontSize: 9, color: SLATE, fontWeight: 500 }}>Analyzing business profile… {prog}%</div>
      </div>

      {/* Tags */}
      {tagData.map((t, i) => tags[i] && (
        <FloatingTag key={i} delay={0} style={t.style} icon={t.icon} label={t.label} val={t.val} />
      ))}
    </motion.div>
  );
}

/* ── SCENE 2: STRUCTURE ────────────────────────────────── */
function Scene2() {
  const layers = [
    { label: 'Cold prospects', sub: 'Awareness stage', width: '95%', color: NAVY, count: '10,000+' },
    { label: 'Warm leads', sub: 'Trust & interest', width: '75%', color: BROWN, count: '2,400' },
    { label: 'Hot opportunities', sub: 'Decision ready', width: '55%', color: LIGHTBLUE, count: '480' },
    { label: 'Closed clients', sub: 'Revenue generated', width: '40%', color: NAVY, count: '96' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45 }}
      style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '20px 24px' }}
    >
      <div style={{ fontSize: 9, fontWeight: 700, color: SLATE, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>
        Sales funnel structure
      </div>
      {layers.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -14, scaleX: 0.88 }}
          animate={{ opacity: 1, y: 0, scaleX: 1 }}
          transition={{ delay: i * 0.42 + 0.2, ...spring }}
          style={{
            width: l.width, minWidth: 180, maxWidth: 360,
            background: `${l.color}10`,
            border: `1.5px solid ${l.color}44`,
            borderRadius: 14, padding: '10px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: l.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.label}</div>
            <div style={{ fontSize: 9, color: SLATE, marginTop: 1, whiteSpace: 'nowrap' }}>{l.sub}</div>
          </div>
          <div style={{ fontWeight: 800, fontSize: 14, color: l.color, marginLeft: 10 }}>{l.count}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── SCENE 3: GENERATE ─────────────────────────────────── */
function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const ts = [1100, 2700, 4100].map((t, i) => setTimeout(() => setPhase(i + 1), t));
    return () => ts.forEach(clearTimeout);
  }, []);

  const modules = [
    { label: 'Sales & CRM', icon: '💼', color: NAVY },
    { label: 'Inventory', icon: '📦', color: BROWN },
    { label: 'Finance', icon: '💳', color: LIGHTBLUE },
    { label: 'HR', icon: '👥', color: SLATE },
    { label: 'Production', icon: '🏭', color: NAVY },
    { label: 'Intelligence', icon: '📊', color: BROWN },
  ];

  const inputs = ['Business profile', 'Industry data', 'Pain points', 'Goals'];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45 }}
      style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '24px 20px' }}
    >
      {/* Input chips */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', justifyContent: 'center' }}>
        {inputs.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : -8 }}
            transition={{ delay: i * 0.1, ...spring }}
            style={{
              background: BGCARD, border: `1px solid ${BORDER}`,
              borderRadius: 20, padding: '5px 12px',
              fontSize: 10, color: NAVY, fontWeight: 500,
            }}
          >{t}</motion.div>
        ))}
      </div>

      {/* Arrow down */}
      <motion.div
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ delay: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
      >
        <div style={{ width: 2, height: 18, background: NAVY, borderRadius: 2 }} />
        <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `8px solid ${NAVY}` }} />
      </motion.div>

      {/* Modules grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, width: '100%', maxWidth: 340 }}>
        {modules.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.82 }}
            transition={{ delay: i * 0.08, ...spring }}
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: `1px solid ${BORDER}`,
              borderRadius: 12, padding: '10px 6px', textAlign: 'center',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 4 }}>{m.icon}</div>
            <div style={{ fontSize: 9, fontWeight: 600, color: m.color }}>{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Done badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
        transition={{ ...spring }}
        style={{
          background: NAVY, color: WHITE, borderRadius: 20,
          padding: '8px 20px', fontSize: 11, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 7,
        }}
      >
        <span style={{ fontSize: 14 }}>✓</span>
        Custom ERP architecture ready
      </motion.div>
    </motion.div>
  );
}

/* ── SCENE 4: OPTIMIZE ─────────────────────────────────── */
function Scene4() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 75);
    return () => clearInterval(iv);
  }, []);

  const bars = [
    { label: 'Operations', before: 42, after: 81, color: NAVY },
    { label: 'Finance', before: 55, after: 93, color: LIGHTBLUE },
    { label: 'HR', before: 30, after: 74, color: BROWN },
    { label: 'Sales', before: 61, after: 97, color: NAVY },
  ];

  const phase2 = tick > 38;
  const scanY = Math.min(tick / 28, 1) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      style={{ position: 'absolute', inset: 0, padding: '28px 28px 24px', display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}
    >
      <div style={{ fontSize: 9, fontWeight: 600, color: SLATE, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        AI optimisation scan
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {bars.map((b, i) => {
          const val = phase2
            ? b.before + (b.after - b.before) * Math.min((tick - 38) / 48, 1)
            : b.before;
          const pct = Math.round(val);
          const done = phase2 && pct > 70;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 10, color: SLATE, width: 70, flexShrink: 0 }}>{b.label}</div>
              <div style={{ flex: 1, height: 8, background: 'rgba(0,45,98,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: pct + '%', borderRadius: 4,
                  background: done ? '#002D62' : b.color,
                  transition: 'width 0.07s linear, background 0.4s',
                }} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: done ? '#002D62' : b.color, width: 30, textAlign: 'right' }}>
                {pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Scan overlay */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,transparent,${NAVY}55,transparent)`,
        top: scanY + '%', transition: 'top 0.07s linear',
        pointerEvents: 'none',
      }} />

      {/* Success banner */}
      <AnimatePresence>
        {phase2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring }}
            style={{
              background: 'rgba(0,45,98,0.08)',
              border: '1px solid rgba(0,45,98,0.28)',
              borderRadius: 12, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 9,
            }}
          >
            <span style={{ fontSize: 15 }}>✅</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#002D62' }}>+40% average efficiency gain</div>
              <div style={{ fontSize: 9, color: SLATE, marginTop: 2 }}>Bottlenecks resolved across all modules</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── SCENE 5: SCALE / ROI ──────────────────────────────── */
function Counter({ target, delay }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v).toLocaleString('en-IN'));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    rounded.on('change', v => setDisplay(v));
    const t = setTimeout(() => {
      animate(count, target, { duration: 2.2, ease: 'easeOut' });
    }, delay * 1000);
    return () => clearTimeout(t);
  }, []);

  return <span style={{ fontSize: 36, fontWeight: 500, color: WHITE, fontVariantNumeric: 'tabular-nums' }}>{display}</span>;
}

function Scene5() {
  const [items, setItems] = useState([false, false, false]);

  useEffect(() => {
    [0, 1, 2].forEach(i => setTimeout(() => setItems(v => { const n = [...v]; n[i] = true; return n; }), i * 380 + 250));
  }, []);

  const outcomes = [
    { icon: '⚡', label: 'Efficiency gain', val: '40%' },
    { icon: '💰', label: 'Cost reduction', val: '25%' },
    { icon: '👁', label: 'Visibility', val: '3×' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 28 }}
    >
      {/* Outcome chips */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {outcomes.map((o, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: items[i] ? 1 : 0, y: items[i] ? 0 : 10 }}
            transition={{ ...spring }}
            style={{
              background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)',
              border: `1px solid ${BORDER}`, borderRadius: 14,
              padding: '12px 16px', textAlign: 'center',
              boxShadow: '0 2px 12px rgba(0,45,98,0.06)',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{o.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: NAVY }}>{o.val}</div>
            <div style={{ fontSize: 9, color: SLATE, marginTop: 2 }}>{o.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ROI counter card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.4, ...spring }}
        style={{
          background: NAVY, borderRadius: 22,
          padding: '20px 36px', textAlign: 'center',
          boxShadow: '0 16px 48px rgba(0,45,98,0.28)',
        }}
      >
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
          Total ROI Generated
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
          <span style={{ fontSize: 22, fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>₹</span>
          <Counter target={845200} delay={1.6} />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
          style={{
            marginTop: 10, background: 'rgba(255,255,255,0.12)',
            borderRadius: 20, padding: '4px 14px',
            fontSize: 10, color: 'rgba(255,255,255,0.85)',
            display: 'inline-block',
          }}
        >
          ↑ +340% Return on Investment
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── MAIN CANVAS ───────────────────────────────────────── */
const SCENES = [
  { label: 'Analyze', Component: Scene1, duration: 4800 },
  { label: 'Structure', Component: Scene2, duration: 4400 },
  { label: 'Generate', Component: Scene3, duration: 5200 },
  { label: 'Optimise', Component: Scene4, duration: 5000 },
  { label: 'Scale', Component: Scene5, duration: 4600 },
];

export default function HeroCanvas() {
  const [active, setActive] = useState(0);
  const [key, setKey] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setActive(a => (a + 1) % SCENES.length);
        setKey(k => k + 1);
        setExiting(false);
      }, 420);
    }, SCENES[active].duration);
    return () => clearTimeout(t);
  }, [active]);

  const { Component } = SCENES[active];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      {/* Canvas window */}
      <div style={{
        width: '100%',
        aspectRatio: '1.25',
        background: 'linear-gradient(145deg, #f0f4ff 0%, #e8f0fe 50%, #fcfcfd 100%)',
        border: `1.5px solid ${BORDER}`,
        borderRadius: 28,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,45,98,0.12), 0 4px 16px rgba(0,45,98,0.06)',
      }}>
        <AnimatePresence mode="wait">
          <Component key={key} />
        </AnimatePresence>

        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,45,98,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,45,98,0.025) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 8 }}>
        {SCENES.map((s, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center' }}>
            <div style={{
              width: '100%', height: 3, borderRadius: 3,
              background: 'rgba(0,45,98,0.06)', overflow: 'hidden', position: 'relative',
            }}>
              {active === i && (
                <motion.div
                  key={key}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: SCENES[i].duration / 1000, ease: 'linear' }}
                  style={{ position: 'absolute', inset: 0, background: '#002D62', borderRadius: 3 }}
                />
              )}
              {active > i && (
                <div style={{ position: 'absolute', inset: 0, background: '#002D62', opacity: 0.3 }} />
              )}
            </div>
            <div style={{
              fontSize: 9, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: active === i ? '#002D62' : 'rgba(0,45,98,0.4)',
              transition: 'color 0.3s',
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
