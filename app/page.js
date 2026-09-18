'use client'
import {useRef,useState} from 'react'
import {Search,Menu,MapPin,ShoppingCart,RefreshCw,Gavel,Leaf,Users,ShieldCheck,Heart,Home,MessageCircle,User,Plus,Camera} from 'lucide-react'

const categories=[
 ['Maison & Déco','Des milliers d’annonces','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=85'],
 ['High-Tech','Smartphones, PC, etc.','https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=85'],
 ['Mode & Accessoires','Vêtements, sneakers...','https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=85'],
 ['Véhicules','Voitures, motos...','https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=500&q=85']
]
const ads=[
 ['Canapé 3 places','250 €','Paris (75)','Il y a 2h','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=85'],
 ['iPhone 13 – 128 Go','320 €','Lyon (69)','Il y a 4h','https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=85'],
 ['Yamaha MT-07','5 800 €','Marseille (13)','Il y a 6h','https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=85'],
 ['Table à manger','120 €','Bordeaux (33)','Il y a 8h','https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=600&q=85']
]
export default function Home(){
 const [tab,setTab]=useState('Acheter'); const file=useRef(null)
 return <main className="dealora">
  <header className="top"><div className="brand"><span className="logo">D</span><div><b>dealora</b><small>Achetez. Vendez. Vivez mieux.</small></div></div><div className="headActions"><Search/><Menu/></div></header>
  <section className="hero">
   <div className="heroCopy"><div className="pill"><i/>Acheter autrement</div><h1>Tout peut avoir<br/><em>une seconde vie.</em></h1><p>Achetez, vendez, troquez ou enchérissez sur des milliers d'objets et de biens. Simplement, partout.</p></div>
   <div className="ecoNote">Moins de gaspillage<br/>Plus d’opportunités<br/>Une planète plus verte <span>→</span></div><div className="globe">🌍<span>🌿</span></div>
   <div className="searchbar"><Search/><input placeholder="Que recherchez-vous ?"/><input ref={file} type="file" accept="image/*" hidden/><button onClick={()=>file.current?.click()} aria-label="Recherche par photo"><Camera/></button></div>
   <div className="tabs">{[[ShoppingCart,'Acheter'],[RefreshCw,'Troquer'],[Gavel,'Enchérir']].map(([I,n])=><button key={n} onClick={()=>setTab(n)} className={tab===n?'active':''}><I/>{n}</button>)}</div>
   <div className="location"><span><MapPin/>France · Europe · International</span><button><MapPin/>Autour de moi</button></div>
   <div className="benefits">{[[Leaf,'Économisez','Des prix plus justes'],[RefreshCw,'Donnez une seconde vie',''],[Users,'Une communauté de confiance',''],[ShieldCheck,'Des transactions plus sûres','']].map(([I,a,b])=><div key={a}><span><I/></span><b>{a}</b>{b&&<small>{b}</small>}</div>)}</div>
  </section>
  <section className="content">
   <div className="sectionTitle"><h2>Parcourir nos catégories</h2><button>Voir toutes →</button></div>
   <div className="categories">{categories.map(([n,s,img])=><article key={n}><img src={img} alt={n}/><b>{n}</b><small>{s}</small></article>)}</div>
   <div className="sectionTitle recent"><h2>Annonces récentes</h2><button>Voir toutes →</button></div>
   <div className="ads">{ads.map(([n,p,l,t,img])=><article key={n}><div className="pic"><img src={img} alt={n}/><button><Heart/></button></div><div className="adText"><b>{n}</b><strong>{p}</strong><div><span><MapPin/>{l}</span><small>{t}</small></div></div></article>)}</div>
  </section>
  <nav className="bottom">{[[Home,'Accueil'],[Search,'Rechercher'],[Plus,'Déposer'],[MessageCircle,'Messages'],[User,'Mon compte']].map(([I,n],i)=><button key={n} className={i===0?'on':i===2?'deposit':''}><span><I/></span>{n}</button>)}</nav>
 </main>
}