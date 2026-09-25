'use client';

import React, { useMemo, useEffect, useSyncExternalStore } from 'react';
import { adminStore, AdSlotConfig } from '@/lib/admin-store';
import { normalizeUrl } from '@/lib/utils';
import {
  ExternalLink,
  ShieldCheck,
  Sparkles,
  DollarSign,
  Rocket,
  Star,
  CheckCircle2,
  TrendingUp,
  Tag,
  Eye,
} from 'lucide-react';

export interface AdBannerProps {
  slotId?: string;
  format?: 'top-leaderboard' | 'bottom-wide' | 'rectangle' | 'sidebar' | string;
  section?: 'home-top' | 'salary-results' | 'blog-article' | 'footer-wide' | 'tools-section' | 'sidebar' | string;
  fallbackSection?: string;
  label?: string;
  className?: string;
  previewSlot?: AdSlotConfig;
  isPreviewMode?: boolean;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId,
  format = 'top-leaderboard',
  section,
  fallbackSection,
  label = 'Espace Partenaire / Annonce',
  className = '',
  previewSlot,
  isPreviewMode = false,
}) => {
  // Real-time synced slots from adminStore (SSR hydration-safe)
  const allSlots = useSyncExternalStore(
    (cb) => adminStore.subscribe(cb),
    () => adminStore.getAdSlots(),
    () => adminStore.getInitialAdSlots()
  );

  const adSlot = useMemo(() => {
    if (previewSlot) return previewSlot;
    if (slotId) return allSlots.find((s) => s.id === slotId);
    if (section) {
      const match = allSlots.find((s) => s.pageSection === section);
      if (match) return match;
      if (fallbackSection) return allSlots.find((s) => s.pageSection === fallbackSection);
    }
    return allSlots.find((s) => s.id === format || s.format === format);
  }, [previewSlot, slotId, section, fallbackSection, format, allSlots]);

  // Record impression on mount (only in live mode, not preview)
  useEffect(() => {
    if (!isPreviewMode && adSlot?.id && adSlot.status !== 'paused') {
      adminStore.recordAdImpression(adSlot.id);
    }
  }, [adSlot?.id, adSlot?.status, isPreviewMode]);

  // If paused and not preview mode, completely hide
  if (!isPreviewMode && (!adSlot || adSlot.status === 'paused')) {
    return null;
  }

  // Anchor ID for quick navigation / verification
  const anchorId =
    section === 'home-top'
      ? 'calculator-top'
      : section === 'salary-results'
      ? 'salary-results'
      : section === 'footer-wide'
      ? 'footer-sponsor'
      : section === 'blog-article' || section?.startsWith('blog-article')
      ? 'ad-slot'
      : adSlot?.id || undefined;

  const currentFormat = adSlot?.format || (format as AdSlotConfig['format']) || 'top-leaderboard';

  // Helper for Icon rendering
  const renderIcon = (iconType?: string) => {
    switch (iconType) {
      case 'shield':
        return <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />;
      case 'dollar':
        return <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />;
      case 'rocket':
        return <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />;
      case 'star':
        return <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />;
    }
  };

  // Helper for Theme Background & Border classes
  const getThemeClasses = (gradient?: string) => {
    switch (gradient) {
      case 'emerald':
        return 'bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-emerald-600/60 hover:border-emerald-400';
      case 'indigo':
        return 'bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-indigo-600/60 hover:border-indigo-400';
      case 'purple':
        return 'bg-gradient-to-r from-purple-950 via-slate-900 to-fuchsia-950 border-purple-600/60 hover:border-purple-400';
      case 'amber':
        return 'bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border-amber-600/60 hover:border-amber-400';
      case 'dark':
        return 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-slate-700 hover:border-slate-500';
      case 'blue':
      default:
        return 'bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-blue-600/60 hover:border-blue-400';
    }
  };

  const getCtaBtnClasses = (gradient?: string) => {
    switch (gradient) {
      case 'emerald':
        return 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50';
      case 'indigo':
        return 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-950/50';
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/50';
      case 'amber':
        return 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950/50';
      case 'blue':
      default:
        return 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/50';
    }
  };

  // If custom direct sponsor is configured
  if (adSlot?.status === 'custom-sponsor' && adSlot.customSponsor) {
    const sponsor = adSlot.customSponsor;
    const destinationUrl = normalizeUrl(sponsor.linkUrl);

    const handleSponsorClick = (e: React.MouseEvent) => {
      // If no valid URL, prevent blank jumps
      if (!destinationUrl || destinationUrl === '#') {
        e.preventDefault();
        return;
      }
      // Track real click only in live production mode
      if (!isPreviewMode && adSlot.id) {
        adminStore.trackAdClick(adSlot.id);
      }
      // In preview mode we DO NOT preventDefault! This allows the user to test the offer button.
    };

    // 1. TOP LEADERBOARD FORMAT
    if (currentFormat === 'top-leaderboard') {
      return (
        <div id={anchorId} suppressHydrationWarning className={`w-full max-w-5xl mx-auto my-3 px-3 print:hidden ${className}`}>
          {isPreviewMode && (
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
              <span className="flex items-center gap-1 text-blue-400">
                <Eye className="w-3 h-3" /> Pré-visualização do Banner: {adSlot.name}
              </span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Seção: {adSlot.pageSectionLabel || adSlot.pageSection}
              </span>
            </div>
          )}

          <a
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className={`group block w-full p-3 sm:py-2.5 sm:px-5 border rounded-2xl shadow-sm transition-all text-white cursor-pointer ${getThemeClasses(
              sponsor.themeGradient
            )}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 rounded-lg bg-white/10 shrink-0 border border-white/10">
                  {renderIcon(sponsor.iconType)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-bold text-[10px] uppercase border border-amber-400/30 shrink-0">
                      {sponsor.badgeText || 'Parceiro Verificado'}
                    </span>
                    <span className="font-extrabold text-white text-xs sm:text-sm group-hover:text-blue-300 transition-colors truncate">
                      {sponsor.headline}
                    </span>
                  </div>
                  {sponsor.tagline && (
                    <p className="text-slate-300 text-[11px] truncate mt-0.5 hidden sm:block">
                      {sponsor.tagline}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span className="text-[11px] font-semibold text-slate-300 hidden md:inline">
                  {sponsor.sponsorName}
                </span>
                <span
                  className={`px-3 py-1.5 rounded-xl font-black text-xs inline-flex items-center gap-1.5 shadow-sm transition-transform group-hover:scale-[1.02] ${getCtaBtnClasses(
                    sponsor.themeGradient
                  )}`}
                >
                  <span>{sponsor.ctaText || 'Acessar Oferta'}</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </a>
        </div>
      );
    }

    // 2. RECTANGLE FORMAT (Inside blog articles or split content)
    if (currentFormat === 'rectangle') {
      return (
        <div id={anchorId} suppressHydrationWarning className={`w-full max-w-md mx-auto my-5 print:hidden ${className}`}>
          {isPreviewMode && (
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
              <span className="flex items-center gap-1 text-indigo-400">
                <Eye className="w-3 h-3" /> Pré-visualização Retângulo (300×250)
              </span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                {adSlot.pageSectionLabel}
              </span>
            </div>
          )}

          <a
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className={`group block w-full p-5 sm:p-6 border rounded-2xl shadow-sm transition-all text-white space-y-3 cursor-pointer ${getThemeClasses(
              sponsor.themeGradient
            )}`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold uppercase border border-blue-400/30 flex items-center gap-1">
                {renderIcon(sponsor.iconType)}
                <span>{sponsor.badgeText || 'Recomendado'}</span>
              </span>
              <span className="text-slate-400 font-medium">{sponsor.sponsorName}</span>
            </div>

            <div>
              <h5 className="font-extrabold text-sm sm:text-base text-white group-hover:text-blue-200 transition-colors leading-snug">
                {sponsor.headline}
              </h5>
              {sponsor.tagline && (
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {sponsor.tagline}
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Oferta Verificada</span>
              </span>

              <div
                className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-transform group-hover:scale-105 ${getCtaBtnClasses(
                  sponsor.themeGradient
                )}`}
              >
                <span>{sponsor.ctaText || 'Acessar Oferta'}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>
        </div>
      );
    }

    // 3. SIDEBAR FORMAT
    if (currentFormat === 'sidebar') {
      return (
        <div id={anchorId} suppressHydrationWarning className={`w-full my-4 print:hidden ${className}`}>
          {isPreviewMode && (
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">
              Pré-visualização Barra Lateral
            </div>
          )}

          <a
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSponsorClick}
            className={`group block w-full p-4 border rounded-2xl shadow-sm transition-all text-white space-y-2.5 cursor-pointer ${getThemeClasses(
              sponsor.themeGradient
            )}`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold uppercase border border-blue-400/30">
                {sponsor.badgeText}
              </span>
              <span className="text-slate-400 text-[10px]">{sponsor.sponsorName}</span>
            </div>
            <h6 className="font-bold text-xs sm:text-sm text-white group-hover:text-blue-300 transition-colors">
              {sponsor.headline}
            </h6>
            {sponsor.tagline && (
              <p className="text-[11px] text-slate-300 leading-snug">{sponsor.tagline}</p>
            )}
            <div className="pt-1 flex items-center justify-end text-xs font-bold text-emerald-400 gap-1">
              <span>{sponsor.ctaText || 'Acessar Oferta'}</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        </div>
      );
    }

    // 4. BOTTOM-WIDE / BANNER AMPLO (Default fallback for bottom-wide)
    return (
      <div id={anchorId} suppressHydrationWarning className={`w-full max-w-5xl mx-auto my-6 px-3.5 print:hidden ${className}`}>
        {isPreviewMode && (
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <Eye className="w-3 h-3" /> Pré-visualização Rodapé Amplo (970×90)
            </span>
            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
              Local: {adSlot.pageSectionLabel} ({adSlot.pageUrlPath})
            </span>
          </div>
        )}

        <a
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSponsorClick}
          className={`group block w-full p-4 sm:p-5 border rounded-2xl shadow-sm transition-all text-white cursor-pointer ${getThemeClasses(
            sponsor.themeGradient
          )}`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center shrink-0 shadow-xs">
                {renderIcon(sponsor.iconType)}
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                    {sponsor.badgeText || 'Parceiro'}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">{sponsor.sponsorName}</span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-blue-200 transition-colors">
                  {sponsor.headline}
                </h4>
                {sponsor.tagline && (
                  <p className="text-xs text-slate-300 mt-0.5">{sponsor.tagline}</p>
                )}
              </div>
            </div>

            <div
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 shrink-0 shadow-md transition-all group-hover:scale-105 ${getCtaBtnClasses(
                sponsor.themeGradient
              )}`}
            >
              <span>{sponsor.ctaText || 'Acessar Oferta'}</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </a>
      </div>
    );
  }

  // DEFAULT ADSENSE / PLACEHOLDER DISPLAY MODE
  if (currentFormat === 'top-leaderboard') {
    return (
      <div id={anchorId} suppressHydrationWarning className={`w-full max-w-5xl mx-auto my-3 px-3 print:hidden ${className}`} aria-label="Annonce publicitaire">
        <div className="w-full h-14 sm:h-20 bg-slate-50 border border-dashed border-slate-300/90 rounded-2xl flex flex-col items-center justify-center text-center p-2 text-xs text-slate-400">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-0.5">
            {label}
          </span>
          <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">
            Emplacement AdSense Leaderboard ({adSlot?.adSenseSlotId || '728×90 / Responsive'})
          </span>
        </div>
      </div>
    );
  }

  if (currentFormat === 'rectangle') {
    return (
      <div id={anchorId} suppressHydrationWarning className={`w-full max-w-md mx-auto my-4 print:hidden ${className}`} aria-label="Annonce publicitaire">
        <div className="w-full min-h-[220px] bg-slate-50 border border-dashed border-slate-300/90 rounded-2xl flex flex-col items-center justify-center text-center p-4 text-xs text-slate-400">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
            {label}
          </span>
          <span className="text-slate-500 font-mono text-[11px]">
            Emplacement AdSense Retângulo ({adSlot?.adSenseSlotId || '300×250 / 336×280'})
          </span>
        </div>
      </div>
    );
  }

  return (
    <div id={anchorId} suppressHydrationWarning className={`w-full max-w-5xl mx-auto my-4 px-3.5 print:hidden ${className}`} aria-label="Annonce publicitaire">
      <div className="w-full h-16 sm:h-20 bg-slate-50 border border-dashed border-slate-300/90 rounded-2xl flex flex-col items-center justify-center text-center p-2 text-xs text-slate-400">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-0.5">
          {label}
        </span>
        <span className="text-slate-500 font-mono text-[11px]">
          Emplacement AdSense Rodapé Amplo ({adSlot?.adSenseSlotId || '970×90'})
        </span>
      </div>
    </div>
  );
};
