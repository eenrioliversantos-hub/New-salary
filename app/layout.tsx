import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Calculateur Salaire Net Québec - Taux Horaire',
  description: 'Calculatrice de salaire net horaire et paie aux deux semaines pour le Québec, Canada. Calcul instantané des impôts provinciaux, fédéraux, RRQ, RQAP et AE.',
  openGraph: {
    title: 'Calculateur Salaire Net Québec - Taux Horaire',
    description: 'Calculatrice de salaire net horaire et paie aux deux semaines pour le Québec, Canada. Calcul instantané des impôts provinciaux, fédéraux, RRQ, RQAP et AE.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur Salaire Net Québec - Taux Horaire',
    description: 'Calculatrice de salaire net horaire et paie aux deux semaines pour le Québec, Canada. Calcul instantané des impôts provinciaux, fédéraux, RRQ, RQAP et AE.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className="h-full bg-slate-50 text-slate-900 antialiased overflow-x-clip">
      <body className="min-h-full flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900 overflow-x-clip w-full max-w-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
