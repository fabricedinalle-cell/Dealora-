'use client'

import { useRef, useState } from 'react'
import {
  Camera,
  Search,
  Heart,
  User,
  MapPin,
  Globe2,
  Truck,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Gavel,
  Repeat2,
  ShoppingBag,
  Plus,
  Leaf,
  Smartphone,
  PackageCheck,
  Bell,
  Menu,
  X,
} from 'lucide-react'

export default function Home() {
  const [mode, setMode] = useState('Acheter')
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const photoInput = useRef(null)

  const categories = [
    { name: 'Véhicules', emoji: '🚗' },
    { name: 'Immobilier', emoji: '🏠' },
    { name: 'Mode', emoji: '👟' },
    { name: 'High-tech', emoji: '📱' },
    { name: 'Maison', emoji: '🛋️' },
    { name: 'Loisirs', emoji: '🎮' },
  ]

  const listings = [
    {
      id: 1,
      title: 'iPhone 16 Pro',
      price: '899 €',
      location: 'Paris, France',
      country: '🇫🇷 France',
      delivery: 'Livraison ou retrait',
      importFee: 'Aucun frais d’import',
      image:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80',
      badge: 'À vendre',
    },
    {
      id: 2,
      title: 'Sneakers premium',
      price: '180 €',
      location: 'Lyon, France',
      country: '🇫🇷 France',
      delivery: 'Livraison disponible',
      importFee: 'Aucun frais d’import',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      badge: 'Troc possible',
    },
    {
      id: 3,
      title: 'Montre automatique',
      price: '320 €',
      location: 'Genève, Suisse',
      country: '🇨🇭 Suisse',
      delivery: 'Livraison internationale',
      importFee: 'Frais d’import estimés au paiement',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      badge: 'Enchère',
    },
    {
      id: 4,
      title: 'Appareil photo',
      price: '590 €',
      location: 'Berlin, Allemagne',
      country: '🇩🇪 Allemagne',
      delivery: 'Livraison internationale',
      importFee: 'Frais calculés selon destination',
      image:
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80',
      badge: 'À vendre',
    },
  ]

  const openPhotoSearch = () => {
    photoInput.current?.click()
  }

  const handlePhoto = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      console.log('Photo sélectionnée :', file)
      // La recherche visuelle sera branchée ici.
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16c784] text-xl font-black text-black">
              D
            </div>
            <span className="text-2xl font-black tracking-tight">
              dealora
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#annonces" className="hover:text-[#079669]">
              Acheter
            </a>
            <a href="#annonces" className="hover:text-[#079669]">
              Troquer
            </a>
            <a href="#annonces" className="hover:text-[#079669]">
              Enchères
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button className="flex items-center gap-2 rounded-full px-4 py-2 font-semibold hover:bg-neutral-100">
              <User size={19} />
              Se connecter
            </button>

            <button className="flex items-center gap-2 rounded-full bg-black px-5 py-3 font-bold text-white transition hover:bg-neutral-800">
              <Plus size={18} />
              Déposer une annonce
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-neutral-200 p-2 md:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-neutral-200 bg-white px-4 py-5 md:hidden">
            <div className="flex flex-col gap-4 font-semibold">
              <a href="#annonces">Acheter</a>
              <a href="#annonces">Troquer</a>
              <a href="#annonces">Enchères</a>
              <button className="flex items-center gap-2">
                <User size={18} />
                Se connecter
              </button>
              <button className="flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-white">
                <Plus size={18} />
                Déposer une annonce
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="overflow-hidden bg-[#dffcef]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:py-14 md:grid-cols-2 md:gap-10 md:px-8 md:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#16c784]" />
              Acheter autrement
            </div>

            <h1 className="max-w-xl text-[3.25rem] font-black leading-[0.94] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              Tout peut avoir
              <span className="block text-[#079669]">une seconde vie.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-700">
              Achetez, vendez, troquez ou enchérissez sur des milliers
              d&apos;objets et de biens. Simplement, partout.
            </p>

            {/* MODES */}
            <div className="mt-7 grid w-full max-w-[410px] grid-cols-3 rounded-full bg-white p-1.5 shadow-sm sm:mt-8 sm:w-fit">
              {['Acheter', 'Troquer', 'Enchérir'].map((item) => (
                <button
                  key={item}
                  onClick={() => setMode(item)}
                  className={`rounded-full px-3 py-3 text-sm font-bold transition sm:px-5 sm:py-2.5 ${
                    mode === item
                      ? 'bg-black text-white'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <div className="mt-5 flex max-w-2xl items-center rounded-[22px] bg-white p-2 shadow-xl shadow-black/5">
              <Search className="ml-3 shrink-0 text-neutral-500" size={22} />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Que recherchez-vous ?"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base outline-none"
              />

              <input
                ref={photoInput}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhoto}
                className="hidden"
              />

              <button
                onClick={openPhotoSearch}
                aria-label="Rechercher avec une photo"
                className="mr-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ef542b] text-white shadow-sm transition active:scale-95 hover:bg-[#db4823]"
              >
                <Camera size={24} strokeWidth={2.4} />
              </button>

              <button className="hidden rounded-xl bg-black px-6 py-3 font-bold text-white sm:block">
                Rechercher
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
              <MapPin size={16} />
              <span>France · Europe · International</span>
            </div>
          </div>

          {/* ILLUSTRATION */}
          <div className="relative mx-auto min-h-[360px] w-full max-w-[520px] sm:min-h-[420px]">
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#16c784] sm:h-[370px] sm:w-[370px] md:h-[450px] md:w-[450px]" />

            <div className="absolute left-[4%] top-[10%] rotate-[-7deg] rounded-3xl bg-white p-4 shadow-2xl sm:p-5">
              <div className="text-5xl">👟</div>
              <p className="mt-3 font-black">Sneakers</p>
              <p className="text-sm text-neutral-500">Troc possible</p>
            </div>

            <div className="absolute right-[3%] top-[8%] rotate-[6deg] rounded-3xl bg-black p-4 text-white shadow-2xl sm:p-5">
              <Gavel size={42} />
              <p className="mt-3 font-black">Enchères</p>
              <p className="text-sm text-neutral-300">À vous de jouer</p>
            </div>

            <div className="absolute left-1/2 top-[38%] z-10 flex h-40 w-40 -translate-x-1/2 items-center justify-center rounded-[38px] bg-white shadow-2xl sm:h-48 sm:w-48 md:h-56 md:w-56">
              <ShoppingBag size={95} strokeWidth={1.5} />
            </div>

            <div className="absolute bottom-[4%] left-[3%] rotate-[5deg] rounded-3xl bg-black p-4 text-white shadow-2xl sm:p-5">
              <Repeat2 size={38} className="text-[#16c784]" />
              <p className="mt-3 font-black">Troquez</p>
              <p className="text-sm text-neutral-300">
                Échangez simplement
              </p>
            </div>

            <div className="absolute bottom-[3%] right-[3%] rotate-[-5deg] rounded-3xl bg-white p-4 shadow-2xl sm:p-5">
              <div className="text-5xl">📱</div>
              <p className="mt-3 font-black">High-tech</p>
              <p className="text-sm text-neutral-500">Bonnes affaires</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL DISCOVERY */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-3 md:px-8">
          <div className="flex items-center gap-4 rounded-3xl bg-[#073b2a] p-5 text-white">
            <Globe2 className="text-[#54e6a8]" size={30} />
            <div><p className="font-black">Des annonces sans frontières</p><p className="text-sm text-white/65">Découvrez des objets en France et à l’international.</p></div>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-[#f4fbf7] p-5">
            <Truck className="text-[#079669]" size={30} />
            <div><p className="font-black">Livraison ou retrait</p><p className="text-sm text-neutral-600">Choisissez selon les options proposées par le vendeur.</p></div>
          </div>
          <div className="flex items-center gap-4 rounded-3xl border border-neutral-200 p-5">
            <PackageCheck className="text-[#079669]" size={30} />
            <div><p className="font-black">Importation transparente</p><p className="text-sm text-neutral-600">Les frais éventuels sont indiqués avant le paiement.</p></div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-[#079669]">
              Explorer
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Trouvez votre bonheur
            </h2>
          </div>

          <button className="hidden items-center gap-1 font-bold md:flex">
            Toutes les catégories
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.name}
              className="group rounded-3xl border border-neutral-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-[#16c784] hover:shadow-lg"
            >
              <span className="text-4xl">{category.emoji}</span>
              <p className="mt-5 font-black">{category.name}</p>
              <ChevronRight
                size={18}
                className="mt-2 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-[#079669]"
              />
            </button>
          ))}
        </div>
      </section>

      {/* LISTINGS */}
      <section id="annonces" className="bg-[#f6f7f6]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-bold uppercase tracking-[0.2em] text-[#079669]">
                Sélection
              </p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">
                Nos coups de cœur
              </h2>
            </div>

            <button className="hidden items-center gap-1 font-bold md:flex">
              Voir toutes les annonces
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map((listing) => (
              <article
                key={listing.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-black shadow">
                    {listing.badge}
                  </span>

                  <button
                    aria-label="Ajouter aux favoris"
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
                  >
                    <Heart size={20} />
                  </button>
                </div>

                <div className="p-5">
                  <p className="text-xl font-black">{listing.price}</p>
                  <h3 className="mt-1 font-bold">{listing.title}</h3>

                  <div className="mt-4 flex items-center gap-1.5 text-sm text-neutral-500">
                    <MapPin size={15} />
                    {listing.location}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-[#dffcef] px-2.5 py-1 text-[#067a55]">{listing.country}</span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-neutral-600">{listing.delivery}</span>
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">{listing.importFee}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid overflow-hidden rounded-[36px] bg-black text-white md:grid-cols-3">
          <div className="p-8 md:p-10">
            <ShieldCheck size={38} className="text-[#16c784]" />
            <h3 className="mt-5 text-xl font-black">Transactions sécurisées</h3>
            <p className="mt-3 leading-7 text-neutral-400">
              Des outils pensés pour acheter et vendre avec plus de sérénité.
            </p>
          </div>

          <div className="border-y border-neutral-800 p-8 md:border-x md:border-y-0 md:p-10">
            <PackageCheck size={38} className="text-[#16c784]" />
            <h3 className="mt-5 text-xl font-black">Livraison ou remise en main propre</h3>
            <p className="mt-3 leading-7 text-neutral-400">
              Le vendeur peut accepter la récupération sur place ou proposer
              un envoi.
            </p>
          </div>

          <div className="p-8 md:p-10">
            <Bell size={38} className="text-[#16c784]" />
            <h3 className="mt-5 text-xl font-black">Alertes personnalisées</h3>
            <p className="mt-3 leading-7 text-neutral-400">
              Recevez une notification lorsqu&apos;une annonce correspond à
              votre recherche.
            </p>
          </div>
        </div>
      </section>

      {/* APP */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-[40px] bg-[#16c784] px-7 py-10 md:grid-cols-2 md:px-14 md:py-14">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
              <Smartphone size={28} />
            </div>

            <h2 className="mt-6 max-w-lg text-4xl font-black leading-tight md:text-5xl">
              Dealora toujours avec vous.
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-black/70">
              Découvrez les bonnes affaires, échangez avec les vendeurs et
              suivez vos annonces où que vous soyez.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button className="rounded-2xl bg-black px-6 py-3.5 font-bold text-white">
                Télécharger l&apos;application
              </button>

              <button className="rounded-2xl border-2 border-black px-6 py-3.5 font-bold">
                En savoir plus
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-[260px] rotate-[5deg] rounded-[42px] border-[10px] border-black bg-white p-4 shadow-2xl">
              <div className="mx-auto mb-5 h-5 w-20 rounded-full bg-black" />

              <div className="rounded-3xl bg-[#dffcef] p-5">
                <p className="text-sm font-bold text-neutral-500">Bonjour 👋</p>
                <p className="mt-1 text-2xl font-black">Dealora</p>

                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Search size={18} />
                    <span className="text-sm text-neutral-500">
                      Rechercher...
                    </span>
                    <Camera size={18} className="ml-auto" />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4 text-center text-3xl">
                    👟
                  </div>
                  <div className="rounded-2xl bg-white p-4 text-center text-3xl">
                    📱
                  </div>
                  <div className="rounded-2xl bg-white p-4 text-center text-3xl">
                    🚗
                  </div>
                  <div className="rounded-2xl bg-white p-4 text-center text-3xl">
                    🏠
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECO */}
      <section className="border-y border-neutral-200">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-[auto_1fr_auto] md:px-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#dffcef]">
            <Leaf size={32} className="text-[#079669]" />
          </div>

          <div>
            <h2 className="text-2xl font-black">
              Acheter d&apos;occasion, c&apos;est aussi agir.
            </h2>
            <p className="mt-2 max-w-2xl leading-7 text-neutral-600">
              Donnez une seconde vie aux objets, favorisez le réemploi et
              échangez ce que vous n&apos;utilisez plus.
            </p>
          </div>

          <button className="flex items-center gap-2 font-black">
            Découvrir notre démarche
            <ChevronRight size={19} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#090909] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16c784] font-black text-black">
                  D
                </div>
                <span className="text-2xl font-black">dealora</span>
              </div>

              <p className="mt-5 max-w-xs leading-7 text-neutral-400">
                Achetez. Vendez. Troquez. Enchérissez.
                <br />
                Tout mérite une seconde chance.
              </p>
            </div>

            <div>
              <h3 className="font-black">Dealora</h3>
              <div className="mt-4 space-y-3 text-neutral-400">
                <p>À propos</p>
                <p>Comment ça marche</p>
                <p>Sécurité</p>
                <p>Application</p>
              </div>
            </div>

            <div>
              <h3 className="font-black">Acheter & vendre</h3>
              <div className="mt-4 space-y-3 text-neutral-400">
                <p>Déposer une annonce</p>
                <p>Vendre</p>
                <p>Troquer</p>
                <p>Enchères</p>
              </div>
            </div>

            <div>
              <h3 className="font-black">Aide</h3>
              <div className="mt-4 space-y-3 text-neutral-400">
                <p>Centre d&apos;aide</p>
                <p>Livraison</p>
                <p>Frais et importation</p>
                <p>Nous contacter</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-neutral-800 pt-7 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Dealora. Tous droits réservés.</p>

            <div className="flex gap-5">
              <span>Confidentialité</span>
              <span>Conditions</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}