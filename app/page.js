'use client'

import { useRef, useState } from 'react'
import {
  Camera,
  Search,
  Heart,
  User,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Gavel,
  Repeat2,
  ShoppingBag,
  Plus
} from 'lucide-react'

export default function Home() {
  const [mode, setMode] = useState('Acheter')
  const [query, setQuery] = useState('')
  const photoInput = useRef(null)

  const categories = [
    { name: 'Véhicules', emoji: '🚗' },
    { name: 'Immobilier', emoji: '🏠' },
    { name: 'Mode', emoji: '👟' },
    { name: 'High-tech', emoji: '📱' },
    { name: 'Maison', emoji: '🛋️' },
    { name: 'Loisirs', emoji: '🎮' }
  ]

  const listings = [
    {
      id: 1,
      title: 'iPhone 16 Pro',
      price: '899 €',
      location: 'Paris',
      image:
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      title: 'Sneakers premium',
      price: '120 €',
      location: 'Lyon',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 3,
      title: 'Console gaming',
      price: '390 €',
      location: 'Bordeaux',
      image:
        'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 4,
      title: 'Montre automatique',
      price: '280 €',
      location: 'Marseille',
      image:
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80'
    }
  ]

  function openPhotoSearch() {
    photoInput.current?.click()
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0]

    if (file) {
      alert(
        'Photo sélectionnée. La recherche visuelle Dealora pourra maintenant analyser cette image.'
      )
    }
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f7f8f7;
          color: #111;
          font-family: Arial, Helvetica, sans-serif;
        }

        button,
        input {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .dealora {
          min-height: 100vh;
          background:
            radial-gradient(circle at 85% 3%, rgba(20,184,102,.12), transparent 24%),
            #f7f8f7;
        }

        .header {
          background: rgba(255,255,255,.96);
          border-bottom: 1px solid #e9ecea;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .headerInner {
          max-width: 1200px;
          margin: auto;
          height: 74px;
          padding: 0 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .logo {
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -1.8px;
        }

        .logo span {
          color: #14b866;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .login {
          display: flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          border: 0;
          font-weight: 700;
          color: #151515;
          padding: 10px;
        }

        .sell {
          border: 0;
          border-radius: 13px;
          padding: 12px 17px;
          background: #111;
          color: white;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .hero {
          max-width: 1200px;
          margin: auto;
          padding: 62px 22px 28px;
          text-align: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 13px;
          border-radius: 999px;
          background: #e8f9f0;
          color: #087943;
          font-size: 13px;
          font-weight: 800;
        }

        h1 {
          max-width: 850px;
          margin: 18px auto 12px;
          font-size: clamp(38px, 7vw, 68px);
          line-height: .98;
          letter-spacing: -3px;
        }

        .green {
          color: #14b866;
        }

        .subtitle {
          max-width: 690px;
          margin: 0 auto;
          color: #626762;
          font-size: 17px;
          line-height: 1.55;
        }

        .modeTabs {
          display: inline-flex;
          background: #ecefed;
          padding: 5px;
          border-radius: 14px;
          margin-top: 28px;
        }

        .modeTab {
          border: 0;
          background: transparent;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 800;
          color: #606560;
        }

        .modeTab.active {
          background: #111;
          color: white;
          box-shadow: 0 4px 12px rgba(0,0,0,.12);
        }

        .searchBox {
          max-width: 800px;
          margin: 17px auto 0;
          background: white;
          border: 1px solid #e0e4e1;
          box-shadow: 0 14px 40px rgba(0,0,0,.08);
          padding: 7px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .searchIcon {
          margin-left: 10px;
          color: #777;
          flex: 0 0 auto;
        }

        .searchBox input[type="text"] {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: none;
          padding: 14px 4px;
          font-size: 16px;
          background: transparent;
        }

        .cameraBtn {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid #dfe4e0;
          background: #f5f7f5;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
        }

        .cameraBtn:hover {
          background: #e8f9f0;
          color: #0b9d57;
        }

        .searchBtn {
          border: 0;
          background: #14b866;
          color: white;
          border-radius: 14px;
          height: 48px;
          padding: 0 20px;
          font-weight: 900;
        }

        .photoHelp {
          margin-top: 12px;
          font-size: 13px;
          color: #777;
        }

        .categories {
          max-width: 1100px;
          margin: 25px auto 0;
          padding: 0 22px;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }

        .category {
          background: white;
          border: 1px solid #e6e9e7;
          border-radius: 18px;
          padding: 18px 8px;
          text-align: center;
          font-weight: 800;
        }

        .categoryEmoji {
          display: block;
          font-size: 28px;
          margin-bottom: 8px;
        }

        .section {
          max-width: 1200px;
          margin: 45px auto 0;
          padding: 0 22px 60px;
        }

        .sectionHead {
          display: flex;
          justify-content: space-between;
          align-items: end;
          margin-bottom: 18px;
        }

        .sectionHead h2 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -1px;
        }

        .seeAll {
          border: 0;
          background: transparent;
          color: #0b9956;
          font-weight: 800;
          display: flex;
          align-items: center;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .card {
          background: white;
          border: 1px solid #e6e9e7;
          border-radius: 20px;
          overflow: hidden;
        }

        .imageWrap {
          position: relative;
          aspect-ratio: 1 / .82;
          background: #eee;
        }

        .imageWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .heart {
          position: absolute;
          right: 11px;
          top: 11px;
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: rgba(255,255,255,.93);
        }

        .cardBody {
          padding: 14px;
        }

        .cardTitle {
          font-weight: 800;
          margin-bottom: 6px;
        }

        .price {
          font-size: 21px;
          font-weight: 900;
        }

        .location {
          color: #747874;
          font-size: 13px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .features {
          max-width: 1156px;
          margin: 0 auto 60px;
          background: #101211;
          color: white;
          border-radius: 28px;
          padding: 32px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .feature {
          padding: 10px;
        }

        .featureIcon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: #14b866;
          margin-bottom: 15px;
        }

        .feature h3 {
          margin: 0 0 8px;
        }

        .feature p {
          margin: 0;
          color: #b8bdb9;
          line-height: 1.5;
          font-size: 14px;
        }

        @media (max-width: 800px) {
          .headerInner {
            height: 64px;
            padding: 0 15px;
          }

          .logo {
            font-size: 26px;
          }

          .login span {
            display: none;
          }

          .sell {
            padding: 10px 12px;
          }

          .sell span {
            display: none;
          }

          .hero {
            padding: 42px 15px 20px;
          }

          h1 {
            font-size: 43px;
            letter-spacing: -2px;
          }

          .subtitle {
            font-size: 15px;
          }

          .modeTabs {
            width: 100%;
          }

          .modeTab {
            flex: 1;
            padding: 10px 5px;
          }

          .searchBox {
            border-radius: 17px;
          }

          .searchBtn {
            display: none;
          }

          .categories {
            padding: 0 15px;
            grid-template-columns: repeat(3, 1fr);
            gap: 9px;
          }

          .category {
            font-size: 12px;
            padding: 14px 5px;
          }

          .section {
            padding: 0 15px 40px;
          }

          .cards {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .cardBody {
            padding: 11px;
          }

          .cardTitle {
            font-size: 14px;
          }

          .price {
            font-size: 18px;
          }

          .features {
            margin: 0 15px 40px;
            padding: 23px;
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="dealora">
        <header className="header">
          <div className="headerInner">
            <div className="logo">
              Deal<span>ora</span>
            </div>

            <div className="nav">
              <button className="login">
                <User size={20} />
                <span>Se connecter</span>
              </button>

              <button className="sell">
                <Plus size={19} />
                <span>Déposer une annonce</span>
              </button>
            </div>
          </div>
        </header>

        <section className="hero">
          <div className="badge">
            <ShieldCheck size={16} />
            La marketplace nouvelle génération
          </div>

          <h1>
            Tout peut trouver
            <br />
            une <span className="green">nouvelle vie.</span>
          </h1>

          <p className="subtitle">
            Achetez, vendez, troquez ou enchérissez simplement.
            Trouvez ce que vous cherchez, près de chez vous ou partout dans le monde.
          </p>

          <div className="modeTabs">
            {['Acheter', 'Troquer', 'Enchérir'].map(item => (
              <button
                key={item}
                className={`modeTab ${mode === item ? 'active' : ''}`}
                onClick={() => setMode(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="searchBox">
            <Search className="searchIcon" size={22} />

            <input
              type="text"
              placeholder="Que recherchez-vous ?"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />

            <button
              className="cameraBtn"
              onClick={openPhotoSearch}
              aria-label="Rechercher avec une photo"
            >
              <Camera size={23} />
            </button>

            <button className="searchBtn">
              Rechercher
            </button>

            <input
              ref={photoInput}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhoto}
              style={{ display: 'none' }}
            />
          </div>

          <div className="photoHelp">
            📷 Appuyez sur l’appareil photo pour prendre ou importer une photo.
          </div>
        </section>

        <section className="categories">
          {categories.map(category => (
            <div className="category" key={category.name}>
              <span className="categoryEmoji">{category.emoji}</span>
              {category.name}
            </div>
          ))}
        </section>

        <section className="section">
          <div className="sectionHead">
            <h2>À découvrir</h2>

            <button className="seeAll">
              Voir tout <ChevronRight size={18} />
            </button>
          </div>

          <div className="cards">
            {listings.map(item => (
              <article className="card" key={item.id}>
                <div className="imageWrap">
                  <img src={item.image} alt={item.title} />

                  <button className="heart">
                    <Heart size={20} />
                  </button>
                </div>

                <div className="cardBody">
                  <div className="cardTitle">{item.title}</div>
                  <div className="price">{item.price}</div>

                  <div className="location">
                    <MapPin size={14} />
                    {item.location}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <div className="featureIcon">
              <ShoppingBag size={24} />
            </div>
            <h3>Achetez simplement</h3>
            <p>
              Découvrez des annonces partout et trouvez rapidement
              les objets qui vous correspondent.
            </p>
          </div>

          <div className="feature">
            <div className="featureIcon">
              <Repeat2 size={24} />
            </div>
            <h3>Troquez vos objets</h3>
            <p>
              Proposez un échange et donnez une nouvelle vie aux objets
              que vous n’utilisez plus.
            </p>
          </div>

          <div className="feature">
            <div className="featureIcon">
              <Gavel size={24} />
            </div>
            <h3>Enchérissez</h3>
            <p>
              Participez aux enchères et tentez d’obtenir les meilleures
              opportunités sur Dealora.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}