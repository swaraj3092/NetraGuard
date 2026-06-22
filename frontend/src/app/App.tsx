import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import {
  Shield, AlertTriangle, Network, Brain, Target, Globe, Check,
  Zap, Lock, Database, Cpu, Radio, Phone, FileText, Bell,
  BarChart3, Users, ChevronRight, Play, DollarSign,
  Camera, MessageCircle, X, Activity, TrendingUp, Eye,
  Search, Map, Layers, Settings
} from "lucide-react";

// ─── LANGUAGE SYSTEM ─────────────────────────────────────────────────────────

type Lang = "en" | "hi";
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });
const useLang = () => useContext(LangCtx);

const T = {
  en: {
    appName: "NetraGuard",
    protectionActive: "Protection Active",
    youAreProtected: "You are protected",
    callsMonitored: "Calls being monitored live",
    emergencyHelpline: "Emergency Helpline",
    gotScammed: "Got scammed? Call now",
    checkCall: "Check a suspicious call",
    scanNote: "Scan a currency note",
    fileComplaint: "File an NCRP complaint",
    alertFamily: "Alert my family",
    recentAlerts: "Recent Alerts",
    noThreats: "No threats detected. Stay alert.",
    fraudAlert: "Fraud Alert!",
    scamDetected: "SCAM DETECTED",
    callShowsFraud: "This call shows fraud patterns.",
    hangUp: "Hang Up Now",
    callHelpline: "1930 Helpline",
    alertFamilyBtn: "Alert Family",
    whatDetected: "What was detected:",
    fakeOfficial: "Fake official intimidation",
    fearDemand: "Fear-based money demand",
    isolationTactic: "Isolation tactic",
    safeScriptLabel: "Say this to end the call safely:",
    safeScriptText: '"I need to verify with my bank first."',
    alignNote: "Align note within frame",
    scanning: "Scanning...",
    genuineNote: "Genuine Note",
    genuineDesc: "This note is authentic. No concern.",
    checksPassed: "11 security checks passed",
    watermark: "Watermark", secThread: "Security Thread", rbiSeal: "RBI Seal",
    serialNum: "Serial Number", colourShift: "Colour Shift", microprint: "Microprint",
    tabHome: "Home", tabCalls: "Calls", tabScan: "Scan", tabAlerts: "Alerts", tabGuide: "Guide",
  },
  hi: {
    appName: "साइबरकवच",
    protectionActive: "सुरक्षा सक्रिय है",
    youAreProtected: "आप सुरक्षित हैं",
    callsMonitored: "कॉल की निगरानी हो रही है",
    emergencyHelpline: "आपातकालीन हेल्पलाइन",
    gotScammed: "धोखाधड़ी हुई? अभी call करें",
    checkCall: "संदिग्ध कॉल जाँचें",
    scanNote: "नोट स्कैन करें",
    fileComplaint: "शिकायत दर्ज करें",
    alertFamily: "परिवार को अलर्ट करें",
    recentAlerts: "हाल की सूचनाएं",
    noThreats: "कोई खतरा नहीं मिला। सतर्क रहें।",
    fraudAlert: "धोखाधड़ी!",
    scamDetected: "घोटाला पकड़ा गया",
    callShowsFraud: "यह कॉल धोखाधड़ी है।",
    hangUp: "अभी फोन काटें",
    callHelpline: "1930 हेल्पलाइन",
    alertFamilyBtn: "परिवार को बताएं",
    whatDetected: "AI ने क्या पकड़ा:",
    fakeOfficial: "अधिकारी बनकर डरा रहे हैं",
    fearDemand: "डर दिखाकर पैसे माँग रहे हैं",
    isolationTactic: "अकेला करने की कोशिश",
    safeScriptLabel: "यह बोलें — कॉल सुरक्षित रूप से समाप्त करें:",
    safeScriptText: '"मुझे अपने बैंक से पहले verify करना होगा।"',
    alignNote: "नोट को फ्रेम में रखें",
    scanning: "स्कैन हो रहा है...",
    genuineNote: "असली नोट",
    genuineDesc: "यह नोट असली है। चिंता न करें।",
    checksPassed: "11 सुरक्षा जाँच पास हुईं",
    watermark: "वॉटरमार्क", secThread: "सुरक्षा धागा", rbiSeal: "RBI मुहर",
    serialNum: "सीरियल नंबर", colourShift: "रंग बदलाव", microprint: "माइक्रोप्रिंट",
    tabHome: "होम", tabCalls: "कॉल", tabScan: "स्कैन", tabAlerts: "अलर्ट", tabGuide: "गाइड",
  },
} as const;

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────

const C = {
  void: "#050A14", deep: "#080F1E", navy: "#0A1628", steel: "#0E1F35", shieldBg: "#1A3A5C",
  saffron: "#FF6B00", gold: "#FFB800", emerald: "#00E5A0", crimson: "#FF1744",
  ice: "#00C8FF", violet: "#8B5CF6",
  t1: "#F0F4FF", t2: "#8899BB", t3: "#4A5A7A",
  border: "#1E2E48", borderGlow: "#1E4A80",
} as const;

const GLASS = {
  L1: {
    background: "linear-gradient(135deg, rgba(26,58,92,0.4) 0%, rgba(8,15,30,0.6) 100%)",
    border: "1px solid rgba(30,74,128,0.3)",
    backdropFilter: "blur(20px) saturate(180%)",
    boxShadow: "0 0 0 1px rgba(0,200,255,0.05) inset, 0 4px 24px rgba(0,0,0,0.4)",
  },
  L2: {
    background: "linear-gradient(135deg, rgba(26,58,92,0.5) 0%, rgba(8,15,30,0.7) 100%)",
    border: "1px solid rgba(0,200,255,0.2)",
    backdropFilter: "blur(20px) saturate(180%)",
    boxShadow: "0 0 0 1px rgba(0,200,255,0.1) inset, 0 8px 32px rgba(0,0,0,0.5), 0 0 80px rgba(0,200,255,0.08)",
  },
  L3: {
    background: "linear-gradient(135deg, rgba(255,23,68,0.12) 0%, rgba(8,15,30,0.85) 100%)",
    border: "1px solid rgba(255,23,68,0.4)",
    backdropFilter: "blur(20px) saturate(180%)",
    boxShadow: "0 0 0 1px rgba(255,23,68,0.15) inset, 0 8px 48px rgba(0,0,0,0.6), 0 0 80px rgba(255,23,68,0.1)",
  },
  L4: {
    background: "linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(8,15,30,0.8) 100%)",
    border: "1px solid rgba(0,229,160,0.3)",
    backdropFilter: "blur(20px) saturate(180%)",
    boxShadow: "0 0 0 1px rgba(0,229,160,0.1) inset, 0 8px 48px rgba(0,0,0,0.5), 0 0 80px rgba(0,229,160,0.08)",
  },
} as const;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  { num: "01", icon: Radio, title: "Real-Time Scam Interrupt", desc: "Detects live call manipulation in 2.3 seconds. Fires an interrupt overlay to the victim before any money moves.", color: C.crimson },
  { num: "02", icon: Brain, title: "Psychological Fingerprinter", desc: "Identifies 4-stage manipulation — authority, fear, isolation, payment demand — across 12 Indian languages.", color: C.violet },
  { num: "03", icon: Network, title: "Cross-Victim Network Graph", desc: "Maps fraud rings across victims, phone numbers, bank accounts, and devices. Built on Neo4j graph intelligence.", color: C.ice },
  { num: "04", icon: DollarSign, title: "Mobile Counterfeit Detector", desc: "11-point AI verification of currency notes. Works fully offline. Flags fakes at the counter, not after circulation.", color: C.gold },
  { num: "05", icon: Target, title: "Predictive Victim Alerting", desc: "Identifies at-risk citizens before a campaign launches. Pre-emptive WhatsApp/SMS alerts in their language.", color: C.saffron },
  { num: "06", icon: Globe, title: "Fraud Shield — 12 Languages", desc: "WhatsApp-native advisory bot in Hindi, Tamil, Telugu, Bengali, Odia, Marathi and 6 more Indian languages.", color: C.emerald },
];

const PERSONAS = [
  { role: "Citizen", need: "Protected during suspicious calls", how: "Fraud Shield monitors calls in real time and fires interrupt alerts before money moves. Advisory bot guides in native language.", chip: "Fraud Shield", color: C.emerald, avatar: "👤" },
  { role: "Law Enforcement", need: "Cross-jurisdiction fraud visibility", how: "Network graph maps criminal rings across states. Auto-generated court-ready evidence packages with one click.", chip: "Network Graph", color: C.ice, avatar: "🪖" },
  { role: "Bank Teller", need: "Instant currency authentication", how: "Mobile scanner checks 11 security features in under 3 seconds. Fully offline-capable for rural branches.", chip: "Note Scanner", color: C.gold, avatar: "🏦" },
  { role: "Judiciary", need: "Verified digital evidence", how: "Tamper-proof packages with chain of custody. GPS, timestamps, AI confidence scores — court-admissible.", chip: "Evidence Packages", color: C.violet, avatar: "⚖️" },
];

const ARCH_LAYERS = [
  { name: "Ingestion", components: ["Phone Call API", "WhatsApp Hook", "Camera OCR"], icon: Radio, color: C.ice },
  { name: "Processing", components: ["STT Engine", "NLP Pipeline", "Image AI"], icon: Cpu, color: C.violet },
  { name: "Intelligence", components: ["Scam Detector", "Network Mapper", "Predictor"], icon: Brain, color: C.saffron },
  { name: "Orchestration", components: ["Event Router", "Alert Engine", "Case Builder"], icon: Zap, color: C.gold },
  { name: "Storage", components: ["Neo4j Graph", "PostgreSQL", "Pinecone Vector"], icon: Database, color: C.emerald },
  { name: "Output", components: ["Citizen App", "Law Dashboard", "WhatsApp Bot"], icon: Globe, color: C.ice },
  { name: "Security", components: ["E2E Encryption", "Audit Logs", "Zero-Trust IAM"], icon: Lock, color: C.crimson },
];

const MATRIX_ROWS = [
  "Real-time call monitoring",
  "Live manipulation detection",
  "Pre-emptive victim alerting",
  "Cross-victim fraud network mapping",
  "Currency authentication",
  "Court-ready evidence packages",
  "Multi-language support (12 languages)",
  "Offline capability",
];
const MATRIX_COLS = ["Truecaller", "NCRP", "Bank Systems", "MHA 1930", "RBI"];
const MATRIX_DATA: boolean[][] = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, true,  false, true ],
  [false, true,  false, false, false],
  [true,  false, false, false, false],
  [false, false, false, false, false],
];

const ROADMAP = [
  { phase: "MVP", timing: "Hackathon", status: "live", items: ["Real-time call interception", "4-stage scam detection", "WhatsApp advisory bot", "Currency note scanner", "Fraud network graph"] },
  { phase: "Pilot", timing: "Months 1–3", status: "upcoming", items: ["3 state police integration", "NCRP API connection", "50 bank branch rollout", "IVR infrastructure", "Performance benchmarking"] },
  { phase: "Scale", timing: "Months 4–12", status: "future", items: ["National telecom tie-up", "250K active citizens", "MHA integration", "Real-time campaign intelligence", "10,000 note scans/day"] },
  { phase: "National", timing: "Year 2", status: "future", items: ["All 28 states covered", "1M+ citizens protected", "Supreme Court submission pipeline", "RBI certified scanner", "Public API for fintechs"] },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useCounter(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return val;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useTilt(max = 5) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * max * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * max * 2;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(8px)`;
    el.style.transition = "transform 0.1s ease-out";
  }, [max]);
  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.transition = "transform 0.4s ease-out";
  }, []);
  return { ref, onMove, onLeave };
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────

type RevealDir = "up" | "left" | "right" | "fade" | "scale";

function ScrollReveal({
  children,
  dir = "up",
  delay = 0,
  threshold = 0.15,
  className = "",
}: {
  children: React.ReactNode;
  dir?: RevealDir;
  delay?: number;
  threshold?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${triggered ? `reveal-${dir}` : "reveal-hidden"} ${className}`}
      style={triggered ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

// ─── KAVACH SHIELD SVG ────────────────────────────────────────────────────────

function KavachShield({ size = 320, glow = true }: { size?: number; glow?: boolean }) {
  const cx = 100, cy = 105, outerR = 82;
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + outerR * Math.cos(a), y: cy + outerR * Math.sin(a) };
  });
  const shieldPath = `M${cx},${cy - 72} C${cx + 28},${cy - 72} ${cx + 58},${cy - 55} ${cx + 58},${cy - 18} C${cx + 58},${cy + 28} ${cx + 30},${cy + 58} ${cx},${cy + 78} C${cx - 30},${cy + 58} ${cx - 58},${cy + 28} ${cx - 58},${cy - 18} C${cx - 58},${cy - 55} ${cx - 28},${cy - 72} ${cx},${cy - 72}Z`;

  return (
    <svg viewBox="0 0 200 210" width={size} height={size}>
      <defs>
        <radialGradient id="sglow" cx="50%" cy="45%">
          <stop offset="0%" stopColor={C.ice} stopOpacity={glow ? "0.3" : "0.1"} />
          <stop offset="70%" stopColor="#050A14" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sfill" x1="25%" y1="15%" x2="75%" y2="85%">
          <stop offset="0%" stopColor="#2A5A8C" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#050A14" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="sfillActive" x1="25%" y1="15%" x2="75%" y2="85%">
          <stop offset="0%" stopColor="#3A7AB0" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#1A3A5C" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#050A14" stopOpacity="0.95" />
        </linearGradient>
        <filter id="sgf">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="nodeGlow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={outerR + 22} fill="url(#sglow)" />
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke={C.borderGlow} strokeWidth="0.5" strokeOpacity="0.6" />
      {nodes.map((n, i) => (
        <line key={i} x1={n.x} y1={n.y} x2={nodes[(i + 1) % 12].x} y2={nodes[(i + 1) % 12].y}
          stroke={C.ice} strokeWidth="0.5" strokeOpacity="0.3" />
      ))}
      {nodes.filter((_, i) => i % 3 === 0).map((n, i) => (
        <line key={`c${i}`} x1={n.x} y1={n.y} x2={cx} y2={cy}
          stroke={C.ice} strokeWidth="0.3" strokeOpacity="0.12" />
      ))}
      <path d={shieldPath} fill="url(#sfill)" stroke={C.ice} strokeWidth="1.2" strokeOpacity="0.55" filter="url(#sgf)" />
      <line x1={cx} y1={cy - 72} x2={cx + 55} y2={cy - 15} stroke={C.ice} strokeWidth="0.4" strokeOpacity="0.25" />
      <line x1={cx} y1={cy - 72} x2={cx - 55} y2={cy - 15} stroke={C.ice} strokeWidth="0.4" strokeOpacity="0.25" />
      <line x1={cx + 55} y1={cy - 15} x2={cx - 55} y2={cy - 15} stroke={C.ice} strokeWidth="0.4" strokeOpacity="0.25" />
      <line x1={cx + 55} y1={cy - 15} x2={cx} y2={cy + 75} stroke={C.ice} strokeWidth="0.4" strokeOpacity="0.25" />
      <line x1={cx - 55} y1={cy - 15} x2={cx} y2={cy + 75} stroke={C.ice} strokeWidth="0.4" strokeOpacity="0.25" />
      <line x1={cx - 18} y1={cy - 48} x2={cx + 18} y2={cy - 48} stroke={C.saffron} strokeWidth="1.5" strokeOpacity="0.75" />
      <line x1={cx - 8} y1={cy - 55} x2={cx + 8} y2={cy - 55} stroke={C.saffron} strokeWidth="1" strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r={11} fill={C.ice} fillOpacity="0.07" stroke={C.ice} strokeWidth="0.8" strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r={4} fill={C.ice} fillOpacity="0.7" filter="url(#nodeGlow)" />
      {nodes.map((n, i) => {
        const isSaffron = i % 4 === 0;
        return (
          <circle key={i} cx={n.x} cy={n.y} r={i % 3 === 0 ? 4 : 2.5}
            fill={isSaffron ? C.saffron : C.ice}
            filter="url(#nodeGlow)"
            opacity={isSaffron ? 0.9 : 0.7}
          />
        );
      })}
    </svg>
  );
}

// ─── HEX GRID BACKGROUND ─────────────────────────────────────────────────────

function HexGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id="hexgrid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon points="30,2 58,17 58,35 30,50 2,35 2,17" fill="none" stroke="#00C8FF" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexgrid)" opacity="0.03" />
    </svg>
  );
}

// ─── DOWNLOAD MODAL ──────────────────────────────────────────────────────────

function DownloadModal({ onClose }: { onClose: () => void }) {
  const QR_CELLS = 11;
  // Deterministic fake QR pattern from a seed
  const qr = Array.from({ length: QR_CELLS * QR_CELLS }, (_, i) => {
    const r = Math.floor(i / QR_CELLS), c = i % QR_CELLS;
    const corner = (r < 3 && c < 3) || (r < 3 && c >= QR_CELLS - 3) || (r >= QR_CELLS - 3 && c < 3);
    if (corner) return true;
    return ((r * 7 + c * 13 + r * c) % 3) === 0;
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,10,20,0.85)", backdropFilter: "blur(12px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg rounded-3xl overflow-hidden" style={GLASS.L2}>
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <KavachShield size={36} glow={false} />
              <div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "20px", color: C.t1, letterSpacing: "-0.02em" }}>
                  Get Fraud Shield
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2 }}>
                  Free · Available on Android, iOS & WhatsApp
                </div>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl transition-colors hover:bg-white/5">
            <X size={18} color={C.t3} />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-[1fr_auto] gap-6 items-start">
          {/* Download options */}
          <div className="flex flex-col gap-3">
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2, marginBottom: 4 }}>
              Choose how to get the app:
            </div>

            {/* Android */}
            <a href="#" onClick={e => e.preventDefault()}
              className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-200"
              style={{ background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.25)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,229,160,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(0,229,160,0.25)")}
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,229,160,0.15)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={C.emerald}>
                  <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
                </svg>
              </div>
              <div className="flex-1">
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "15px", color: C.t1 }}>Download for Android</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t2, marginTop: 2 }}>Google Play Store · Android 8.0+</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3, marginTop: 1 }}>Hindi, Tamil, Telugu + 9 more languages</div>
              </div>
              <ChevronRight size={16} color={C.emerald} />
            </a>

            {/* iOS */}
            <a href="#" onClick={e => e.preventDefault()}
              className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200"
              style={{ background: "rgba(0,200,255,0.07)", border: "1px solid rgba(0,200,255,0.2)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,200,255,0.45)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(0,200,255,0.2)")}
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(0,200,255,0.12)" }}>
                <svg width="20" height="20" viewBox="0 0 814 1000" fill={C.ice}>
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 680.4 6.1 570.7 6.1 464.6c0-160.1 104.4-246.3 206.3-246.3 54 0 99.1 35.7 132.7 35.7 32 0 82.7-37.8 142.7-37.8 23.5 0 108.2 2 168.2 77.3zm-174.7-97.4c6.4-37.1 32-84.4 60.8-113.7 36.4-37.8 91.7-64.5 138.6-64.5 3.2 32 0 64.5-17.3 97.4-14.1 29.3-50.5 82.7-97.4 77.3-3.2 0-6.4-.6-9.6-.6-27.3 0-67.5-17.9-75.1-95.9z" />
                </svg>
              </div>
              <div className="flex-1">
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "15px", color: C.t1 }}>Download for iPhone</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t2, marginTop: 2 }}>Apple App Store · iOS 14+</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3, marginTop: 1 }}>Same features, optimised for iPhone</div>
              </div>
              <ChevronRight size={16} color={C.ice} />
            </a>

            {/* WhatsApp */}
            <a href="#" onClick={e => e.preventDefault()}
              className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200"
              style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.25)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(37,211,102,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(37,211,102,0.25)")}
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "rgba(37,211,102,0.15)" }}>
                <MessageCircle size={22} color="#25D366" />
              </div>
              <div className="flex-1">
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "15px", color: C.t1 }}>
                  Use on WhatsApp
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs align-middle" style={{ background: "rgba(255,107,0,0.2)", color: C.saffron, fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700 }}>RECOMMENDED</span>
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t2, marginTop: 2 }}>No install needed · Works on any phone · Free</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3, marginTop: 1 }}>व्हाट्सऐप पर तुरंत शुरू करें · Send "नमस्ते" to get started</div>
              </div>
              <ChevronRight size={16} color="#25D366" />
            </a>

            <div className="mt-1 p-3 rounded-xl flex items-start gap-2" style={{ background: "rgba(14,31,53,0.6)", border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: "14px" }}>💡</span>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t2, lineHeight: 1.6 }}>
                <strong style={{ color: C.t1 }}>No smartphone?</strong> Call <span style={{ fontFamily: "JetBrains Mono, monospace", color: C.saffron }}>1930</span> from any phone — India's national cyber fraud helpline, powered by NetraGuard AI.
              </div>
            </div>
          </div>

          {/* QR code */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl" style={{ background: "#fff" }}>
              <svg width="100" height="100" viewBox={`0 0 ${QR_CELLS} ${QR_CELLS}`} shapeRendering="crispEdges">
                {qr.map((on, i) => on && (
                  <rect key={i} x={i % QR_CELLS} y={Math.floor(i / QR_CELLS)} width={1} height={1} fill="#050A14" />
                ))}
              </svg>
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3, textAlign: "center", maxWidth: 110 }}>
              Scan with camera to download
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

const SECTION_LINKS = [
  { id: "hero",         label: "Home"         },
  { id: "features",     label: "Features"     },
  { id: "demo",         label: "Demo"         },
  { id: "personas",     label: "Who It Helps" },
  { id: "architecture", label: "Architecture" },
  { id: "comparison",   label: "Compare"      },
  { id: "roadmap",      label: "Roadmap"      },
  { id: "contact",      label: "Contact"      },
];

function Navbar({ view, setView, onDownload }: { view: string; setView: (v: string) => void; onDownload: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(5,10,20,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
      }}
    >
      {/* Main row */}
      <div className="flex items-center justify-between px-6 md:px-10 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div style={{ filter: "drop-shadow(0 0 8px rgba(0,200,255,0.5))" }}>
            <KavachShield size={32} glow={false} />
          </div>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "17px", color: C.t1, letterSpacing: "-0.02em" }}>
            Cyber<span style={{ color: C.saffron }}>Kavach</span> AI
          </span>
        </div>

        {/* View switcher */}
        <div className="hidden md:flex items-center gap-1 rounded-full px-1 py-1" style={{ background: "rgba(14,31,53,0.8)", border: `1px solid ${C.border}` }}>
          {[["landing", "Landing Page"], ["mobile", "Citizen App"], ["dashboard", "Law Dashboard"]].map(([v, label]) => (
            <button key={v} onClick={() => setView(v)}
              className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, background: view === v ? C.saffron : "transparent", color: view === v ? "#fff" : C.t2 }}>
              {label}
            </button>
          ))}
        </div>

        {/* Right: lang toggle + CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            style={{ background: "rgba(14,31,53,0.9)", border: `1px solid ${C.borderGlow}`, color: C.t2, fontFamily: "Inter, sans-serif" }}
            title="Toggle language"
          >
            <span>{lang === "en" ? "🇬🇧" : "🇮🇳"}</span>
            <span style={{ color: C.ice, fontWeight: 700 }}>{lang === "en" ? "EN" : "HI"}</span>
            <span style={{ color: C.t3, fontSize: "9px" }}>/ {lang === "en" ? "HI" : "EN"}</span>
          </button>

          <button
            onClick={onDownload}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={{ background: C.saffron, color: "#fff", fontFamily: "Inter, sans-serif", boxShadow: `0 0 20px rgba(255,107,0,0.35)` }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 30px rgba(255,107,0,0.55)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 0 20px rgba(255,107,0,0.35)`; }}
          >
            ⬇ Get the App
          </button>
        </div>
      </div>

      {/* Section nav strip — landing page only */}
      {view === "landing" && (
        <div className="hidden md:flex items-center gap-1 px-10 pb-2 overflow-x-auto" style={{ borderTop: `1px solid rgba(30,46,72,0.4)` }}>
          {SECTION_LINKS.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-150"
              style={{ fontFamily: "Inter, sans-serif", color: C.t3, background: "transparent" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,74,128,0.3)"; e.currentTarget.style.color = C.t1; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.t3; }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

function HeroSection({ onDownload }: { onDownload: () => void }) {
  const [visible, setVisible] = useState(false);
  const [chipIndex, setChipIndex] = useState(0);
  const chips = ["94.7% confidence", "Stage 2 Detected", "GENUINE ✓", "Network Mapped", "Scam Intercepted"];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setChipIndex(i => (i + 1) % chips.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: C.void }}>
      <HexGrid />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,200,255,0.06) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 40% 60% at 30% 50%, rgba(255,107,0,0.04) 0%, transparent 60%)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 grid md:grid-cols-[55fr_45fr] gap-12 items-center">
        {/* Left copy */}
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8" style={{ background: "rgba(0,200,255,0.08)", border: `1px solid rgba(0,200,255,0.25)` }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.ice, display: "inline-block", boxShadow: `0 0 8px ${C.ice}` }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", color: C.ice, textTransform: "uppercase" }}>
              ET AI Hackathon 2.0 · Digital Public Safety
            </span>
          </div>

          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 1.02, letterSpacing: "-0.04em", color: C.t1 }}>
            India&apos;s AI<br />
            that <span style={{ color: C.saffron }}>stops fraud</span><br />
            before <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.85em", color: C.gold }}>₹1</span> moves.
          </h1>

          <p className="mt-6 mb-10 max-w-xl" style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", lineHeight: 1.65, color: C.t2, fontWeight: 400 }}>
            Digital arrest scams stole <span style={{ color: C.t1, fontFamily: "JetBrains Mono, monospace" }}>₹1,776 crore</span> in 9 months. Every existing tool activates after the money is gone. NetraGuard acts <em style={{ color: C.saffron, fontStyle: "normal", fontWeight: 600 }}>during the call</em>.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-200"
              style={{ background: C.saffron, color: "#fff", fontFamily: "Inter, sans-serif", boxShadow: `0 0 32px rgba(255,107,0,0.4)` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 40px rgba(255,107,0,0.6)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px rgba(255,107,0,0.4)`; }}
            >
              <Shield size={18} /> ⬇ Get the App
            </button>
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-200"
              style={{ ...GLASS.L1, color: C.t1, fontFamily: "Inter, sans-serif" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,255,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(30,74,128,0.3)"; }}
            >
              <Play size={16} /> Watch Demo
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6">
            {[["₹3.2Cr", "Intercepted"], ["96.4%", "Accuracy"], ["12", "Languages"]].map(([num, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "22px", color: C.t1 }}>{num}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t3, letterSpacing: "0.05em", textTransform: "uppercase" }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right shield */}
        <div className={`flex items-center justify-center relative transition-all duration-1000 delay-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative">
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,200,255,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
            <KavachShield size={360} glow />

            {/* Floating data chips */}
            {[
              { label: chips[chipIndex], x: "80%", y: "20%", color: C.emerald },
              { label: "Stage 2 Detected", x: "85%", y: "55%", color: C.gold },
              { label: "Ring Mapped", x: "5%", y: "30%", color: C.ice },
              { label: "Victim Alerted", x: "0%", y: "65%", color: C.violet },
            ].map((chip, i) => (
              <div
                key={i}
                className="absolute px-3 py-1.5 rounded-full text-xs font-semibold pointer-events-none"
                style={{
                  left: chip.x, top: chip.y,
                  background: `rgba(5,10,20,0.85)`,
                  border: `1px solid ${chip.color}40`,
                  color: chip.color,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "11px",
                  whiteSpace: "nowrap",
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 0 16px ${chip.color}20`,
                  animation: `floatChip ${2.5 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.6}s`,
                }}
              >
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: "bounceY 2s ease-in-out infinite" }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "0.1em", color: C.t3, textTransform: "uppercase" }}>Scroll</div>
        <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${C.t3}, transparent)` }} />
      </div>
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────

function StatsBar() {
  const { ref, inView } = useInView(0.3);
  const c1 = useCounter(1140000, 2000, inView);
  const c2 = useCounter(1776, 2000, inView);
  const c3 = useCounter(60, 1800, inView);

  const stats = [
    { value: c1 >= 1000000 ? `${(c1 / 1000000).toFixed(2)}M` : c1.toLocaleString("en-IN"), label: "Cybercrime complaints in 2023", accent: C.crimson },
    { value: `₹${c2.toLocaleString("en-IN")} Cr`, label: "Stolen via digital arrest scams (9 months)", accent: C.gold },
    { value: `${c3}%`, label: "Year-on-year growth in complaint volume", accent: C.saffron },
  ];

  return (
    <section id="stats" ref={ref as React.RefObject<HTMLElement>} className="relative overflow-hidden" style={{ background: C.deep, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: C.border }}>
        {stats.map((s, i) => (
          <div key={i} className="px-8 md:px-12 py-10 flex flex-col gap-2">
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 4vw, 56px)", letterSpacing: "-0.03em", color: s.accent, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: C.t2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PARADIGM SHIFT ───────────────────────────────────────────────────────────

function ParadigmShift() {
  const before = [
    { tool: "Truecaller", when: "After call reaches phone", timing: "AFTER" },
    { tool: "NCRP Portal", when: "After money is already lost", timing: "AFTER" },
    { tool: "Bank Systems", when: "After transaction processes", timing: "AFTER" },
    { tool: "RBI Training", when: "After fake notes circulate", timing: "AFTER" },
  ];
  const after = [
    { action: "Interrupt the scam call", timing: "IN PROGRESS" },
    { action: "Detect the fake note", timing: "AT THE COUNTER" },
    { action: "Map the fraud ring", timing: "BEFORE MASS VICTIMIZATION" },
    { action: "Generate court evidence", timing: "AUTOMATICALLY" },
  ];

  return (
    <section id="problem" className="py-24 px-6 md:px-12" style={{ background: C.void }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal dir="up" className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest" style={{ background: "rgba(255,23,68,0.1)", color: C.crimson, border: `1px solid rgba(255,23,68,0.3)`, fontFamily: "Inter, sans-serif" }}>
            The Problem
          </div>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 48px)", color: C.t1, letterSpacing: "-0.02em" }}>
            Every tool acts <em style={{ color: C.crimson, fontStyle: "normal" }}>after</em> the damage.
          </h2>
          <p className="mt-3 max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: C.t2 }}>
            NetraGuard is the only platform that operates <strong style={{ color: C.emerald }}>during the attack</strong>.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <ScrollReveal dir="left">
          <div className="p-8 rounded-2xl" style={GLASS.L3}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,23,68,0.2)" }}>
                <X size={16} color={C.crimson} />
              </div>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "20px", color: C.t1 }}>What Exists Today</h3>
            </div>
            <div className="space-y-4">
              {before.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-3 rounded-xl px-4" style={{ background: "rgba(255,23,68,0.05)", border: "1px solid rgba(255,23,68,0.1)" }}>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: C.t1 }}>{item.tool}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2, marginTop: 2 }}>{item.when}</div>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,23,68,0.2)", color: C.crimson, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.04em" }}>
                    {item.timing}
                  </span>
                </div>
              ))}
            </div>
          </div>

          </ScrollReveal>
          {/* After */}
          <ScrollReveal dir="right" delay={120}>
          <div className="p-8 rounded-2xl" style={GLASS.L4}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(0,229,160,0.2)" }}>
                <Check size={16} color={C.emerald} />
              </div>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "20px", color: C.t1 }}>NetraGuard Does</h3>
            </div>
            <div className="space-y-4">
              {after.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-3 rounded-xl px-4" style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.12)" }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: C.t1 }}>{item.action}</div>
                  <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(0,229,160,0.15)", color: C.emerald, fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                    {item.timing}
                  </span>
                </div>
              ))}
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────

function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
  const { ref, onMove, onLeave } = useTilt(4);
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="p-6 rounded-2xl group cursor-default"
      style={{ ...GLASS.L1, transition: "box-shadow 0.3s ease" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${feature.color}30 inset, 0 8px 40px rgba(0,0,0,0.6), 0 0 60px ${feature.color}15`; (e.currentTarget as HTMLElement).style.borderColor = `${feature.color}40`; }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}10)`, border: `1px solid ${feature.color}35` }}>
          <Icon size={22} color={feature.color} />
        </div>
        <div className="pt-1">
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.t3, marginBottom: 4 }}>{feature.num}</div>
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "17px", color: C.t1, lineHeight: 1.3 }}>{feature.title}</h3>
        </div>
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: C.t2, lineHeight: 1.65 }}>{feature.desc}</p>
      <div className="mt-5 flex items-center gap-1 text-sm font-medium transition-all duration-200 group-hover:gap-2" style={{ color: feature.color, fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
        Learn more <ChevronRight size={14} />
      </div>
    </div>
  );
}

function FeaturePillars() {
  return (
    <section id="features" className="py-24 px-6 md:px-12" style={{ background: C.deep }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal dir="up" className="text-center mb-16">
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: C.t1, letterSpacing: "-0.02em" }}>
            Six Capabilities.<br /><span style={{ color: C.saffron }}>Zero Competitors.</span>
          </h2>
          <p className="mt-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: C.t2 }}>Every one of these is a world-first.</p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.num} dir="up" delay={i * 80}>
              <FeatureCard feature={f} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LIVE DEMO PREVIEW ────────────────────────────────────────────────────────

const DEMO_STAGES = [
  { stage: 1, label: "Authority Claim", confidence: "91.2%", active: false },
  { stage: 2, label: "Fear Tactics", confidence: "94.7%", active: false },
  { stage: 3, label: "Isolation", confidence: "78.3%", active: false },
  { stage: 4, label: "Payment Demand", confidence: "—", active: false },
];

// runId prop: increment to restart the demo sequence from scratch
function PhoneDemo({ runId }: { runId: number }) {
  const [step, setStep] = useState(0);

  // Runs once on mount and again whenever runId changes (user clicked replay)
  useEffect(() => {
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 1500);  // stage 1 chip
    const t2 = setTimeout(() => setStep(2), 3000);  // stage 2 chip + yellow warning
    const t3 = setTimeout(() => setStep(3), 5000);  // red scam overlay
    const t4 = setTimeout(() => setStep(0), 10000); // auto-reset for loop
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [runId]); // ← clean single dependency: only restart when runId changes

  const callDuration = step === 0 ? "0:00" : step === 1 ? "0:08" : step === 2 ? "0:15" : "0:23";

  const stageColor = (i: number) => {
    if (step < i + 1) return C.t3;
    return i < 2 ? C.crimson : C.gold;
  };

  return (
    <div className="relative mx-auto" style={{ width: 240, height: 490 }}>
      <div className="absolute inset-0 rounded-[36px]" style={{ border: `2px solid ${C.borderGlow}`, background: C.deep, boxShadow: `0 0 60px rgba(0,200,255,0.12), 0 20px 60px rgba(0,0,0,0.6)` }} />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full" style={{ background: C.void, border: `1px solid ${C.border}` }} />

      <div className="absolute rounded-[34px] overflow-hidden" style={{ top: 2, left: 2, right: 2, bottom: 2 }}>

        {/* Base call screen — always visible underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background: C.navy }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3 }}>Incoming Call</div>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: C.t1 }}>+91-9XXXXXX042</div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.gold }}>CBI Officer</div>
          <div className="w-12 h-12 rounded-full mt-2 flex items-center justify-center" style={{ background: "rgba(0,229,160,0.2)" }}>
            <Phone size={20} color={C.emerald} />
          </div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: C.ice, marginTop: 8 }}>
            {callDuration}
          </div>
        </div>

        {/* Stage chips slide up one by one */}
        {step >= 1 && (
          <div className="absolute bottom-14 left-0 right-0 px-4 flex flex-col gap-1.5" style={{ animation: "revealUp 0.4s ease-out" }}>
            {DEMO_STAGES.slice(0, Math.min(step, 2)).map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-3 py-1.5"
                style={{ background: "rgba(5,10,20,0.92)", border: `1px solid ${stageColor(i)}50`, backdropFilter: "blur(8px)" }}>
                <div className="flex items-center gap-2">
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: stageColor(i), display: "inline-block", animation: "pulseRing 1.5s ease-in-out infinite" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t2 }}>{s.label}</span>
                </div>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: stageColor(i), fontWeight: 700 }}>{s.confidence}</span>
              </div>
            ))}
          </div>
        )}

        {/* Yellow banner at step 2 */}
        {step === 2 && (
          <div className="absolute top-10 left-2 right-2 rounded-lg px-3 py-2 flex items-center gap-2"
            style={{ background: "rgba(255,184,0,0.18)", border: `1px solid rgba(255,184,0,0.5)`, animation: "revealUp 0.35s ease-out" }}>
            <AlertTriangle size={12} color={C.gold} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.gold, fontWeight: 600 }}>2 manipulation stages detected</span>
          </div>
        )}

        {/* Full-screen scam overlay at step 3 */}
        {step >= 3 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4"
            style={{ background: "linear-gradient(160deg, rgba(255,23,68,0.22) 0%, rgba(5,10,20,0.97) 100%)", backdropFilter: "blur(4px)", animation: "revealFade 0.4s ease-out" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,23,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,23,68,0.5)", animation: "pulseRing 1.3s ease-in-out infinite" }}>
              <AlertTriangle size={22} color={C.crimson} />
            </div>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "17px", color: C.t1, textAlign: "center", letterSpacing: "-0.01em" }}>⚠️ SCAM DETECTED</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.65)", textAlign: "center" }}>This call shows fraud patterns</div>
            <button className="w-full py-3 rounded-xl font-bold" style={{ background: C.crimson, color: "#fff", fontFamily: "Space Grotesk, sans-serif", fontSize: "14px", fontWeight: 800, boxShadow: `0 0 24px rgba(255,23,68,0.5)` }}>
              🚫 HANG UP NOW
            </button>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: C.emerald }}>Confidence: 94.7%</div>
          </div>
        )}
      </div>
    </div>
  );
}

function LiveDemoPreview() {
  const [runId, setRunId] = useState(0);        // increment to restart demo
  const [started, setStarted] = useState(false); // has user clicked at least once?
  const [activeStep, setActiveStep] = useState(0); // mirrors PhoneDemo for timeline highlight

  // Mirror the phone demo steps in the left-side timeline
  useEffect(() => {
    if (!started) return;
    setActiveStep(0);
    const t1 = setTimeout(() => setActiveStep(1), 1500);
    const t2 = setTimeout(() => setActiveStep(2), 3000);
    const t3 = setTimeout(() => setActiveStep(3), 5000);
    const t4 = setTimeout(() => setActiveStep(0), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [runId, started]);

  const handleRun = () => {
    setStarted(true);
    setRunId(id => id + 1);
  };

  const timelineItems = [
    { t: "0.0s", e: "Call connected, monitoring begins", step: 0 },
    { t: "1.5s", e: "Stage 1: Authority claim detected (91.2%)", step: 1 },
    { t: "3.0s", e: "Stage 2: Fear tactics detected (94.7%)", step: 2 },
    { t: "5.0s", e: "Interrupt overlay fires on victim device", step: 3 },
  ];

  return (
    <section id="demo" className="py-24 px-6 md:px-12 overflow-hidden" style={{ background: C.void }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal dir="left">
        <div>
          <div className="inline-block px-4 py-1 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest" style={{ background: "rgba(0,229,160,0.1)", color: C.emerald, border: `1px solid rgba(0,229,160,0.3)`, fontFamily: "Inter, sans-serif" }}>
            See It In Action
          </div>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 40px)", color: C.t1, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Watch a scam get stopped.<br /><span style={{ color: C.saffron }}>Live.</span>
          </h2>
          <p className="mt-5 mb-8" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: C.t2, lineHeight: 1.7 }}>
            In <span style={{ fontFamily: "JetBrains Mono, monospace", color: C.gold }}>2.3 seconds</span>, NetraGuard detects 2 manipulation stages in a live call and fires an interrupt overlay on the victim&apos;s phone — before any money moves.
          </p>

          {/* Timeline — lights up as demo progresses */}
          <div className="space-y-3 mb-8">
            {timelineItems.map((item, i) => {
              const isActive = started && activeStep >= item.step && !(activeStep === 0 && item.step > 0);
              const isCurrent = started && activeStep === item.step;
              return (
                <div key={i} className="flex items-start gap-4 transition-all duration-500"
                  style={{ opacity: started ? (isActive ? 1 : 0.35) : 0.55 }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: isCurrent ? C.saffron : isActive ? C.ice : C.t3, minWidth: 36, transition: "color 0.3s" }}>{item.t}</span>
                  <div className="flex items-center gap-2">
                    {isCurrent && <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.saffron, display: "inline-block", animation: "pulseRing 1s ease-in-out infinite", flexShrink: 0 }} />}
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: isCurrent ? C.t1 : isActive ? C.t2 : C.t3, fontWeight: isCurrent ? 600 : 400, transition: "color 0.3s" }}>{item.e}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-all duration-200"
            style={{ background: started ? "rgba(255,107,0,0.15)" : C.saffron, border: started ? `1px solid rgba(255,107,0,0.4)` : "none", color: started ? C.saffron : "#fff", fontFamily: "Inter, sans-serif", fontSize: "14px", boxShadow: started ? "none" : `0 0 24px rgba(255,107,0,0.4)` }}
            onMouseEnter={e => { if (!started) (e.currentTarget.style.transform = "translateY(-2px)"); }}
            onMouseLeave={e => { (e.currentTarget.style.transform = ""); }}
            onClick={handleRun}
          >
            <Play size={16} fill={started ? "none" : "currentColor"} />
            {started ? "↺ Replay Demo" : "▶ Run Demo"}
          </button>
        </div>
        </ScrollReveal>

        <ScrollReveal dir="right" delay={150}>
          <div className="flex justify-center">
            <PhoneDemo runId={runId} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── WHO IT PROTECTS ──────────────────────────────────────────────────────────

function WhoItProtects() {
  return (
    <section id="personas" className="py-24 px-6 md:px-12" style={{ background: C.deep }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal dir="up" className="text-center mb-16">
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: C.t1, letterSpacing: "-0.02em" }}>
            Who It Protects
          </h2>
          <p className="mt-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: C.t2 }}>
            Four stakeholders. One integrated platform.
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PERSONAS.map((p, i) => (
            <ScrollReveal key={i} dir="up" delay={i * 90}>
            <div className="p-6 rounded-2xl flex flex-col gap-4 group transition-all duration-300 hover:-translate-y-1" style={{ ...GLASS.L1, cursor: "default" }}>
              <div className="text-3xl">{p.avatar}</div>
              <div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: C.t1 }}>{p.role}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: p.color, marginTop: 4, fontWeight: 500 }}>{p.need}</div>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2, lineHeight: 1.6, flex: 1 }}>{p.how}</p>
              <div className="inline-block self-start px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}35`, fontFamily: "Inter, sans-serif", letterSpacing: "0.03em" }}>
                {p.chip}
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ARCHITECTURE ─────────────────────────────────────────────────────────────

function ArchitectureSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="architecture" className="py-24 px-6 md:px-12 overflow-hidden" style={{ background: C.void }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal dir="up" className="text-center mb-16">
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: C.t1, letterSpacing: "-0.02em" }}>
            7-Layer Intelligence Architecture
          </h2>
          <p className="mt-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: C.t2 }}>
            From citizen phone call to court-ready evidence — in under 3 seconds.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {ARCH_LAYERS.map((layer, i) => {
            const Icon = layer.icon;
            const isHovered = hovered === i;
            return (
              <ScrollReveal key={i} dir="up" delay={i * 70}>
              <div
                className="p-4 rounded-xl flex flex-col gap-3 cursor-default transition-all duration-300"
                style={{ ...GLASS.L1, border: isHovered ? `1px solid ${layer.color}50` : undefined, boxShadow: isHovered ? `0 0 40px ${layer.color}15` : undefined }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${layer.color}18`, border: `1px solid ${layer.color}30` }}>
                  <Icon size={16} color={layer.color} />
                </div>
                <div>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t1 }}>{layer.name}</div>
                  <div className="mt-2 flex flex-col gap-1">
                    {layer.components.map((c, j) => (
                      <div key={j} className="px-2 py-0.5 rounded" style={{ background: `${layer.color}08`, border: `1px solid ${layer.color}20` }}>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: C.t3 }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {i < ARCH_LAYERS.length - 1 && (
                  <div className="absolute -right-2 top-1/2 hidden lg:block" style={{ width: 4, height: 4, borderRadius: "50%", background: layer.color, boxShadow: `0 0 8px ${layer.color}` }} />
                )}
              </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── MARKET MATRIX ────────────────────────────────────────────────────────────

function MarketMatrix() {
  return (
    <section id="comparison" className="py-24 px-6 md:px-12" style={{ background: C.deep }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal dir="up" className="text-center mb-14">
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.5vw, 42px)", color: C.t1, letterSpacing: "-0.02em" }}>
            The only platform that operates<br />
            <span style={{ color: C.saffron }}>DURING the attack.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal dir="up" delay={100}>
        <div className="overflow-x-auto rounded-2xl" style={{ border: `1px solid ${C.border}` }}>
          <table className="w-full border-collapse" style={{ fontFamily: "Inter, sans-serif" }}>
            <thead>
              <tr style={{ background: C.navy }}>
                <th className="text-left px-5 py-4" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t3, width: "28%", borderBottom: `1px solid ${C.border}` }}>
                  Capability
                </th>
                {MATRIX_COLS.map(col => (
                  <th key={col} className="px-4 py-4 text-center" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t2, borderBottom: `1px solid ${C.border}`, borderLeft: `1px solid ${C.border}` }}>
                    {col}
                  </th>
                ))}
                <th className="px-4 py-4 text-center" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "13px", color: "#fff", background: `rgba(255,107,0,0.18)`, borderBottom: `1px solid ${C.saffron}50`, borderLeft: `1px solid ${C.saffron}50` }}>
                  NetraGuard
                </th>
              </tr>
            </thead>
            <tbody>
              {MATRIX_ROWS.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: `1px solid ${C.border}` }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5" style={{ fontSize: "13px", color: C.t2 }}>{row}</td>
                  {MATRIX_DATA[ri].map((has, ci) => (
                    <td key={ci} className="px-4 py-3.5 text-center" style={{ borderLeft: `1px solid ${C.border}` }}>
                      {has
                        ? <span style={{ color: C.emerald, fontSize: "14px" }}>✓</span>
                        : <span style={{ color: C.t3, fontSize: "16px" }}>—</span>
                      }
                    </td>
                  ))}
                  <td className="px-4 py-3.5 text-center" style={{ borderLeft: `1px solid ${C.saffron}40`, background: "rgba(255,107,0,0.05)" }}>
                    <span className="inline-flex items-center gap-1" style={{ color: C.emerald, fontWeight: 700, fontFamily: "JetBrains Mono, monospace", fontSize: "12px" }}>
                      <Check size={12} /> YES
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── ROADMAP ─────────────────────────────────────────────────────────────────

const ROADMAP_DETAIL: Record<string, { kpi: string; kpiLabel: string; who: string; highlight: string }> = {
  MVP:      { kpi: "Live",     kpiLabel: "Status",          who: "Hackathon judges & early testers", highlight: "First real-time scam interception in under 2.3s — demonstrated live." },
  Pilot:    { kpi: "3 States", kpiLabel: "Police Tie-ups",  who: "State cyber crime units & 50 bank branches", highlight: "Validation phase with real FIR data. Target: 500 fraud calls intercepted/day." },
  Scale:    { kpi: "250K",     kpiLabel: "Citizens covered", who: "Citizens, telcos, MHA officials", highlight: "National telecom API gives us pre-call intelligence. Campaign prediction goes live." },
  National: { kpi: "28",       kpiLabel: "States covered",  who: "All Indians, judiciary, RBI", highlight: "Supreme Court submission pipeline active. RBI-certified note scanner in every bank." },
};

function RoadmapSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="roadmap" className="py-24 px-6 md:px-12 overflow-hidden" style={{ background: C.void }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal dir="up" className="text-center mb-4">
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", color: C.t1, letterSpacing: "-0.02em" }}>
            Roadmap to National Scale
          </h2>
        </ScrollReveal>
        <ScrollReveal dir="fade" delay={100} className="text-center mb-14">
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: C.t3 }}>Click any phase to explore details</p>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline connector */}
          <div className="absolute top-[28px] left-0 right-0 hidden md:block" style={{ height: 1, background: `linear-gradient(to right, transparent, ${C.borderGlow}, transparent)` }} />

          <div className="grid md:grid-cols-4 gap-4">
            {ROADMAP.map((node, i) => {
              const isLive = node.status === "live";
              const isActive = active === i;
              const color = isLive ? C.emerald : node.status === "upcoming" ? C.saffron : C.t3;
              const detail = ROADMAP_DETAIL[node.phase];

              return (
                <ScrollReveal key={i} dir="up" delay={i * 100}>
                  <div
                    className="relative flex flex-col gap-3 cursor-pointer group"
                    onClick={() => setActive(isActive ? null : i)}
                  >
                    {/* Node circle */}
                    <div className="flex items-center gap-3 md:flex-col md:items-start">
                      <div className="relative shrink-0">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: isActive ? `${color}30` : `${color}18`,
                            border: `2px solid ${isActive ? color : `${color}50`}`,
                            boxShadow: isActive ? `0 0 32px ${color}50` : isLive ? `0 0 24px ${color}40` : "none",
                            transform: isActive ? "scale(1.1)" : "scale(1)",
                          }}
                        >
                          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "13px", color }}>{i + 1}</span>
                        </div>
                        {isLive && (
                          <div className="absolute -right-0.5 -top-0.5 w-3.5 h-3.5 rounded-full" style={{ background: C.emerald, boxShadow: `0 0 8px ${C.emerald}`, animation: "pulseRing 2s ease-in-out infinite" }} />
                        )}
                      </div>
                      <div>
                        <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "16px", color: isActive ? color : C.t1, transition: "color 0.2s" }}>{node.phase}</div>
                        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.t3 }}>{node.timing}</div>
                      </div>
                    </div>

                    {/* Card */}
                    <div
                      className="rounded-xl flex-1 overflow-hidden transition-all duration-300"
                      style={{
                        ...GLASS.L1,
                        border: isActive ? `1px solid ${color}60` : `1px solid ${color}25`,
                        boxShadow: isActive ? `0 0 40px ${color}20` : undefined,
                      }}
                    >
                      {/* Always-visible items */}
                      <div className="p-4">
                        {isLive && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3" style={{ background: "rgba(0,229,160,0.15)", border: "1px solid rgba(0,229,160,0.3)" }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.emerald, display: "inline-block", animation: "pulseRing 1.5s infinite" }} />
                            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: C.emerald, letterSpacing: "0.06em" }}>LIVE NOW</span>
                          </div>
                        )}
                        <ul className="space-y-2">
                          {node.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span style={{ color, marginTop: 3, flexShrink: 0 }}>
                                {isLive ? <Check size={11} /> : <ChevronRight size={11} />}
                              </span>
                              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: isActive ? C.t2 : isLive ? C.t2 : C.t3, lineHeight: 1.5, transition: "color 0.2s" }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Expanded detail — visible only when active */}
                      {isActive && (
                        <div className="px-4 pb-4 pt-2 flex flex-col gap-3" style={{ borderTop: `1px solid ${color}20`, animation: "revealUp 0.3s ease-out" }}>
                          {/* KPI */}
                          <div className="flex items-center gap-3">
                            <div className="px-3 py-2 rounded-xl text-center" style={{ background: `${color}15`, border: `1px solid ${color}30`, minWidth: 56 }}>
                              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "17px", color, lineHeight: 1 }}>{detail.kpi}</div>
                              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: C.t3, marginTop: 3 }}>{detail.kpiLabel}</div>
                            </div>
                            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t2, lineHeight: 1.5 }}>{detail.highlight}</div>
                          </div>
                          {/* Stakeholders */}
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3 }}>
                            <span style={{ color: C.t2, fontWeight: 600 }}>For: </span>{detail.who}
                          </div>
                        </div>
                      )}

                      {/* Expand/collapse hint */}
                      <div className="px-4 pb-3 flex items-center justify-end gap-1" style={{ opacity: 0.4 }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t3 }}>{isActive ? "collapse" : "details"}</span>
                        <ChevronRight size={10} color={C.t3} style={{ transform: isActive ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA FOOTER ──────────────────────────────────────────────────────────────

function CTAFooter() {
  return (
    <footer id="contact" style={{ background: C.deep, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <ScrollReveal dir="scale">
        <div className="relative inline-block mb-8 opacity-10">
          <KavachShield size={120} />
        </div>
        <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", color: C.t1, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Make India&apos;s digital future<br /><span style={{ color: C.saffron }}>untouchable.</span>
        </h2>
        <p className="mt-5 mb-10 max-w-lg mx-auto" style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: C.t2, lineHeight: 1.7 }}>
          Join us in building the national fraud intelligence platform. Partner with NetraGuard.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button className="px-7 py-3.5 rounded-full font-semibold" style={{ background: C.saffron, color: "#fff", fontFamily: "Inter, sans-serif", boxShadow: `0 0 32px rgba(255,107,0,0.4)` }}>
            Request Pilot Partnership
          </button>
          <button className="px-7 py-3.5 rounded-full font-semibold" style={{ ...GLASS.L1, color: C.t1, fontFamily: "Inter, sans-serif" }}>
            Watch Full Demo
          </button>
        </div>
        </ScrollReveal>

        <div style={{ borderTop: `1px solid ${C.border}` }} className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "15px", color: C.t1 }}>
            Cyber<span style={{ color: C.saffron }}>Kavach</span> AI
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t3, textAlign: "center" }}>
            ET AI Hackathon 2.0 · Problem Statement 6 · Digital Public Safety
          </div>
          <div className="flex items-center gap-5">
            {["Privacy", "Architecture", "GitHub"].map(l => (
              <a key={l} href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t3 }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MOBILE APP VIEW ──────────────────────────────────────────────────────────

function MobileAppView() {
  const [screen, setScreen] = useState<"home" | "scam" | "scanner" | "complaint" | "calls" | "guide" | "settings" | "check_call">("home");
  const [showFamilyAlert, setShowFamilyAlert] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [checkResult, setCheckResult] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  useEffect(() => {
    fetch("http://localhost:8000/api/user/settings")
      .then(r => r.json())
      .then(d => setEmergencyContact(d.emergency_contact || ""))
      .catch(e => console.error("Error fetching settings:", e));
  }, []);

  const triggerFamilyAlert = () => {
    setShowFamilyAlert(true);
    
    // Open WhatsApp with a pre-filled emergency message
    // Use dynamic contact fetched from backend
    const message = encodeURIComponent("*EMERGENCY:* I suspect I am being targeted by a cyber fraud scam. Please call me immediately!");
    if (emergencyContact) {
      window.open(`https://wa.me/${emergencyContact}?text=${message}`, "_blank");
    }

    setTimeout(() => setShowFamilyAlert(false), 3000);
  };
  const { lang, setLang } = useLang();
  const t = T[lang];
  
  // Backend Integration States
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsScanning(true);
    setScanResult(null);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      const res = await fetch("http://localhost:8000/api/counterfeit/scan", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      console.error("Scan error", err);
    } finally {
      setIsScanning(false);
    }
  };

  const featureChecks = [t.watermark, t.secThread, t.rbiSeal, t.serialNum, t.colourShift, t.microprint];

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pb-16" style={{ background: C.void, paddingTop: 96 }}>
      <HexGrid />
      <div className="relative z-10 w-full max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "26px", color: C.t1 }}>Citizen Fraud Shield</h2>
          <p className="mt-1" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2 }}>Designed for every Indian — simple, fast, safe</p>
        </div>

        {/* Screen tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {[["home", "🏠 Home"], ["scam", "🚨 Scam Alert"], ["scanner", "📷 Note Scanner"]].map(([s, l]) => (
            <button key={s} onClick={() => setScreen(s as "home" | "scam" | "scanner")}
              className="px-4 py-2 rounded-full text-sm transition-all"
              style={{ background: screen === s ? C.saffron : "rgba(14,31,53,0.8)", color: screen === s ? "#fff" : C.t2, border: `1px solid ${screen === s ? C.saffron : C.border}`, fontFamily: "Inter, sans-serif" }}>
              {l}
            </button>
          ))}
        </div>

        {/* Two-column layout: phone + improvements callout */}
        <div className="flex gap-8 items-start justify-center">

          {/* Phone mockup */}
          <div className="shrink-0" style={{ width: 320, aspectRatio: "9 / 20" }}>
            <div className="rounded-[44px] overflow-hidden flex flex-col h-full bg-void relative" style={{ border: `2px solid ${C.borderGlow}`, boxShadow: `0 0 80px rgba(0,200,255,0.12)` }}>
              
              {showFamilyAlert && (
                <div className="absolute top-16 left-4 right-4 z-50 p-3 rounded-xl flex items-center gap-3" style={{ background: C.emerald, boxShadow: "0 8px 32px rgba(0,229,160,0.4)" }}>
                  <span className="text-xl">✅</span>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "13px", color: C.void }}>Alert Broadcasted</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(5,10,20,0.8)" }}>Live location shared with 3 emergency contacts</div>
                  </div>
                </div>
              )}

              {/* Status bar */}
              <div className="px-6 pt-4 pb-2 flex items-center justify-between shrink-0" style={{ background: C.void }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.t3 }}>9:41</span>
                <div style={{ width: 64, height: 16, borderRadius: 8, background: C.deep, border: `1px solid ${C.border}` }} />
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.t3 }}>100%</span>
              </div>

              {/* App header */}
              <div className="px-4 py-3 flex items-center justify-between shrink-0" style={{ background: C.void, borderBottom: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-2">
                  <KavachShield size={26} glow={false} />
                  <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "14px", color: C.t1 }}>{t.appName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setLang(lang === "en" ? "hi" : "en")}
                    style={{ background: "rgba(0,229,160,0.15)", color: C.emerald, fontFamily: "Inter, sans-serif", fontSize: "10px", border: "1px solid rgba(0,229,160,0.3)", borderRadius: 999, padding: "2px 8px", cursor: "pointer" }}>
                    {lang === "en" ? "🇬🇧 EN" : "🇮🇳 HI"}
                  </button>
                  <button onClick={() => setScreen("settings")} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                    <Settings size={15} color={screen === "settings" ? C.saffron : C.t3} />
                  </button>
                </div>
              </div>

              {/* Screen content */}
              <div className="flex-1 overflow-y-auto flex flex-col" style={{ background: C.navy }}>

                {/* ── HOME SCREEN ── */}
                {/* ── HOME ── */}
                {screen === "home" && (
                  <div className="flex flex-col">
                    <div className="mx-3 mt-3 p-4 rounded-2xl" style={GLASS.L4}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5">
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.emerald, display: "inline-block", animation: "pulseRing 2s ease-in-out infinite" }} />
                          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "10px", color: C.emerald, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t.protectionActive}</span>
                        </div>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: C.t3 }}>Shield ON</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <KavachShield size={60} />
                        <div>
                          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "17px", color: C.t1, lineHeight: 1.2 }}>{t.youAreProtected}</div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t3, marginTop: 4 }}>{t.callsMonitored}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-3 mt-3 p-4 rounded-2xl flex items-center justify-between" style={{ background: "rgba(255,23,68,0.1)", border: "2px solid rgba(255,23,68,0.35)" }}>
                      <div>
                        <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "14px", color: C.t1 }}>🆘 {t.emergencyHelpline}</div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t2, marginTop: 2 }}>{t.gotScammed}</div>
                      </div>
                      <div className="flex flex-col items-center justify-center rounded-xl px-3 py-2" style={{ background: C.crimson, minWidth: 56 }}>
                        <Phone size={16} color="#fff" />
                        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "14px", color: "#fff", lineHeight: 1.2, marginTop: 2 }}>1930</span>
                      </div>
                    </div>

                    <div className="mx-3 mt-3 flex flex-col gap-2">
                      {[
                        { emoji: "📞", label: t.checkCall,     color: C.ice,     bg: "rgba(0,200,255,0.08)",  bdr: "rgba(0,200,255,0.2)", onClick: () => setScreen("check_call")  },
                        { emoji: "📸", label: t.scanNote,      color: C.gold,    bg: "rgba(255,184,0,0.08)", bdr: "rgba(255,184,0,0.2)", onClick: () => setScreen("scanner")  },
                        { emoji: "📋", label: t.fileComplaint, color: C.violet,  bg: "rgba(139,92,246,0.08)", bdr: "rgba(139,92,246,0.2)", onClick: () => setScreen("complaint") },
                        { emoji: "👨‍👩‍👧", label: t.alertFamily,   color: C.emerald, bg: "rgba(0,229,160,0.08)", bdr: "rgba(0,229,160,0.2)", onClick: triggerFamilyAlert  },
                      ].map((a, i) => (
                        <div key={i} onClick={a.onClick} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors hover:bg-white/5" style={{ background: a.bg, border: `1px solid ${a.bdr}` }}>
                          <span style={{ fontSize: "20px", lineHeight: 1 }}>{a.emoji}</span>
                          <div className="flex-1" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t1 }}>{a.label}</div>
                          <ChevronRight size={14} color={a.color} />
                        </div>
                      ))}
                    </div>

                    <div className="mx-3 mt-3 mb-3 p-3 rounded-xl" style={GLASS.L1}>
                      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: C.t1, marginBottom: 8 }}>{t.recentAlerts}</div>
                      <div className="text-center py-3">
                        <div style={{ fontSize: "24px" }}>🛡️</div>
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3, marginTop: 6 }}>{t.noThreats}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── SCAM ALERT ── */}
                {screen === "scam" && (
                  <div className="flex flex-col p-3 gap-3" style={{ background: "radial-gradient(ellipse 90% 50% at 50% 10%, rgba(255,23,68,0.18) 0%, rgba(5,10,20,0.97) 65%)" }}>
                    <div className="flex flex-col items-center py-4">
                      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,23,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulseRing 1.4s ease-in-out infinite", border: "2px solid rgba(255,23,68,0.5)" }}>
                        <AlertTriangle size={30} color={C.crimson} />
                      </div>
                      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "22px", color: C.t1, marginTop: 10, textAlign: "center" }}>⚠️ {t.fraudAlert}</div>
                      <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "15px", color: C.crimson, textAlign: "center" }}>{t.scamDetected}</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2, textAlign: "center", marginTop: 4 }}>{t.callShowsFraud}</div>
                    </div>

                    <button className="w-full py-4 rounded-2xl font-bold text-center" style={{ background: C.crimson, color: "#fff", fontFamily: "Space Grotesk, sans-serif", fontSize: "18px", fontWeight: 800, boxShadow: `0 0 32px rgba(255,23,68,0.55)` }}>
                      🚫 {t.hangUp}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-3 rounded-xl text-center" style={{ background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.35)", color: C.saffron, fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600 }}>
                        📞 {t.callHelpline}
                      </button>
                      <button className="py-3 rounded-xl text-center" style={{ ...GLASS.L1, color: C.t1, fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600 }}>
                        👨‍👩‍👧 {t.alertFamilyBtn}
                      </button>
                    </div>

                    <div className="p-3 rounded-xl" style={{ background: "rgba(14,31,53,0.85)", border: `1px solid ${C.border}` }}>
                      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "11px", color: C.gold, marginBottom: 8 }}>{t.whatDetected}</div>
                      {[
                        { label: t.fakeOfficial,    detected: true,  partial: false },
                        { label: t.fearDemand,      detected: true,  partial: false },
                        { label: t.isolationTactic, detected: false, partial: true  },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2">
                          <span style={{ fontSize: "13px", marginTop: 1 }}>{item.detected ? "🔴" : item.partial ? "🟡" : "⚪"}</span>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: item.detected ? C.crimson : item.partial ? C.gold : C.t3, fontWeight: 600 }}>{item.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl mb-1" style={{ background: "rgba(0,229,160,0.07)", border: "1px solid rgba(0,229,160,0.2)" }}>
                      <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "11px", color: C.emerald, marginBottom: 6 }}>📝 {t.safeScriptLabel}</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t2, lineHeight: 1.7 }}>{t.safeScriptText}</div>
                    </div>
                  </div>
                )}

                {/* ── SCANNER ── */}
                {screen === "scanner" && (
                  <div className="flex flex-col flex-1" style={{ background: C.void }}>
                    <div className="relative flex items-center justify-center cursor-pointer flex-[2] min-h-[400px] overflow-hidden" style={{ background: "rgba(8,15,30,0.9)" }}>
                      <input type="file" accept="image/*" onChange={handleScan} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                      {previewUrl && (
                        <img src={previewUrl} alt="Note Preview" className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" />
                      )}
                      {[["top-5 left-5","border-t-2 border-l-2"],["top-5 right-5","border-t-2 border-r-2"],["bottom-5 left-5","border-b-2 border-l-2"],["bottom-5 right-5","border-b-2 border-r-2"]].map(([pos, cls], i) => (
                        <div key={i} className={`absolute ${pos} w-7 h-7 ${cls}`} style={{ borderColor: C.ice, opacity: 0.85 }} />
                      ))}
                      {isScanning && <div className="absolute left-8 right-8 z-10" style={{ height: 2, background: `linear-gradient(to right, transparent, ${C.ice}, transparent)`, animation: "scanLine 1.8s ease-in-out infinite" }} />}
                      {!previewUrl && (
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t1, fontWeight: 600, textAlign: "center" }}>
                          Tap to Upload Note Image
                        </div>
                      )}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full whitespace-nowrap z-10" style={{ background: "rgba(5,10,20,0.85)", border: `1px solid ${C.border}` }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.ice }}>{isScanning ? "Processing with AI..." : "Ready to scan"}</span>
                      </div>
                    </div>

                    {!isScanning && scanResult && (
                      <>
                        <div className="mx-3 mt-3 p-4 rounded-2xl text-center" style={scanResult.status === "Genuine" ? GLASS.L4 : GLASS.L3}>
                          <div style={{ fontSize: "36px" }}>{scanResult.status === "Genuine" ? "✅" : "❌"}</div>
                          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "24px", color: scanResult.status === "Genuine" ? C.emerald : C.crimson, marginTop: 4 }}>
                            {scanResult.status === "Genuine" ? t.genuineNote : "Counterfeit Note"}
                          </div>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t2, marginTop: 6 }}>
                            Confidence Score: {(scanResult.confidence_score * 100).toFixed(1)}%
                          </div>
                        </div>

                        <div className="mx-3 mt-3 mb-3">
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3, marginBottom: 6, textAlign: "center" }}>
                            {scanResult.status === "Genuine" ? t.checksPassed : "Failed Security Checks"}
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {scanResult.status === "Genuine" ? scanResult.features_analyzed.map((label: string, i: number) => (
                              <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ background: "rgba(0,229,160,0.07)", border: "1px solid rgba(0,229,160,0.18)" }}>
                                <Check size={10} color={C.emerald} />
                                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t1, fontWeight: 600 }}>{label}</span>
                              </div>
                            )) : scanResult.flags.map((label: string, i: number) => (
                              <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ background: "rgba(255,23,68,0.07)", border: "1px solid rgba(255,23,68,0.18)" }}>
                                <X size={10} color={C.crimson} />
                                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t1, fontWeight: 600 }}>{label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {!isScanning && !scanResult && (
                       <div className="mx-3 mt-3 p-4 rounded-2xl text-center" style={{ background: "rgba(14,31,53,0.5)", border: `1px solid ${C.border}` }}>
                          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2 }}>Upload a photo of a currency note to instantly verify its authenticity against 11 RBI security features.</div>
                       </div>
                    )}
                  </div>
                )}
                
                {/* ── COMPLAINT ── */}
                {screen === "complaint" && (
                  <div className="flex flex-col flex-1 p-4" style={{ background: C.void }}>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "20px", color: C.t1, marginBottom: 16 }}>File NCRP Complaint</div>
                    <div className="flex-1 flex flex-col gap-4">
                      <input type="text" placeholder="Transaction Reference No." className="px-4 py-3 rounded-xl outline-none" style={{ background: "rgba(14,31,53,0.8)", border: `1px solid ${C.border}`, color: C.t1, fontSize: "13px" }} />
                      <input type="text" placeholder="Amount Lost (₹)" className="px-4 py-3 rounded-xl outline-none" style={{ background: "rgba(14,31,53,0.8)", border: `1px solid ${C.border}`, color: C.t1, fontSize: "13px" }} />
                      <textarea placeholder="Briefly describe the incident..." rows={4} className="px-4 py-3 rounded-xl outline-none resize-none" style={{ background: "rgba(14,31,53,0.8)", border: `1px solid ${C.border}`, color: C.t1, fontSize: "13px" }} />
                      <button className="w-full py-3 mt-auto rounded-xl font-bold text-center hover:opacity-90" style={{ background: C.violet, color: "#fff", fontFamily: "Space Grotesk, sans-serif", fontSize: "16px" }}>Submit to Cyber Cell</button>
                    </div>
                  </div>
                )}
                
                {/* ── CALLS ── */}
                {screen === "calls" && (
                  <div className="flex flex-col flex-1 p-4" style={{ background: C.void }}>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "20px", color: C.t1, marginBottom: 16 }}>Call History</div>
                    <div className="flex-1 flex flex-col gap-3">
                      {[
                        { number: "+91-9876543210", duration: "4m 12s", status: "Fraud Detected", date: "Today, 14:32" },
                        { number: "Unknown Number", duration: "1m 55s", status: "Suspicious", date: "Today, 14:30" },
                        { number: "+91-8888888888", duration: "7m 30s", status: "Safe", date: "Yesterday" }
                      ].map((call, i) => (
                        <div key={i} className="p-3 rounded-xl" style={GLASS.L1}>
                          <div className="flex justify-between items-center mb-1">
                            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: C.t1 }}>{call.number}</span>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3 }}>{call.date}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: call.status === "Safe" ? C.emerald : call.status === "Suspicious" ? C.gold : C.crimson }}>{call.status}</span>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2 }}>{call.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* ── GUIDE ── */}
                {screen === "guide" && (
                  <div className="flex flex-col flex-1 p-4" style={{ background: C.void }}>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "20px", color: C.t1, marginBottom: 16 }}>Safety Guide</div>
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="p-4 rounded-xl" style={GLASS.L2}>
                        <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "15px", color: C.ice, marginBottom: 8 }}>Digital Arrest Scams</div>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2, lineHeight: 1.5 }}>Never believe callers claiming to be from CBI or Customs demanding immediate payment to avoid arrest. Hang up immediately.</p>
                      </div>
                      <div className="p-4 rounded-xl" style={GLASS.L2}>
                        <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "15px", color: C.gold, marginBottom: 8 }}>OTP Sharing</div>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2, lineHeight: 1.5 }}>Banks will never ask for your OTP over a call. Do not share your OTP with anyone.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── CHECK CALL ── */}
                {screen === "check_call" && (
                  <div className="flex flex-col flex-1 p-4" style={{ background: C.void }}>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "20px", color: C.t1, marginBottom: 16 }}>Verify Phone Number</div>
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="p-4 rounded-xl" style={GLASS.L1}>
                        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t1, marginBottom: 8 }}>Enter Number to Verify</div>
                        <input type="text" value={checkNumber} onChange={(e) => setCheckNumber(e.target.value)} placeholder="e.g. 9876543210" className="w-full px-4 py-3 rounded-xl outline-none mb-4" style={{ background: "rgba(14,31,53,0.8)", border: `1px solid ${C.border}`, color: C.t1, fontSize: "16px", letterSpacing: "1px" }} />
                        
                        <button 
                          onClick={async () => {
                            setIsChecking(true); setCheckResult(null);
                            try {
                              const r = await fetch(`http://localhost:8000/api/check-number/${checkNumber}`);
                              const d = await r.json();
                              setCheckResult(d);
                              if (d.status === "scam") {
                                setTimeout(() => setScreen("scam"), 1500);
                              }
                            } catch (e) {
                              console.error(e);
                            }
                            setIsChecking(false);
                          }} 
                          disabled={isChecking || checkNumber.length < 5}
                          className="w-full py-3 rounded-xl font-bold text-center transition-all disabled:opacity-50 hover:opacity-90 cursor-pointer" style={{ background: C.ice, color: C.void, fontFamily: "Space Grotesk, sans-serif", fontSize: "16px" }}>
                          {isChecking ? "Checking Database..." : "Verify Number"}
                        </button>
                      </div>

                      {checkResult && checkResult.status === "safe" && (
                        <div className="p-4 rounded-xl mt-4 flex items-start gap-3" style={{ background: "rgba(0,229,160,0.1)", border: `1px solid rgba(0,229,160,0.3)` }}>
                          <span className="text-xl mt-0.5">✅</span>
                          <div>
                            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "15px", color: C.emerald }}>Number Appears Safe</div>
                            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2, marginTop: 4 }}>{checkResult.reason} Risk Score: {checkResult.risk_score}/100</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── SETTINGS ── */}
                {screen === "settings" && (
                  <div className="flex flex-col flex-1 p-4" style={{ background: C.void }}>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "20px", color: C.t1, marginBottom: 16 }}>Settings</div>
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="p-4 rounded-xl" style={GLASS.L1}>
                        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t1, marginBottom: 8 }}>Emergency Contact Number</div>
                        <input type="text" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} placeholder="e.g. 919876543210" className="w-full px-4 py-3 rounded-xl outline-none" style={{ background: "rgba(14,31,53,0.8)", border: `1px solid ${C.border}`, color: C.t1, fontSize: "13px" }} />
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t3, marginTop: 8 }}>This number will receive emergency alerts when you press the "Alert my family" button.</p>
                      </div>
                      <button 
                        onClick={() => {
                          fetch("http://localhost:8000/api/user/settings", {
                            method: "POST", headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ emergency_contact: emergencyContact })
                          });
                          setScreen("home");
                        }} 
                        className="w-full py-3 mt-auto rounded-xl font-bold text-center hover:opacity-90 transition-colors" style={{ background: C.saffron, color: "#fff", fontFamily: "Space Grotesk, sans-serif", fontSize: "16px" }}>Save Settings</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom tab bar */}
              <div className="grid grid-cols-5 py-2.5 shrink-0" style={{ background: C.void, borderTop: `1px solid ${C.border}` }}>
                {[
                  { icon: Shield,        label: t.tabHome,   s: "home"    },
                  { icon: Phone,         label: t.tabCalls,  s: "calls"   },
                  { icon: Camera,        label: t.tabScan,   s: "scanner" },
                  { icon: AlertTriangle, label: t.tabAlerts, s: "scam"    },
                  { icon: Users,         label: t.tabGuide,  s: "guide"   },
                ].map((tab, i) => {
                  const active = tab.s === screen;
                  return (
                    <div key={i} className="flex flex-col items-center gap-0.5 cursor-pointer py-1"
                      onClick={() => tab.s && setScreen(tab.s as any)}>
                      <tab.icon size={17} color={active ? C.saffron : C.t3} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "8px", color: active ? C.saffron : C.t3, fontWeight: active ? 700 : 400 }}>{tab.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Feature callout */}
          <div className="hidden lg:flex flex-col gap-4 max-w-xs">
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "16px", color: C.t1 }}>Accessibility Features</div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2, lineHeight: 1.6 }}>
              Toggle between <strong style={{ color: C.ice }}>English</strong> and <strong style={{ color: C.saffron }}>Hindi</strong> using the language button inside the app header or in the main navbar. More Indian languages arrive in the Pilot phase.
            </p>
            {[
              { icon: "🆘", title: "Always-visible 1930", desc: "Emergency helpline one tap away from home screen at all times." },
              { icon: "👆", title: "Large touch targets", desc: "Full-width action rows, min 48px tap area — no small icons to miss." },
              { icon: "🟢🔴", title: "Colour + emoji cues", desc: "Status indicators require no text literacy — red/green/yellow is universal." },
              { icon: "📝", title: "Plain-language alerts", desc: "Detection results in plain language, not technical scores like \"91.2%\"." },
              { icon: "✅", title: "Verdict first", desc: "Genuine / Fake verdict shown large at the top — details come below." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl" style={GLASS.L1}>
                <span style={{ fontSize: "20px", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t1 }}>{item.title}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t2, marginTop: 2, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── LAW ENFORCEMENT DASHBOARD ────────────────────────────────────────────────

type DashSection = "network" | "interceptor" | "manipulation" | "counterfeit" | "campaign" | "evidence";

// ── Section: Fraud Network Graph ──────────────────────────────────────────────
function SectionNetworkGraph() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [NET_NODES, setNodes] = useState<any[]>([]);
  const [NET_EDGES, setEdges] = useState<any[]>([]);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/graph/network");
        const data = await res.json();
        // Map backend group to frontend types and assign random coords
        const typeMap = { 1: "victim", 2: "phone", 3: "bank" };
        const mappedNodes = data.nodes.map((n: any, i: number) => ({
          id: n.id,
          type: (typeMap as any)[n.group] || "scammer",
          label: n.label,
          // deterministic random coords based on index
          x: 20 + ((i * 17) % 60),
          y: 20 + ((i * 23) % 60),
        }));
        // Ensure a hub exists to look cool
        if (!mappedNodes.find((n:any) => n.type === "hub")) {
            mappedNodes.push({ id: "H1", type: "hub", x: 50, y: 50, label: "Hub: CK-2847" });
        }
        
        const mappedEdges = data.edges.map((e: any) => [e.source, e.target]);
        // link isolated nodes to hub
        mappedNodes.forEach((n:any) => {
            if (n.type !== "hub" && n.type !== "victim") {
                mappedEdges.push([n.id, "H1"]);
            }
        });

        setNodes(mappedNodes);
        setEdges(mappedEdges);
      } catch (err) {
        console.error("Failed to fetch graph", err);
      }
    };
    fetchGraph();
  }, []);

  const getNodeColor = (type: string) => ({ hub: C.crimson, victim: C.ice, scammer: C.saffron, bank: C.emerald, phone: C.violet } as Record<string, string>)[type] || C.t2;
  const getNodeSize = (type: string) => type === "hub" ? 10 : type === "scammer" ? 7 : 5;
  const getCoords = (id: string) => NET_NODES.find(n => n.id === id) || { x: 50, y: 50, type: "victim" };

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 relative p-4">
        <div className="w-full h-full rounded-xl overflow-hidden relative" style={{ background: C.void, border: `1px solid ${C.border}`, minHeight: 420 }}>
          <HexGrid />
          <div className="absolute top-4 left-4 z-10" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "14px", color: C.t1 }}>
            Fraud Ring: <span style={{ fontFamily: "JetBrains Mono, monospace", color: C.saffron }}>CK-2847</span>
            <span className="ml-3 text-xs" style={{ fontFamily: "JetBrains Mono, monospace", color: C.crimson }}>● ACTIVE</span>
          </div>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {NET_EDGES.map(([from, to], i) => {
              const f = getCoords(from); const t = getCoords(to);
              const isMoney = f.type === "bank" || t.type === "hub";
              return <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke={isMoney ? C.gold : C.ice} strokeWidth="0.3" strokeOpacity={isMoney ? 0.5 : 0.22} strokeDasharray={isMoney ? "1 1.5" : undefined} />;
            })}
            {NET_NODES.map(node => {
              const color = getNodeColor(node.type); const size = getNodeSize(node.type); const isAct = activeNode === node.id;
              return (
                <g key={node.id} onClick={() => setActiveNode(isAct ? null : node.id)} style={{ cursor: "pointer" }}>
                  {node.type === "hub" && <circle cx={node.x} cy={node.y} r={size * 2.2} fill={color} fillOpacity="0.07" style={{ animation: "pulseRing 2s ease-in-out infinite" }} />}
                  <circle cx={node.x} cy={node.y} r={isAct ? size * 1.4 : size} fill={color} fillOpacity="0.88" style={{ filter: `drop-shadow(0 0 ${isAct ? 6 : 3}px ${color})` }} />
                </g>
              );
            })}
          </svg>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-3">
            {[["Hub Node", C.crimson], ["Victim", C.ice], ["Scammer", C.saffron], ["Bank Account", C.emerald], ["Phone", C.violet]].map(([lbl, col]) => (
              <div key={lbl} className="flex items-center gap-1.5">
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: col }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t3 }}>{lbl}</span>
              </div>
            ))}
          </div>
          {activeNode && (
            <div className="absolute top-4 right-4 w-56 p-4 rounded-xl z-20" style={GLASS.L2}>
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: C.ice }}>{activeNode}</span>
                <button onClick={() => setActiveNode(null)}><X size={14} color={C.t3} /></button>
              </div>
              {NET_NODES.filter(n => n.id === activeNode).map(n => (
                <div key={n.id}>
                  <div className="px-2 py-1 rounded mb-2" style={{ background: `${getNodeColor(n.type)}15`, border: `1px solid ${getNodeColor(n.type)}30` }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: getNodeColor(n.type), textTransform: "uppercase", letterSpacing: "0.05em" }}>{n.type}</span>
                  </div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: C.t1, marginBottom: 4 }}>{n.label}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3 }}>Linked to {NET_EDGES.filter(e => e.includes(n.id)).length} other nodes</div>
                  <button className="mt-3 w-full py-2 rounded-lg text-xs font-semibold" style={{ background: C.saffron, color: "#fff", fontFamily: "Inter, sans-serif" }}>
                    Generate Evidence Package
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-64 shrink-0 flex flex-col" style={{ borderLeft: `1px solid ${C.border}` }}>
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t1 }}>Live Activity</span>
          <span className="flex items-center gap-1.5" style={{ fontSize: "10px", color: C.emerald, fontFamily: "JetBrains Mono, monospace" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.emerald, display: "inline-block", animation: "pulseRing 1.5s infinite" }} /> LIVE
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {[
            { time: "14:32:08", type: "fraud", msg: "New victim linked to CK-2847", id: "TXN-9841" },
            { time: "14:31:45", type: "alert", msg: "Stage 3 detected: Isolation", id: "CL-2291" },
            { time: "14:30:22", type: "report", msg: "NCRP report #471829 filed", id: "NR-471829" },
            { time: "14:29:11", type: "fraud", msg: "New scammer node discovered", id: "SC-0032" },
            { time: "14:27:58", type: "alert", msg: "₹45,000 transfer attempted", id: "TXN-9840" },
            { time: "14:26:30", type: "report", msg: "Evidence package generated", id: "EV-0841" },
            { time: "14:24:17", type: "fraud", msg: "Phone cluster match: +91-98XX", id: "PH-0441" },
          ].map((ev, i) => {
            const col = ev.type === "fraud" ? C.crimson : ev.type === "alert" ? C.gold : C.ice;
            return (
              <div key={i} className="p-2.5 rounded-lg" style={{ background: "rgba(14,31,53,0.5)", border: `1px solid ${C.border}` }}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: C.t3 }}>{ev.time}</span>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: col, display: "inline-block" }} />
                </div>
                <div style={{ fontSize: "11px", color: C.t2 }}>{ev.msg}</div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: col, marginTop: 2 }}>{ev.id}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Section: Live Scam Interceptor ────────────────────────────────────────────
function SectionInterceptor() {
  const [paused, setPaused] = useState(false);
  const intercepts = [
    { id: "CL-3041", duration: "4m 12s", source: "VoIP / International", telecom: "Reliance Jio", stages: [1, 1, 0.6, 0], confidence: 94.7, transcript: "...aapka Aadhaar block ho jayega. Aap abhi NEFT karo warna..." },
    { id: "CL-3042", duration: "1m 55s", source: "VoIP / Dubai", telecom: "Airtel", stages: [1, 0.8, 0, 0], confidence: 78.2, transcript: "...I am speaking from CBI headquarters. Your account has been flagged..." },
    { id: "CL-3043", duration: "7m 30s", source: "PSTN / Domestic", telecom: "BSNL", stages: [1, 1, 1, 0.3], confidence: 96.1, transcript: "...agar aapne abhi transfer nahi kiya toh aapko arrest hoga..." },
  ];
  const logs = [
    "14:32:09 [CL-3041] Stage 2 CONFIRMED — Phrase: 'Aadhaar block' — Conf: 94.7%",
    "14:32:07 [CL-3043] Stage 4 PARTIAL — Phrase: 'transfer karo' — Conf: 78.3%",
    "14:32:05 [CL-3042] Stage 2 CONFIRMED — Phrase: 'CBI headquarters' — Conf: 88.1%",
    "14:32:01 [CL-3043] Stage 3 CONFIRMED — Phrase: 'kisi ko mat batao' — Conf: 91.4%",
    "14:31:58 [CL-3041] Alert sent to victim +91-88XXXXXXXX",
    "14:31:55 [CL-3043] Stage 1 CONFIRMED — Phrase: 'arrest warrant' — Conf: 96.1%",
    "14:31:50 [CL-3042] Stage 1 CONFIRMED — Phrase: 'Income Tax Department' — Conf: 83.9%",
    "14:31:44 [CL-3043] New intercept — call duration 7m 30s",
  ];

  return (
    <div className="flex-1 flex flex-col overflow-auto p-6 gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: C.t1 }}>Live Call Monitoring</div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: C.t2, marginTop: 3 }}>
            <span style={{ color: C.ice }}>847</span> calls analyzed today ·
            <span style={{ color: C.crimson }}> ACTIVE INTERCEPTS: </span>
            <span className="px-2 py-0.5 rounded-full ml-1" style={{ background: "rgba(255,23,68,0.15)", color: C.crimson, fontSize: "11px", animation: "pulseRing 2s ease-in-out infinite", border: "1px solid rgba(255,23,68,0.3)" }}>3</span>
          </div>
        </div>
      </div>

      {/* Active intercept cards */}
      <div className="grid gap-4">
        {intercepts.map((call) => {
          const stageColors = [C.crimson, C.crimson, C.gold, C.t3];
          return (
            <div key={call.id} className="p-5 rounded-xl" style={call.confidence > 90 ? GLASS.L3 : GLASS.L2}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,23,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulseRing 1.5s infinite", border: "1px solid rgba(255,23,68,0.3)" }}>
                    <Phone size={15} color={C.crimson} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "14px", color: C.t1 }}>{call.id}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3 }}>{call.source} · {call.telecom} · {call.duration}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "22px", color: call.confidence > 90 ? C.crimson : C.gold, letterSpacing: "-0.02em" }}>{call.confidence}%</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t3 }}>confidence</div>
                </div>
              </div>

              {/* 4-stage funnel */}
              <div className="flex gap-1.5 mb-3">
                {call.stages.map((fill, si) => (
                  <div key={si} className="flex-1 flex flex-col gap-1">
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(14,31,53,0.8)" }}>
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${fill * 100}%`, background: fill === 1 ? stageColors[si] : fill > 0 ? C.gold : "transparent", boxShadow: fill > 0 ? `0 0 8px ${stageColors[si]}60` : "none" }} />
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: fill > 0 ? stageColors[si] : C.t3, textAlign: "center" }}>
                      {["Authority", "Fear", "Isolation", "Payment"][si]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-lg mb-3" style={{ background: "rgba(5,10,20,0.6)", border: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.t2 }}>{call.transcript}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold" style={{ background: C.saffron, color: "#fff", fontFamily: "Inter, sans-serif" }}>Send Alert to Victim</button>
                <button className="flex-1 py-1.5 rounded-lg text-xs font-semibold" style={{ ...GLASS.L1, color: C.t1, fontFamily: "Inter, sans-serif" }}>Flag to Telecom</button>
                <button className="px-3 py-1.5 rounded-lg text-xs" style={{ ...GLASS.L1, color: C.t3, fontFamily: "Inter, sans-serif" }}>Archive</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal */}
      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
        <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: "#020609", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: "#00FF41" }}>analysis_console v2.4.1</span>
          <button onClick={() => setPaused(p => !p)} className="px-3 py-1 rounded text-xs" style={{ background: "rgba(0,200,255,0.1)", color: C.ice, fontFamily: "JetBrains Mono, monospace", border: `1px solid rgba(0,200,255,0.2)` }}>
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
        </div>
        <div className="p-4" style={{ background: "#020609", height: 160, overflowY: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: "11px" }}>
          {logs.map((log, i) => {
            const color = log.includes("CONFIRMED") ? C.crimson : log.includes("PARTIAL") ? C.gold : log.includes("Alert sent") ? C.emerald : C.t3;
            return <div key={i} style={{ color, marginBottom: 4 }}>{log}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

// ── Section: Manipulation Intelligence ────────────────────────────────────────
function SectionManipulation() {
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    { name: "Authority Claim", count: 341, pct: 91, phrases: ["CBI officer", "Income Tax Dept", "Supreme Court notice", "ED investigation", "Narcotics Bureau"], color: C.ice },
    { name: "Fear Induction", count: 289, pct: 84, phrases: ["arrest warrant issued", "FIR registered", "account will be seized", "police are coming", "you will be jailed"], color: C.gold },
    { name: "Isolation Tactic", count: 198, pct: 72, phrases: ["kisi ko mat batao", "don't tell your family", "this is confidential", "case will be closed if silent"], color: C.saffron },
    { name: "Payment Demand", count: 134, pct: 61, phrases: ["transfer to safe account", "NEFT abhi karo", "Google Pay immediately", "court fee payment", "bail money"], color: C.crimson },
  ];
  const scripts = [
    { id: "SC-0041", origin: "Jharkhand cluster", calls: 127, topPhrase: "CBI digital arrest", languages: ["Hindi", "Bengali"], similarity: "94%" },
    { id: "SC-0039", origin: "Indore cluster", calls: 84, topPhrase: "Income Tax default", languages: ["Hindi", "Marathi"], similarity: "88%" },
    { id: "SC-0037", origin: "Cross-state ring", calls: 209, topPhrase: "Aadhaar drug case", languages: ["Hindi", "Tamil", "Telugu"], similarity: "91%" },
  ];

  return (
    <div className="flex-1 flex overflow-auto gap-6 p-6">
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: C.t1 }}>Psychological Fingerprinting</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2, marginTop: 3 }}>Real-time 4-stage manipulation pattern analysis across all intercepted calls</div>
        </div>

        {/* Stage cards */}
        <div className="grid grid-cols-2 gap-4">
          {stages.map((stage, i) => (
            <div key={i} onClick={() => setActiveStage(i)} className="p-4 rounded-xl cursor-pointer transition-all" style={{ ...GLASS.L1, border: activeStage === i ? `1px solid ${stage.color}60` : undefined, boxShadow: activeStage === i ? `0 0 30px ${stage.color}15` : undefined }}>
              <div className="flex items-center justify-between mb-3">
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "14px", color: stage.color }}>Stage {i + 1}: {stage.name}</div>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "16px", color: stage.color }}>{stage.count}</div>
              </div>
              <div className="h-1.5 rounded-full mb-2" style={{ background: "rgba(14,31,53,0.8)" }}>
                <div className="h-full rounded-full" style={{ width: `${stage.pct}%`, background: stage.color, boxShadow: `0 0 8px ${stage.color}50` }} />
              </div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.t3 }}>{stage.pct}% detection rate</div>
            </div>
          ))}
        </div>

        {/* Phrase cloud for selected stage */}
        <div className="p-5 rounded-xl" style={GLASS.L1}>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t1, marginBottom: 12 }}>
            Top Phrases — Stage {activeStage + 1}: {stages[activeStage].name}
          </div>
          <div className="flex flex-wrap gap-2">
            {stages[activeStage].phrases.map((phrase, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full text-xs" style={{ background: `${stages[activeStage].color}12`, border: `1px solid ${stages[activeStage].color}35`, color: stages[activeStage].color, fontFamily: "JetBrains Mono, monospace", fontSize: "11px" }}>
                "{phrase}"
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Script fingerprints */}
      <div className="w-72 shrink-0 flex flex-col gap-4">
        <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "14px", color: C.t1 }}>Script Fingerprints</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2 }}>Clusters of calls using near-identical scripts — likely same operator group.</div>
        <div className="flex flex-col gap-3">
          {scripts.map(s => (
            <div key={s.id} className="p-4 rounded-xl" style={GLASS.L1}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: C.violet }}>{s.id}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: C.emerald, fontWeight: 700 }}>{s.similarity} match</span>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t1, marginBottom: 4 }}>{s.origin}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.gold, marginBottom: 6 }}>"{s.topPhrase}"</div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">{s.languages.map(l => <span key={l} className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(0,200,255,0.1)", color: C.ice, fontFamily: "Inter, sans-serif", fontSize: "10px" }}>{l}</span>)}</div>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.t3 }}>{s.calls} calls</span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-2.5 rounded-xl text-sm font-semibold" style={{ background: C.saffron, color: "#fff", fontFamily: "Inter, sans-serif" }}>
          Export Intelligence Report
        </button>
      </div>
    </div>
  );
}

// ── Section: Counterfeit Reports ──────────────────────────────────────────────
function SectionCounterfeit() {
  const reports = [
    { id: "CNT-0841", date: "2024-01-15 09:41", location: "Karol Bagh, Delhi", denom: "₹500", failed: ["Latent Image", "Security Thread"], confidence: 97.2, status: "verified" },
    { id: "CNT-0840", date: "2024-01-15 08:22", location: "Linking Road, Mumbai", denom: "₹2000", failed: ["Watermark", "Colour Shift", "See-through Register"], confidence: 99.1, status: "escalated" },
    { id: "CNT-0839", date: "2024-01-14 17:05", location: "Gariahat, Kolkata", denom: "₹500", failed: ["Microprint", "Intaglio"], confidence: 88.4, status: "verified" },
    { id: "CNT-0838", date: "2024-01-14 14:30", location: "Commercial Street, Bengaluru", denom: "₹200", failed: ["RBI Seal", "Numeral Ratio"], confidence: 91.7, status: "under_review" },
    { id: "CNT-0837", date: "2024-01-14 11:18", location: "New Market, Bhopal", denom: "₹500", failed: ["Serial Number", "Paper Texture", "Latent Image"], confidence: 98.6, status: "escalated" },
  ];
  const statusColor = (s: string) => s === "escalated" ? C.crimson : s === "verified" ? C.emerald : C.gold;
  const statusLabel = (s: string) => s === "escalated" ? "ESCALATED" : s === "verified" ? "VERIFIED" : "UNDER REVIEW";

  return (
    <div className="flex-1 flex flex-col overflow-auto p-6 gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: C.t1 }}>Counterfeit Note Reports</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2, marginTop: 2 }}>AI-verified fake currency reports submitted via Fraud Shield app</div>
        </div>
        <div className="flex items-center gap-3">
          {[["47", "Today", C.crimson], ["312", "This Month", C.gold], ["4,891", "Total", C.ice]].map(([val, lbl, col]) => (
            <div key={lbl} className="text-center px-4 py-2 rounded-xl" style={GLASS.L1}>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: col }}>{val}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t3 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
        <table className="w-full" style={{ fontFamily: "Inter, sans-serif", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.navy }}>
              {["Report ID", "Date & Time", "Location", "Denomination", "Failed Features", "Confidence", "Status", "Action"].map(h => (
                <th key={h} className="text-left px-4 py-3" style={{ fontSize: "11px", color: C.t3, fontWeight: 600, borderBottom: `1px solid ${C.border}`, letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3"><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: C.ice }}>{r.id}</span></td>
                <td className="px-4 py-3"><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.t3 }}>{r.date}</span></td>
                <td className="px-4 py-3"><span style={{ fontSize: "12px", color: C.t2 }}>{r.location}</span></td>
                <td className="px-4 py-3"><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: C.gold, fontWeight: 700 }}>{r.denom}</span></td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {r.failed.map(f => <span key={f} className="px-1.5 py-0.5 rounded" style={{ background: "rgba(255,23,68,0.1)", color: C.crimson, fontSize: "10px", border: "1px solid rgba(255,23,68,0.2)", fontFamily: "Inter, sans-serif" }}>{f}</span>)}
                  </div>
                </td>
                <td className="px-4 py-3"><span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: C.emerald }}>{r.confidence}%</span></td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: `${statusColor(r.status)}15`, color: statusColor(r.status), border: `1px solid ${statusColor(r.status)}35`, fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.04em" }}>
                    {statusLabel(r.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(255,107,0,0.15)", color: C.saffron, border: "1px solid rgba(255,107,0,0.3)", fontFamily: "Inter, sans-serif" }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Section: Campaign Intelligence ────────────────────────────────────────────
function SectionCampaign() {
  const [alertSent, setAlertSent] = useState(false);
  const campaigns = [
    { id: "CK-2847", name: "Digital Arrest Ring", state: "Delhi / Haryana", victims: 47, atRisk: "50,000", severity: "critical", active: true },
    { id: "CK-2831", name: "Income Tax Scam Wave", state: "Maharashtra", victims: 89, atRisk: "30,000", severity: "high", active: true },
    { id: "CK-2819", name: "Aadhaar Block Fraud", state: "Jharkhand / WB", victims: 134, atRisk: "12,000", severity: "high", active: false },
    { id: "CK-2801", name: "Courier Parcel Scam", state: "Tamil Nadu", victims: 28, atRisk: "8,000", severity: "medium", active: false },
  ];
  const sevColor = (s: string) => s === "critical" ? C.crimson : s === "high" ? C.gold : C.saffron;

  // Simplified India map regions (SVG paths approximated as rectangles/ellipses)
  const regions = [
    { name: "Delhi", cx: 44, cy: 30, r: 4, intensity: 1.0 },
    { name: "Maharashtra", cx: 36, cy: 58, r: 6, intensity: 0.85 },
    { name: "Jharkhand", cx: 60, cy: 45, r: 4, intensity: 0.7 },
    { name: "WB", cx: 68, cy: 42, r: 4, intensity: 0.65 },
    { name: "Tamil Nadu", cx: 46, cy: 80, r: 5, intensity: 0.45 },
    { name: "Karnataka", cx: 40, cy: 73, r: 5, intensity: 0.4 },
    { name: "Gujarat", cx: 24, cy: 48, r: 5, intensity: 0.35 },
    { name: "UP", cx: 54, cy: 33, r: 7, intensity: 0.6 },
    { name: "Rajasthan", cx: 30, cy: 36, r: 7, intensity: 0.3 },
    { name: "Punjab", cx: 35, cy: 22, r: 4, intensity: 0.25 },
  ];

  const intensityColor = (v: number) => {
    if (v > 0.8) return C.crimson;
    if (v > 0.6) return C.gold;
    if (v > 0.4) return C.saffron;
    return C.ice;
  };

  return (
    <div className="flex-1 flex overflow-auto gap-6 p-6">
      {/* Map */}
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: C.t1 }}>Predictive Campaign Intelligence</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2, marginTop: 2 }}>Fraud campaign heat map · Click a region to target pre-emptive alerts</div>
        </div>

        {/* India heat map (simplified SVG) */}
        <div className="rounded-xl overflow-hidden relative" style={{ background: C.deep, border: `1px solid ${C.border}`, height: 280 }}>
          <HexGrid />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* rough India outline as backdrop */}
            <ellipse cx="47" cy="55" rx="28" ry="38" fill="rgba(14,31,53,0.5)" stroke={C.borderGlow} strokeWidth="0.3" />
            {regions.map(r => (
              <g key={r.name}>
                <circle cx={r.cx} cy={r.cy} r={r.r + 2} fill={intensityColor(r.intensity)} fillOpacity="0.08" />
                <circle cx={r.cx} cy={r.cy} r={r.r} fill={intensityColor(r.intensity)} fillOpacity={0.15 + r.intensity * 0.3} stroke={intensityColor(r.intensity)} strokeWidth="0.5" strokeOpacity="0.6" />
                <text x={r.cx} y={r.cy + r.r + 3} textAnchor="middle" fill={C.t3} fontSize="2.8" fontFamily="Inter, sans-serif">{r.name}</text>
              </g>
            ))}
          </svg>
          <div className="absolute bottom-3 right-3 flex items-center gap-3">
            {[["Low", C.ice], ["Medium", C.saffron], ["High", C.gold], ["Critical", C.crimson]].map(([lbl, col]) => (
              <div key={lbl} className="flex items-center gap-1">
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: col as string, opacity: 0.7 }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: C.t3 }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-emptive alert panel */}
        <div className="p-5 rounded-xl" style={GLASS.L3}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "14px", color: C.crimson }}>⚠ Campaign Alert: CK-2847</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2, marginTop: 4 }}>
                Est. <span style={{ fontFamily: "JetBrains Mono, monospace", color: C.gold }}>50,000</span> at-risk citizens in Delhi NCR / Haryana
              </div>
            </div>
            {!alertSent
              ? <button onClick={() => setAlertSent(true)} className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: C.saffron, color: "#fff", fontFamily: "Inter, sans-serif", boxShadow: `0 0 20px rgba(255,107,0,0.4)` }}>
                  Send Pre-emptive Alert
                </button>
              : <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(0,229,160,0.15)", border: "1px solid rgba(0,229,160,0.3)" }}>
                  <Check size={14} color={C.emerald} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.emerald, fontWeight: 600 }}>Alert Sent</span>
                </div>
            }
          </div>
          {alertSent && (
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[["48,219", "Alerts Sent", C.ice], ["31,087", "Delivered", C.emerald], ["12,440", "Opened", C.gold]].map(([val, lbl, col]) => (
                <div key={lbl} className="text-center p-3 rounded-lg" style={{ background: "rgba(5,10,20,0.5)" }}>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: col }}>{val}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t3 }}>{lbl}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Campaign list */}
      <div className="w-72 shrink-0 flex flex-col gap-4">
        <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "14px", color: C.t1 }}>Active Campaigns</div>
        <div className="flex flex-col gap-3">
          {campaigns.map(camp => (
            <div key={camp.id} className="p-4 rounded-xl" style={{ ...GLASS.L1, border: camp.active ? `1px solid ${sevColor(camp.severity)}40` : undefined }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: sevColor(camp.severity) }}>{camp.id}</span>
                {camp.active && <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.crimson, display: "inline-block", animation: "pulseRing 1.5s infinite" }} />}
              </div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, fontSize: "13px", color: C.t1, marginBottom: 2 }}>{camp.name}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3, marginBottom: 8 }}>{camp.state}</div>
              <div className="flex items-center justify-between">
                <div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: C.crimson, fontWeight: 700 }}>{camp.victims}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: C.t3 }}>victims</div>
                </div>
                <div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "13px", color: C.gold, fontWeight: 700 }}>{camp.atRisk}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: C.t3 }}>at-risk</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${sevColor(camp.severity)}15`, color: sevColor(camp.severity), border: `1px solid ${sevColor(camp.severity)}30`, fontFamily: "JetBrains Mono, monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {camp.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section: Evidence Packages ────────────────────────────────────────────────
function SectionEvidence() {
  const packages = [
    { id: "EV-0841", caseId: "CK-2847", type: "Fraud Network", date: "2024-01-15 14:26", nodes: 10, victims: 5, size: "4.2 MB", status: "ready", court: "Delhi HC" },
    { id: "EV-0839", caseId: "CK-2831", type: "Scam Call + Transcript", date: "2024-01-15 11:18", nodes: 4, victims: 2, size: "1.8 MB", status: "ready", court: "Bombay HC" },
    { id: "EV-0837", caseId: "CK-2819", type: "Full Ring Documentation", date: "2024-01-14 16:44", nodes: 23, victims: 18, size: "11.7 MB", status: "submitted", court: "Kolkata HC" },
    { id: "EV-0835", caseId: "CK-2801", type: "Currency + Chain of Custody", date: "2024-01-14 09:31", nodes: 3, victims: 1, size: "0.9 MB", status: "processing", court: "Madras HC" },
    { id: "EV-0833", caseId: "CK-2798", type: "Multi-State Intercept", date: "2024-01-13 22:05", nodes: 31, victims: 24, size: "18.3 MB", status: "submitted", court: "Supreme Court" },
  ];
  const statusColor = (s: string) => s === "ready" ? C.emerald : s === "submitted" ? C.ice : C.gold;
  const statusLabel = (s: string) => s === "ready" ? "READY" : s === "submitted" ? "SUBMITTED" : "PROCESSING";

  return (
    <div className="flex-1 flex flex-col overflow-auto p-6 gap-6">
      <div className="flex items-start justify-between">
        <div>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "18px", color: C.t1 }}>Evidence Packages</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: C.t2, marginTop: 2 }}>Tamper-proof, court-admissible evidence bundles — GPS, timestamp, AI confidence, chain of custody.</div>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: C.saffron, color: "#fff", fontFamily: "Inter, sans-serif" }}>
          + Generate New Package
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4">
        {[["23", "Packages Ready", C.emerald], ["11", "Submitted to Court", C.ice], ["4", "Processing", C.gold], ["38", "Total Generated", C.violet]].map(([val, lbl, col]) => (
          <div key={lbl} className="p-4 rounded-xl" style={GLASS.L1}>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "24px", color: col, letterSpacing: "-0.02em" }}>{val}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: C.t3, marginTop: 4 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Package list */}
      <div className="flex flex-col gap-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="p-5 rounded-xl flex items-center gap-6" style={GLASS.L1}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${statusColor(pkg.status)}15`, border: `1px solid ${statusColor(pkg.status)}30` }}>
              <FileText size={18} color={statusColor(pkg.status)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontWeight: 700, fontSize: "13px", color: C.t1 }}>{pkg.id}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: C.saffron }}>→ {pkg.caseId}</span>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2 }}>{pkg.type}</div>
            </div>
            <div className="text-center shrink-0">
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", color: C.ice }}>{pkg.nodes} nodes</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: C.t3 }}>{pkg.victims} victims</div>
            </div>
            <div className="text-center shrink-0">
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: C.t2 }}>{pkg.court}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: C.t3 }}>{pkg.size}</div>
            </div>
            <div className="text-right shrink-0">
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px", color: C.t3, marginBottom: 6 }}>{pkg.date}</div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${statusColor(pkg.status)}15`, color: statusColor(pkg.status), border: `1px solid ${statusColor(pkg.status)}30`, fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.05em" }}>
                {statusLabel(pkg.status)}
              </span>
            </div>
            <button className="shrink-0 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background: "rgba(255,107,0,0.12)", color: C.saffron, border: "1px solid rgba(255,107,0,0.3)", fontFamily: "Inter, sans-serif" }}>
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard Shell ────────────────────────────────────────────────────────────
function DashboardView() {
  const [section, setSection] = useState<DashSection>("network");

  const NAV_ITEMS: { id: DashSection; icon: React.ElementType; label: string }[] = [
    { id: "network",      icon: Network,    label: "Fraud Network Graph" },
    { id: "interceptor",  icon: Activity,   label: "Live Scam Interceptor" },
    { id: "manipulation", icon: Brain,      label: "Manipulation Intelligence" },
    { id: "counterfeit",  icon: DollarSign, label: "Counterfeit Reports" },
    { id: "campaign",     icon: BarChart3,  label: "Campaign Intelligence" },
    { id: "evidence",     icon: FileText,   label: "Evidence Packages" },
  ];

  const STATS_BY_SECTION: Record<DashSection, Array<{ label: string; value: string; color: string; icon: React.ElementType }>> = {
    network:      [{ label: "Active Networks Mapped", value: "47", color: C.crimson, icon: Network }, { label: "Linked Victims (30 days)", value: "1,247", color: C.ice, icon: Users }, { label: "At-Risk Capital", value: "₹3.2 Cr", color: C.gold, icon: TrendingUp }, { label: "Detection Confidence", value: "96.4%", color: C.emerald, icon: Eye }],
    interceptor:  [{ label: "Calls Analyzed Today", value: "847", color: C.ice, icon: Phone }, { label: "Active Intercepts", value: "3", color: C.crimson, icon: Activity }, { label: "Alerts Sent", value: "218", color: C.saffron, icon: Bell }, { label: "Avg Detection Time", value: "2.3s", color: C.emerald, icon: Zap }],
    manipulation: [{ label: "Scripts Identified", value: "12", color: C.violet, icon: Brain }, { label: "Stage-4 Detections", value: "134", color: C.crimson, icon: AlertTriangle }, { label: "Languages Covered", value: "12", color: C.emerald, icon: Globe }, { label: "Avg Confidence", value: "91.4%", color: C.gold, icon: Eye }],
    counterfeit:  [{ label: "Reports Today", value: "47", color: C.crimson, icon: DollarSign }, { label: "This Month", value: "312", color: C.gold, icon: TrendingUp }, { label: "Total Verified", value: "4,891", color: C.ice, icon: Check }, { label: "Avg Confidence", value: "94.7%", color: C.emerald, icon: Eye }],
    campaign:     [{ label: "Active Campaigns", value: "4", color: C.crimson, icon: Activity }, { label: "At-Risk Citizens", value: "1,00,000", color: C.gold, icon: Users }, { label: "Alerts Pre-Empted", value: "48,219", color: C.emerald, icon: Bell }, { label: "States Covered", value: "8", color: C.ice, icon: Map }],
    evidence:     [{ label: "Packages Ready", value: "23", color: C.emerald, icon: FileText }, { label: "Submitted to Court", value: "11", color: C.ice, icon: Check }, { label: "Processing", value: "4", color: C.gold, icon: Layers }, { label: "Total Generated", value: "38", color: C.violet, icon: Database }],
  };

  return (
    <div className="flex overflow-hidden" style={{ background: C.void, fontFamily: "Inter, sans-serif", height: "100dvh", paddingTop: 64 }}>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col" style={{ background: C.deep, borderRight: `1px solid ${C.border}` }}>
        <div className="p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="p-3 rounded-xl" style={{ background: "rgba(14,31,53,0.8)" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: C.t1 }}>DCP Arjun Mehta</div>
            <div style={{ fontSize: "11px", color: C.t3, marginTop: 2 }}>Cyber Crime Unit · Delhi</div>
            <div className="mt-2 inline-block px-2 py-0.5 rounded" style={{ background: "rgba(0,229,160,0.12)", color: C.emerald, fontSize: "10px", border: "1px solid rgba(0,229,160,0.25)" }}>Inspector</div>
          </div>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const isActive = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all text-left"
                style={{ background: isActive ? "rgba(255,107,0,0.12)" : "transparent", borderLeft: isActive ? `2px solid ${C.saffron}` : "2px solid transparent", color: isActive ? C.t1 : C.t2, fontSize: "13px", cursor: "pointer" }}
              >
                <item.icon size={15} color={isActive ? C.saffron : C.t3} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4" style={{ borderTop: `1px solid ${C.border}` }}>
          <div className="flex items-center gap-3">
            {[C.emerald, C.emerald, C.gold].map((c, i) => (
              <div key={i} className="flex items-center gap-1">
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
                <span style={{ fontSize: "9px", color: C.t3 }}>{["API", "STT", "DB"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-4 p-5 shrink-0" style={{ borderBottom: `1px solid ${C.border}` }}>
          {STATS_BY_SECTION[section].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl flex items-center gap-3" style={GLASS.L1}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${stat.color}15` }}>
                <stat.icon size={16} color={stat.color} />
              </div>
              <div className="min-w-0">
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "20px", color: stat.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: "10px", color: C.t3, marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{stat.label}</div>
              </div>
              <div className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.ice, boxShadow: `0 0 6px ${C.ice}`, animation: "pulseRing 2.5s ease-in-out infinite" }} />
            </div>
          ))}
        </div>

        {/* Section content */}
        <div className="flex-1 flex overflow-hidden">
          {section === "network"      && <SectionNetworkGraph />}
          {section === "interceptor"  && <SectionInterceptor />}
          {section === "manipulation" && <SectionManipulation />}
          {section === "counterfeit"  && <SectionCounterfeit />}
          {section === "campaign"     && <SectionCampaign />}
          {section === "evidence"     && <SectionEvidence />}
        </div>
      </main>
    </div>
  );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  html { scroll-behavior: smooth; }

  @keyframes floatChip {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes bounceY {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }
  @keyframes pulseRing {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.12); opacity: 0.6; }
  }
  @keyframes scanLine {
    0% { top: 10%; opacity: 1; }
    90% { top: 90%; opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  /* ── Scroll reveal keyframes ── */
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(44px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes revealLeft {
    from { opacity: 0; transform: translateX(-44px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes revealRight {
    from { opacity: 0; transform: translateX(44px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes revealFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes revealScale {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* Hidden state before animation triggers */
  .reveal-hidden { opacity: 0; }

  .reveal-up    { animation: revealUp    0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .reveal-left  { animation: revealLeft  0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .reveal-right { animation: revealRight 0.65s cubic-bezier(0.22,1,0.36,1) both; }
  .reveal-fade  { animation: revealFade  0.7s  ease-out both; }
  .reveal-scale { animation: revealScale 0.6s  cubic-bezier(0.22,1,0.36,1) both; }

  body { font-family: 'Inter', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #1E2E48; border-radius: 4px; }
`;

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState("landing");
  const [showDownload, setShowDownload] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
    <div className="min-h-screen" style={{ background: "#050A14" }}>
      <style>{GLOBAL_CSS}</style>
      <Navbar view={view} setView={setView} onDownload={() => setShowDownload(true)} />

      {view === "landing" && (
        <main>
          <HeroSection onDownload={() => setShowDownload(true)} />
          <StatsBar />
          <ParadigmShift />
          <FeaturePillars />
          <LiveDemoPreview />
          <WhoItProtects />
          <ArchitectureSection />
          <MarketMatrix />
          <RoadmapSection />
          <CTAFooter />
        </main>
      )}

      {view === "mobile" && <MobileAppView />}
      {view === "dashboard" && <DashboardView />}

      {showDownload && <DownloadModal onClose={() => setShowDownload(false)} />}
    </div>
    </LangCtx.Provider>
  );
}
