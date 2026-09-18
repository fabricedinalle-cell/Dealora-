import './globals.css'

export const metadata = {
  metadataBase: new URL('https://dealora.fr'),
  title: { default:'Dealora — Achetez, vendez, troquez, enchérissez', template:'%s | Dealora' },
  description:'Achetez, vendez, troquez ou enchérissez simplement sur Dealora. Découvrez des milliers d’objets et donnez-leur une seconde vie.',
  applicationName:'Dealora',
  keywords:['marketplace','occasion','seconde main','acheter','vendre','troc','enchères'],
  openGraph:{title:'Dealora — Tout peut avoir une seconde vie',description:'Achetez, vendez, troquez ou enchérissez simplement.',type:'website',locale:'fr_FR',siteName:'Dealora'},
  twitter:{card:'summary_large_image',title:'Dealora — Tout peut avoir une seconde vie',description:'La marketplace pour acheter, vendre, troquer et enchérir.'},
  robots:{index:true,follow:true},
  manifest:'/manifest.webmanifest',
  appleWebApp:{capable:true,title:'Dealora',statusBarStyle:'default'}
}
export const viewport={width:'device-width',initialScale:1,maximumScale:1,themeColor:'#08aa70'}

export default function RootLayout({children}){return <html lang="fr"><body>{children}</body></html>}
