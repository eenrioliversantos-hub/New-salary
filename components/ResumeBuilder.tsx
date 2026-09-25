'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/i18n';
import {
  FileText,
  Sparkles,
  Download,
  Printer,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Crown,
  Eye,
  Edit3,
  Building,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
} from 'lucide-react';

interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface ResumeData {
  fullName: string;
  jobTitle: string;
  city: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  skills: string[];
  experiences: Experience[];
  educations: Education[];
  languages: string[];
}

interface ResumeBuilderProps {
  lang: Language;
  isPro: boolean;
  onOpenProModal: (trigger?: string) => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  lang,
  isPro,
  onOpenProModal,
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const [data, setData] = useState<ResumeData>({
    fullName: 'Alexandre Tremblay',
    jobTitle: 'Technicien en Production & Équipements',
    city: 'Québec, QC',
    email: 'alexandre.tremblay@email.com',
    phone: '(418) 555-0192',
    linkedin: 'linkedin.com/in/alexandretremblay',
    summary:
      'Professionnel rigoureux cumulant plus de 4 années d’expérience en milieu manufacturier et industriel au Québec. Reconnu pour mon autonomie, le strict respect des normes de santé et sécurité (CNESST) et ma capacité à résoudre les pannes techniques rapidement pour optimiser les cadences de production.',
    skills: [
      'Contrôle qualité & Cadences',
      'Santé & Sécurité (CNESST / SIMDUT)',
      'Maintenance préventive de 1er niveau',
      'Travail d’équipe & Autonomie',
      'Gestion des priorités',
      'Logiciels ERP / Suite Office',
    ],
    experiences: [
      {
        id: '1',
        role: 'Opérateur / Technicien de Ligne de Production',
        company: 'Biscuits Leclerc Ltée',
        location: 'Saint-Augustin-de-Desmaures, QC',
        period: '2023 - Présent',
        highlights: [
          'Assurer le fonctionnement optimal de la ligne d’emballage automatisée et respecter les cadences de 120 unités/min.',
          'Effectuer les contrôles qualité rigoureux conformément aux normes d’hygiène et de sécurité alimentaire.',
          'Réduire de 15 % les temps d’arrêt non planifiés grâce à une maintenance préventive proactive des capteurs et convoyeurs.',
        ],
      },
      {
        id: '2',
        role: 'Adjoint de Maintenance & Assemblage',
        company: 'Industries Mécaniques du Québec',
        location: 'Lévis, QC',
        period: '2021 - 2023',
        highlights: [
          'Assemblage mécanique de pièces de précision selon les plans techniques fournis.',
          'Participation active au comité de santé et sécurité au travail de l’usine.',
        ],
      },
    ],
    educations: [
      {
        id: '1',
        degree: 'D.E.P. en Mécanique industrielle ou Équivalence comparative (MIFI)',
        institution: 'Centre de Formation Professionnelle de Québec',
        year: '2021',
      },
    ],
    languages: ['Français (Courant / Langue de travail)', 'Anglais (Intermédiaire fonctionnel)'],
  });

  // Quick Preset Loader
  const handleLoadTemplate = (type: 'tech' | 'admin' | 'dev') => {
    if (type === 'admin') {
      setData({
        fullName: 'Marie-Ève Roy',
        jobTitle: 'Adjointe Administrative & Comptabilité',
        city: 'Montréal, QC',
        email: 'marie.eve.roy@email.com',
        phone: '(514) 555-0144',
        linkedin: 'linkedin.com/in/marie-everoy',
        summary:
          'Adjointe administrative dynamique cumulant 5 ans d’expérience en gestion de dossiers, facturation et service client au Québec. Bilingue (français/anglais), très organisée et maîtrisant Excel et QuickBooks.',
        skills: ['Facturation & Paie', 'Tenue de livres (QuickBooks)', 'Excel avancé', 'Service à la clientèle', 'Bilinguisme FR/EN'],
        experiences: [
          {
            id: '1',
            role: 'Adjointe Administrative Principale',
            company: 'Groupe Logistique Québec',
            location: 'Laval, QC',
            period: '2022 - Présent',
            highlights: [
              'Préparation des comptes recevables et payables avec un taux d’exactitude de 99 %.',
              'Gestion des agendas, correspondances officielles et accueil bilingue des clients.',
            ],
          },
        ],
        educations: [
          {
            id: '1',
            degree: 'D.E.C. en Techniques de bureautique ou équivalence',
            institution: 'Collège Ahuntsic, Montréal',
            year: '2020',
          },
        ],
        languages: ['Français (Natif)', 'Anglais (Bilingue)'],
      });
    } else if (type === 'dev') {
      setData({
        fullName: 'Lucas Silva',
        jobTitle: 'Développeur Full-Stack Web & Logiciel',
        city: 'Montréal, QC',
        email: 'lucas.silva.dev@email.com',
        phone: '(438) 555-0819',
        linkedin: 'linkedin.com/in/lucassilvadev',
        summary:
          'Ingénieur logiciel avec 4 ans d’expérience dans la conception d’applications web performantes et résilientes (React, TypeScript, Node.js). Passionné par l’architecture propre, le travail collaboratif en méthodologie Agile et le mentorat technique.',
        skills: ['TypeScript / JavaScript', 'React & Next.js', 'Node.js & PostgreSQL', 'APIs RESTful & GraphQL', 'CI/CD & Docker', 'Méthodologie Agile / Scrum'],
        experiences: [
          {
            id: '1',
            role: 'Développeur Full-Stack Intermédiaire',
            company: 'TechnoSolutions Québec',
            location: 'Montréal, QC',
            period: '2022 - Présent',
            highlights: [
              'Développement de microservices critiques traitant plus de 50 000 requêtes quotidiennes.',
              'Amélioration de 40 % des temps de chargement des pages clés grâce à la migration vers Next.js.',
            ],
          },
        ],
        educations: [
          {
            id: '1',
            degree: 'Baccalauréat en Génie Logiciel (Équivalence comparative émise par le MIFI)',
            institution: 'Université de Sherbrooke / Équivalence reconnue',
            year: '2021',
          },
        ],
        languages: ['Français (Professionnel)', 'Anglais (Professionnel)', 'Portugais (Natif)'],
      });
    }
  };

  const handleDownloadPdf = () => {
    if (!isPro) {
      onOpenProModal('Téléchargement du CV au Format Canadien sans filigrane et testé pour filtres ATS.');
      return;
    }
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-200 mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Format Canadien / Québec (100% Conforme ATS)</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'pt'
                  ? 'Construtor de Currículo Padrão Québec (Format Canadien)'
                  : lang === 'en'
                  ? 'Quebec & Canadian Format Resume Builder'
                  : 'Générateur de CV au Format Canadien & Québécois'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {lang === 'pt'
                  ? 'No Canadá, currículos com foto, data de nascimento, estado civil ou nacionalidade são descartados imediatamente para evitar discriminação. Use a estrutura padrão com verbetes de ação aprovada pelos recrutadores.'
                  : 'Au Canada, les CV avec photo, âge ou état civil sont rejetés d’office pour éviter toute discrimination légale. Utilisez le gabarit standard recommandé par les recruteurs du Québec.'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Exportar em PDF' : 'Télécharger PDF'}</span>
              {!isPro && <Crown className="w-3.5 h-3.5 text-amber-300" />}
            </button>
          </div>
        </div>

        {/* Warning Banner: Quebec Specifics */}
        <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>{lang === 'pt' ? 'Regra de Ouro no Québec:' : 'Règle d’or au Québec :'}</strong>{' '}
            {lang === 'pt'
              ? 'NUNCA inclua foto, idade, estado civil, número de seguro social (NAS) ou nacionalidade. O foco do RH canadense é 100% nas suas realizações práticas e habilidades.'
              : 'N’incluez JAMAIS de photo, âge, situation familiale ni numéro d’assurance sociale (NAS). Les recruteurs québécois se concentrent sur vos réalisations concrètes.'}
          </p>
        </div>

        {/* Quick Templates Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            {lang === 'pt' ? 'Modelos prontos para testar:' : 'Modèles préremplis :'}
          </span>
          <button
            type="button"
            onClick={() => handleLoadTemplate('tech')}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            🏭 {lang === 'pt' ? 'Indústria / Técnico' : 'Industriel / Technique'}
          </button>
          <button
            type="button"
            onClick={() => handleLoadTemplate('admin')}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            📂 {lang === 'pt' ? 'Administrativo / Escritório' : 'Administratif / Bureautique'}
          </button>
          <button
            type="button"
            onClick={() => handleLoadTemplate('dev')}
            className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            💻 {lang === 'pt' ? 'Tecnologia / Informática' : 'Informatique / TI'}
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor (6 cols) */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span>{lang === 'pt' ? 'Preencha seus Dados Profissionais' : 'Vos données professionnelles'}</span>
            </h3>
            <span className="text-[11px] font-mono font-bold text-slate-400">Format QC</span>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'pt' ? 'Nome Completo' : 'Nom et Prénom'}
                </label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => setData({ ...data, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'pt' ? 'Cargo Pretendido' : 'Titre du poste ciblé'}
                </label>
                <input
                  type="text"
                  value={data.jobTitle}
                  onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'pt' ? 'Cidade, Província' : 'Ville, Province'}
                </label>
                <input
                  type="text"
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: Québec, QC"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Courriel</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Téléphone</label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block">
              {lang === 'pt' ? 'Perfil / Resumo Profissional (Accroche)' : 'Profil Professionnel'}
            </label>
            <textarea
              rows={3}
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
              className="w-full p-3 text-xs leading-relaxed text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Key Skills */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block">
              {lang === 'pt' ? 'Competências & Habilidades (Separadas por vírgula)' : 'Compétences clés (séparées par une virgule)'}
            </label>
            <input
              type="text"
              value={data.skills.join(', ')}
              onChange={(e) =>
                setData({
                  ...data,
                  skills: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              className="w-full px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience List */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 block">
                {lang === 'pt' ? 'Experiências Profissionais' : 'Expériences professionnelles'}
              </label>
              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    experiences: [
                      ...data.experiences,
                      {
                        id: Date.now().toString(),
                        role: 'Nouveau Poste',
                        company: 'Nom de l’entreprise',
                        location: 'Québec, QC',
                        period: '2023 - Présent',
                        highlights: ['Responsabilité clé avec verbe d’action concret.'],
                      },
                    ],
                  })
                }
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter</span>
              </button>
            </div>

            {data.experiences.map((exp, idx) => (
              <div key={exp.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      experiences: data.experiences.filter((e) => e.id !== exp.id),
                    })
                  }
                  className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-2 gap-2 pr-6">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => {
                      const updated = [...data.experiences];
                      updated[idx].role = e.target.value;
                      setData({ ...data, experiences: updated });
                    }}
                    placeholder="Titre du poste"
                    className="px-2 py-1 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...data.experiences];
                      updated[idx].company = e.target.value;
                      setData({ ...data, experiences: updated });
                    }}
                    placeholder="Entreprise"
                    className="px-2 py-1 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => {
                      const updated = [...data.experiences];
                      updated[idx].period = e.target.value;
                      setData({ ...data, experiences: updated });
                    }}
                    placeholder="ex: 2021 - 2023"
                    className="px-2 py-1 text-xs text-slate-700 bg-white border border-slate-200 rounded"
                  />
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => {
                      const updated = [...data.experiences];
                      updated[idx].location = e.target.value;
                      setData({ ...data, experiences: updated });
                    }}
                    placeholder="Lieu"
                    className="px-2 py-1 text-xs text-slate-700 bg-white border border-slate-200 rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Canadian CV Sheet Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-3 sticky top-20">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'pt' ? 'Pré-visualização do CV Canadense' : 'Aperçu du CV Format Canadien'}</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ATS-Ready
            </span>
          </div>

          {/* The Actual CV Sheet (Clean Canadian Layout) */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-md text-slate-900 font-sans text-xs space-y-4 print:p-0 print:border-none print:shadow-none">
            {/* Header / Contact */}
            <div className="text-center pb-3 border-b-2 border-slate-800 space-y-1">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                {data.fullName}
              </h1>
              <p className="text-sm font-extrabold text-blue-800 uppercase tracking-wide">
                {data.jobTitle}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] text-slate-600 pt-1 font-medium">
                <span>{data.city}</span>
                <span>•</span>
                <span>{data.phone}</span>
                <span>•</span>
                <span>{data.email}</span>
                {data.linkedin && (
                  <>
                    <span>•</span>
                    <span>{data.linkedin}</span>
                  </>
                )}
              </div>
            </div>

            {/* Profil Professionnel */}
            <div>
              <h2 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1.5">
                Profil Professionnel
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                {data.summary}
              </p>
            </div>

            {/* Compétences Clés */}
            <div>
              <h2 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1.5">
                Compétences Clés
              </h2>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-700">
                {data.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-700" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expériences */}
            <div>
              <h2 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-2">
                Expériences Professionnelles
              </h2>
              <div className="space-y-3">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-bold text-slate-950">{exp.role}</span>
                      <span className="text-[10px] text-slate-500 font-semibold">{exp.period}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 italic">
                      <span>{exp.company}</span>
                      <span>{exp.location}</span>
                    </div>
                    <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 pl-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Formation */}
            <div>
              <h2 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1.5">
                Formation & Diplômes
              </h2>
              {data.educations.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between text-[11px]">
                  <span className="font-bold text-slate-900">{edu.degree} — {edu.institution}</span>
                  <span className="text-slate-500">{edu.year}</span>
                </div>
              ))}
            </div>

            {/* Langues */}
            <div>
              <h2 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1">
                Langues
              </h2>
              <p className="text-[11px] text-slate-700">
                {data.languages.join(' • ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
