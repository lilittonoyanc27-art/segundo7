import React, { useState, useMemo } from 'react';
import {
  Volume2,
  Eye,
  EyeOff,
  Languages,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  RotateCcw,
  Search,
  Layers,
  BrainCircuit,
  Award
} from 'lucide-react';
import {
  THEORY_SUMMARY,
  SECTIONS,
  SUMMARY_POINTS,
  LADDER_CHAIN,
  ExerciseItem,
  SectionBlock
} from './data';

export default function App() {
  // State for toggled Armenian translations per item ID (or sub-elements)
  const [translationsOpen, setTranslationsOpen] = useState<Record<string, boolean>>({});
  // State for toggled Answers per item ID
  const [answersOpen, setAnswersOpen] = useState<Record<string, boolean>>({});
  // User's selected choice for multiple-choice questions
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  // Filter category
  const [activeTab, setActiveTab] = useState<'all' | 'theory' | 'exercise' | 'exam1' | 'exam2' | 'summary'>('all');
  // Search filter
  const [searchQuery, setSearchQuery] = useState('');
  // Global translation toggle
  const [globalTranslations, setGlobalTranslations] = useState(false);
  // Global answer toggle
  const [globalAnswers, setGlobalAnswers] = useState(false);
  // Audio playing indicator
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Toggle single Armenian translation
  const toggleTranslation = (id: string) => {
    setTranslationsOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle single Answer
  const toggleAnswer = (id: string) => {
    setAnswersOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle all translations
  const handleToggleAllTranslations = () => {
    const nextState = !globalTranslations;
    setGlobalTranslations(nextState);
    if (!nextState) {
      setTranslationsOpen({});
    } else {
      const all: Record<string, boolean> = { theory: true };
      SECTIONS.forEach(sec => {
        all[sec.id] = true;
        sec.items.forEach(it => {
          all[it.id] = true;
          if (it.subQuestions) {
            it.subQuestions.forEach(sq => {
              all[sq.id] = true;
            });
          }
        });
      });
      setTranslationsOpen(all);
    }
  };

  // Toggle all answers
  const handleToggleAllAnswers = () => {
    const nextState = !globalAnswers;
    setGlobalAnswers(nextState);
    if (!nextState) {
      setAnswersOpen({});
    } else {
      const all: Record<string, boolean> = {};
      SECTIONS.forEach(sec => {
        sec.items.forEach(it => {
          all[it.id] = true;
        });
      });
      setAnswersOpen(all);
    }
  };

  // Reset interactive choices
  const handleResetProgress = () => {
    setUserChoices({});
  };

  // Speech synthesis for Spanish
  const speakSpanish = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    setSpeakingId(id);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
  };

  // Score statistics
  const scoreStats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    let totalMultipleChoice = 0;

    SECTIONS.forEach(sec => {
      sec.items.forEach(it => {
        if (it.options && it.correctOptionId) {
          totalMultipleChoice++;
          const choice = userChoices[it.id];
          if (choice) {
            answered++;
            if (choice === it.correctOptionId) {
              correct++;
            }
          }
        }
      });
    });

    return { answered, correct, totalMultipleChoice };
  }, [userChoices]);

  // Filter sections
  const filteredSections = useMemo(() => {
    return SECTIONS.filter(sec => {
      if (activeTab !== 'all' && activeTab !== 'summary' && activeTab !== 'theory') {
        if (sec.category !== activeTab) return false;
      }
      if (activeTab === 'theory' && sec.category !== 'theory') return false;
      if (activeTab === 'summary') return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const secMatch = sec.titleEs.toLowerCase().includes(q) || sec.titleHy.toLowerCase().includes(q);
      const itemsMatch = sec.items.some(
        it =>
          it.questionEs.toLowerCase().includes(q) ||
          it.questionHy.toLowerCase().includes(q) ||
          it.answerEs.toLowerCase().includes(q) ||
          it.answerHy.toLowerCase().includes(q) ||
          (it.contextEs && it.contextEs.toLowerCase().includes(q))
      );
      return secMatch || itemsMatch;
    }).map(sec => {
      if (!searchQuery.trim()) return sec;
      const q = searchQuery.toLowerCase();
      return {
        ...sec,
        items: sec.items.filter(
          it =>
            it.questionEs.toLowerCase().includes(q) ||
            it.questionHy.toLowerCase().includes(q) ||
            it.answerEs.toLowerCase().includes(q) ||
            it.answerHy.toLowerCase().includes(q) ||
            (it.contextEs && it.contextEs.toLowerCase().includes(q))
        )
      };
    }).filter(sec => sec.items.length > 0 || !searchQuery.trim());
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50/50 via-slate-50 to-orange-50/30 text-slate-900 font-sans pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center px-2 py-1 bg-orange-500 text-white rounded-lg text-xs font-black uppercase tracking-wider shadow-xs shadow-orange-500/20">
                  🇪🇸 ↔️ 🇦🇲
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  1.º ESO / 7-րդ դասարան
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                  Իսպաներեն — Հայերեն
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-1 flex flex-wrap items-center gap-2">
                <span>La lengua como sistema</span>
                <span className="text-orange-400 font-light">/</span>
                <span className="text-blue-600">Լեզուն որպես համակարգ</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                💡 <span className="font-semibold text-blue-900">Ինտերակտիվ կանոն՝</span> Կտտացրեք իսպաներեն տեքստին՝ հայերեն թարգմանությունը տեսնելու համար, և առանձին սեղմեք <span className="font-bold text-orange-600">«Պատասխան»</span> կոճակը։
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <button
                onClick={handleToggleAllTranslations}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  globalTranslations
                    ? 'bg-orange-500 text-white border-orange-600 shadow-sm shadow-orange-500/30'
                    : 'bg-white text-orange-800 border-orange-200 hover:bg-orange-50'
                }`}
                title="Ցույց տալ կամ թաքցնել բոլոր հայերեն թարգմանությունները"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{globalTranslations ? 'Թաքցնել թարգմանությունները' : 'Բոլոր թարգմանությունները (🇦🇲)'}</span>
              </button>

              <button
                onClick={handleToggleAllAnswers}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                  globalAnswers
                    ? 'bg-blue-600 text-white border-blue-700 shadow-sm shadow-blue-500/30'
                    : 'bg-white text-blue-800 border-blue-200 hover:bg-blue-50'
                }`}
                title="Բացել կամ փակել բոլոր պատասխանները"
              >
                {globalAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{globalAnswers ? 'Թաքցնել պատասխանները' : 'Բոլոր պատասխանները (✅)'}</span>
              </button>

              {scoreStats.answered > 0 && (
                <button
                  onClick={handleResetProgress}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-700 border border-slate-200 hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Մաքրել թեստի ընտրված պատասխանները"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Սկսել նորից</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Language Unit Flow Ladder */}
          <div className="mt-3 pt-3 border-t border-blue-100 flex items-center gap-1 overflow-x-auto text-xs pb-1 scrollbar-thin">
            <span className="text-blue-900/70 font-bold uppercase text-[10px] tracking-wider whitespace-nowrap mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-orange-500" />
              Հիերարխիա՝
            </span>
            {THEORY_SUMMARY.chain.map((c, idx) => (
              <React.Fragment key={c.es}>
                <div
                  onClick={() => setSearchQuery(c.es)}
                  className="cursor-pointer group flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-orange-50 hover:border-orange-300 border border-blue-200/80 rounded-md transition-all whitespace-nowrap shadow-2xs"
                  title={`${c.es} (${c.hy}): ${c.descEs} — ${c.descHy}. Օրինակ՝ ${c.example}`}
                >
                  <span className="font-extrabold text-blue-950 group-hover:text-orange-600">{c.es}</span>
                  <span className="text-orange-600 font-medium text-[10px]">({c.hy})</span>
                </div>
                {idx < THEORY_SUMMARY.chain.length - 1 && (
                  <span className="text-orange-500 font-black text-xs px-0.5">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* Navigation Tabs and Search */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-900 text-white shadow-sm shadow-blue-900/25'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              📚 Բոլորը (Все)
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'theory'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              💡 Կանոններ (Recordatorio)
            </button>
            <button
              onClick={() => setActiveTab('exercise')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'exercise'
                  ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/25'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              📝 Վարժություններ 1-10
            </button>
            <button
              onClick={() => setActiveTab('exam1')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'exam1'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              🎓 Քննություն 1
            </button>
            <button
              onClick={() => setActiveTab('exam2')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'exam2'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                  : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              🏆 Քննություն 2 (30 հարց)
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'summary'
                  ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              🧠 Ամփոփում (Resumen)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-4 h-4 text-blue-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Որոնել (օր. fonema, բառ, sintagma)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-blue-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-orange-600 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Score banner if user is testing themselves */}
        {scoreStats.answered > 0 && (
          <div className="mt-3 bg-linear-to-r from-blue-50 via-sky-50 to-orange-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 text-white rounded-lg">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-950">Ձեր առաջադիմությունը թեստերում՝ </span>
                <span className="text-xs font-black text-orange-600">
                  {scoreStats.correct} / {scoreStats.answered} ճիշտ պատասխան
                </span>
                <span className="text-xs text-slate-600 ml-1">
                  (Ընդհանուր {scoreStats.totalMultipleChoice} հարցերից)
                </span>
              </div>
            </div>
            <div className="text-sm font-black text-blue-800 bg-white px-2.5 py-0.5 rounded-md border border-blue-200 shadow-2xs">
              {Math.round((scoreStats.correct / scoreStats.answered) * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 mt-6 space-y-8">
        {/* RECORDATORIO / THEORY BLOCK (Shown if all or theory) */}
        {(activeTab === 'all' || activeTab === 'theory') && !searchQuery && (
          <section className="bg-white rounded-2xl border border-blue-200 shadow-sm overflow-hidden">
            <div className="bg-linear-to-r from-blue-600 via-blue-700 to-sky-600 text-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-300" />
                  <span className="text-xs uppercase font-black tracking-wider text-orange-200">
                    Կարճ հիշեցում — Տեսություն
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black mt-0.5">
                  Recordatorio breve — Կարճ հիշեցում
                </h2>
              </div>
              <button
                onClick={() => toggleTranslation('theory')}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-orange-500 rounded-lg text-xs font-bold text-white border border-white/20 transition-all cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>
                  {translationsOpen['theory'] || globalTranslations
                    ? '🇦🇲 Թաքցնել հայերենը'
                    : '🇦🇲 Ցույց տալ հայերենը'}
                </span>
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Interactive Spanish block: click to reveal Armenian */}
              <div
                onClick={() => toggleTranslation('theory')}
                className="p-4 rounded-xl bg-blue-50/40 hover:bg-blue-50/80 border border-blue-100 hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-base select-none">🇪🇸</span>
                    <p className="text-slate-900 text-sm sm:text-base leading-relaxed">
                      La lengua es un <strong className="text-blue-700 font-extrabold">sistema organizado de signos y reglas</strong> que usamos para comunicarnos. Sus unidades se organizan desde las más pequeñas hasta las más grandes:
                    </p>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      speakSpanish(THEORY_SUMMARY.leadEs, 'theory-lead');
                    }}
                    className="p-1 text-blue-500 hover:text-orange-500 transition-colors"
                    title="Լսել իսպաներեն արտասանությունը"
                  >
                    <Volume2 className={`w-4 h-4 ${speakingId === 'theory-lead' ? 'text-orange-500 animate-pulse' : ''}`} />
                  </button>
                </div>
                <div className="mt-2 text-xs text-orange-600 font-bold opacity-85 group-hover:opacity-100 flex items-center gap-1">
                  <span>👆 Սեղմեք այստեղ հայերեն թարգմանության համար</span>
                </div>

                {/* Armenian translation */}
                {(translationsOpen['theory'] || globalTranslations) && (
                  <div className="mt-3 pt-3 border-t border-orange-200 text-orange-950 bg-orange-50/90 p-3 rounded-lg text-sm sm:text-base leading-relaxed animate-fadeIn border border-orange-200/80">
                    <div className="flex items-start gap-2">
                      <span className="text-base select-none">🇦🇲</span>
                      <p>
                        Լեզուն <strong className="font-extrabold text-orange-950">նշանների և կանոնների կազմակերպված համակարգ է</strong>, որը մենք օգտագործում ենք հաղորդակցվելու համար։ Լեզվական միավորները դասավորվում են փոքրից մեծ.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Units Chain visualization */}
              <div className="p-4 bg-slate-950 text-white rounded-xl border-t-2 border-orange-500 shadow-xs">
                <div className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Կարգը՝ փոքրից դեպի մեծ (de menor a mayor):
                </div>
                <div className="text-orange-300 font-mono font-bold text-sm sm:text-base tracking-wide flex flex-wrap items-center gap-1.5">
                  <span className="bg-blue-950/80 border border-blue-800 text-blue-200 px-2.5 py-0.5 rounded-sm">fonema</span>
                  <span className="text-orange-500 font-black">→</span>
                  <span className="bg-blue-950/80 border border-blue-800 text-blue-200 px-2.5 py-0.5 rounded-sm">morfema</span>
                  <span className="text-orange-500 font-black">→</span>
                  <span className="bg-blue-950/80 border border-blue-800 text-blue-200 px-2.5 py-0.5 rounded-sm">palabra</span>
                  <span className="text-orange-500 font-black">→</span>
                  <span className="bg-blue-950/80 border border-blue-800 text-blue-200 px-2.5 py-0.5 rounded-sm">sintagma</span>
                  <span className="text-orange-500 font-black">→</span>
                  <span className="bg-blue-950/80 border border-blue-800 text-blue-200 px-2.5 py-0.5 rounded-sm">oración</span>
                  <span className="text-orange-500 font-black">→</span>
                  <span className="bg-blue-950/80 border border-blue-800 text-blue-200 px-2.5 py-0.5 rounded-sm">texto</span>
                </div>

                {(translationsOpen['theory'] || globalTranslations) && (
                  <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-orange-200 font-mono text-xs sm:text-sm tracking-wide flex flex-wrap items-center gap-1.5">
                    <span className="text-orange-400">🇦🇲</span>
                    <span>հնչույթ</span>
                    <span className="text-slate-600">→</span>
                    <span>ձևույթ</span>
                    <span className="text-slate-600">→</span>
                    <span>բառ</span>
                    <span className="text-slate-600">→</span>
                    <span>բառակապակցություն</span>
                    <span className="text-slate-600">→</span>
                    <span>նախադասություն</span>
                    <span className="text-slate-600">→</span>
                    <span>տեքստ</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SUMMARY / CHEATSHEET TAB */}
        {activeTab === 'summary' && (
          <section className="space-y-6">
            <div className="bg-linear-to-r from-blue-700 via-blue-600 to-orange-500 text-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-orange-200" />
                <span className="text-xs uppercase font-black tracking-wider text-orange-200">
                  Ամենակարևորը քննության համար
                </span>
              </div>
              <h2 className="text-2xl font-black mt-1">
                Lo más importante para el examen — Ամենակարևորը քննության համար
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Այս 6 հիմնական միավորները պետք է իմանալ անգիր և կարողանալ տարբերել օրինակներով։
              </p>
            </div>

            {/* 6 Core Units Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUMMARY_POINTS.map((pt, idx) => (
                <div
                  key={pt.es}
                  onClick={() => toggleTranslation(`summary-${idx}`)}
                  className="bg-white p-5 rounded-xl border border-blue-100 shadow-2xs hover:border-orange-400 hover:shadow-md hover:shadow-orange-500/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-900 font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600">
                        {pt.es}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                      {pt.hy}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 mt-2.5">
                    🇪🇸 <span className="font-semibold text-slate-900">{pt.noteEs}</span>
                  </p>

                  <div className="text-[11px] text-orange-600 mt-2 font-bold flex items-center gap-1">
                    <span>👆 Կտտացրեք հայերեն բացատրության համար</span>
                  </div>

                  {(translationsOpen[`summary-${idx}`] || globalTranslations) && (
                    <div className="mt-3 pt-2.5 border-t border-orange-100 text-xs sm:text-sm text-orange-950 bg-orange-50/80 p-2.5 rounded-lg border border-orange-200/70">
                      🇦🇲 <span className="font-bold">{pt.noteHy}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ladder / Escala de Ejemplos */}
            <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-950 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Օրինակների աստիճանական շղթա (Escala de ejemplo concreta)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Քննության ժամանակ անպայման պետք է կարողանալ ճանաչել յուրաքանչյուր մակարդակը կոնկրետ օրինակով.
              </p>

              <div className="space-y-2.5">
                {LADDER_CHAIN.map(lc => (
                  <div
                    key={lc.level}
                    onClick={() => toggleTranslation(`ladder-${lc.level}`)}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {lc.level}
                      </span>
                      <span className="font-mono font-bold text-slate-900 text-sm sm:text-base">
                        {lc.es}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900 border border-blue-200">
                        {lc.unitEs} ({lc.unitHy})
                      </span>
                    </div>

                    {(translationsOpen[`ladder-${lc.level}`] || globalTranslations) && (
                      <div className="w-full mt-1 pt-2 border-t border-orange-200 text-xs text-orange-950 font-bold bg-orange-50/60 p-2 rounded-md">
                        🇦🇲 Թարգմանություն՝ {lc.hy}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* EXERCISES & EXAMS SECTIONS */}
        {activeTab !== 'summary' && (
          <div className="space-y-10">
            {filteredSections.map(section => (
              <SectionRenderer
                key={section.id}
                section={section}
                translationsOpen={translationsOpen}
                answersOpen={answersOpen}
                userChoices={userChoices}
                globalTranslations={globalTranslations}
                globalAnswers={globalAnswers}
                speakingId={speakingId}
                onToggleTranslation={toggleTranslation}
                onToggleAnswer={toggleAnswer}
                onSelectChoice={(itemId, choiceId) => {
                  setUserChoices(prev => ({ ...prev, [itemId]: choiceId }));
                }}
                onSpeak={speakSpanish}
              />
            ))}

            {filteredSections.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-blue-200">
                <HelpCircle className="w-12 h-12 text-blue-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">Արդյունք չի գտնվել</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  «{searchQuery}» հարցմամբ առաջադրանքներ չկան։ Փորձեք այլ բառ (օր. fonema, palabra, 6 բառ):
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Մաքրել որոնումը
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// SECTION RENDERER COMPONENT (flat in src)
interface SectionRendererProps {
  section: SectionBlock;
  translationsOpen: Record<string, boolean>;
  answersOpen: Record<string, boolean>;
  userChoices: Record<string, string>;
  globalTranslations: boolean;
  globalAnswers: boolean;
  speakingId: string | null;
  onToggleTranslation: (id: string) => void;
  onToggleAnswer: (id: string) => void;
  onSelectChoice: (itemId: string, choiceId: string) => void;
  onSpeak: (text: string, id: string) => void;
}

function SectionRenderer({
  section,
  translationsOpen,
  answersOpen,
  userChoices,
  globalTranslations,
  globalAnswers,
  speakingId,
  onToggleTranslation,
  onToggleAnswer,
  onSelectChoice,
  onSpeak,
}: SectionRendererProps) {
  // Category badges with modern orange & blue accents
  const categoryBadge = {
    exercise: { text: 'Վարժություն / Ejercicio', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    exam1: { text: 'Վերջնական քննություն', color: 'bg-orange-50 text-orange-800 border-orange-200' },
    exam2: { text: 'Քննություն 2 (1.º ESO / 7 դասարան)', color: 'bg-blue-100 text-blue-900 border-blue-300' },
    theory: { text: 'Տեսություն', color: 'bg-sky-50 text-sky-800 border-sky-200' },
    summary: { text: 'Ամփոփում', color: 'bg-amber-50 text-amber-900 border-amber-200' },
  }[section.category];

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="bg-white p-5 rounded-2xl border border-blue-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full border ${categoryBadge.color}`}>
              {categoryBadge.text}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {section.items.length} առաջադրանք
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-950 mt-1">
            {section.titleEs}
          </h2>
          <p className="text-sm font-bold text-orange-600">
            {section.titleHy}
          </p>
          {section.subtitleEs && (
            <p className="text-xs text-slate-500 mt-0.5">
              {section.subtitleEs} — {section.subtitleHy}
            </p>
          )}
        </div>

        {/* Section Actions */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => onToggleTranslation(section.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 transition-colors cursor-pointer"
            title="Բացել/փակել այս բաժնի թարգմանությունը"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Թարգմանություն (🇦🇲)</span>
          </button>
        </div>
      </div>

      {/* Exercise Items List */}
      <div className="space-y-4">
        {section.items.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            sectionId={section.id}
            isTranslationOpen={Boolean(translationsOpen[item.id] || translationsOpen[section.id] || globalTranslations)}
            isAnswerOpen={Boolean(answersOpen[item.id] || globalAnswers)}
            userChoice={userChoices[item.id]}
            speakingId={speakingId}
            onToggleTranslation={() => onToggleTranslation(item.id)}
            onToggleAnswer={() => onToggleAnswer(item.id)}
            onSelectChoice={choiceId => onSelectChoice(item.id, choiceId)}
            onSpeak={text => onSpeak(text, item.id)}
          />
        ))}
      </div>
    </section>
  );
}

// INDIVIDUAL ITEM CARD COMPONENT
interface ItemCardProps {
  item: ExerciseItem;
  sectionId: string;
  isTranslationOpen: boolean;
  isAnswerOpen: boolean;
  userChoice?: string;
  speakingId: string | null;
  onToggleTranslation: () => void;
  onToggleAnswer: () => void;
  onSelectChoice: (choiceId: string) => void;
  onSpeak: (text: string) => void;
}

function ItemCard({
  item,
  isTranslationOpen,
  isAnswerOpen,
  userChoice,
  speakingId,
  onToggleTranslation,
  onToggleAnswer,
  onSelectChoice,
  onSpeak,
}: ItemCardProps) {
  const hasOptions = item.options && item.options.length > 0;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 ${
        isAnswerOpen
          ? 'border-blue-400 shadow-sm shadow-blue-500/10'
          : 'border-slate-200 hover:border-blue-300 shadow-2xs'
      } overflow-hidden`}
    >
      {/* Question Header & Spanish Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            {item.num && (
              <span className="w-7 h-7 rounded-xl bg-blue-50 text-blue-800 font-black text-xs flex items-center justify-center shrink-0 border border-blue-200">
                {item.num}
              </span>
            )}

            {/* Clickable Spanish Question Container */}
            <div className="flex-1">
              <div
                onClick={onToggleTranslation}
                className="group cursor-pointer rounded-lg p-1.5 -m-1.5 hover:bg-blue-50/40 transition-colors"
                title="Կտտացրեք հայերեն թարգմանությունը տեսնելու / թաքցնելու համար"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-base select-none">🇪🇸</span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {item.questionEs}
                    </h4>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onSpeak(item.questionEs);
                    }}
                    className="p-1 text-slate-400 hover:text-blue-600 transition-colors shrink-0 cursor-pointer"
                    title="Լսել իսպաներեն արտասանությունը"
                  >
                    <Volume2 className={`w-4 h-4 ${speakingId === item.id ? 'text-blue-600 animate-pulse' : ''}`} />
                  </button>
                </div>
                <div className="text-[11px] text-orange-600 font-bold opacity-80 group-hover:opacity-100 mt-1 flex items-center gap-1">
                  <span>👆 Սեղմեք այստեղ հայերեն թարգմանության համար</span>
                </div>
              </div>

              {/* Context Text if present (e.g. Ejercicio 7 or Ejercicio 10) */}
              {item.contextEs && (
                <div
                  onClick={onToggleTranslation}
                  className="mt-3 p-3 bg-blue-50/60 border border-blue-200 rounded-xl cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="text-sm select-none">🇪🇸</span>
                      <p className="text-sm sm:text-base font-bold text-blue-950">
                        «{item.contextEs}»
                      </p>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onSpeak(item.contextEs || '');
                      }}
                      className="p-1 text-blue-600 hover:text-orange-600 transition-colors shrink-0 cursor-pointer"
                      title="Լսել տեքստը"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {isTranslationOpen && item.contextHy && (
                    <div className="mt-2 pt-2 border-t border-blue-200/80 text-xs sm:text-sm text-orange-950 font-semibold flex items-start gap-2 bg-orange-50/70 p-2 rounded-md">
                      <span className="text-sm select-none">🇦🇲</span>
                      <p>«{item.contextHy}»</p>
                    </div>
                  )}
                </div>
              )}

              {/* Armenian Question Translation */}
              {isTranslationOpen && (
                <div className="mt-2.5 p-3 rounded-lg bg-orange-50/90 border border-orange-200 text-orange-950 text-sm sm:text-base font-semibold flex items-start gap-2 animate-fadeIn shadow-2xs">
                  <span className="text-base select-none">🇦🇲</span>
                  <p>{item.questionHy}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Multiple Choice Options (if present) */}
        {hasOptions && (
          <div className="mt-4 space-y-2 pl-0 sm:pl-10">
            <div className="text-xs font-bold text-slate-500 mb-1">
              Ընտրեք ճիշտ տարբերակը (կամ բացեք պատասխանը)՝
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.options!.map(opt => {
                const isSelected = userChoice === opt.id;
                const isCorrectOption = opt.id === item.correctOptionId;
                const showCorrectStyle = (isAnswerOpen || isSelected) && isCorrectOption;
                const showWrongStyle = isSelected && !isCorrectOption;

                return (
                  <button
                    key={opt.id}
                    onClick={() => onSelectChoice(opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative group flex flex-col justify-between ${
                      showCorrectStyle
                        ? 'bg-blue-50 border-blue-500 text-blue-950 ring-2 ring-blue-500/25'
                        : showWrongStyle
                        ? 'bg-rose-50 border-rose-300 text-rose-950'
                        : isSelected
                        ? 'bg-orange-50 border-orange-400 text-orange-950 ring-1 ring-orange-400'
                        : 'bg-slate-50/80 hover:bg-blue-50/60 border-slate-200 hover:border-blue-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs select-none">🇪🇸</span>
                        <span className="font-bold text-xs sm:text-sm">{opt.es}</span>
                      </div>
                      {showCorrectStyle && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      )}
                      {showWrongStyle && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </div>

                    {/* Armenian Translation of the Option */}
                    {isTranslationOpen && (
                      <div className="mt-1.5 pt-1.5 border-t border-slate-200/80 text-[11px] sm:text-xs text-orange-900 font-bold flex items-center gap-1">
                        <span className="text-[11px] select-none">🇦🇲</span>
                        <span>{opt.hy}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sub-questions breakdown (for exercise 7 & 10) */}
        {item.subQuestions && item.subQuestions.length > 0 && (
          <div className="mt-4 pl-0 sm:pl-10 space-y-3">
            <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Հարցեր և ենթակետեր (Preguntas y análisis):
            </div>
            <div className="space-y-2">
              {item.subQuestions.map(sq => (
                <div
                  key={sq.id}
                  className="p-3 bg-slate-50 border border-blue-100 rounded-xl space-y-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      🇪🇸 {sq.qEs}
                    </p>
                    <button
                      onClick={() => onSpeak(sq.qEs)}
                      className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer"
                      title="Լսել"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {isTranslationOpen && (
                    <p className="text-xs text-orange-900 font-bold">
                      🇦🇲 {sq.qHy}
                    </p>
                  )}

                  {/* Sub-answer shown when answer button is open */}
                  {isAnswerOpen && (
                    <div className="mt-2 pt-2 border-t border-blue-200 text-xs sm:text-sm font-bold text-blue-950 bg-blue-50/80 p-2 rounded-lg">
                      <div className="flex items-center gap-1 text-blue-700 font-bold mb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Պատասխան՝</span>
                      </div>
                      <p>🇪🇸 {sq.aEs}</p>
                      {isTranslationOpen && (
                        <p className="text-xs text-orange-950 font-semibold mt-0.5">🇦🇲 {sq.aHy}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matches list for Ejercicio 3 */}
        {item.matches && item.matches.length > 0 && (
          <div className="mt-4 pl-0 sm:pl-10 space-y-3">
            <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Միավորներ և սահմանումներ (Unidades y definiciones):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {item.matches.map(m => (
                <div
                  key={m.num}
                  className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="text-blue-950">
                      {m.num}. {m.termEs}
                    </span>
                    <span className="text-orange-600 font-bold">({m.termHy})</span>
                  </div>
                  <div className="text-slate-700 mt-1">
                    <span className="font-black text-blue-700">{m.matchLetter}.</span> {m.defEs}
                  </div>
                  {isTranslationOpen && (
                    <div className="text-orange-950 text-[11px] mt-0.5 font-bold">
                      🇦🇲 {m.defHy}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Morpheme Breakdown (for Ejercicio 5, 18, 19) */}
        {item.breakdown && item.breakdown.length > 0 && isAnswerOpen && (
          <div className="mt-4 pl-0 sm:pl-10">
            <div className="p-3 bg-blue-50/90 border border-blue-200 rounded-xl">
              <div className="text-xs font-black text-blue-950 uppercase tracking-wider mb-2">
                Ձևույթների բաժանում (Descomposición en morfemas):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.breakdown.map((b, i) => (
                  <div key={i} className="bg-white p-2.5 rounded-lg border border-blue-200 text-xs shadow-2xs">
                    <div className="font-mono font-black text-blue-900 text-sm">{b.partEs}</div>
                    <div className="text-slate-800 font-bold mt-0.5">🇪🇸 {b.meaningEs}</div>
                    {isTranslationOpen && (
                      <div className="text-orange-800 font-extrabold text-[11px] mt-0.5">
                        🇦🇲 {b.meaningHy}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ladder Steps for Ejercicio 8 */}
        {item.ladderSteps && item.ladderSteps.length > 0 && (
          <div className="mt-4 pl-0 sm:pl-10 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Կառուցման քայլերը (De menor a mayor):
            </div>
            {item.ladderSteps.map((ls, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 border border-blue-100 rounded-xl text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-blue-950">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                    {idx + 1}
                  </span>
                  <span>{ls.unitEs}</span>
                  <span className="text-orange-600 font-medium">({ls.unitHy})</span>
                  <span>:</span>
                  <span className="text-slate-900 font-semibold">{ls.exampleEs}</span>
                </div>
                {isTranslationOpen && (
                  <div className="mt-1 text-orange-950 text-xs pl-7 font-semibold">
                    🇦🇲 {ls.unitHy}՝ <span className="font-bold">{ls.exampleHy}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action Bottom Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 pl-0 sm:pl-10">
          <div className="flex items-center gap-2">
            {/* Translation toggle button */}
            <button
              onClick={onToggleTranslation}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                isTranslationOpen
                  ? 'bg-orange-500 text-white border-orange-600 shadow-xs'
                  : 'bg-orange-50 hover:bg-orange-100 text-orange-800 border-orange-200'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{isTranslationOpen ? '🇦🇲 Թաքցնել թարգմանությունը' : '🇦🇲 Թարգմանություն'}</span>
            </button>
          </div>

          {/* Separate ANSWER BUTTON */}
          <button
            onClick={onToggleAnswer}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer ${
              isAnswerOpen
                ? 'bg-blue-800 text-white hover:bg-blue-900 border border-blue-900'
                : 'bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 border border-blue-600 shadow-blue-500/25'
            }`}
          >
            {isAnswerOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isAnswerOpen ? 'Թաքցնել պատասխանը' : '✅ Պատասխան (Respuesta)'}</span>
          </button>
        </div>

        {/* Revealed Answer Box */}
        {isAnswerOpen && (
          <div className="mt-4 pl-0 sm:pl-10 animate-fadeIn">
            <div className="p-4 bg-linear-to-br from-blue-50/90 via-white to-orange-50/70 border border-blue-300 rounded-xl space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Ճիշտ պատասխան — Respuesta correcta</span>
                </div>
                <button
                  onClick={() => onSpeak(item.answerEs)}
                  className="p-1 text-blue-700 hover:text-orange-600 transition-colors cursor-pointer"
                  title="Լսել պատասխանը"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-sm sm:text-base font-black text-slate-950">
                🇪🇸 {item.answerEs}
              </div>

              {/* Armenian Answer */}
              {isTranslationOpen && (
                <div className="text-xs sm:text-sm font-bold text-orange-950 pt-1.5 pb-1 px-2.5 rounded-lg bg-orange-100/70 border border-orange-200">
                  🇦🇲 {item.answerHy}
                </div>
              )}

              {/* Extra explanation if present */}
              {item.explanationEs && (
                <div className="text-xs text-blue-900 pt-1">
                  <p>💡 <em>{item.explanationEs}</em></p>
                  {isTranslationOpen && item.explanationHy && (
                    <p className="mt-0.5 text-orange-900">🇦🇲 <em>{item.explanationHy}</em></p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
