'use client';

import { Language } from '@/lib/i18n';
import { ToolId } from '@/components/ToolboxGrid';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface BlogArticleData {
  id: string;
  slug: string;
  category: 'impots' | 'carriere' | 'finances' | 'cnesst';
  readTime: string;
  date: string;
  published: boolean;
  viewsCount: number;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string[]>;
  ctaTool?: ToolId;
  ctaToolLabel: Record<Language, string>;
  affiliateOffer?: {
    partnerId?: string;
    partnerName: string;
    badge: Record<Language, string>;
    offerTitle: Record<Language, string>;
    offerDescription: Record<Language, string>;
    ctaText: Record<Language, string>;
    externalUrl: string;
  };
  hasEbookCta?: boolean;
}

export interface ArticleTemplate {
  id: string;
  name: string;
  description: string;
  category: 'impots' | 'carriere' | 'finances' | 'cnesst';
  intent: 'informativo' | 'transacional' | 'comparativo' | 'defesa_direitos' | 'carreira';
  intentLabel: string;
  funnelStage: 'topo' | 'meio' | 'fundo';
  funnelLabel: string;
  iconName: string;
  targetAudience: string;
  recommendedCtaTool: ToolId;
  defaultAffiliatePartnerId?: string;
  preset: {
    category: 'impots' | 'carriere' | 'finances' | 'cnesst';
    readTime: string;
    date: string;
    title: Record<Language, string>;
    excerpt: Record<Language, string>;
    content: Record<Language, string[]>;
    ctaTool: ToolId;
    ctaToolLabel: Record<Language, string>;
    affiliateOffer?: {
      partnerId?: string;
      partnerName: string;
      badge: Record<Language, string>;
      offerTitle: Record<Language, string>;
      offerDescription: Record<Language, string>;
      ctaText: Record<Language, string>;
      externalUrl: string;
    };
    hasEbookCta: boolean;
  };
}

export interface AffiliatePartner {
  id: string;
  name: string;
  category: 'bancos' | 'remessas' | 'carreira' | 'investimentos' | 'seguros';
  targetUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  commissionType: 'CPA' | 'CPC' | 'Percentual' | 'Fixo';
  commissionValue: string;
  active: boolean;
  clicksCount: number;
  estimatedConversions: number;
  estimatedRevenueCad: number;
  description: string;
}

export interface AdSlotConfig {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'custom-sponsor';
  adSenseSlotId: string;
  pageSection: 'home-top' | 'salary-results' | 'blog-article' | 'footer-wide' | 'tools-section' | 'sidebar' | string;
  pageSectionLabel: string;
  pageUrlPath: string;
  format: 'top-leaderboard' | 'bottom-wide' | 'rectangle' | 'sidebar';
  customSponsor?: {
    sponsorName: string;
    headline: string;
    tagline: string;
    linkUrl: string;
    badgeText: string;
    ctaText?: string;
    themeGradient?: 'blue' | 'emerald' | 'indigo' | 'purple' | 'amber' | 'dark';
    iconType?: 'sparkles' | 'shield' | 'dollar' | 'rocket' | 'star' | 'external';
  };
  impressions: number;
  clicks: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface EbookCoupon {
  code: string;
  discountPercent?: number;
  discountFixedCad?: number;
  active: boolean;
  usesCount: number;
}

export interface DigitalAsset {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  category: 'ebook' | 'template' | 'spreadsheet' | 'checklist' | 'guide';
  accessType: 'free' | 'paid';
  fileFormat: 'PDF' | 'XLSX' | 'DOCX' | 'ZIP' | 'NOTION' | string;
  fileSize: string;
  pageOrItemCount?: string;
  regularPriceCad: number;
  promotionalPriceCad: number;
  downloadUrl: string;
  salesStatus: 'active' | 'paused' | 'draft';
  badge?: string;
  badgeColor?: 'blue' | 'emerald' | 'amber' | 'purple' | 'indigo' | 'rose';
  highlights: string[];
  totalDownloads: number;
  totalSales: number;
  totalRevenueCad: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EbookConfig {
  title: string;
  subtitle: string;
  pageCount: number;
  regularPriceCad: number;
  promotionalPriceCad: number;
  salesStatus: 'active' | 'paused' | 'presale';
  downloadUrl: string;
  totalCopiesSold: number;
  totalRevenueCad: number;
  coupons: EbookCoupon[];
}

export interface EbookOrder {
  id: string;
  customerEmail: string;
  assetId?: string;
  assetTitle?: string;
  date: string;
  amountCad: number;
  couponUsed?: string;
  status: 'completed' | 'delivered' | 'refunded';
  downloadAccessCount: number;
}

export interface NewsletterLead {
  id: string;
  email: string;
  source: 'home_banner' | 'blog_post' | 'footer' | 'ebook_modal' | 'manual';
  date: string;
  status: 'subscribed' | 'unsubscribed';
}

export interface LiveActivityEvent {
  id?: string;
  timestamp?: string;
  type: 'salary_calc' | 'tool_view' | 'article_view' | 'affiliate_click' | 'ebook_view' | 'ebook_purchase' | 'newsletter_signup';
  summary: string;
  location: string;
  details?: string;
}

export interface DailyAnalytics {
  date: string;
  pageViews: number;
  salaryCalculations: number;
  affiliateClicks: number;
  ebookSalesCad: number;
}

export interface SiteSettings {
  siteName: string;
  supportEmail: string;
  defaultCurrency: string;
  googleAnalyticsId: string;
  adSensePublisherId: string;
  telemetryEnabled: boolean;
  maintenanceMode: boolean;
}

// ==========================================
// INITIAL SEED DATA
// ==========================================

const INITIAL_SITE_SETTINGS: SiteSettings = {
  siteName: 'PaieNet.qc - Calculateur de Salaire Brut en Net & Impôts Québec',
  supportEmail: 'contact@paienet.qc.ca',
  defaultCurrency: 'CAD ($)',
  googleAnalyticsId: 'G-QCPAIENET2026',
  adSensePublisherId: 'ca-pub-992817263541',
  telemetryEnabled: true,
  maintenanceMode: false,
};

const INITIAL_ARTICLES: BlogArticleData[] = [
  {
    id: 'comprendre-talon-paie',
    slug: 'comprendre-talon-paie-quebec',
    category: 'impots',
    readTime: '6 min',
    date: 'Édition 2025/2026',
    published: true,
    viewsCount: 1420,
    title: {
      pt: 'Entendendo seu Holerite no Québec: RRQ, RQAP, AE e o Abatimento de 16,5%',
      fr: 'Comprendre son Talon de Paie au Québec : RRQ, RQAP, AE et l’Abattement de 16,5 %',
      en: 'Understanding Your Quebec Paystub: QPP, QPIP, EI and the 16.5% Federal Abatement',
    },
    excerpt: {
      pt: 'Por que o Québec tem alíquotas fiscais próprias e como funciona o abatimento automático de 16,5% do imposto federal no seu salário líquido? Saiba como não perder nenhum centavo.',
      fr: 'Pourquoi le Québec a-t-il deux déclarations de revenus distinctes et comment fonctionne l’abattement fédéral de 16,5 % sur votre paie ? Explications claires pour ne rien perdre.',
      en: 'Why does Quebec have separate provincial taxes and how does the 16.5% Quebec Abatement reduce your federal tax burden? Full mathematical breakdown.',
    },
    content: {
      pt: [
        'Para todo trabalhador ou imigrante recém-chegado ao Québec, receber o primeiro contracheque (talon de paie) costuma trazer surpresas: a diferença entre o salário bruto contratado e o valor líquido depositado na conta é moldada por regimes públicos exclusivos da província.',
        '1. O Regime de Aposentadoria do Québec (RRQ): Ao contrário das outras províncias canadenses que contribuem para o CPP (Canada Pension Plan), o Québec possui seu próprio fundo de pensão estatal. A alíquota combinada incide sobre os ganhos admissíveis acima da isenção básica de $3.500 CAD.',
        '2. O Seguro Parental (RQAP): Financia as licenças de maternidade, paternidade e adoção com benefícios mais generosos que no restante do país. Em contrapartida, a alíquota de Seguro-Desemprego (Assurance-Emploi / AE) federal cobrada no Québec é menor do que nas outras províncias canadenses.',
        '3. O Abatimento do Québec de 16,5%: Esta é a maior peculiaridade fiscal! Como o governo provincial do Québec financia diretamente seus próprios programas sociais, o governo federal do Canadá concede um desconto automático de 16,5% sobre o imposto federal devido.',
        'Nossa calculadora PaieNet.qc reproduz essa fórmula com precisão matemática até o centavo, permitindo que você confira se o departamento de recursos humanos da sua empresa está aplicando as retenções corretas.',
      ],
      fr: [
        'Pour tout travailleur ou immigrant arrivant au Québec, recevoir son premier talon de paie peut être surprenant : l’écart entre le salaire brut négocié et le montant net déposé dans votre compte bancaire est influencé par plusieurs régimes publics propres à la province.',
        '1. Le Régime de rentes du Québec (RRQ) : Contrairement aux autres provinces canadiennes qui cotisent au RPC (Régime de pensions du Canada), le Québec possède son propre fonds de retraite public. Le taux combiné s’applique sur les gains admissibles au-delà de l’exemption de base de 3 500 $.',
        '2. Le Régime québécois d’assurance parentale (RQAP) : Ce régime finance les congés de maternité, de paternité et d’adoption avec des prestations généreuses. En échange, le taux d’assurance-emploi (AE) fédéral prélevé au Québec est réduit comparativement au reste du Canada.',
        '3. L’Abattement du Québec de 16,5 % : Le gouvernement fédéral accorde au Québec un crédit automatique de 16,5 % sur l’impôt de base fédéral parce que le Québec finance lui-même plusieurs programmes sociaux.',
        'Notre calculateur PaieNet intègre cette formule officielle avec exactitude mathématique pour vérifier chacune de vos paies.',
      ],
      en: [
        'For any worker or newcomer in Quebec, receiving your first paystub can be surprising: the gap between negotiated gross pay and net cash deposited is shaped by Quebec’s distinct social regimes.',
        '1. Quebec Pension Plan (QPP/RRQ): Unlike the rest of Canada contributing to CPP, Quebec manages its own independent pension fund with combined base and enhanced contributions.',
        '2. Quebec Parental Insurance Plan (QPIP/RQAP): Offers generous parental and maternity leaves. In return, the federal Employment Insurance (EI) premium rate is discounted for Quebec residents.',
        '3. The 16.5% Quebec Abatement: A federal tax reduction given to Quebec workers because the province opted out of certain shared federal programs. PaieNet calculates this exact credit down to the cent.',
      ],
    },
    ctaTool: 'net-calc',
    ctaToolLabel: {
      pt: 'Calcular meu Salário Líquido no PaieNet',
      fr: 'Calculer mon salaire net en direct',
      en: 'Calculate my exact take-home pay',
    },
    affiliateOffer: {
      partnerId: 'desjardins',
      partnerName: 'Desjardins / Banque Nationale',
      badge: {
        pt: 'Oferta Especial Trabalhadores & Recém-Chegados',
        fr: 'Offre Travailleurs & Nouveaux Arrivants',
        en: 'Worker & Newcomer Welcome Offer',
      },
      offerTitle: {
        pt: 'Conta corrente sem tarifas + Bônus de até $150 CAD',
        fr: 'Compte chèque sans frais & Bonus jusqu’à 150 $ CAD',
        en: 'No-fee checking account & Welcome bonus up to $150 CAD',
      },
      offerDescription: {
        pt: 'Abra sua conta salário no Québec com isenção de tarifas por 12 meses e obtenha seu cartão de crédito canadense sem histórico prévio.',
        fr: 'Ouvrez votre compte chèque pour recevoir votre paie au Québec sans frais mensuels pendant 12 mois + carte de crédit sans historique.',
        en: 'Open your direct deposit salary account in Quebec with 12 months waived monthly fees and access to a credit card without credit history.',
      },
      ctaText: {
        pt: 'Abrir conta com benefícios parceiro',
        fr: 'Découvrir l’offre partenaire',
        en: 'Claim partner bank offer',
      },
      externalUrl: 'https://www.desjardins.com',
    },
    hasEbookCta: true,
  },
  {
    id: 'cv-format-canadien',
    slug: 'cv-format-canadien-sans-photo',
    category: 'carriere',
    readTime: '5 min',
    date: 'Guia RH',
    published: true,
    viewsCount: 1890,
    title: {
      pt: 'Currículo no Formato Canadense: Por que fotos e dados pessoais causam descarte imediato',
      fr: 'Le CV Format Canadien : Pourquoi les recruteurs du Québec rejettent les CVs avec photo',
      en: 'Canadian Format Resume: Why photos and personal details get rejected by recruiters',
    },
    excerpt: {
      pt: 'Pela Carta de Direitos e Liberdades do Québec, colocar foto, idade, estado civil ou nacionalidade no currículo é proibido e eliminado pelos filtros ATS de RH. Veja a estrutura correta.',
      fr: 'En vertu de la Charte des droits et libertés de la personne, inclure une photo, votre âge ou votre état civil sur un CV au Canada est la cause n°1 de rejet automatique. Voici comment vous conformer.',
      en: 'Under Quebec human rights laws, adding photos, date of birth, or marital status causes immediate ATS rejection. Learn the compliant Canadian resume standard.',
    },
    content: {
      pt: [
        'No Brasil e em diversos países da América Latina e Europa, colocar uma foto profissional no currículo é um hábito comum. No Canadá e especialmente no Québec, fazer isso significa quase certamente a eliminação imediata da sua candidatura!',
        'Por que essa rejeição tão rigorosa? A Carta dos Direitos e Liberdades da Pessoa do Québec proíbe qualquer discriminação na contratação com base em idade, sexo, raça, estado civil ou aparência física. Para evitar processos judiciais, os departamentos de Recursos Humanos e os robôs de triagem (sistemas ATS) descartam automaticamente qualquer currículo que contenha foto.',
        'A anatomia do CV aprovado no Québec:',
        '• Cabeçalho Clean: Nome completo, cidade/bairro, e-mail profissional, telefone local e link do LinkedIn.',
        '• Resumo de Qualificações (Profil): 3 a 4 linhas fortes destacando sua especialidade e valor agregado.',
        '• Competências Técnicas: Lista com palavras-chave exatas da descrição da vaga para passar na triagem do ATS.',
        '• Experiência com Verbos de Ação e Resultados: Estruture cada cargo com conquistas mensuráveis (ex: "Aumentou a produtividade em 18%", "Reduziu o tempo de parada de máquinas em 25%").',
      ],
      fr: [
        'Dans de nombreux pays, mettre une photo soignée sur son CV est la norme. Au Canada et particulièrement au Québec, c’est rigoureusement l’inverse !',
        'Pourquoi ce rejet systématique ? La Charte québécoise des droits et libertés interdit toute discrimination à l’embauche. Pour se protéger légalement de toute contestation, les départements RH et les systèmes ATS éliminent immédiatement les CVs contenant une photo ou l’état civil.',
        'La structure gagnante au Québec : En-tête épuré, profil percutant de 3-4 lignes, compétences clés avec mots-clés de l’offre, et réalisations concrètes chiffrées avec verbes d’action.',
      ],
      en: [
        'In many countries, attaching a professional headshot to your resume is standard. In Canada and Quebec, it is the number one reason applications get disqualified immediately.',
        'Strict anti-discrimination legislation requires HR teams and ATS scanners to discard resumes containing personal pictures, age, gender, or marital status.',
        'The winning structure: Clean header without street address or photo, powerful 3-sentence summary, targeted skills matching job keywords, and bullet points starting with strong action verbs and quantifiable results.',
      ],
    },
    ctaTool: 'resume-builder',
    ctaToolLabel: {
      pt: 'Criar meu Currículo Canadense Grátis',
      fr: 'Générer mon CV canadien 100% conforme',
      en: 'Build my free Canadian format resume',
    },
    affiliateOffer: {
      partnerId: 'jobscan',
      partnerName: 'Jobscan ATS Resume Scanner',
      badge: {
        pt: 'Parceiro Recomendado para Vagas',
        fr: 'Partenaire Recommandé ATS',
        en: 'Recommended ATS Partner',
      },
      offerTitle: {
        pt: 'Teste seu CV contra a vaga e aumente em 3x suas chances de entrevista',
        fr: 'Testez la compatibilité de votre CV avec l’offre d’emploi',
        en: 'Scan your resume against job postings to triple your interview rate',
      },
      offerDescription: {
        pt: 'Algoritmo que compara as palavras-chave do seu currículo com a descrição do cargo para garantir pontuação de compatibilidade superior a 80%.',
        fr: 'Analysez instantanément les correspondances de mots-clés entre votre profil et les systèmes ATS des employeurs québécois.',
        en: 'Match your resume keywords with employer ATS requirements to pass initial automated screening.',
      },
      ctaText: {
        pt: 'Escanear meu currículo agora',
        fr: 'Analyser mon CV avec Jobscan',
        en: 'Scan my resume with Jobscan',
      },
      externalUrl: 'https://www.jobscan.co',
    },
    hasEbookCta: true,
  },
  {
    id: 'remises-argent-international',
    slug: 'envoyer-argent-pays-origine-frais-bancaires',
    category: 'finances',
    readTime: '4 min',
    date: 'Finanças Práticas',
    published: true,
    viewsCount: 2310,
    title: {
      pt: 'Enviando Dinheiro para o Brasil / Exterior: Como evitar taxas ocultas e spread bancário abusivo',
      fr: 'Envoyer de l’argent vers son pays d’origine : Éviter les frais bancaires cachés',
      en: 'Sending Money Internationally: How to avoid hidden exchange markup and high wire fees',
    },
    excerpt: {
      pt: 'Grandes bancos tradicionais cobram taxas fixas de $30 a $50 CAD mais um spread de 3% a 6% escondido no câmbio. Descubra como economizar centenas de dólares do seu salário.',
      fr: 'Les banques traditionnelles facturent souvent des frais fixes de 30 $ à 50 $ en plus d’une marge cachée de 3 à 5 % sur le taux de change. Comment conserver votre salaire gagné au Québec.',
      en: 'Traditional banks often charge high wire fees plus a 3% to 5% hidden margin on exchange rates. How to keep more of your hard-earned money.',
    },
    content: {
      pt: [
        'Muitos trabalhadores e famílias que vivem no Québec enviam parte de seu salário quinzenal para apoiar parentes no Brasil ou em seu país de origem.',
        'A armadilha dos bancos tradicionais: Ao fazer uma remessa internacional via banco tradicional, a instituição muitas vezes divulga "taxa de envio baixa", mas aplica uma cotação de câmbio desfavorável, com spread oculto de 3% a 6% em relação ao câmbio comercial oficial.',
        'Em transferências anuais acumuladas de $10.000 CAD, essa margem oculta representa entre $300 e $600 CAD perdidos que poderiam ficar no seu bolso ou ajudar sua família.',
        'Utilizando plataformas reguladas especializadas como a Wise, você obtém a cotação média real de mercado (câmbio comercial) com tarifas transparentes de menos de 0,5% e dinheiro entregue via PIX no Brasil em minutos.',
      ],
      fr: [
        'Beaucoup de travailleurs au Québec soutiennent leur famille dans leur pays d’origine en envoyant une partie de leur salaire.',
        'Le piège des banques traditionnelles : Lorsque vous effectuez un virement via une grande banque, celle-ci applique un taux de change majoré de 3 % à 6 % par rapport au cours moyen réel du marché.',
        'Sur un virement annuel de 10 000 $ CAD, cette marge cachée représente entre 300 $ et 600 $ perdus inutilement. Utiliser des plateformes modernes comme Wise garantit le taux réel interbancaire.',
      ],
      en: [
        'Many workers in Quebec send money home to support family. Traditional wire transfers hide exorbitant fees inside marked-up exchange rates.',
        'On $10,000 CAD transferred per year, hidden margins cost you between $300 and $600 CAD. Using dedicated platforms with real mid-market rates saves you up to 80%.',
      ],
    },
    affiliateOffer: {
      partnerId: 'wise',
      partnerName: 'Wise (Câmbio & Remessas)',
      badge: {
        pt: 'Primeira Remessa sem Taxa de Serviço',
        fr: 'Premier Virement Sans Frais',
        en: 'First Transfer Fee-Free',
      },
      offerTitle: {
        pt: 'Câmbio Comercial Real Garantido & Economia de até 80%',
        fr: 'Taux de change moyen réel garanti & Économisez jusqu’à 80 %',
        en: 'Real mid-market exchange rate & Save up to 80% on fees',
      },
      offerDescription: {
        pt: 'Envie seus dólares canadenses (CAD) para o Brasil (BRL) via PIX com a taxa oficial de mercado e acompanhe cada centavo em tempo real.',
        fr: 'Envoyez vos dollars canadiens (CAD) au taux réel du marché sans commissions cachées vers plus de 70 pays.',
        en: 'Send Canadian dollars (CAD) globally at the mid-market rate with transparent pricing and instant delivery.',
      },
      ctaText: {
        pt: 'Transferir com Câmbio Comercial Real',
        fr: 'Transférer avec le taux réel',
        en: 'Transfer with real exchange rate',
      },
      externalUrl: 'https://wise.com',
    },
    ctaTool: 'converter',
    ctaToolLabel: {
      pt: 'Simular equivalência de salário no Conversor',
      fr: 'Calculer mes équivalences salariales',
      en: 'Calculate wage equivalencies',
    },
    hasEbookCta: true,
  },
  {
    id: 'cnesst-normes-travail',
    slug: 'normes-du-travail-cnesst-heures-sup-feries',
    category: 'cnesst',
    readTime: '7 min',
    date: 'Legislação CNESST',
    published: true,
    viewsCount: 1670,
    title: {
      pt: 'Normas do Trabalho no Québec (CNESST): Horas extras a 1,5×, os 8 feriados e férias pagas',
      fr: 'Normes du Travail au Québec (CNESST) : Heures sup à 1,5×, les 8 fériés et congés payés',
      en: 'Quebec Labor Standards (CNESST): 1.5× Overtime, 8 Paid Holidays and Vacation Pay',
    },
    excerpt: {
      pt: 'No Québec, a Lei sobre Normas do Trabalho protege todos os trabalhadores: tempo e meio após 40h/semana, indenização de feriado pela regra de 1/20 e férias de 4% ou 6%.',
      fr: 'Au Québec, la Loi sur les normes du travail protège tous les salariés : temps et demi au-delà de 40h/semaine, calcul de l’indemnité de férié selon la règle du 1/20 et congés annuels de 4 % à 6 %.',
      en: 'Quebec labor laws strictly protect workers: time-and-a-half after 40h, 1/20 holiday pay rule, and 4% to 6% statutory vacation accrual.',
    },
    content: {
      pt: [
        'A Comissão de Normas, Equidade, Saúde e Segurança do Trabalho (CNESST) estabelece os direitos mínimos inegociáveis de qualquer empregado no Québec, independentemente de ser residente permanente, trabalhador com visto fechado (LMIA/EIMT) ou permissão pós-graduação.',
        '1. Horas Extras (Temps supplémentaire - Art. 55): Para a grande maioria das indústrias e empresas de serviços, a semana normal é de 40 horas. Todas as horas trabalhadas além desse limite devem obrigatoriamente ser pagas com acréscimo de 50% (taxa horária multiplicada por 1,5×).',
        '2. Os 8 Feriados Oficiais e a Regra do 1/20: O Québec possui 8 feriados estatutários oficiais. Para quem folga ou trabalha no feriado, a empresa deve pagar uma indenização equivalente a 1/20 (5%) do salário bruto recebido nas 4 semanas completas anteriores ao feriado.',
        '3. Férias Remuneradas (4% ou 6%): Trabalhadores com menos de 3 anos de casa acumulam 4% de férias remuneradas (2 semanas). Ao completar 3 anos de serviço contínuo, a taxa sobe obrigatoriamente para 6% (3 semanas de férias pagas).',
      ],
      fr: [
        'La CNESST établit les conditions minimales de travail au Québec. Tout employeur est légalement tenu de les respecter.',
        '1. Heures supplémentaires (Art. 55) : Au-delà de 40 heures par semaine, la rémunération avec majoration de 50 % (1,5×) est obligatoire.',
        '2. Les 8 jours fériés et la règle du 1/20 (Art. 62) : L’indemnité équivaut à 1/20 du salaire brut gagné au cours des 4 semaines complètes de paie précédant le congé.',
        '3. L’indemnité de vacances (4 % ou 6 %) : 2 semaines (4 %) pour moins de 3 ans de service, puis 3 semaines (6 %) dès 3 ans de service continu.',
      ],
      en: [
        'Quebec’s CNESST enforces mandatory labor standards for all workers regardless of visa or residency status.',
        '1. Overtime: Mandatory 1.5× rate applies to hours worked beyond 40 hours in a standard work week.',
        '2. The 8 Statutory Holidays & 1/20 rule: You are entitled to 1/20th of gross earnings from the 4 weeks preceding the holiday.',
        '3. Vacation pay: 4% (2 weeks) for under 3 years of tenure, bumping to 6% (3 weeks) at 3 years.',
      ],
    },
    ctaTool: 'vacation-holidays',
    ctaToolLabel: {
      pt: 'Simular Férias e Feriados no PaieNet',
      fr: 'Simulateur Vacances & Fériés CNESST',
      en: 'Simulate CNESST holidays and vacation',
    },
    hasEbookCta: true,
  },
  {
    id: 'entrevue-methode-star',
    slug: 'reussir-entrevue-embauche-methode-star-quebec',
    category: 'carriere',
    readTime: '5 min',
    date: 'Coaching RH',
    published: true,
    viewsCount: 1140,
    title: {
      pt: 'Como Passar em Entrevistas de Emprego no Québec: O Método STAR e a Etiqueta Cultural',
      fr: 'Réussir son Entrevue d’Embauche au Québec : Maîtriser la Méthode STAR et les Codes Culturels',
      en: 'Acing Job Interviews in Quebec: The STAR Method and Cultural Workplace Etiquette',
    },
    excerpt: {
      pt: 'A modéstia construtiva, o espírito de equipe e a ausência de arrogância contam tanto quanto a habilidade técnica. Veja como responder perguntas comportamentais com precisão.',
      fr: 'L’humilité chaleureuse, l’absence de vantardise et la capacité de travailler en équipe priment sur les grands discours. Comment structurer vos réponses avec la formule STAR.',
      en: 'Team spirit, humble confidence, and structured problem-solving win over Quebec hiring managers. How to answer with Situation, Task, Action, Result.',
    },
    content: {
      pt: [
        'No Québec, as entrevistas de emprego não são interrogatórios sob pressão. São conversas profissionais estruturadas onde a inteligência interpessoal e a adequação cultural pesam tanto quanto o domínio técnico.',
        'A cilada cultural: Em certas culturas profissionais, é comum monopolizar os louros e falar "eu fiz sozinho". No ambiente québécois, o entrevistador valoriza quem reconhece a contribuição da equipe ("Nós analisamos juntos...", "Com o suporte dos colegas da manutenção...") ao mesmo tempo em que detalha sua responsabilidade específica.',
        'A fórmula STAR infalível:',
        '• S (Situação): Apresente o cenário e o contexto em 2 frases objetivas.',
        '• T (Tarefa): Qual era a meta ou obstáculo que precisava ser resolvido?',
        '• A (Ação): Quais passos práticos você tomou? Quais ferramentas ou métodos aplicou?',
        '• R (Resultado): Qual foi o impacto numérico ou melhoria alcançada? (ex: "Economia de 2 horas por dia e zero acidentes").',
      ],
      fr: [
        'Au Québec, les entrevues de recrutement sont des conversations professionnelles où les compétences relationnelles (soft skills) comptent autant que le savoir-faire technique.',
        'Le piège culturel : Ne vous attribuez pas l’ensemble des succès d’un projet. Valorisez l’effort d’équipe tout en précisant votre rôle spécifique.',
        'La structure STAR infaillible : Situation (contexte bref), Tâche (défi), Action (mesures concrètes prises), Résultat (impact chiffré et leçons apprises).',
      ],
      en: [
        'Quebec interviews prioritize collaborative mindset and emotional intelligence over aggressive self-promotion.',
        'Use the STAR technique: Situation (2 sentences of context), Task (the core challenge), Action (your specific contributions), Result (quantifiable positive impact).',
      ],
    },
    ctaTool: 'interview-simulator',
    ctaToolLabel: {
      pt: 'Praticar no Simulador de Entrevistas STAR',
      fr: 'Lancer le Simulateur d’Entrevue STAR',
      en: 'Practice in STAR Interview Simulator',
    },
    hasEbookCta: true,
  },
  {
    id: 'reer-celiapp-optimisation',
    slug: 'reer-celiapp-retour-impot-quebec',
    category: 'finances',
    readTime: '6 min',
    date: 'Otimização Fiscal',
    published: true,
    viewsCount: 2790,
    title: {
      pt: 'REER e CELIAPP: Como colocar milhares de dólares de restituição no bolso e o match da empresa',
      fr: 'REER & CELIAPP au Québec : Maximiser vos remboursements d’impôt et le match employeur',
      en: 'RRSP & FHSA in Quebec: Maximize Your Tax Refund and Employer Free Match',
    },
    excerpt: {
      pt: 'Uma contribuição de $5.000 CAD para o REER pode gerar mais de $1.850 CAD de devolução imediata no ajuste anual de impostos do Québec e do Canadá. Entenda a matemática.',
      fr: 'Une cotisation REER de 5 000 $ peut générer jusqu’à 1 856 $ de remboursement d’impôt au Québec. Découvrez la mécanique de déduction.',
      en: 'A $5,000 RRSP contribution can trigger over $1,850 in immediate tax refunds in Quebec. Learn how to capitalize on marginal tax rates.',
    },
    content: {
      pt: [
        'O Québec possui uma das maiores cargas tributárias marginais da América do Norte, mas também conta com mecanismos legais poderosos para proteger seus rendimentos.',
        'O REER (Régime enregistré d’épargne-retraite): Toda quantia investida no seu REER reduz diretamente sua renda tributável do ano. Se você ganha $65.000 CAD e contribui com $5.000 CAD, seus impostos provinciais e federais serão calculados como se você tivesse ganhado apenas $60.000 CAD, gerando uma restituição em dinheiro.',
        'O dinheiro gratuito da empresa (Match REER): Muitas empresas industriais e corporativas no Québec oferecem contrapartida de 3% a 6% do seu salário em programas coletivos de aposentadoria (RPDB/REER collectif). Não participar significa literalmente recusar aumento de salário gratuito!',
        'O CELIAPP (FHSA) para compra do primeiro imóvel: Permite deduzir até $8.000 CAD por ano do seu imposto de renda, e ao comprar seu imóvel residencial no Canadá, o saque é 100% livre de qualquer imposto.',
      ],
      fr: [
        'Le REER est l’outil le plus puissant pour réduire vos impôts au Québec. Chaque dollar cotisé vient diminuer directement votre revenu imposable.',
        'Le Match Employeur : De nombreuses entreprises québécoises proposent un régime avec cotisation égale de l’employeur (ex: 3 % à 5 %). Ne pas y participer équivaut à refuser une hausse de salaire.',
        'Le CELIAPP : Déduisez jusqu’à 8 000 $ par an de vos impôts pour l’achat d’une première propriété, avec retrait 100 % libre d’impôt.',
      ],
      en: [
        'RRSP and FHSA are premier tax shelters in Canada. Every dollar contributed lowers taxable income directly.',
        'Employer RRSP Matching: Free money. If your company matches up to 4%, taking advantage of it gives you an immediate 100% return on your investment.',
        'FHSA (CELIAPP): Combines the tax deduction of an RRSP with the tax-free withdrawal of a TFSA (CELI) for your first home purchase in Canada.',
      ],
    },
    affiliateOffer: {
      partnerId: 'wealthsimple',
      partnerName: 'Wealthsimple (REER & CELIAPP)',
      badge: {
        pt: 'Plataforma Nº 1 de Investimento sem Taxa',
        fr: 'Plateforme N° 1 sans commission au Canada',
        en: 'Canada’s Top Zero-Commission Platform',
      },
      offerTitle: {
        pt: 'Bônus de até $250 CAD na abertura do seu REER ou CELIAPP',
        fr: 'Prime de bienvenue jusqu’à 250 $ à l’ouverture d’un REER ou CELIAPP',
        en: 'Up to $250 CAD bonus when funding your RRSP or FHSA',
      },
      offerDescription: {
        pt: 'Abra sua conta de investimentos automatizada ou compre ETFs sem taxa de corretagem para abater até 37% de imposto no Québec.',
        fr: 'Investissez dans vos REER/CELIAPP sans frais de transaction avec gestion automatisée de portefeuille.',
        en: 'Invest in tax-sheltered RRSP/FHSA accounts with zero trading commissions and smart automated rebalancing.',
      },
      ctaText: {
        pt: 'Abrir REER/CELIAPP com bônus',
        fr: 'Ouvrir mon REER / CELIAPP',
        en: 'Open my RRSP / FHSA bonus account',
      },
      externalUrl: 'https://www.wealthsimple.com',
    },
    ctaTool: 'rrsp-savings',
    ctaToolLabel: {
      pt: 'Simulador de Match REER e Retorno Fiscal',
      fr: 'Simulateur REER & Économie d’impôt',
      en: 'Simulate RRSP tax savings & employer match',
    },
    hasEbookCta: true,
  },
];

const INITIAL_AFFILIATES: AffiliatePartner[] = [
  {
    id: 'wise',
    name: 'Wise (Câmbio & Remessas)',
    category: 'remessas',
    targetUrl: 'https://wise.com',
    utmSource: 'paienet_qc',
    utmMedium: 'blog_affiliate',
    utmCampaign: 'remittance_article',
    commissionType: 'CPA',
    commissionValue: '$45.00 CAD',
    active: true,
    clicksCount: 384,
    estimatedConversions: 42,
    estimatedRevenueCad: 1890.0,
    description: 'Remessas internacionais com cotação comercial oficial sem spread escondido.',
  },
  {
    id: 'desjardins',
    name: 'Desjardins / Banques du Québec',
    category: 'bancos',
    targetUrl: 'https://www.desjardins.com',
    utmSource: 'paienet_qc',
    utmMedium: 'partner_card',
    utmCampaign: 'newcomers_checking',
    commissionType: 'CPA',
    commissionValue: '$60.00 CAD',
    active: true,
    clicksCount: 295,
    estimatedConversions: 31,
    estimatedRevenueCad: 1860.0,
    description: 'Conta corrente sem tarifas por 1 ano e cartão de crédito para novos trabalhadores no QC.',
  },
  {
    id: 'wealthsimple',
    name: 'Wealthsimple (REER & CELIAPP)',
    category: 'investimentos',
    targetUrl: 'https://www.wealthsimple.com',
    utmSource: 'paienet_qc',
    utmMedium: 'tax_simulator',
    utmCampaign: 'rrsp_season_2026',
    commissionType: 'CPA',
    commissionValue: '$50.00 CAD',
    active: true,
    clicksCount: 420,
    estimatedConversions: 38,
    estimatedRevenueCad: 1900.0,
    description: 'Plataforma canadense sem corretagem para investimentos de previdência REER e moradia CELIAPP.',
  },
  {
    id: 'jobscan',
    name: 'Jobscan ATS Resume Scanner',
    category: 'carreira',
    targetUrl: 'https://www.jobscan.co',
    utmSource: 'paienet_qc',
    utmMedium: 'resume_builder',
    utmCampaign: 'ats_optimization',
    commissionType: 'Percentual',
    commissionValue: '30% recorrente',
    active: true,
    clicksCount: 248,
    estimatedConversions: 24,
    estimatedRevenueCad: 864.0,
    description: 'Otimização de currículo para passar pelos filtros de triagem das grandes corporações canadenses.',
  },
  {
    id: 'nordvpn',
    name: 'NordVPN Canadá',
    category: 'seguros',
    targetUrl: 'https://nordvpn.com',
    utmSource: 'paienet_qc',
    utmMedium: 'tools_menu',
    utmCampaign: 'remote_workers_security',
    commissionType: 'CPA',
    commissionValue: '$28.00 CAD',
    active: true,
    clicksCount: 112,
    estimatedConversions: 14,
    estimatedRevenueCad: 392.0,
    description: 'Segurança digital e proteção de conexão em home-office para trabalhadores remotos.',
  },
];

const INITIAL_AD_SLOTS: AdSlotConfig[] = [
  {
    id: 'top-leaderboard',
    name: 'Topo da Calculadora (Leaderboard 728×90)',
    description: 'Exibido logo no início da área de trabalho da calculadora e no topo do portal.',
    status: 'custom-sponsor',
    adSenseSlotId: 'ca-pub-992817263541/72890-top',
    pageSection: 'home-top',
    pageSectionLabel: 'Topo da Página / Calculadora',
    pageUrlPath: '/?tool=net-calc#calculator-top',
    format: 'top-leaderboard',
    customSponsor: {
      sponsorName: 'Desjardins Entreprises & Travailleurs',
      headline: 'Receba seu salário sem taxas bancárias no Québec',
      tagline: 'Abra sua conta com benefícios exclusivos e cartão de crédito garantido.',
      linkUrl: 'https://www.desjardins.com',
      badgeText: 'Parceiro Verificado 2026',
      ctaText: 'Abrir Conta Parceiro',
      themeGradient: 'blue',
      iconType: 'shield',
    },
    impressions: 8420,
    clicks: 178,
    createdAt: '2026-01-10',
    updatedAt: '2026-09-24',
  },
  {
    id: 'salary-results-banner',
    name: 'Abaixo do Contracheque (Banner Amplo)',
    description: 'Exibido logo após a tabela em cascata de retenções e o holerite detalhado.',
    status: 'custom-sponsor',
    adSenseSlotId: 'ca-pub-992817263541/72890-results',
    pageSection: 'salary-results',
    pageSectionLabel: 'Contracheque & Resultados Líquidos',
    pageUrlPath: '/?tool=net-calc#salary-results',
    format: 'bottom-wide',
    customSponsor: {
      sponsorName: 'Wealthsimple Investimentos',
      headline: 'REER & CELIAPP: Reduza até $3.000 de imposto no Québec',
      tagline: 'Invista seu salário com dedução fiscal imediata e zero taxas de administração.',
      linkUrl: 'https://www.wealthsimple.com',
      badgeText: 'Otimização Fiscal',
      ctaText: 'Simular Dedução',
      themeGradient: 'emerald',
      iconType: 'dollar',
    },
    impressions: 5240,
    clicks: 164,
    createdAt: '2026-02-15',
    updatedAt: '2026-09-24',
  },
  {
    id: 'rectangle',
    name: 'Dentro do Artigo do Blog (Retângulo 300×250 / 336×280)',
    description: 'Posicionado no meio dos artigos do blog e guias de carreira.',
    status: 'custom-sponsor',
    adSenseSlotId: 'ca-pub-992817263541/300250-blog',
    pageSection: 'blog-article',
    pageSectionLabel: 'Dentro dos Artigos do Blog',
    pageUrlPath: '/?tool=blog#ad-slot',
    format: 'rectangle',
    customSponsor: {
      sponsorName: 'Jobscan ATS Optimizer',
      headline: 'Adapte seu currículo para os padrões do mercado québécois',
      tagline: 'Scanner inteligente que compara seu perfil com os filtros ATS de RH.',
      linkUrl: 'https://www.jobscan.co',
      badgeText: 'Carreira Québec',
      ctaText: 'Escanear Currículo',
      themeGradient: 'indigo',
      iconType: 'rocket',
    },
    impressions: 4350,
    clicks: 196,
    createdAt: '2026-02-01',
    updatedAt: '2026-09-24',
  },
  {
    id: 'bottom-wide',
    name: 'Rodapé Amplo do Portal (Responsive 970×90)',
    description: 'Exibido na base antes do rodapé de navegação e notas fiscais.',
    status: 'custom-sponsor',
    adSenseSlotId: 'ca-pub-992817263541/97090-footer',
    pageSection: 'footer-wide',
    pageSectionLabel: 'Rodapé Geral do Portal',
    pageUrlPath: '/#footer-sponsor',
    format: 'bottom-wide',
    customSponsor: {
      sponsorName: 'Wise Câmbio Comercial',
      headline: 'Envie dinheiro do seu salário para o exterior com taxa zero',
      tagline: 'Câmbio comercial real garantido sem as margens ocultas dos grandes bancos.',
      linkUrl: 'https://wise.com',
      badgeText: 'Remessas Oficiais',
      ctaText: 'Fazer Remessa Grátis',
      themeGradient: 'blue',
      iconType: 'sparkles',
    },
    impressions: 6100,
    clicks: 142,
    createdAt: '2026-01-05',
    updatedAt: '2026-09-24',
  },
  {
    id: 'sidebar',
    name: 'Barra Lateral de Resultados (300×600)',
    description: 'Exibido ao lado dos cálculos detalhados e tabelas de retenção.',
    status: 'active',
    adSenseSlotId: 'ca-pub-992817263541/300600-sidebar',
    pageSection: 'sidebar',
    pageSectionLabel: 'Barra Lateral / Ferramentas',
    pageUrlPath: '/?tool=net-calc#sidebar-slot',
    format: 'sidebar',
    impressions: 3200,
    clicks: 89,
    createdAt: '2026-03-01',
    updatedAt: '2026-09-24',
  },
];

const INITIAL_EBOOK_CONFIG: EbookConfig = {
  title: 'Guia Definitivo do Salário & Emprego no Québec 2026',
  subtitle: 'O manual prático de 140 páginas para dominar seu holerite, impostos, normas CNESST e entrevistas.',
  pageCount: 140,
  regularPriceCad: 29.99,
  promotionalPriceCad: 9.99,
  salesStatus: 'active',
  downloadUrl: 'https://paienet.qc.ca/downloads/Guia-Oficial-Salario-Impostos-Quebec-2026.pdf',
  totalCopiesSold: 87,
  totalRevenueCad: 869.13,
  coupons: [
    { code: 'LANCA10', discountPercent: 10, active: true, usesCount: 19 },
    { code: 'QUEBEC2026', discountPercent: 20, active: true, usesCount: 14 },
    { code: 'VIP5', discountFixedCad: 5, active: true, usesCount: 7 },
    { code: 'GRATIS100', discountPercent: 100, active: true, usesCount: 28 },
  ],
};

const INITIAL_DIGITAL_ASSETS: DigitalAsset[] = [
  {
    id: 'ebook-salario-quebec-2026',
    title: 'Guia Definitivo do Salário & Emprego no Québec 2026',
    subtitle: 'O manual prático de 140 páginas para dominar seu holerite, impostos, normas CNESST e entrevistas.',
    description: 'Guia completo e atualizado com todas as tabelas de retenções 2025/2026, cálculos detalhados do RRQ, RQAP, seguro-desemprego e a fórmula oficial do abatimento de 16,5%. Inclui modelos de currículo ATS e estratégias de negociação salarial.',
    category: 'ebook',
    accessType: 'paid',
    fileFormat: 'PDF',
    fileSize: '14.2 MB',
    pageOrItemCount: '140 páginas',
    regularPriceCad: 29.99,
    promotionalPriceCad: 9.99,
    downloadUrl: 'https://paienet.qc.ca/downloads/Guia-Oficial-Salario-Impostos-Quebec-2026.pdf',
    salesStatus: 'active',
    badge: 'Bestseller 2026',
    badgeColor: 'amber',
    highlights: [
      'Tabelas completas de retenções provinciais e federais 2025/2026',
      'Aplicação matemática exata do Abatimento do Québec de 16,5%',
      'Modelos de currículo sem preconceito aprovados por filtros ATS',
      'Guia de direitos CNESST (horas extras a 1,5x, férias e 8 feriados)',
      'Estratégias de REER e CELIAPP para maximizar restituição fiscal',
    ],
    totalDownloads: 215,
    totalSales: 87,
    totalRevenueCad: 869.13,
    featured: true,
    createdAt: '2026-01-10',
    updatedAt: '2026-09-24',
  },
  {
    id: 'template-cv-ats-quebec',
    title: 'Modelo de Currículo Québécois 100% Compatível com ATS',
    subtitle: '3 templates editáveis sem fotos nem dados pessoais, prontos para aprovação em filtros de recrutamento.',
    description: 'Formatado rigidamente conforme a legislação contra discriminação do Québec (sem foto, idade, estado civil). Projetado com hierarquia limpa para pontuar 95%+ em triagens automáticas (Taleo, Workday, Jobscan).',
    category: 'template',
    accessType: 'free',
    fileFormat: 'DOCX / PDF',
    fileSize: '2.4 MB',
    pageOrItemCount: '3 Modelos DOCX/PDF',
    regularPriceCad: 0,
    promotionalPriceCad: 0,
    downloadUrl: 'https://paienet.qc.ca/downloads/Template-CV-Quebecois-ATS-2026.zip',
    salesStatus: 'active',
    badge: '100% Gratuito',
    badgeColor: 'emerald',
    highlights: [
      'Sem foto, idade, estado civil ou foto conforme a praxe canadense',
      'Estrutura em blocos testada e aprovada em softwares de triagem ATS',
      'Banco de 80 verbos de ação e competências em francês valorizados no Québec',
      'Compatível com Microsoft Word, Google Docs e LibreOffice',
    ],
    totalDownloads: 630,
    totalSales: 0,
    totalRevenueCad: 0,
    featured: true,
    createdAt: '2026-02-01',
    updatedAt: '2026-09-22',
  },
  {
    id: 'planilha-orcamento-reer-celiapp',
    title: 'Planilha Inteligente de Orçamento & Restituição REER/CELIAPP',
    subtitle: 'Planilha em Excel e Google Sheets para simular retorno fiscal de investimentos e gerenciar o custo de vida.',
    description: 'Ferramenta financeira completa desenvolvida especificamente para o custo de vida do Québec. Projeta automaticamente quanto imposto você receberá de volta do governo ao investir no REER ou economizar para o primeiro imóvel no CELIAPP.',
    category: 'spreadsheet',
    accessType: 'paid',
    fileFormat: 'XLSX',
    fileSize: '3.8 MB',
    pageOrItemCount: '6 Abas Automatizadas',
    regularPriceCad: 14.99,
    promotionalPriceCad: 4.99,
    downloadUrl: 'https://paienet.qc.ca/downloads/Planilha-Orcamento-REER-CELIAPP-Quebec-2026.xlsx',
    salesStatus: 'active',
    badge: 'Otimização Fiscal',
    badgeColor: 'blue',
    highlights: [
      'Calculadora de restituição marginal do imposto provincial e federal',
      'Simulador de Match REER da empresa (o benefício do dinheiro gratuito)',
      'Painel de metas financeiras familiares com despesas locais em $CAD',
      'Totalmente editável no Microsoft Excel e Google Planilhas',
    ],
    totalDownloads: 142,
    totalSales: 48,
    totalRevenueCad: 239.52,
    featured: false,
    createdAt: '2026-02-15',
    updatedAt: '2026-09-24',
  },
  {
    id: 'checklist-primeira-paie-quebec',
    title: 'Checklist da Primeira Folha de Pagamento & Retenções',
    subtitle: 'Guia de verificação passo a passo para conferir se seu empregador calculou cada dedução corretamente.',
    description: 'Checklist prático em PDF interativo para auditar o primeiro talon de paie. Previna retenções indevidas e entenda se você está recebendo as taxas corretas de horas extras e feriados remunerados.',
    category: 'checklist',
    accessType: 'free',
    fileFormat: 'PDF',
    fileSize: '1.2 MB',
    pageOrItemCount: '4 Páginas / 25 Itens',
    regularPriceCad: 0,
    promotionalPriceCad: 0,
    downloadUrl: 'https://paienet.qc.ca/downloads/Checklist-Primeira-Folha-Pagamento-Quebec.pdf',
    salesStatus: 'active',
    badge: 'Download Grátis',
    badgeColor: 'indigo',
    highlights: [
      '25 itens práticos para auditar seu contracheque linha por linha',
      'Validação das cotizações RRQ, RQAP e alíquota especial de AE do Québec',
      'Modelo de e-mail pronto em francês para questionar discrepâncias com o RH',
      'Tabela explicativa dos códigos fiscais mais frequentes do talão',
    ],
    totalDownloads: 480,
    totalSales: 0,
    totalRevenueCad: 0,
    featured: false,
    createdAt: '2026-03-01',
    updatedAt: '2026-09-20',
  },
  {
    id: 'guia-entrevistas-star-quebec',
    title: 'Guia de Entrevistas no Método STAR & 50 Perguntas de RH',
    subtitle: 'Manual de preparação para entrevistas na cultura empresarial do Québec com roteiros de respostas prontas.',
    description: 'Descubra como os recrutadores e gestores no Québec avaliam competências comportamentais e espírito de equipe. Inclui 50 perguntas reais de entrevistas com formulação STAR pronta para adaptação.',
    category: 'guide',
    accessType: 'paid',
    fileFormat: 'PDF',
    fileSize: '5.6 MB',
    pageOrItemCount: '55 Páginas',
    regularPriceCad: 19.99,
    promotionalPriceCad: 7.99,
    downloadUrl: 'https://paienet.qc.ca/downloads/Guia-Entrevistas-STAR-Mercado-Quebec.pdf',
    salesStatus: 'active',
    badge: 'Carreira & RH',
    badgeColor: 'purple',
    highlights: [
      '50 perguntas comportamentais com estrutura Situacional, Tarefa, Ação e Resultado',
      'Códigos culturais no ambiente de trabalho québécois (tutoiement vs vouvoiement)',
      'Estratégia para falar de pretensão salarial sem perder competitividade',
      'Perguntas de alto impacto para você fazer ao entrevistador no final',
    ],
    totalDownloads: 89,
    totalSales: 31,
    totalRevenueCad: 247.69,
    featured: false,
    createdAt: '2026-03-10',
    updatedAt: '2026-09-24',
  },
];

const INITIAL_EBOOK_ORDERS: EbookOrder[] = [
  {
    id: 'ORD-8921',
    customerEmail: 'marc.tremblay84@gmail.com',
    assetId: 'ebook-salario-quebec-2026',
    assetTitle: 'Guia Definitivo do Salário & Emprego no Québec 2026',
    date: '2026-09-24 14:12',
    amountCad: 9.99,
    status: 'delivered',
    downloadAccessCount: 3,
  },
  {
    id: 'ORD-8920',
    customerEmail: 'rodrigo.silva.mtl@outlook.com',
    assetId: 'ebook-salario-quebec-2026',
    assetTitle: 'Guia Definitivo do Salário & Emprego no Québec 2026',
    date: '2026-09-24 12:45',
    amountCad: 8.99,
    couponUsed: 'LANCA10',
    status: 'delivered',
    downloadAccessCount: 2,
  },
  {
    id: 'ORD-8919',
    customerEmail: 'camille.bouchard@videotron.ca',
    assetId: 'planilha-orcamento-reer-celiapp',
    assetTitle: 'Planilha Inteligente de Orçamento & Restituição REER/CELIAPP',
    date: '2026-09-23 18:30',
    amountCad: 4.99,
    status: 'delivered',
    downloadAccessCount: 1,
  },
  {
    id: 'ORD-8918',
    customerEmail: 'lucas.ferreira.qc@gmail.com',
    assetId: 'guia-entrevistas-star-quebec',
    assetTitle: 'Guia de Entrevistas no Método STAR & 50 Perguntas de RH',
    date: '2026-09-23 15:20',
    amountCad: 7.99,
    couponUsed: 'QUEBEC2026',
    status: 'delivered',
    downloadAccessCount: 4,
  },
  {
    id: 'ORD-8917',
    customerEmail: 'sophie.lefevre@bell.net',
    assetId: 'ebook-salario-quebec-2026',
    assetTitle: 'Guia Definitivo do Salário & Emprego no Québec 2026',
    date: '2026-09-22 09:14',
    amountCad: 9.99,
    status: 'delivered',
    downloadAccessCount: 2,
  },
];

const INITIAL_NEWSLETTER_LEADS: NewsletterLead[] = [
  { id: 'lead-1', email: 'jean.roy@globetrotter.net', source: 'home_banner', date: '2026-09-24 16:20', status: 'subscribed' },
  { id: 'lead-2', email: 'gabriel.costa.eng@gmail.com', source: 'blog_post', date: '2026-09-24 15:10', status: 'subscribed' },
  { id: 'lead-3', email: 'mathieu.bergeron@usherbrooke.ca', source: 'ebook_modal', date: '2026-09-24 13:42', status: 'subscribed' },
  { id: 'lead-4', email: 'fernanda.almeida.qc@yahoo.com', source: 'home_banner', date: '2026-09-23 20:15', status: 'subscribed' },
  { id: 'lead-5', email: 'pierre.lavoie99@hotmail.com', source: 'footer', date: '2026-09-23 11:30', status: 'subscribed' },
  { id: 'lead-6', email: 'juliana.santos.mtl@gmail.com', source: 'blog_post', date: '2026-09-22 17:05', status: 'subscribed' },
  { id: 'lead-7', email: 'antoine.gagnon@uqam.ca', source: 'home_banner', date: '2026-09-22 10:22', status: 'subscribed' },
];

const INITIAL_LIVE_EVENTS: LiveActivityEvent[] = [
  {
    id: 'evt-1',
    timestamp: 'Há 2 min',
    type: 'salary_calc',
    summary: 'Cálculo de Salário Líquido ($32.50/h - Biweekly)',
    location: 'Montréal, QC',
    details: 'Líquido calculado: $1.782,40 / quinzena (Grau 100%)',
  },
  {
    id: 'evt-2',
    timestamp: 'Há 5 min',
    type: 'affiliate_click',
    summary: 'Clique em Parceiro: Wise (Câmbio & Remessas)',
    location: 'Québec City, QC',
    details: 'Origem: Artigo "Enviando Dinheiro para o Exterior"',
  },
  {
    id: 'evt-3',
    timestamp: 'Há 9 min',
    type: 'newsletter_signup',
    summary: 'Nova Inscrição Newsletter: gabriel.***@gmail.com',
    location: 'Laval, QC',
    details: 'Origem: Banner com Modelo de CV Canadense',
  },
  {
    id: 'evt-4',
    timestamp: 'Há 14 min',
    type: 'article_view',
    summary: 'Leitura de Artigo: "Currículo no Formato Canadense"',
    location: 'Gatineau, QC',
    details: 'Tempo de permanência: 4 min 12 seg',
  },
  {
    id: 'evt-5',
    timestamp: 'Há 22 min',
    type: 'ebook_purchase',
    summary: 'Compra de E-book ($9.99 CAD) via Cartão',
    location: 'Longueuil, QC',
    details: 'Cliente: marc.***@gmail.com | Download liberado',
  },
  {
    id: 'evt-6',
    timestamp: 'Há 31 min',
    type: 'tool_view',
    summary: 'Acesso ao Simulador de Entrevistas (Método STAR)',
    location: 'Trois-Rivières, QC',
    details: 'Simulação iniciada para cargo de Operador de Produção',
  },
  {
    id: 'evt-7',
    timestamp: 'Há 45 min',
    type: 'affiliate_click',
    summary: 'Clique em Parceiro: Wealthsimple (REER/CELIAPP)',
    location: 'Sherbrooke, QC',
    details: 'Origem: Artigo de Otimização Fiscal',
  },
];

const INITIAL_DAILY_ANALYTICS: DailyAnalytics[] = [
  { date: '18 Set', pageViews: 1240, salaryCalculations: 820, affiliateClicks: 42, ebookSalesCad: 49.95 },
  { date: '19 Set', pageViews: 1480, salaryCalculations: 990, affiliateClicks: 58, ebookSalesCad: 69.93 },
  { date: '20 Set', pageViews: 1890, salaryCalculations: 1250, affiliateClicks: 71, ebookSalesCad: 89.91 },
  { date: '21 Set', pageViews: 2150, salaryCalculations: 1410, affiliateClicks: 84, ebookSalesCad: 119.88 },
  { date: '22 Set', pageViews: 2420, salaryCalculations: 1680, affiliateClicks: 95, ebookSalesCad: 139.86 },
  { date: '23 Set', pageViews: 2780, salaryCalculations: 1920, affiliateClicks: 112, ebookSalesCad: 179.82 },
  { date: '24 Set', pageViews: 3120, salaryCalculations: 2140, affiliateClicks: 136, ebookSalesCad: 219.78 },
];

export const ARTICLE_TEMPLATES: ArticleTemplate[] = [
  {
    id: 'template-fiscal-paystub',
    name: 'Guia Fiscal & Anatomia do Holerite',
    description: 'Atrai leitores no topo de funil com dúvidas sobre descontos (RRQ, RQAP, imposto federal e provincial).',
    category: 'impots',
    intent: 'informativo',
    intentLabel: 'Informativo / Dúvida Fiscal',
    funnelStage: 'topo',
    funnelLabel: 'Topo de Funil (Alto Tráfego Orgânico)',
    iconName: 'Calculator',
    targetAudience: 'Novos contratados, imigrantes e trabalhadores verificando alíquotas do contracheque.',
    recommendedCtaTool: 'net-calc',
    defaultAffiliatePartnerId: 'desjardins',
    preset: {
      category: 'impots',
      readTime: '6 min',
      date: 'Guia Fiscal 2026',
      title: {
        pt: 'Entendendo seu Holerite no Québec: Como decifrar cada dedução salarial',
        fr: 'Comprendre son Talon de Paie au Québec : Décoder chaque retenue à la source',
        en: 'Decoding Your Quebec Paystub: Step-by-Step Breakdown of Deductions',
      },
      excerpt: {
        pt: 'Por que o contracheque do Québec tem alíquotas exclusivas e como funciona o abatimento automático de 16,5% do imposto federal no seu salário líquido?',
        fr: 'Pourquoi le Québec a-t-il des taux distincts et comment fonctionne l’abattement fédéral automatique de 16,5 % sur votre salaire net ?',
        en: 'Why does Quebec have separate provincial taxes and how does the 16.5% federal abatement boost your take-home pay?',
      },
      content: {
        pt: [
          'Receber o primeiro contracheque no Québec pode causar um choque: a diferença entre o salário bruto anual contratado e o valor líquido creditado na conta bancária decorre de programas provinciais e federais próprios.',
          '1. O Regime de Aposentadoria (RRQ): Incide com base e contribuição adicional sobre os ganhos elegíveis acima da isenção básica.',
          '2. O Seguro Parental (RQAP): Garante licenças maternidade e paternidade mais generosas que no restante do Canadá, reduzindo a alíquota cobrada de Seguro-Desemprego federal (AE).',
          '3. O Abatimento Federal de 16,5%: Mecanismo que devolve diretamente ao trabalhador uma parcela do imposto federal em função da autonomia provincial.',
          '💡 Dica de Ouro: Utilize nossa calculadora oficial abaixo para conferir se o departamento financeiro da sua empresa aplicou os créditos de imposto pessoal de base corretos!',
        ],
        fr: [
          'Recevoir son premier talon de paie au Québec apporte souvent des surprises : l’écart entre le salaire brut négocié et le net versé résulte des régimes fiscaux et sociaux québécois.',
          '1. Régime de rentes du Québec (RRQ) : Assure votre fonds de retraite public québécois.',
          '2. Régime québécois d’assurance parentale (RQAP) : Offre des congés parentaux avantageux.',
          '3. Abattement du Québec de 16,5 % : Réduction directe sur l’impôt fédéral de base.',
          '💡 Conseil d’expert : Vérifiez vos retenues avec notre calculateur net officiel ci-dessous.',
        ],
        en: [
          'Receiving your first paystub in Quebec reveals how provincial programs shape take-home cash.',
          '1. QPP (RRQ): The Quebec pension plan with standard and enhanced tiers.',
          '2. QPIP (RQAP): Parental insurance with lower federal EI rates.',
          '3. The 16.5% Quebec Abatement: A federal tax credit granted to Quebec employees.',
          '💡 Pro Tip: Run your salary figures through our verified calculator below.',
        ],
      },
      ctaTool: 'net-calc',
      ctaToolLabel: {
        pt: 'Calcular meu Salário Líquido no PaieNet',
        fr: 'Calculer mon salaire net en direct',
        en: 'Calculate my exact take-home pay',
      },
      affiliateOffer: {
        partnerId: 'desjardins',
        partnerName: 'Desjardins / Banque Nationale',
        badge: {
          pt: 'Oferta Especial Trabalhadores 2026',
          fr: 'Offre Travailleurs & Salariés 2026',
          en: 'Worker Direct Deposit Offer 2026',
        },
        offerTitle: {
          pt: 'Conta corrente sem tarifas + Bônus de até $150 CAD',
          fr: 'Compte chèque sans frais & Bonus jusqu’à 150 $ CAD',
          en: 'No-fee checking account & Welcome bonus up to $150 CAD',
        },
        offerDescription: {
          pt: 'Abra sua conta para receber seu salário com isenção de mensalidade e tenha acesso a cartão de crédito canadense sem histórico prévio.',
          fr: 'Ouvrez votre compte pour déposer votre paie avec 12 mois sans frais et carte de crédit sans historique.',
          en: 'Open your direct deposit salary account with waived monthly fees and access to a Canadian credit card.',
        },
        ctaText: {
          pt: 'Abrir conta com benefícios parceiro',
          fr: 'Ouvrir mon compte partenaire',
          en: 'Claim partner bank offer',
        },
        externalUrl: 'https://www.desjardins.com',
      },
      hasEbookCta: true,
    },
  },
  {
    id: 'template-salary-negotiation',
    name: 'Estratégia de Negociação Salarial & Aumento',
    description: 'Conduz o profissional a simular faixas salariais, calcular taxas marginais e negociar com segurança cultural.',
    category: 'carriere',
    intent: 'transacional',
    intentLabel: 'Transacional / Ganho de Renda',
    funnelStage: 'meio',
    funnelLabel: 'Meio de Funil (Alta Ação)',
    iconName: 'TrendingUp',
    targetAudience: 'Profissionais buscando aumento anual ou avaliando proposta salarial.',
    recommendedCtaTool: 'raise',
    defaultAffiliatePartnerId: 'jobscan',
    preset: {
      category: 'carriere',
      readTime: '5 min',
      date: 'Estratégia Salarial',
      title: {
        pt: 'Como Pedir Aumento de Salário no Québec: Dados, Cultura e Taxa Marginal',
        fr: 'Comment Négocier une Augmentation au Québec : Données, Culture et Taux Marginal',
        en: 'How to Negotiate a Salary Raise in Quebec: Market Data and Tax Brackets',
      },
      excerpt: {
        pt: 'Pedir aumento no mercado québécois exige respeito à modéstia e foco em dados objetivos. Veja como simular o impacto líquido real no seu bolso.',
        fr: 'Négocier son salaire au Québec nécessite méthode et données factuelles. Comment simuler l’impact net de votre hausse.',
        en: 'Negotiating pay in Quebec requires cultural tact and hard numbers. Learn how to simulate net take-home gains.',
      },
      content: {
        pt: [
          'No Québec, a negociação salarial raramente é vencida por pressão ou ultimatos. Os gestores valorizam profissionais que trazem argumentos baseados em entregas mensuráveis e dados de mercado setoriais.',
          'Passo 1: Entenda sua faixa de imposto marginal. Um aumento de $5.000 CAD brutos no Québec não significa $5.000 líquidos a mais na conta. Dependendo da sua faixa de imposto combinada provincial e federal, as retenções podem variar entre 27% e 42%.',
          'Passo 2: Construa seu dossiê de realizações. Liste 3 projetos ou metas onde você economizou tempo, aumentou a receita ou preveniu gargalos na empresa.',
          'Passo 3: Proponha benefícios flexíveis se a empresa estiver com orçamento fixo: mais semanas de férias remuneradas, contribuição maior no REER coletivo ou bônus por desempenho.',
        ],
        fr: [
          'Au Québec, la négociation salariale se gagne par les faits et les réalisations tangibles plutôt que par l’insistance.',
          'Étape 1 : Comprendre votre taux marginal d’imposition pour connaître le net réel.',
          'Étape 2 : Constituer votre bilan de réalisations chiffrées sur les 12 derniers mois.',
          'Étape 3 : Négocier des avantages complémentaires (congés, REER collectif, télétravail).',
        ],
        en: [
          'Salary negotiations in Quebec succeed through factual deliverables and market alignment.',
          'Step 1: Check your marginal tax bracket to calculate true take-home gain.',
          'Step 2: Build a quantifiable dossier of achievements over the past year.',
          'Step 3: Negotiate flexible perks like additional vacation or matched RRSP.',
        ],
      },
      ctaTool: 'raise',
      ctaToolLabel: {
        pt: 'Simular meu Aumento Salarial Líquido',
        fr: 'Simuler ma hausse de salaire nette',
        en: 'Simulate my net salary raise',
      },
      affiliateOffer: {
        partnerId: 'jobscan',
        partnerName: 'Jobscan Carreira & ATS',
        badge: {
          pt: 'Evolução Profissional',
          fr: 'Accélération de Carrière',
          en: 'Career Acceleration',
        },
        offerTitle: {
          pt: 'Otimize seu Perfil Profissional para Salários Mais Altos',
          fr: 'Optimisez votre profil pour des postes mieux rémunérés',
          en: 'Optimize your career profile for higher compensation',
        },
        offerDescription: {
          pt: 'Descubra as palavras-chave mais buscadas pelos recrutadores de RH no Canadá para negociar remunerações acima da média.',
          fr: 'Identifiez les compétences et mots-clés recherchés par les recruteurs canadiens.',
          en: 'Find high-paying keywords and benchmarks used by Canadian recruiters.',
        },
        ctaText: {
          pt: 'Acessar ferramenta parceira grátis',
          fr: 'Tester l’outil partenaire',
          en: 'Try free partner tool',
        },
        externalUrl: 'https://www.jobscan.co',
      },
      hasEbookCta: true,
    },
  },
  {
    id: 'template-star-interview',
    name: 'Entrevistas no Québec: Método STAR & Etiqueta Cultural',
    description: 'Prepara candidatos para entrevistas comportamentais e culturais, com foco no método STAR.',
    category: 'carriere',
    intent: 'carreira',
    intentLabel: 'Preparação de Carreira',
    funnelStage: 'meio',
    funnelLabel: 'Meio de Funil (Alto Engajamento)',
    iconName: 'Sparkles',
    targetAudience: 'Candidatos convocados para processos seletivos e entrevistas no Québec.',
    recommendedCtaTool: 'interview-simulator',
    defaultAffiliatePartnerId: 'jobscan',
    preset: {
      category: 'carriere',
      readTime: '6 min',
      date: 'Manual de Entrevistas',
      title: {
        pt: 'Como Dominar Entrevistas no Québec com o Método STAR',
        fr: 'Réussir ses Entrevues d’Embauche au Québec avec la Méthode STAR',
        en: 'Acing Quebec Job Interviews with the STAR Method & Workplace Etiquette',
      },
      excerpt: {
        pt: 'A cultura corporativa do Québec valoriza trabalho em equipe, ausência de arrogância e respostas estruturadas. Veja como se destacar.',
        fr: 'La culture de travail québécoise valorise la modestie chaleureuse et la cohésion d’équipe. Maîtrisez la formule STAR.',
        en: 'Team humility and structured storytelling win over Quebec recruiters. Master the Situation, Task, Action, Result framework.',
      },
      content: {
        pt: [
          'No Québec, a entrevista de emprego é uma conversa colaborativa onde a compatibilidade com a equipe (fit cultural) pesa tanto quanto a competência técnica.',
          'A Armadilha do "Eu fiz sozinho": Dizer que você resolveu tudo sozinho é malvisto no Québec. O entrevistador busca profissionais que reconhecem o mérito dos colegas e explicam claramente seu papel específico.',
          'A Estrutura STAR:',
          '• S - Situação: Contextualize o problema em poucas frases.',
          '• T - Tarefa: Explique o desafio ou meta que precisava ser atingida.',
          '• A - Ação: Detalhe os passos concretos, ferramentas e decisões que você implementou.',
          '• R - Resultado: Apresente métricas de impacto (ex: "Economia de $12.000", "Zero acidentes em 18 meses").',
        ],
        fr: [
          'L’entrevue au Québec met l’accent sur le travail d’équipe et l’adéquation culturelle.',
          'Le piège : Évitez l’individualisme excessif. Mettez en valeur la collaboration.',
          'La formule STAR : Situation, Tâche, Action concrète et Résultat chiffré.',
        ],
        en: [
          'Quebec interviews emphasize team harmony and behavioral evidence.',
          'Avoid taking solo credit; showcase your collaborative problem-solving style.',
          'Structure responses with STAR: Situation, Task, Action, and Measurable Result.',
        ],
      },
      ctaTool: 'interview-simulator',
      ctaToolLabel: {
        pt: 'Praticar no Simulador de Entrevistas STAR',
        fr: 'Lancer le Simulateur d’Entrevue STAR',
        en: 'Practice in STAR Interview Simulator',
      },
      affiliateOffer: {
        partnerId: 'jobscan',
        partnerName: 'Jobscan Prep',
        badge: {
          pt: 'Preparação para Entrevista',
          fr: 'Préparation d’Entrevue',
          en: 'Interview Prep',
        },
        offerTitle: {
          pt: 'Simulações e Feedback para Entrevistas Canadenses',
          fr: 'Simulations et retours pour vos entrevues au Canada',
          en: 'Simulations and real-time feedback for Canadian interviews',
        },
        offerDescription: {
          pt: 'Treine perguntas comportamentais com análise de respostas para impressionar recrutadores no Québec.',
          fr: 'Entraînez-vous sur les questions comportementales les plus fréquentes.',
          en: 'Practice behavioral questions with structured feedback.',
        },
        ctaText: {
          pt: 'Testar gratuitamente',
          fr: 'Essayer gratuitement',
          en: 'Start free trial',
        },
        externalUrl: 'https://www.jobscan.co',
      },
      hasEbookCta: true,
    },
  },
  {
    id: 'template-canadian-resume',
    name: 'Currículo Canadense Anti-Descarte ATS (Sem Foto)',
    description: 'Ensina os padrões legais anti-discriminação do Québec e formata o CV para triagem por ATS.',
    category: 'carriere',
    intent: 'carreira',
    intentLabel: 'Busca Ativa de Emprego',
    funnelStage: 'meio',
    funnelLabel: 'Meio de Funil',
    iconName: 'FileText',
    targetAudience: 'Profissionais enviando currículos que não recebem respostas de recrutadores.',
    recommendedCtaTool: 'resume-builder',
    defaultAffiliatePartnerId: 'jobscan',
    preset: {
      category: 'carriere',
      readTime: '5 min',
      date: 'Padrão RH Québec',
      title: {
        pt: 'Currículo no Formato Canadense: O que NUNCA colocar no CV no Québec',
        fr: 'Le CV Canadien Conforme : Ce qu’il ne faut JAMAIS inscrire au Québec',
        en: 'Canadian Format Resume: What You Must NEVER Include in Quebec',
      },
      excerpt: {
        pt: 'Fotos, data de nascimento, estado civil ou nacionalidade provocam descarte automático do seu currículo pelas leis de direitos humanos. Veja o padrão correto.',
        fr: 'Photos, date de naissance, état civil : ces mentions provoquent l’élimination directe de votre CV par les systèmes ATS. Voici la structure gagnante.',
        en: 'Photos and personal info cause instant disqualification under Quebec laws. Learn the approved format.',
      },
      content: {
        pt: [
          'No Brasil e em outros países, fotos em currículos são comuns. No Québec, colocar foto ou data de nascimento é motivo de eliminação sumária pelos filtros de RH!',
          'A Carta dos Direitos e Liberdades da Pessoa do Québec proíbe discriminação na contratação. Para evitar processos judiciais, os sistemas ATS e recrutadores descartam qualquer CV que contenha foto.',
          'As 4 Seções Essenciais do CV Canadense:',
          '1. Cabeçalho Clean: Nome completo, cidade, e-mail profissional, telefone local canadense e link do LinkedIn.',
          '2. Resumo de Qualificações: 3 linhas estratégicas destacando seu diferencial profissional.',
          '3. Competências Técnicas: Lista com palavras-chave exatas da descrição da vaga.',
          '4. Experiência com Verbos de Ação: Conquistas mensuráveis e impacto prático gerado.',
        ],
        fr: [
          'Au Québec, la Charte des droits et libertés interdit toute discrimination à l’embauche.',
          'Les départements RH rejettent automatiquement les CVs avec photos ou état civil pour se prémunir juridiquement.',
          'La structure gagnante : En-tête sobre, profil percutant, compétences clés et réalisations chiffrées.',
        ],
        en: [
          'Quebec human rights laws strictly prohibit hiring bias based on personal characteristics.',
          'ATS filters immediately discard resumes with pictures, age, or marital status.',
          'Use a clean Canadian resume structure: concise header, 3-line summary, keyword list, and action-verb achievements.',
        ],
      },
      ctaTool: 'resume-builder',
      ctaToolLabel: {
        pt: 'Criar meu Currículo Canadense Grátis',
        fr: 'Générer mon CV canadien 100% conforme',
        en: 'Build my free Canadian format resume',
      },
      affiliateOffer: {
        partnerId: 'jobscan',
        partnerName: 'Jobscan ATS Resume Scanner',
        badge: {
          pt: 'Scanner ATS Oficial',
          fr: 'Vérificateur ATS',
          en: 'Official ATS Scanner',
        },
        offerTitle: {
          pt: 'Verifique se seu Currículo passa pelos Filtros ATS',
          fr: 'Testez la compatibilité de votre CV avec les filtres ATS',
          en: 'Check if your resume passes Canadian ATS filters',
        },
        offerDescription: {
          pt: 'Compare seu currículo com a descrição da vaga e descubra sua pontuação de compatibilidade antes de se candidatar.',
          fr: 'Comparez votre CV avec l’offre d’emploi et obtenez votre score de correspondance.',
          en: 'Scan your resume against real job descriptions to increase interview callbacks.',
        },
        ctaText: {
          pt: 'Escanear meu currículo grátis',
          fr: 'Scanner mon CV gratuitement',
          en: 'Scan my resume for free',
        },
        externalUrl: 'https://www.jobscan.co',
      },
      hasEbookCta: true,
    },
  },
  {
    id: 'template-currency-remittance',
    name: 'Guia de Câmbio & Remessas sem Spread Oculto',
    description: 'Post de fundo de funil com alta conversão de afiliados em serviços de remessa e contas multimoeda.',
    category: 'finances',
    intent: 'transacional',
    intentLabel: 'Transacional Financeiro',
    funnelStage: 'fundo',
    funnelLabel: 'Fundo de Funil (Alta Conversão CPA)',
    iconName: 'DollarSign',
    targetAudience: 'Trabalhadores no Québec que enviam remessas financeiras para o exterior.',
    recommendedCtaTool: 'converter',
    defaultAffiliatePartnerId: 'wise',
    preset: {
      category: 'finances',
      readTime: '4 min',
      date: 'Economia Financeira',
      title: {
        pt: 'Como Enviar Dinheiro do seu Salário no Québec sem Pagar o Spread Oculto dos Bancos',
        fr: 'Comment Transférer de l’Argent de son Salaire au Québec sans Frais Cachés',
        en: 'How to Send Money Overseas from Your Quebec Salary Without Bank Spreads',
      },
      excerpt: {
        pt: 'Os bancos canadenses tradicionais chegam a cobrar 3% a 5% em margens cambiais ocultas. Aprenda a usar o câmbio comercial real.',
        fr: 'Les banques traditionnelles facturent souvent 3 % à 5 % de marges cachées sur les devises. Utilisez le taux de change réel.',
        en: 'Traditional banks tack on 3% to 5% hidden markup on foreign exchange. How to keep more of your hard-earned wages.',
      },
      content: {
        pt: [
          'Trabalhar duro no Québec e enviar parte do salário para o exterior faz parte da rotina de milhares de profissionais. Porém, os grandes bancos canadenses aplicam taxas cambiais com spreads de até 5% sobre a cotação comercial oficial.',
          'Exemplo Prático: Em uma remessa de $2.000 CAD, uma taxa oculta de 4% significa perder $80 CAD a cada envio sem perceber.',
          'Como economizar na prática:',
          '1. Exija sempre a taxa média de mercado (mid-market rate) sem spread camuflado.',
          '2. Utilize transferências via Interac e-Transfer dentro do Canadá, que são instantâneas e sem custo.',
          '3. Cadastre-se através de links oficiais de parceiros para garantir sua primeira transferência gratuita.',
        ],
        fr: [
          'Envoyer une partie de son salaire québécois à l’étranger peut coûter cher si vous utilisez les banques traditionnelles.',
          'Les banques appliquent des taux majorés jusqu’à 5 % au-dessus du cours officiel.',
          'Privilégiez les plateformes spécialisées utilisant le taux de marché réel avec virements Interac rapides.',
        ],
        en: [
          'Sending wages home from Quebec often comes with heavy bank exchange spreads.',
          'Traditional banks mark up currency conversions by 3% to 5%.',
          'Use regulated mid-market exchange platforms with fast Interac deposits to preserve your earnings.',
        ],
      },
      ctaTool: 'converter',
      ctaToolLabel: {
        pt: 'Converter Salário e Moedas no PaieNet',
        fr: 'Convertir mon salaire et devises',
        en: 'Convert salary and currency',
      },
      affiliateOffer: {
        partnerId: 'wise',
        partnerName: 'Wise Câmbio Comercial',
        badge: {
          pt: 'Parceiro Oficial de Câmbio',
          fr: 'Partenaire Officiel de Change',
          en: 'Official Exchange Partner',
        },
        offerTitle: {
          pt: 'Primeira Remessa Internacional com Taxa Zero',
          fr: 'Premier Virement International sans frais de transfert',
          en: 'First International Transfer with Zero Transfer Fee',
        },
        offerDescription: {
          pt: 'Envie dinheiro do Canadá com o câmbio comercial real sem pegadinhas e receba no destino em minutos via Pix ou conta bancária.',
          fr: 'Transférez des fonds au taux réel du marché sans commissions cachées.',
          en: 'Send money from Canada using the real mid-market exchange rate with zero hidden markup.',
        },
        ctaText: {
          pt: 'Enviar com taxa zero garantida',
          fr: 'Profiter de l’offre sans frais',
          en: 'Claim free transfer offer',
        },
        externalUrl: 'https://wise.com',
      },
      hasEbookCta: false,
    },
  },
  {
    id: 'template-cnesst-rights',
    name: 'Normas CNESST: Horas Extras 1.5x, Férias de 4% e Demissão',
    description: 'Guia de proteção legal e direitos trabalhistas fundamentais com foco na legislação do Québec.',
    category: 'cnesst',
    intent: 'defesa_direitos',
    intentLabel: 'Defesa de Direitos & CNESST',
    funnelStage: 'topo',
    funnelLabel: 'Topo / Meio de Funil',
    iconName: 'ShieldCheck',
    targetAudience: 'Empregados querendo checar se a empresa está pagando horas extras e férias conforme a lei.',
    recommendedCtaTool: 'vacation-holidays',
    defaultAffiliatePartnerId: 'desjardins',
    preset: {
      category: 'cnesst',
      readTime: '6 min',
      date: 'Normas do Trabalho QC',
      title: {
        pt: 'Direitos Trabalhistas no Québec: Horas Extras, Férias de 4% e o que Diz a CNESST',
        fr: 'Normes du Travail au Québec : Heures Supplémentaires, Vacances 4% et CNESST',
        en: 'Quebec Labor Standards: Overtime Pay, 4% Vacation Indemnity and CNESST Rules',
      },
      excerpt: {
        pt: 'Após 40 horas semanais, a hora extra deve ser paga com 50% de acréscimo (1,5x). Entenda como funcionam as férias obrigatórias e os feriados remunerados.',
        fr: 'Après 40 heures hebdomadaires, les heures supplémentaires doivent être majorées de 50 % (taux et demi). Vos droits fondamentaux expliqués.',
        en: 'Overtime kicks in after 40 weekly hours at time-and-a-half (1.5x). Learn your legal rights regarding vacations and statutory holidays.',
      },
      content: {
        pt: [
          'No Québec, a Lei sobre as Normas do Trabalho (LNT) estabelece condições mínimas que nenhum contrato individual de trabalho pode revogar, mesmo que assinado pelo empregado.',
          'Regra das Horas Extras: Na maioria dos setores da indústria e comércio, qualquer hora trabalhada além de 40 horas semanais deve ser remunerada com 50% de acréscimo sobre a taxa horária normal (taux et demi - 1,5x).',
          'Indenização de Férias (4% a 6%): Trabalhadores com menos de 3 anos de serviço contínuo têm direito a 2 semanas de férias pagas com 4% do salário bruto anual acumulado. A partir de 3 anos de serviço, o direito sobe para 3 semanas e 6%.',
          'Feriados Remunerados no Québec: A lei garante 8 feriados oficiais remunerados por ano (Jour de l’An, Fête nationale du Québec, Fête du Canada, Fête du Travail, etc.).',
        ],
        fr: [
          'La Loi sur les normes du travail (LNT) fixe les conditions minimales d’emploi au Québec.',
          'Heures supplémentaires : Toute heure effectuée au-delà de 40 heures par semaine doit être majorée de 50 % (1,5 fois le salaire horaire).',
          'Indemnité de vacances : 4 % du salaire brut annuel pour moins de 3 ans de service, et 6 % à partir de 3 ans.',
          'Fériés légaux : 8 jours fériés chômés et payés garantis par la loi québécoise.',
        ],
        en: [
          'Quebec labor laws establish non-negotiable minimum employee safeguards.',
          'Overtime rule: Hours worked beyond 40 per week must be compensated at 1.5 times regular hourly wages.',
          'Vacation indemnity: 4% of gross annual earnings for workers with under 3 years of service; 6% after 3 years.',
          'Statutory holidays: 8 paid public holidays mandated throughout the province.',
        ],
      },
      ctaTool: 'vacation-holidays',
      ctaToolLabel: {
        pt: 'Calcular meus Direitos de Férias e CNESST',
        fr: 'Calculer mes indemnités de vacances et fériés',
        en: 'Calculate my vacation and holiday pay',
      },
      affiliateOffer: {
        partnerId: 'desjardins',
        partnerName: 'Desjardins Assurances',
        badge: {
          pt: 'Proteção Salarial',
          fr: 'Protection Salariale',
          en: 'Wage Protection',
        },
        offerTitle: {
          pt: 'Proteção de Renda e Seguros para Trabalhadores no Québec',
          fr: 'Assurance salaire et protection du revenu pour travailleurs',
          en: 'Income replacement and disability protection for workers',
        },
        offerDescription: {
          pt: 'Garanta estabilidade financeira para você e sua família em caso de afastamento ou imprevistos de saúde no trabalho.',
          fr: 'Protégez votre revenu et votre famille contre les imprévus médicaux ou arrêts de travail.',
          en: 'Shield your family finances against unexpected workplace interruptions.',
        },
        ctaText: {
          pt: 'Conhecer planos de proteção',
          fr: 'Découvrir la protection',
          en: 'Explore protection plans',
        },
        externalUrl: 'https://www.desjardins.com',
      },
      hasEbookCta: true,
    },
  },
  {
    id: 'template-reer-celiapp',
    name: 'Otimização Fiscal Agressiva: REER, CELIAPP & Match da Empresa',
    description: 'Post de alto valor sobre deduções legais para colocar milhares de dólares de restituição no bolso.',
    category: 'finances',
    intent: 'transacional',
    intentLabel: 'Otimização Fiscal & Investimento',
    funnelStage: 'fundo',
    funnelLabel: 'Fundo de Funil (Ticket Elevado)',
    iconName: 'BookOpen',
    targetAudience: 'Profissionais com renda acima de $55.000 CAD querendo reduzir impostos e economizar.',
    recommendedCtaTool: 'rrsp-savings',
    defaultAffiliatePartnerId: 'wealthsimple',
    preset: {
      category: 'finances',
      readTime: '6 min',
      date: 'Estratégia Fiscal',
      title: {
        pt: 'REER e CELIAPP no Québec: Como Gerar Milhares de Dólares em Devolução de Imposto',
        fr: 'REER et CELIAPP au Québec : Récupérer des Milliers de Dollars en Remboursement',
        en: 'RRSP and FHSA in Quebec: Maximize Your Tax Refund and Free Employer Match',
      },
      excerpt: {
        pt: 'Uma contribuição no REER pode devolver até 37% do valor investido na sua restituição do imposto de renda anual. Saiba como aproveitar o match da empresa.',
        fr: 'Une cotisation au REER permet de récupérer jusqu’à 37 % en remboursement d’impôt. Ne laissez pas passer l’argent gratuit de l’employeur.',
        en: 'An RRSP contribution can trigger up to 37% back in immediate tax refunds. Don’t miss your employer matching program.',
      },
      content: {
        pt: [
          'O Québec possui uma das maiores cargas tributárias marginais da América do Norte, mas oferece incentivos fiscais poderosos para quem poupa de forma planejada.',
          'O Efeito Multiplicador do REER: Cada dólar depositado no seu REER reduz diretamente sua renda tributável anual. Se sua alíquota marginal combinada for de 37%, uma contribuição de $5.000 CAD gera uma restituição de $1.850 CAD direto na sua conta bancária.',
          'O Match da Empresa (Dinheiro Grátis): Muitas empresas no Québec oferecem contrapartida de 3% a 6% do seu salário em programas de aposentadoria coletiva (REER collectif / RPDB). Não aceitar essa contrapartida equivale a recusar aumento de salário gratuito.',
          'O CELIAPP (FHSA) para Compra da Casa Própria: Permite deduzir até $8.000 CAD por ano do imposto e sacar 100% livre de tributos para a entrada do seu primeiro imóvel residencial no Canadá.',
        ],
        fr: [
          'Le Québec applique des taux marginaux élevés, mais compense par des abris fiscaux généreux.',
          'La déduction REER : Chaque dollar cotisé réduit votre revenu imposable à votre taux marginal.',
          'Le match employeur : Une hausse de salaire déguisée si votre entreprise double vos cotisations.',
          'Le CELIAPP : Déduction d’impôt à l’entrée et retrait 100 % libre d’impôt pour acheter votre propriété.',
        ],
        en: [
          'Quebec has high marginal brackets balanced by powerful tax shelters.',
          'RRSP multiplier: Contributions reduce taxable income directly, generating sizable tax refunds.',
          'Employer match: Guaranteed 100% instant return on your matched retirement plan.',
          'FHSA (CELIAPP): Tax deduction upfront and tax-free withdrawal for your first Canadian home.',
        ],
      },
      ctaTool: 'rrsp-savings',
      ctaToolLabel: {
        pt: 'Simular meu Match REER e Retorno Fiscal',
        fr: 'Simulateur REER & Économie d’impôt',
        en: 'Simulate RRSP tax savings & employer match',
      },
      affiliateOffer: {
        partnerId: 'wealthsimple',
        partnerName: 'Wealthsimple (REER & CELIAPP)',
        badge: {
          pt: 'Plataforma Nº 1 sem Corretagem',
          fr: 'Plateforme N° 1 sans commission',
          en: 'Canada’s Top Zero-Commission Platform',
        },
        offerTitle: {
          pt: 'Bônus de até $250 CAD na Abertura do seu REER ou CELIAPP',
          fr: 'Prime jusqu’à 250 $ CAD à l’ouverture d’un REER ou CELIAPP',
          en: 'Up to $250 CAD bonus when funding your RRSP or FHSA',
        },
        offerDescription: {
          pt: 'Abra sua conta de investimentos automatizada ou compre ETFs sem taxa para abater impostos provinciais e federais no Québec.',
          fr: 'Investissez dans vos régimes enregistrés sans frais de transaction avec gestion automatisée.',
          en: 'Invest in tax-sheltered accounts with automated portfolios and zero trading fees.',
        },
        ctaText: {
          pt: 'Abrir REER/CELIAPP com bônus',
          fr: 'Ouvrir mon compte avec prime',
          en: 'Open my bonus account',
        },
        externalUrl: 'https://www.wealthsimple.com',
      },
      hasEbookCta: true,
    },
  },
];

// ==========================================
// STORE MANAGEMENT ENGINE
// ==========================================

const STORAGE_KEYS = {
  ARTICLES: 'paienet_admin_articles',
  AFFILIATES: 'paienet_admin_affiliates',
  AD_SLOTS: 'paienet_admin_ad_slots',
  EBOOK_CONFIG: 'paienet_admin_ebook_config',
  EBOOK_ORDERS: 'paienet_admin_ebook_orders',
  DIGITAL_ASSETS: 'paienet_admin_digital_assets',
  NEWSLETTER: 'paienet_admin_newsletter_leads',
  LIVE_EVENTS: 'paienet_admin_live_events',
  SETTINGS: 'paienet_admin_site_settings',
  AUTH_PIN: 'paienet_admin_passcode',
  SESSION: 'paienet_admin_session_auth',
};

const DEFAULT_ADMIN_PASSWORD = 'admin123';

class AdminStore {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // In-memory cache for referential stability in useSyncExternalStore
  private cachedArticles: BlogArticleData[] | null = null;
  private cachedAffiliates: AffiliatePartner[] | null = null;
  private cachedAdSlots: AdSlotConfig[] | null = null;
  private cachedEbookConfig: EbookConfig | null = null;
  private cachedDigitalAssets: DigitalAsset[] | null = null;
  private cachedProUser: boolean | null = null;

  // --- PRO USER STATE ---
  public isProUser(): boolean {
    if (!this.isBrowser()) return false;
    if (this.cachedProUser !== null) return this.cachedProUser;
    try {
      this.cachedProUser = localStorage.getItem('paienet_qc_pro') === 'true';
      return this.cachedProUser;
    } catch {
      return false;
    }
  }

  public setProUser(val: boolean): void {
    if (!this.isBrowser()) return;
    this.cachedProUser = val;
    try {
      localStorage.setItem('paienet_qc_pro', val ? 'true' : 'false');
      this.notifySubscribers();
    } catch {
      // ignore
    }
  }

  // --- AUTHENTICATION ---
  public getMasterPassword(): string {
    if (!this.isBrowser()) return DEFAULT_ADMIN_PASSWORD;
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_PIN) || DEFAULT_ADMIN_PASSWORD;
    } catch {
      return DEFAULT_ADMIN_PASSWORD;
    }
  }

  public setMasterPassword(newPass: string): boolean {
    if (!this.isBrowser() || !newPass || newPass.length < 4) return false;
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_PIN, newPass);
      return true;
    } catch {
      return false;
    }
  }

  public isAuthenticated(): boolean {
    if (!this.isBrowser()) return false;
    try {
      return sessionStorage.getItem(STORAGE_KEYS.SESSION) === 'true';
    } catch {
      return false;
    }
  }

  public login(password: string): boolean {
    if (!this.isBrowser()) return false;
    const current = this.getMasterPassword();
    if (password.trim() === current.trim()) {
      try {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, 'true');
        return true;
      } catch {
        return true;
      }
    }
    return false;
  }

  public logout(): void {
    if (!this.isBrowser()) return;
    try {
      sessionStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch {
      // ignore
    }
  }

  // --- BLOG ARTICLES & TEMPLATES ---
  public getArticleTemplates(): ArticleTemplate[] {
    return ARTICLE_TEMPLATES;
  }

  public getArticles(): BlogArticleData[] {
    if (!this.isBrowser()) return INITIAL_ARTICLES;
    if (this.cachedArticles) return this.cachedArticles;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (stored) {
        this.cachedArticles = JSON.parse(stored);
        return this.cachedArticles!;
      }
    } catch (e) {
      console.error('Error loading articles from storage:', e);
    }
    this.cachedArticles = INITIAL_ARTICLES;
    return this.cachedArticles;
  }

  public saveArticle(article: BlogArticleData): void {
    if (!this.isBrowser()) return;
    const articles = [...this.getArticles()];
    const index = articles.findIndex((a) => a.id === article.id);
    if (index >= 0) {
      articles[index] = { ...article };
    } else {
      articles.unshift(article);
    }
    this.cachedArticles = articles;
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error saving article:', e);
    }
  }

  public deleteArticle(articleId: string): void {
    if (!this.isBrowser()) return;
    const articles = this.getArticles().filter((a) => a.id !== articleId);
    this.cachedArticles = articles;
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error deleting article:', e);
    }
  }

  // --- AFFILIATE PARTNERS ---
  public getAffiliates(): AffiliatePartner[] {
    if (!this.isBrowser()) return INITIAL_AFFILIATES;
    if (this.cachedAffiliates) return this.cachedAffiliates;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AFFILIATES);
      if (stored) {
        this.cachedAffiliates = JSON.parse(stored);
        return this.cachedAffiliates!;
      }
    } catch (e) {
      console.error('Error loading affiliates from storage:', e);
    }
    this.cachedAffiliates = INITIAL_AFFILIATES;
    return this.cachedAffiliates;
  }

  public saveAffiliate(partner: AffiliatePartner): void {
    if (!this.isBrowser()) return;
    const partners = [...this.getAffiliates()];
    const index = partners.findIndex((p) => p.id === partner.id);
    if (index >= 0) {
      partners[index] = { ...partner };
    } else {
      partners.unshift(partner);
    }
    this.cachedAffiliates = partners;
    try {
      localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(partners));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error saving affiliate:', e);
    }
  }

  public deleteAffiliate(partnerId: string): void {
    if (!this.isBrowser()) return;
    const partners = this.getAffiliates().filter((p) => p.id !== partnerId);
    this.cachedAffiliates = partners;
    try {
      localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(partners));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error deleting affiliate:', e);
    }
  }

  public toggleAffiliate(partnerId: string): void {
    if (!this.isBrowser()) return;
    const partners = [...this.getAffiliates()];
    const index = partners.findIndex((p) => p.id === partnerId);
    if (index >= 0) {
      partners[index] = { ...partners[index], active: !partners[index].active };
      this.cachedAffiliates = partners;
      try {
        localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(partners));
        this.notifySubscribers();
      } catch (e) {
        console.error('Error toggling affiliate:', e);
      }
    }
  }

  public resetAffiliateStats(partnerId: string): void {
    if (!this.isBrowser()) return;
    const partners = [...this.getAffiliates()];
    const index = partners.findIndex((p) => p.id === partnerId);
    if (index >= 0) {
      partners[index] = {
        ...partners[index],
        clicksCount: 0,
        estimatedConversions: 0,
        estimatedRevenueCad: 0,
      };
      this.cachedAffiliates = partners;
      try {
        localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(partners));
        this.notifySubscribers();
      } catch (e) {
        console.error('Error resetting affiliate stats:', e);
      }
    }
  }

  public trackAffiliateClick(partnerId: string): void {
    if (!this.isBrowser()) return;
    const partners = [...this.getAffiliates()];
    const index = partners.findIndex((p) => p.id === partnerId);
    if (index >= 0) {
      partners[index] = { ...partners[index], clicksCount: (partners[index].clicksCount || 0) + 1 };
      this.cachedAffiliates = partners;
      try {
        localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(partners));
      } catch {
        // ignore
      }
    }

    this.logEvent({
      id: `evt-${Date.now()}`,
      timestamp: 'Agora mesmo',
      type: 'affiliate_click',
      summary: `Clique de usuário no link de afiliado: ${partners[index]?.name || partnerId}`,
      location: 'Québec, Canada',
      details: `Redirecionado para URL parceiro com UTMs ativas`,
    });
  }

  // --- AD SPACES ---
  public getAdSlots(): AdSlotConfig[] {
    if (!this.isBrowser()) return INITIAL_AD_SLOTS;
    if (this.cachedAdSlots) return this.cachedAdSlots;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AD_SLOTS);
      if (stored) {
        this.cachedAdSlots = JSON.parse(stored);
        return this.cachedAdSlots!;
      }
    } catch (e) {
      console.error('Error loading ad slots from storage:', e);
    }
    this.cachedAdSlots = INITIAL_AD_SLOTS;
    return this.cachedAdSlots;
  }

  public saveAdSlot(slot: AdSlotConfig): void {
    if (!this.isBrowser()) return;
    const slots = [...this.getAdSlots()];
    const index = slots.findIndex((s) => s.id === slot.id);
    if (index >= 0) {
      slots[index] = { ...slot };
    } else {
      slots.push(slot);
    }
    this.cachedAdSlots = slots;
    try {
      localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(slots));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error saving ad slot:', e);
    }
  }

  public deleteAdSlot(slotId: string): void {
    if (!this.isBrowser()) return;
    const slots = this.getAdSlots().filter((s) => s.id !== slotId);
    this.cachedAdSlots = slots;
    try {
      localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(slots));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error deleting ad slot:', e);
    }
  }

  public resetAdSlotStats(slotId: string): void {
    if (!this.isBrowser()) return;
    const slots = [...this.getAdSlots()];
    const index = slots.findIndex((s) => s.id === slotId);
    if (index >= 0) {
      slots[index] = { ...slots[index], impressions: 0, clicks: 0 };
      this.cachedAdSlots = slots;
      try {
        localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(slots));
        this.notifySubscribers();
      } catch (e) {
        console.error('Error resetting ad slot stats:', e);
      }
    }
  }

  public updateAdSlot(slotId: string, updates: Partial<AdSlotConfig>): void {
    if (!this.isBrowser()) return;
    const slots = [...this.getAdSlots()];
    const index = slots.findIndex((s) => s.id === slotId);
    if (index >= 0) {
      slots[index] = { ...slots[index], ...updates };
      this.cachedAdSlots = slots;
      try {
        localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(slots));
        this.notifySubscribers();
      } catch (e) {
        console.error('Error updating ad slot:', e);
      }
    }
  }

  public recordAdImpression(slotId: string): void {
    if (!this.isBrowser()) return;
    const slots = [...this.getAdSlots()];
    const index = slots.findIndex((s) => s.id === slotId);
    if (index >= 0) {
      slots[index] = { ...slots[index], impressions: (slots[index].impressions || 0) + 1 };
      this.cachedAdSlots = slots;
      try {
        localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(slots));
      } catch {
        // silent
      }
    }
  }

  public toggleAdSlotStatus(slotId: string): boolean {
    if (!this.isBrowser()) return false;
    const slots = [...this.getAdSlots()];
    const index = slots.findIndex((s) => s.id === slotId);
    if (index >= 0) {
      const current = slots[index];
      const willBeActive = current.status === 'paused';
      slots[index] = {
        ...current,
        status: willBeActive ? (current.customSponsor ? 'custom-sponsor' : 'active') : 'paused',
        updatedAt: new Date().toISOString().split('T')[0],
      };
      this.cachedAdSlots = slots;
      try {
        localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(slots));
        this.notifySubscribers();
      } catch (e) {
        console.error('Error toggling ad slot status:', e);
      }
      return willBeActive;
    }
    return false;
  }

  public duplicateAdSlot(slotId: string): AdSlotConfig | null {
    if (!this.isBrowser()) return null;
    const slots = [...this.getAdSlots()];
    const original = slots.find((s) => s.id === slotId);
    if (!original) return null;

    const clonedId = `slot-${Date.now()}`;
    const cloned: AdSlotConfig = {
      ...JSON.parse(JSON.stringify(original)),
      id: clonedId,
      name: `${original.name} (Cópia)`,
      impressions: 0,
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    slots.push(cloned);
    this.cachedAdSlots = slots;
    try {
      localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(slots));
      this.notifySubscribers();
      return cloned;
    } catch (e) {
      console.error('Error duplicating ad slot:', e);
      return null;
    }
  }

  public trackAdClick(slotId: string): void {
    if (!this.isBrowser()) return;
    const slots = [...this.getAdSlots()];
    const index = slots.findIndex((s) => s.id === slotId);
    if (index >= 0) {
      slots[index] = { ...slots[index], clicks: (slots[index].clicks || 0) + 1 };
      this.cachedAdSlots = slots;
      try {
        localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(slots));
      } catch {
        // silent
      }
    }
    const slot = slots[index];
    this.logEvent({
      id: `evt-${Date.now()}`,
      timestamp: 'Agora mesmo',
      type: 'affiliate_click',
      summary: `Clique no Anúncio: ${slot?.customSponsor?.sponsorName || slot?.name || slotId}`,
      location: 'Québec, Canada',
      details: `Slot: ${slotId} | Seção: ${slot?.pageSectionLabel || slot?.pageSection || 'Geral'} | Link: ${slot?.customSponsor?.linkUrl || 'AdSense'}`,
    });
  }

  // --- E-BOOK DIGITAL PRODUCT ---
  public getEbookConfig(): EbookConfig {
    if (!this.isBrowser()) return INITIAL_EBOOK_CONFIG;
    if (this.cachedEbookConfig) return this.cachedEbookConfig;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EBOOK_CONFIG);
      if (stored) {
        this.cachedEbookConfig = JSON.parse(stored);
        return this.cachedEbookConfig!;
      }
    } catch (e) {
      console.error('Error loading ebook config:', e);
    }
    this.cachedEbookConfig = INITIAL_EBOOK_CONFIG;
    return this.cachedEbookConfig;
  }

  public updateEbookConfig(updates: Partial<EbookConfig>): void {
    if (!this.isBrowser()) return;
    const current = this.getEbookConfig();
    const updated = { ...current, ...updates };
    this.cachedEbookConfig = updated;
    try {
      localStorage.setItem(STORAGE_KEYS.EBOOK_CONFIG, JSON.stringify(updated));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error updating ebook config:', e);
    }
  }

  // --- EBOOK COUPONS CRUD ---
  public getCoupons(): EbookCoupon[] {
    return this.getEbookConfig().coupons || [];
  }

  public saveCoupon(coupon: EbookCoupon): void {
    if (!this.isBrowser()) return;
    const config = this.getEbookConfig();
    const coupons = [...(config.coupons || [])];
    const index = coupons.findIndex((c) => c.code.toUpperCase() === coupon.code.toUpperCase());
    const formattedCoupon: EbookCoupon = {
      ...coupon,
      code: coupon.code.toUpperCase().trim(),
      usesCount: coupon.usesCount || 0,
    };
    if (index >= 0) {
      coupons[index] = formattedCoupon;
    } else {
      coupons.unshift(formattedCoupon);
    }
    this.updateEbookConfig({ coupons });
  }

  public deleteCoupon(code: string): void {
    if (!this.isBrowser()) return;
    const config = this.getEbookConfig();
    const coupons = (config.coupons || []).filter((c) => c.code.toUpperCase() !== code.toUpperCase());
    this.updateEbookConfig({ coupons });
  }

  public toggleCoupon(code: string): void {
    if (!this.isBrowser()) return;
    const config = this.getEbookConfig();
    const coupons = (config.coupons || []).map((c) =>
      c.code.toUpperCase() === code.toUpperCase() ? { ...c, active: !c.active } : c
    );
    this.updateEbookConfig({ coupons });
  }

  // --- DIGITAL ASSETS & E-BOOKS CRUD ---
  public getDigitalAssets(): DigitalAsset[] {
    if (!this.isBrowser()) return INITIAL_DIGITAL_ASSETS;
    if (this.cachedDigitalAssets) return this.cachedDigitalAssets;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DIGITAL_ASSETS);
      if (stored) {
        this.cachedDigitalAssets = JSON.parse(stored);
        return this.cachedDigitalAssets!;
      }
    } catch (e) {
      console.error('Error loading digital assets:', e);
    }
    this.cachedDigitalAssets = INITIAL_DIGITAL_ASSETS;
    return this.cachedDigitalAssets;
  }

  public saveDigitalAsset(asset: DigitalAsset): void {
    if (!this.isBrowser()) return;
    const assets = [...this.getDigitalAssets()];
    const index = assets.findIndex((a) => a.id === asset.id);
    const updatedAsset: DigitalAsset = {
      ...asset,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    if (index >= 0) {
      assets[index] = updatedAsset;
    } else {
      assets.unshift(updatedAsset);
    }
    this.cachedDigitalAssets = assets;
    try {
      localStorage.setItem(STORAGE_KEYS.DIGITAL_ASSETS, JSON.stringify(assets));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error saving digital asset:', e);
    }

    // Keep EbookConfig in sync if this is the featured asset or main ebook
    if (asset.id === 'ebook-salario-quebec-2026' || asset.featured) {
      this.updateEbookConfig({
        title: asset.title,
        subtitle: asset.subtitle,
        regularPriceCad: asset.regularPriceCad,
        promotionalPriceCad: asset.promotionalPriceCad,
        salesStatus: asset.salesStatus === 'draft' ? 'paused' : asset.salesStatus,
        downloadUrl: asset.downloadUrl,
      });
    }
  }

  public deleteDigitalAsset(assetId: string): void {
    if (!this.isBrowser()) return;
    const assets = this.getDigitalAssets().filter((a) => a.id !== assetId);
    this.cachedDigitalAssets = assets;
    try {
      localStorage.setItem(STORAGE_KEYS.DIGITAL_ASSETS, JSON.stringify(assets));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error deleting digital asset:', e);
    }
  }

  public toggleDigitalAssetStatus(assetId: string): void {
    if (!this.isBrowser()) return;
    const assets = [...this.getDigitalAssets()];
    const index = assets.findIndex((a) => a.id === assetId);
    if (index >= 0) {
      const current = assets[index];
      const newStatus = current.salesStatus === 'active' ? 'paused' : 'active';
      assets[index] = { ...current, salesStatus: newStatus, updatedAt: new Date().toISOString().split('T')[0] };
      this.cachedDigitalAssets = assets;
      try {
        localStorage.setItem(STORAGE_KEYS.DIGITAL_ASSETS, JSON.stringify(assets));
        this.notifySubscribers();
      } catch (e) {
        console.error('Error toggling asset status:', e);
      }
    }
  }

  public updateDigitalAsset(assetId: string, updates: Partial<DigitalAsset>): void {
    if (!this.isBrowser()) return;
    const assets = [...this.getDigitalAssets()];
    const index = assets.findIndex((a) => a.id === assetId);
    if (index >= 0) {
      assets[index] = {
        ...assets[index],
        ...updates,
        updatedAt: new Date().toISOString().split('T')[0],
      };
      this.cachedDigitalAssets = assets;
      try {
        localStorage.setItem(STORAGE_KEYS.DIGITAL_ASSETS, JSON.stringify(assets));
        this.notifySubscribers();
      } catch (e) {
        console.error('Error updating digital asset:', e);
      }
    }
  }

  public recordDigitalAssetDownload(assetId: string, email?: string): void {
    if (!this.isBrowser()) return;
    const assets = [...this.getDigitalAssets()];
    const index = assets.findIndex((a) => a.id === assetId);
    const asset = index >= 0 ? assets[index] : null;

    if (asset) {
      assets[index] = {
        ...asset,
        totalDownloads: (asset.totalDownloads || 0) + 1,
      };
      this.cachedDigitalAssets = assets;
      try {
        localStorage.setItem(STORAGE_KEYS.DIGITAL_ASSETS, JSON.stringify(assets));
      } catch (e) {
        console.error('Error recording download:', e);
      }
    }

    if (email && email.includes('@')) {
      this.addNewsletterLead(email.trim(), 'ebook_modal');
    }

    this.logEvent({
      id: `evt-${Date.now()}`,
      timestamp: 'Agora mesmo',
      type: 'ebook_view',
      summary: `Download de material digital: ${asset?.title || assetId}`,
      location: 'Québec, Canada',
      details: `${asset?.accessType === 'free' ? 'Material Gratuito' : 'Material Pago'} baixado por ${email || 'Visitante direto'}`,
    });

    this.notifySubscribers();
  }

  // --- EBOOK ORDERS CRUD ---
  public getEbookOrders(): EbookOrder[] {
    if (!this.isBrowser()) return INITIAL_EBOOK_ORDERS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EBOOK_ORDERS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading ebook orders:', e);
    }
    return INITIAL_EBOOK_ORDERS;
  }

  public recordEbookSale(order: Omit<EbookOrder, 'id' | 'date'> & { id?: string; date?: string; assetId?: string; assetTitle?: string }): EbookOrder {
    const targetAssetId = order.assetId || 'ebook-salario-quebec-2026';
    const assets = this.getDigitalAssets();
    const matchedAsset = assets.find((a) => a.id === targetAssetId);

    const newOrder: EbookOrder = {
      ...order,
      id: order.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      assetId: targetAssetId,
      assetTitle: order.assetTitle || matchedAsset?.title || 'Guia Definitivo do Salário & Emprego no Québec 2026',
      date: order.date || new Date().toISOString().replace('T', ' ').substring(0, 16),
      downloadAccessCount: order.downloadAccessCount || 1,
    };

    if (this.isBrowser()) {
      const orders = this.getEbookOrders();
      orders.unshift(newOrder);
      try {
        localStorage.setItem(STORAGE_KEYS.EBOOK_ORDERS, JSON.stringify(orders));
      } catch (e) {
        console.error('Error recording order:', e);
      }

      // Update total stats for legacy ebookConfig
      const config = this.getEbookConfig();
      this.updateEbookConfig({
        totalCopiesSold: (config.totalCopiesSold || 0) + 1,
        totalRevenueCad: Number(((config.totalRevenueCad || 0) + newOrder.amountCad).toFixed(2)),
      });

      // Update specific digital asset metrics
      const assetList = [...this.getDigitalAssets()];
      const aIdx = assetList.findIndex((a) => a.id === targetAssetId);
      if (aIdx >= 0) {
        assetList[aIdx] = {
          ...assetList[aIdx],
          totalSales: (assetList[aIdx].totalSales || 0) + 1,
          totalDownloads: (assetList[aIdx].totalDownloads || 0) + 1,
          totalRevenueCad: Number(((assetList[aIdx].totalRevenueCad || 0) + newOrder.amountCad).toFixed(2)),
        };
        this.cachedDigitalAssets = assetList;
        try {
          localStorage.setItem(STORAGE_KEYS.DIGITAL_ASSETS, JSON.stringify(assetList));
        } catch {}
      }

      this.logEvent({
        id: `evt-${Date.now()}`,
        timestamp: 'Agora mesmo',
        type: 'ebook_purchase',
        summary: `Nova venda: ${newOrder.assetTitle} ($${newOrder.amountCad.toFixed(2)} CAD)`,
        location: 'Montréal, QC',
        details: `Comprador: ${newOrder.customerEmail} | Cupom: ${newOrder.couponUsed || 'Sem cupom'}`,
      });
      this.notifySubscribers();
    }

    return newOrder;
  }

  public updateEbookOrder(orderId: string, updates: Partial<EbookOrder>): void {
    if (!this.isBrowser()) return;
    const orders = this.getEbookOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index >= 0) {
      orders[index] = { ...orders[index], ...updates };
      try {
        localStorage.setItem(STORAGE_KEYS.EBOOK_ORDERS, JSON.stringify(orders));
        this.notifySubscribers();
      } catch (e) {
        console.error('Error updating order:', e);
      }
    }
  }

  public deleteEbookOrder(orderId: string): void {
    if (!this.isBrowser()) return;
    const orders = this.getEbookOrders().filter((o) => o.id !== orderId);
    try {
      localStorage.setItem(STORAGE_KEYS.EBOOK_ORDERS, JSON.stringify(orders));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error deleting order:', e);
    }
  }

  public exportOrdersCsv(): string {
    const orders = this.getEbookOrders();
    const header = 'ID,Produto,Email,Data,Valor_CAD,Cupom,Status,Acessos_Download\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.assetTitle || 'Guia Salário 2026'}","${o.customerEmail}","${o.date}","${o.amountCad.toFixed(2)}","${o.couponUsed || '-'}","${o.status}","${o.downloadAccessCount}"`
      )
      .join('\n');
    return header + rows;
  }

  // --- NEWSLETTER LEADS CRUD ---
  public getNewsletterLeads(): NewsletterLead[] {
    if (!this.isBrowser()) return INITIAL_NEWSLETTER_LEADS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading newsletter leads:', e);
    }
    return INITIAL_NEWSLETTER_LEADS;
  }

  public addNewsletterLead(email: string, source: NewsletterLead['source'] = 'home_banner'): boolean {
    if (!this.isBrowser() || !email || !email.includes('@')) return false;
    const leads = this.getNewsletterLeads();
    const existing = leads.find((l) => l.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return true; // already subscribed
    }

    const newLead: NewsletterLead = {
      id: `lead-${Date.now()}`,
      email: email.trim(),
      source,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'subscribed',
    };

    leads.unshift(newLead);
    try {
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(leads));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error saving newsletter lead:', e);
    }

    this.logEvent({
      id: `evt-${Date.now()}`,
      timestamp: 'Agora mesmo',
      type: 'newsletter_signup',
      summary: `Nova inscrição na Newsletter: ${email}`,
      location: 'Québec, Canada',
      details: `Origem: ${source}`,
    });

    return true;
  }

  public saveNewsletterLead(lead: NewsletterLead): void {
    if (!this.isBrowser() || !lead.email) return;
    const leads = this.getNewsletterLeads();
    const index = leads.findIndex((l) => l.id === lead.id);
    if (index >= 0) {
      leads[index] = { ...lead };
    } else {
      leads.unshift({
        ...lead,
        id: lead.id || `lead-${Date.now()}`,
        date: lead.date || new Date().toISOString().replace('T', ' ').substring(0, 16),
      });
    }
    try {
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(leads));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error saving newsletter lead:', e);
    }
  }

  public updateNewsletterLead(leadId: string, updates: Partial<NewsletterLead>): void {
    if (!this.isBrowser()) return;
    const leads = this.getNewsletterLeads();
    const index = leads.findIndex((l) => l.id === leadId);
    if (index >= 0) {
      leads[index] = { ...leads[index], ...updates };
      try {
        localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(leads));
        this.notifySubscribers();
      } catch (e) {
        console.error('Error updating newsletter lead:', e);
      }
    }
  }

  public removeNewsletterLead(leadId: string): void {
    if (!this.isBrowser()) return;
    const leads = this.getNewsletterLeads().filter((l) => l.id !== leadId);
    try {
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(leads));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error removing newsletter lead:', e);
    }
  }

  public clearNewsletterLeads(): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify([]));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error clearing leads:', e);
    }
  }

  // --- TELEMETRY & LIVE EVENTS ---
  public getLiveEvents(): LiveActivityEvent[] {
    if (!this.isBrowser()) return INITIAL_LIVE_EVENTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LIVE_EVENTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return INITIAL_LIVE_EVENTS;
  }

  public logEvent(event: LiveActivityEvent): void {
    if (!this.isBrowser()) return;
    const events = this.getLiveEvents();
    const fullEvent: LiveActivityEvent = {
      ...event,
      id: event.id || `evt-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: event.timestamp || 'Agora mesmo',
    };
    events.unshift(fullEvent);
    if (events.length > 50) events.pop();
    try {
      localStorage.setItem(STORAGE_KEYS.LIVE_EVENTS, JSON.stringify(events));
      this.notifySubscribers();
    } catch {
      // ignore
    }
  }

  public clearTelemetry(): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.LIVE_EVENTS, JSON.stringify([]));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error clearing telemetry:', e);
    }
  }

  public getDailyAnalytics(): DailyAnalytics[] {
    return INITIAL_DAILY_ANALYTICS;
  }

  // --- SITE SETTINGS ---
  public getSiteSettings(): SiteSettings {
    if (!this.isBrowser()) return INITIAL_SITE_SETTINGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        return { ...INITIAL_SITE_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Error loading site settings:', e);
    }
    return INITIAL_SITE_SETTINGS;
  }

  public updateSiteSettings(updates: Partial<SiteSettings>): void {
    if (!this.isBrowser()) return;
    const current = this.getSiteSettings();
    const updated = { ...current, ...updates };
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error saving site settings:', e);
    }
  }

  // --- EXPORT & BACKUP UTILITIES ---
  public exportLeadsCsv(): string {
    const leads = this.getNewsletterLeads();
    const header = 'ID,Email,Origem,Data Inscrição,Status\n';
    const rows = leads
      .map((l) => `"${l.id}","${l.email}","${l.source}","${l.date}","${l.status}"`)
      .join('\n');
    return header + rows;
  }

  public exportFullBackupJson(): string {
    const backup = {
      exportedAt: new Date().toISOString(),
      articles: this.getArticles(),
      affiliates: this.getAffiliates(),
      adSlots: this.getAdSlots(),
      ebookConfig: this.getEbookConfig(),
      ebookOrders: this.getEbookOrders(),
      digitalAssets: this.getDigitalAssets(),
      newsletterLeads: this.getNewsletterLeads(),
      siteSettings: this.getSiteSettings(),
    };
    return JSON.stringify(backup, null, 2);
  }

  public importFullBackupJson(jsonString: string): { success: boolean; message: string; count?: number } {
    if (!this.isBrowser()) return { success: false, message: 'Navegador indisponível' };
    try {
      const data = JSON.parse(jsonString);
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'Arquivo JSON inválido' };
      }

      let restoredSections = 0;
      if (Array.isArray(data.articles)) {
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(data.articles));
        restoredSections++;
      }
      if (Array.isArray(data.affiliates)) {
        localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(data.affiliates));
        restoredSections++;
      }
      if (Array.isArray(data.adSlots)) {
        localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(data.adSlots));
        restoredSections++;
      }
      if (data.ebookConfig && typeof data.ebookConfig === 'object') {
        localStorage.setItem(STORAGE_KEYS.EBOOK_CONFIG, JSON.stringify(data.ebookConfig));
        restoredSections++;
      }
      if (Array.isArray(data.ebookOrders)) {
        localStorage.setItem(STORAGE_KEYS.EBOOK_ORDERS, JSON.stringify(data.ebookOrders));
        restoredSections++;
      }
      if (Array.isArray(data.digitalAssets)) {
        localStorage.setItem(STORAGE_KEYS.DIGITAL_ASSETS, JSON.stringify(data.digitalAssets));
        restoredSections++;
      }
      if (Array.isArray(data.newsletterLeads)) {
        localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(data.newsletterLeads));
        restoredSections++;
      }
      if (data.siteSettings && typeof data.siteSettings === 'object') {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.siteSettings));
        restoredSections++;
      }

      this.cachedArticles = null;
      this.cachedAffiliates = null;
      this.cachedAdSlots = null;
      this.cachedEbookConfig = null;
      this.cachedDigitalAssets = null;
      this.cachedProUser = null;

      this.notifySubscribers();
      return {
        success: true,
        message: `Backup restaurado com sucesso! (${restoredSections} módulos recuperados)`,
        count: restoredSections,
      };
    } catch (err: unknown) {
      return {
        success: false,
        message: `Erro ao processar JSON: ${err instanceof Error ? err.message : 'Arquivo corrompido'}`,
      };
    }
  }

  public restoreDefaultData(): void {
    if (!this.isBrowser()) return;
    try {
      this.cachedArticles = null;
      this.cachedAffiliates = null;
      this.cachedAdSlots = null;
      this.cachedEbookConfig = null;
      this.cachedDigitalAssets = null;
      this.cachedProUser = null;

      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
      localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(INITIAL_AFFILIATES));
      localStorage.setItem(STORAGE_KEYS.AD_SLOTS, JSON.stringify(INITIAL_AD_SLOTS));
      localStorage.setItem(STORAGE_KEYS.EBOOK_CONFIG, JSON.stringify(INITIAL_EBOOK_CONFIG));
      localStorage.setItem(STORAGE_KEYS.EBOOK_ORDERS, JSON.stringify(INITIAL_EBOOK_ORDERS));
      localStorage.setItem(STORAGE_KEYS.DIGITAL_ASSETS, JSON.stringify(INITIAL_DIGITAL_ASSETS));
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(INITIAL_NEWSLETTER_LEADS));
      localStorage.setItem(STORAGE_KEYS.LIVE_EVENTS, JSON.stringify(INITIAL_LIVE_EVENTS));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SITE_SETTINGS));
      this.notifySubscribers();
    } catch (e) {
      console.error('Error resetting default data:', e);
    }
  }

  // --- INITIAL / SSR SAFE GETTERS ---
  public getInitialAdSlots(): AdSlotConfig[] {
    return INITIAL_AD_SLOTS;
  }

  public getInitialArticles(): BlogArticleData[] {
    return INITIAL_ARTICLES;
  }

  public getInitialAffiliates(): AffiliatePartner[] {
    return INITIAL_AFFILIATES;
  }

  public getInitialEbookConfig(): EbookConfig {
    return INITIAL_EBOOK_CONFIG;
  }

  public getInitialDigitalAssets(): DigitalAsset[] {
    return INITIAL_DIGITAL_ASSETS;
  }

  public getInitialEbookOrders(): EbookOrder[] {
    return INITIAL_EBOOK_ORDERS;
  }

  public getInitialNewsletterLeads(): NewsletterLead[] {
    return INITIAL_NEWSLETTER_LEADS;
  }

  public getInitialLiveEvents(): LiveActivityEvent[] {
    return INITIAL_LIVE_EVENTS;
  }

  // --- REACTIVE SUBSCRIBERS ---
  private subscribers: Array<() => void> = [];

  public subscribe(cb: () => void): () => void {
    this.subscribers.push(cb);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((cb) => {
      try {
        cb();
      } catch (e) {
        console.error('Subscriber callback error:', e);
      }
    });
  }
}

export const adminStore = new AdminStore();
