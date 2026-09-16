import './globals.css'

export const metadata = {
  title: 'Dealora — Achetez, vendez, troquez, enchérissez',
  description: 'La marketplace nouvelle génération pour acheter, vendre, troquer et enchérir partout dans le monde.'
}

export default function RootLayout({ children }) {
  return <html lang="fr"><body>{children}</body></html>
}
