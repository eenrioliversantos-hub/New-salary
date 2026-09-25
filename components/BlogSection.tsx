'use client';

import React, { useState, useSyncExternalStore } from 'react';
import { Language } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';
import { NewsletterBox } from '@/components/NewsletterBox';
import { adminStore, BlogArticleData } from '@/lib/admin-store';
import { AdBanner } from '@/components/AdBanner';
import { normalizeUrl } from '@/lib/utils';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

export type Article = BlogArticleData;

interface BlogSectionProps {
  lang: Language;
  onSelectTool: (tool: ToolId) => void;
  onOpenEbookModal: () => void;
  initialArticleId?: string | null;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  lang,
  onSelectTool,
  onOpenEbookModal,
  initialArticleId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(initialArticleId || null);
  const [prevInitialId, setPrevInitialId] = useState<string | null | undefined>(initialArticleId);
  const articles = useSyncExternalStore(
    (cb) => adminStore.subscribe(cb),
    () => adminStore.getArticles(),
    () => adminStore.getInitialArticles()
  );

  if (initialArticleId !== prevInitialId) {
    setPrevInitialId(initialArticleId);
    setActiveArticleId(initialArticleId || null);
  }

  const handleOpenArticle = (art: BlogArticleData) => {
    setActiveArticleId(art.id);
    adminStore.logEvent({
      type: 'article_view',
      summary: `Leitura do artigo: ${art.title[lang] || art.title.pt}`,
      location: 'Québec, Canada',
      details: `Categoria: ${art.category} | ${art.readTime}`,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', label: lang === 'pt' ? 'Todos os Artigos' : lang === 'en' ? 'All Articles' : 'Tous les articles' },
    { id: 'impots', label: lang === 'pt' ? 'Salário & Impostos' : lang === 'en' ? 'Taxes & Payroll' : 'Impôts & Salaire' },
    { id: 'carriere', label: lang === 'pt' ? 'Carreira & Emprego' : lang === 'en' ? 'Career & Hiring' : 'Carrière & Embauche' },
    { id: 'finances', label: lang === 'pt' ? 'Finanças & Bancos' : lang === 'en' ? 'Finance & Banking' : 'Banques & Virements' },
    { id: 'cnesst', label: 'CNESST & Direitos' },
  ];

  const filteredArticles =
    selectedCategory === 'all'
      ? articles.filter((a) => a.published !== false)
      : articles.filter((a) => a.published !== false && a.category === selectedCategory);

  const activeArticle = articles.find((a) => a.id === activeArticleId);

  return (
    <div className="space-y-8">
      {/* If an article is selected, display Article Reader */}
      {activeArticle ? (
        <article className="space-y-6 animate-in fade-in duration-200">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-colors cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {lang === 'pt'
                  ? '← Voltar a Todos os Artigos'
                  : lang === 'en'
                  ? '← Back to All Articles'
                  : '← Retour aux articles'}
              </span>
            </button>

            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{activeArticle.readTime}</span>
            </span>
          </div>

          {/* Article Header */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {categories.find((c) => c.id === activeArticle.category)?.label || 'Guia'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{activeArticle.date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {activeArticle.title[lang] || activeArticle.title.pt}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium pb-4 border-b border-slate-100">
              {activeArticle.excerpt[lang] || activeArticle.excerpt.pt}
            </p>

            {/* Article Content Paragraphs */}
            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 pt-2">
              {(activeArticle.content[lang] || activeArticle.content.pt || []).map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Intent-Mapped Contextual Call-to-Action */}
            {activeArticle.ctaTool && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider block">
                    {lang === 'pt'
                      ? '⚡ Ferramenta Prática Recomendada para este Caso:'
                      : lang === 'en'
                      ? '⚡ Recommended Practical Tool for this Need:'
                      : '⚡ Outil pratique recommandé pour ce sujet :'}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {activeArticle.ctaToolLabel[lang] || activeArticle.ctaToolLabel.pt}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (activeArticle.ctaTool) onSelectTool(activeArticle.ctaTool);
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95"
                >
                  <span>
                    {lang === 'pt'
                      ? 'Abrir Ferramenta Grátis'
                      : lang === 'en'
                      ? 'Open Free Tool'
                      : 'Lancer l’outil gratuit'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Intent-Mapped Contextual Affiliate Partner Box */}
            {activeArticle.affiliateOffer && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white border border-slate-800 space-y-3 mt-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {activeArticle.affiliateOffer.badge[lang] || activeArticle.affiliateOffer.badge.pt}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'pt' ? 'Parceiro Verificado PaieNet' : 'Partenaire Vérifié PaieNet'}</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {activeArticle.affiliateOffer.offerTitle[lang] || activeArticle.affiliateOffer.offerTitle.pt}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {activeArticle.affiliateOffer.offerDescription[lang] || activeArticle.affiliateOffer.offerDescription.pt}
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{activeArticle.affiliateOffer.partnerName}</span>
                  </div>

                  <a
                    href={normalizeUrl(activeArticle.affiliateOffer.externalUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (activeArticle.affiliateOffer?.partnerId) {
                        adminStore.trackAffiliateClick(activeArticle.affiliateOffer.partnerId);
                      }
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>{activeArticle.affiliateOffer.ctaText[lang] || activeArticle.affiliateOffer.ctaText.pt}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Mapped In-Article Sponsor Ad Banner (Specific to this article or fallback to general blog) */}
            <div className="my-6">
              <AdBanner
                section={`blog-article-${activeArticle.id}`}
                fallbackSection="blog-article"
                format="rectangle"
              />
            </div>

            {/* E-book Purchase CTA Banner inside article */}
            {activeArticle.hasEbookCta && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-blue-50 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs font-black">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                      {lang === 'pt'
                        ? 'Livro Digital Completo Recomendado'
                        : lang === 'en'
                        ? 'Official Recommended Guide'
                        : 'Guide Complet Recommandé'}
                    </span>
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                      {lang === 'pt'
                        ? 'Guia Definitivo do Salário & Emprego no Québec (140p)'
                        : lang === 'en'
                        ? 'Ultimate Guide to Quebec Payroll & Employment (140p)'
                        : 'Guide Ultime de la Paie & de l’Emploi au Québec (140p)'}
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {lang === 'pt'
                        ? 'Apenas $9.99 CAD com garantia de 30 dias, modelos de CV e perguntas de entrevista.'
                        : lang === 'en'
                        ? 'Only $9.99 CAD with 30-day money back guarantee and ready templates.'
                        : 'Seulement 9,99 $ CAD avec modèles de CV et questions d’entrevue.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenEbookModal}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs whitespace-nowrap shadow-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                  <span>{lang === 'pt' ? 'Comprar E-book ($9.99)' : lang === 'en' ? 'Buy E-book ($9.99)' : 'Acheter l’E-book (9,99 $)'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Newsletter Box at the end of article */}
          <div className="mt-8">
            <NewsletterBox lang={lang} variant="card" />
          </div>
        </article>
      ) : (
        /* Blog Index / Showcase View */
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200 mb-1.5">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>
                      {lang === 'pt'
                        ? 'Blog & Guias Práticos do Québec'
                        : lang === 'en'
                        ? 'Quebec Practical Guides & Blog'
                        : 'Blog & Guides Pratiques'}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {lang === 'pt'
                      ? 'Tudo sobre Salário, Impostos, Leis e Carreira no Québec'
                      : lang === 'en'
                      ? 'Everything About Payroll, Taxes & Career in Quebec'
                      : 'Tout comprendre sur la paie, les impôts et l’emploi au Québec'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    {lang === 'pt'
                      ? 'Artigos práticos explicando cada desconto do holerite, normas da CNESST, formato canadense de currículo, remessas e soluções mapeadas para a sua necessidade.'
                      : lang === 'en'
                      ? 'Clear and rigorous guides breaking down paystub deductions, CNESST labor laws, ATS-friendly resumes, and banking tips.'
                      : 'Guides clairs et rigoureux pour décrypter votre talon de paie, comprendre vos droits CNESST et réussir votre embauche au Québec.'}
                  </p>
                </div>
              </div>

              {/* Direct E-book Banner Action */}
              <button
                type="button"
                onClick={onOpenEbookModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-95 shrink-0 self-start md:self-center"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'pt' ? 'E-book Oficial (140p)' : lang === 'en' ? 'Official Guide (140p)' : 'Guide E-book (140p)'}</span>
                <span className="px-1.5 py-0.2 bg-slate-950 text-amber-300 text-[10px] rounded font-bold">
                  $9.99 CAD
                </span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mapped Blog Showcase Ad Banner */}
          <div id="blog-showcase" className="mb-4">
            <AdBanner
              section="blog-index"
              fallbackSection="blog-article"
              format="top-leaderboard"
            />
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => handleOpenArticle(art)}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                      {categories.find((c) => c.id === art.category)?.label || 'Guia'}
                    </span>
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {art.title[lang] || art.title.pt}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {art.excerpt[lang] || art.excerpt.pt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>
                    {lang === 'pt' ? 'Ler artigo completo' : lang === 'en' ? 'Read full article' : 'Lire l’article complet'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Box */}
          <div className="pt-4">
            <NewsletterBox lang={lang} variant="banner" />
          </div>
        </div>
      )}
    </div>
  );
};
