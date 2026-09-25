'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Language, translations } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import {
  Calculator,
  Repeat,
  TrendingUp,
  Timer,
  Scale,
  Palmtree,
  PiggyBank,
  Factory,
  Share2,
  Printer,
  Check,
  Menu,
  X,
  ChevronDown,
  Globe,
  HelpCircle,
  Layers,
  ArrowRight,
  FileText,
  Mic,
  FileCheck2,
  Crown,
  Sparkles,
  BookOpen,
  Lock,
} from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onCopySummary: () => void;
  copied: boolean;
  activeTool: ToolId;
  onSelectTool: (tool: ToolId) => void;
  hourlyRate: number;
  netAmount: number;
  locale: string;
  onOpenScenarios: () => void;
  frequencyLabel: string;
  totalHoursPerWeek: number;
  onLoadLeclercExample?: () => void;
  isPro?: boolean;
  onOpenProModal?: (trigger?: string) => void;
  onOpenEbookModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  onCopySummary,
  copied,
  activeTool,
  onSelectTool,
  hourlyRate,
  netAmount,
  locale,
  onOpenScenarios,
  frequencyLabel,
  totalHoursPerWeek,
  onLoadLeclercExample,
  isPro = false,
  onOpenProModal,
  onOpenEbookModal,
}) => {
  const t = translations[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsToolsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrint = () => {
    setIsMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const formattedNet = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(netAmount);

  const financeTools = [
    {
      id: 'net-calc' as ToolId,
      name: lang === 'pt' ? 'Calculadora de Salário Líquido' : lang === 'en' ? 'Net Salary Calculator' : 'Calculateur de Salaire Net',
      sub: lang === 'pt' ? 'Bruto para líquido oficial QC' : lang === 'en' ? 'Official Quebec take-home' : 'Brut en net officiel québécois',
      icon: Calculator,
      badge: 'Principal',
    },
    {
      id: 'converter' as ToolId,
      name: lang === 'pt' ? 'Conversor de Salário' : lang === 'en' ? 'Salary Converter' : 'Convertisseur de Salaire',
      sub: lang === 'pt' ? 'Hora ⇄ Quinzena ⇄ Ano' : lang === 'en' ? 'Hourly ⇄ Bi-weekly ⇄ Year' : 'Horaire ⇄ Quinzaine ⇄ Annuel',
      icon: Repeat,
      badge: 'Instantâneo',
    },
    {
      id: 'raise' as ToolId,
      name: lang === 'pt' ? 'Simulador de Aumento' : lang === 'en' ? 'Raise Simulator' : 'Simulateur d’Augmentation',
      sub: lang === 'pt' ? 'Impacto no bolso após impostos' : lang === 'en' ? 'Real pocket gain' : 'Gain réel dans vos poches',
      icon: TrendingUp,
      badge: '+$/h',
    },
    {
      id: 'overtime' as ToolId,
      name: lang === 'pt' ? 'Horas Extras (1.5× / 2.0×)' : lang === 'en' ? 'Overtime Pay' : 'Heures Supplémentaires',
      sub: lang === 'pt' ? 'Tempo e meio e dobro CNESST' : lang === 'en' ? 'Time-and-a-half CNESST' : 'Temps et demi / double',
      icon: Timer,
      badge: 'CNESST',
    },
    {
      id: 'compare-jobs' as ToolId,
      name: lang === 'pt' ? 'Comparador de 2 Empregos' : lang === 'en' ? 'Job Offer Comparator' : 'Comparateur d’Offres',
      sub: lang === 'pt' ? 'Oferta A vs B no bolso' : lang === 'en' ? 'Offer A vs B take-home' : 'Offre A vs B en argent net',
      icon: Scale,
      badge: 'A vs B',
    },
    {
      id: 'vacation-holidays' as ToolId,
      name: lang === 'pt' ? 'Férias (4%/6%) & 8 Feriados' : lang === 'en' ? 'Vacation & Holidays' : 'Vacances & 8 Fériés',
      sub: lang === 'pt' ? 'Regra de 1/20 da CNESST' : lang === 'en' ? 'CNESST 1/20 rule' : 'Normes CNESST & 1/20',
      icon: Palmtree,
      badge: '4% / 6%',
    },
    {
      id: 'rrsp-savings' as ToolId,
      name: lang === 'pt' ? 'Match REER & Previdência' : lang === 'en' ? 'RRSP Match' : 'Match REER & Épargne',
      sub: lang === 'pt' ? 'Simular economia fiscal' : lang === 'en' ? 'Tax savings' : 'Économie d’impôt',
      icon: PiggyBank,
      badge: 'Fiscal',
    },
  ];

  const careerTools = [
    {
      id: 'resume-builder' as ToolId,
      name: lang === 'pt' ? 'Construtor de Currículo Québec' : lang === 'en' ? 'Quebec Resume Builder' : 'CV Format Canadien (ATS)',
      sub: lang === 'pt' ? 'Sem foto, 100% legal e aprovado ATS' : lang === 'en' ? 'No photo, ATS-compliant' : 'Format officiel sans photo',
      icon: FileText,
      badge: 'Format QC',
    },
    {
      id: 'interview-simulator' as ToolId,
      name: lang === 'pt' ? 'Simulador de Entrevistas' : lang === 'en' ? 'Interview Simulator' : 'Simulateur d’Entrevue STAR',
      sub: lang === 'pt' ? 'Método STAR e cultura do Québec' : lang === 'en' ? 'STAR method & QC culture' : 'Méthode STAR & culture locale',
      icon: Mic,
      badge: 'STAR',
    },
    {
      id: 'tech-tests' as ToolId,
      name: lang === 'pt' ? 'Simulador de Testes Técnicos' : lang === 'en' ? 'Technical Tests' : 'Tests Techniques & CNESST',
      sub: lang === 'pt' ? 'CNESST/SIMDUT, Excel e lógica' : lang === 'en' ? 'Safety, Excel & Logic' : 'Sécurité, Excel et logique',
      icon: FileCheck2,
      badge: 'Testes',
    },
    {
      id: 'blog' as ToolId,
      name: lang === 'pt' ? 'Blog & Guias Práticos' : lang === 'en' ? 'Blog & Practical Guides' : 'Blog & Guides du Travailleur',
      sub: lang === 'pt' ? 'Artigos, contracheque e dicas' : lang === 'en' ? 'Articles, guides & hiring tips' : 'Articles, paie et conseils embauche',
      icon: BookOpen,
      badge: 'Artigos',
    },
  ];

  const allTools = [...financeTools, ...careerTools];
  const currentToolObj = allTools.find((t) => t.id === activeTool) || financeTools[0];
  const CurrentIcon = currentToolObj.icon;

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 w-full transition-all">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-15 sm:h-16 gap-3 sm:gap-4">
          {/* Left: Brand / Logo */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => onSelectTool('net-calc')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900 tracking-tight text-base sm:text-lg">
                    PaieNet<span className="text-blue-600">.qc</span>
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/70 shrink-0">
                    QC ⚜️
                  </span>
                  {isPro && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 uppercase shrink-0 shadow-2xs">
                      <Crown className="w-2.5 h-2.5" />
                      <span>PRO</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate hidden md:block">
                  {lang === 'pt'
                    ? 'A suíte completa de ferramentas de salário do Québec'
                    : lang === 'en'
                    ? 'Every payroll & salary tool for Quebec'
                    : 'Tous les outils de paie pour le Québec'}
                </p>
              </div>
            </button>
          </div>

          {/* Center/Right: Centralized Navigation (Tools Menu + Language + Options Menu) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 1. "Ferramentas" Dropdown (Ao lado esquerdo do seletor de idiomas) */}
            <div className="relative" ref={toolsRef}>
              <button
                type="button"
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                  isToolsDropdownOpen
                    ? 'bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                    : 'text-slate-800 bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
                aria-expanded={isToolsDropdownOpen}
                aria-label="Selecionar ferramenta"
              >
                <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="hidden sm:inline">
                  {lang === 'pt' ? 'Ferramentas' : lang === 'en' ? 'Tools' : 'Outils'}
                </span>
                <span className="hidden md:inline-flex items-center text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60 max-w-[150px] truncate">
                  {currentToolObj.name}
                </span>
                <span className="sm:hidden font-extrabold text-blue-700">
                  {currentToolObj.name.split(' ')[0]}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isToolsDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {/* Tools Dropdown Popover */}
              {isToolsDropdownOpen && (
                <div className="absolute right-0 sm:left-0 top-full mt-2 w-80 sm:w-[420px] rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto">
                  {/* Category 1: Finanças & Salário */}
                  <div className="px-2 py-1 flex items-center justify-between border-b border-slate-100 mb-1.5">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      💰 {lang === 'pt' ? 'Finanças & Salário' : 'Finances & Rémunération'}
                    </span>
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded-full">
                      7 outils
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    {financeTools.map((tool) => {
                      const Icon = tool.icon;
                      const isSelected = activeTool === tool.id;

                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => {
                            onSelectTool(tool.id);
                            setIsToolsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200 shadow-2xs'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold truncate">{tool.name}</span>
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                                isSelected ? 'bg-blue-200 text-blue-900' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {tool.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate">{tool.sub}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Category 2: Carreira & Emprego */}
                  <div className="px-2 py-1 flex items-center justify-between border-b border-slate-100 mb-1.5 pt-1">
                    <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{lang === 'pt' ? 'Carreira & Empregabilidade' : 'Carrière & Embauche'}</span>
                    </span>
                    <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-full border border-indigo-200">
                      Nouveau
                    </span>
                  </div>

                  <div className="space-y-1 mb-2">
                    {careerTools.map((tool) => {
                      const Icon = tool.icon;
                      const isSelected = activeTool === tool.id;

                      return (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => {
                            onSelectTool(tool.id);
                            setIsToolsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50 text-indigo-900 font-bold border border-indigo-200 shadow-2xs'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold truncate">{tool.name}</span>
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                                isSelected ? 'bg-indigo-200 text-indigo-900' : 'bg-slate-100 text-slate-500'
                              }`}>
                                {tool.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate">{tool.sub}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {onLoadLeclercExample && (
                    <div className="pt-2 mt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          onLoadLeclercExample();
                          setIsToolsDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Factory className="w-3.5 h-3.5 text-blue-600" />
                        <span>{t.loadExampleBtn}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Access: Blog & Guias */}
            <button
              type="button"
              onClick={() => onSelectTool('blog')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                activeTool === 'blog'
                  ? 'bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-500/20 shadow-2xs'
                  : 'text-slate-700 bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'pt' ? 'Blog & Guias' : lang === 'en' ? 'Blog & Guides' : 'Blog & Guides'}</span>
            </button>

            {/* Quick Access: E-books & Materiais Digitais */}
            {onOpenEbookModal && (
              <button
                type="button"
                onClick={() => onOpenEbookModal()}
                className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:py-2 text-xs font-black rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 text-amber-900 border border-amber-300/90 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'pt' ? 'E-books & Materiais' : 'E-books & Guides'}</span>
              </button>
            )}

            {/* 2. Seletor de Idiomas (Segmentado) */}
            <div className="hidden sm:flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  lang === 'fr'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('pt')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  lang === 'pt'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* 3. Menu Superior Direito (Ações, Opções & Pro) */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                  isMenuOpen
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 border-slate-200'
                }`}
                aria-expanded={isMenuOpen}
                aria-label="Menu principal"
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4 text-white" />
                ) : (
                  <Menu className="w-4 h-4 text-slate-700" />
                )}
                <span className="text-xs font-bold hidden sm:inline">Menu</span>
              </button>

              {/* Popover Menu Superior Direito */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Seletor de Idioma no Mobile */}
                  <div className="sm:hidden px-2 py-1.5 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Globe className="w-3.5 h-3.5" />
                      <span>{lang === 'pt' ? 'Idioma' : lang === 'en' ? 'Language' : 'Langue'}</span>
                    </div>
                    <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
                      {(['fr', 'pt', 'en'] as Language[]).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => onLanguageChange(l)}
                          className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                            lang === l ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                          }`}
                        >
                          {l.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pro Banner Button inside menu if not Pro */}
                  {onOpenProModal && !isPro && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenProModal('Débloquez le CV Padrão Québec, entrevues STAR et tests techniques.');
                      }}
                      className="w-full mb-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs flex items-center justify-between shadow-xs transition-transform active:scale-98 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-slate-950" />
                        <span>PaieNet Carrière Pro</span>
                      </div>
                      <span className="text-[10px] bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded-md font-extrabold">
                        $4.99 CAD
                      </span>
                    </button>
                  )}

                  {/* Resumo da Ferramenta Ativa */}
                  <div className="px-2.5 py-1.5 bg-slate-50 rounded-xl border border-slate-200/70 mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <CurrentIcon className="w-4 h-4 text-blue-600 shrink-0" />
                      <div className="min-w-0 truncate">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">
                          {lang === 'pt' ? 'Ativa agora' : 'Outil actif'}
                        </span>
                        <span className="text-xs font-bold text-slate-800 truncate block">
                          {currentToolObj.name}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsToolsDropdownOpen(true);
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline shrink-0 cursor-pointer ml-2"
                    >
                      {lang === 'pt' ? 'Trocar' : 'Changer'}
                    </button>
                  </div>

                  {/* Ações */}
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        onCopySummary();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4 text-blue-600" />
                        )}
                        <span>{t.shareCopyBtn}</span>
                      </div>
                      {copied && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {lang === 'pt' ? 'Copiado!' : lang === 'en' ? 'Copied!' : 'Copié !'}
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectTool('blog');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>{lang === 'pt' ? 'Blog & Guias Práticos' : 'Blog & Guides Pratiques'}</span>
                    </button>

                    {onOpenEbookModal && (
                      <button
                        type="button"
                        onClick={() => {
                          onOpenEbookModal();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-50/80 hover:bg-amber-100 transition-colors cursor-pointer border border-amber-200/60"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>{lang === 'pt' ? 'Central de E-books & Materiais' : 'E-books & Ressources'}</span>
                        </div>
                        <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-black">
                          {lang === 'pt' ? 'Grátis & VIP' : 'Gratuit & VIP'}
                        </span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handlePrint}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-slate-600" />
                      <span>{t.printBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onOpenScenarios();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-indigo-600" />
                      <span>{t.scenariosDialogBtn}</span>
                    </button>

                    {onLoadLeclercExample && (
                      <button
                        type="button"
                        onClick={() => {
                          onLoadLeclercExample();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <Factory className="w-4 h-4 text-blue-600" />
                        <span>{t.loadExampleBtn}</span>
                      </button>
                    )}

                    {/* Admin Backoffice Entry */}
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTool('admin');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer border border-slate-200 mt-1"
                    >
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-slate-600" />
                        <span>{lang === 'pt' ? 'Área Restrita / Admin' : 'Espace Restreint (Admin)'}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded font-mono">
                        Hub
                      </span>
                    </button>
                  </div>

                  {/* Footer com dados da paie */}
                  <div className="mt-2 pt-2 px-2.5 text-[10px] text-slate-500 border-t border-slate-100 flex items-center justify-between">
                    <span>{frequencyLabel}</span>
                    <span><strong>{totalHoursPerWeek}h</strong> / sem</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
