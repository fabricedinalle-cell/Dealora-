'use client'
import {useRef,useState} from 'react'
import {Camera,Search,Heart,User,MapPin,ChevronDown,ShieldCheck,Star,Headphones,Menu,Plus,Bell,Leaf,Home,MessageCircle} from 'lucide-react'

const cats=[
['Véhicules','https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=300&q=80'],
['High-tech','https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=300&q=80'],
['Maison & Déco','https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80'],
['Mode','https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80'],
['Jeux & Loisirs','https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=300&q=80'],
['Bricolage','https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=300&q=80']]
const ads=[
['22 900 €','BMW Série 3','2020 · 87 000 km','Toulouse','Achat','https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=85'],
['280 €','Vélo électrique','Très bon état','Bordeaux','Troc','https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&q=85'],
['650 €','Samsung S24','256 Go · Neuf','Paris','Achat','https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=85'],
['350 €','Canapé 3 places','Très bon état','Marseille','Achat','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=85']]
export default function Home(){
 const [tab,setTab]=useState('Acheter'); const file=useRef(null)
 return <main className="min-h-screen bg-white text-[#111] pb-20 md:pb-0">
  <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
   <div className="flex items-center gap-2"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#087a42] text-xl text-[#d9ff6b]">✦</div><b className="text-2xl tracking-tight">dealora</b></div>
   <div className="flex gap-2"><button className="grid h-11 w-11 place-items-center rounded-full bg-[#f5f7f6]"><User size={22}/></button><button className="grid h-11 w-11 place-items-center rounded-full bg-[#f5f7f6]"><Menu size={23}/></button></div>
  </header>
  <section className="mx-auto max-w-7xl px-4 md:px-8">
   <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-[#f5fff9] to-[#e5f8ec] px-1 pb-5 md:grid md:grid-cols-2 md:items-center md:px-8">
    <div className="relative z-10 pt-2 md:py-12">
     <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase"><span className="h-2 w-2 rounded-full bg-[#10a85b]"/>La nouvelle façon de faire de bonnes affaires</div>
     <h1 className="text-[39px] font-black leading-[.98] tracking-[-.045em] sm:text-5xl">Achetez. Vendez.<br/><span className="text-[#078a49]">Échangez autrement.</span></h1>
     <p className="mt-4 max-w-md text-[15px] leading-6 text-neutral-600">Des millions d’objets à découvrir, à acheter, troquer ou remporter aux enchères.<br/>En toute confiance, partout dans le monde.</p>
    </div>
    <div className="relative mt-4 h-[235px] md:h-[360px]">
      <div className="absolute right-0 top-0 h-full w-[92%] rounded-[32px] bg-[#e8f7ed]"/>
      <img className="absolute bottom-2 right-[2%] h-[72%] w-[45%] rotate-[-6deg] rounded-[28px] object-cover shadow-xl" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85" alt="Sneakers"/>
      <img className="absolute right-[35%] top-[5%] h-[58%] w-[32%] rotate-[7deg] rounded-[28px] object-cover shadow-xl" src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=85" alt="Smartphone"/>
      <img className="absolute bottom-[8%] left-[4%] h-[48%] w-[35%] rotate-[-4deg] rounded-[28px] object-cover shadow-xl" src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=85" alt="Sac vert"/>
      <div className="absolute bottom-3 left-[36%] rounded-2xl bg-white/90 px-3 py-2 text-sm font-black italic shadow">Tout se trouve sur<br/><span className="text-[#078a49]">Dealora ♡</span></div>
    </div>
   </div>
   <div className="relative z-20 -mt-2 rounded-[24px] border border-neutral-200 bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,.08)] md:-mt-10 md:p-5">
    <div className="grid grid-cols-3 border-b border-neutral-200">{['Acheter','Troquer','Enchères'].map(x=><button onClick={()=>setTab(x)} key={x} className={`border-b-2 px-2 py-3 text-sm font-bold ${tab===x?'border-[#078a49] text-[#078a49]':'border-transparent text-neutral-600'}`}>{x}</button>)}</div>
    <div className="mt-3 flex gap-2"><div className="flex min-w-0 flex-1 items-center rounded-xl bg-[#f7f8f7] px-3"><Search size={20}/><input className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm outline-none" placeholder="Que recherchez-vous ?"/></div><input ref={file} type="file" accept="image/*" className="hidden"/><button onClick={()=>file.current?.click()} className="grid w-14 place-items-center rounded-xl bg-[#e8f8ef] text-[#078a49]"><Camera/></button></div>
    <div className="mt-2 grid grid-cols-[1fr_135px] gap-2"><button className="flex items-center gap-2 rounded-xl bg-[#f7f8f7] px-4 py-4 text-left text-sm"><MapPin className="text-[#078a49]" size={20}/>Partout en France<ChevronDown className="ml-auto" size={18}/></button><button className="rounded-xl bg-[#101315] font-bold text-white">Rechercher</button></div>
    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] md:text-sm"><span className="flex items-center justify-center gap-1"><ShieldCheck className="text-[#078a49]" size={17}/>Paiement protégé</span><span className="flex items-center justify-center gap-1"><Star className="text-[#078a49]" size={17}/>Vendeurs évalués</span><span className="flex items-center justify-center gap-1"><Headphones className="text-[#078a49]" size={17}/>Assistance 7j/7</span></div>
   </div>
   <div className="mt-3 grid grid-cols-3 gap-2">{[[Camera,'Prenez une photo','On cherche pour vous'],[Plus,'Vendez en 2 min','Simple et rapide'],[Bell,'Recevez des alertes','Sur vos recherches']].map(([I,a,b])=><button key={a} className="rounded-xl bg-gradient-to-br from-[#064d30] to-[#078a49] px-2 py-4 text-white"><I className="mx-auto mb-2 text-[#d9ff6b]" size={23}/><b className="block text-xs md:text-base">{a}</b><span className="text-[10px] text-white/80 md:text-sm">{b}</span></button>)}</div>
   <div className="mt-7 flex items-center justify-between"><h2 className="text-xl font-black">Catégories populaires</h2><button className="text-xs font-bold text-[#078a49]">Voir toutes →</button></div>
   <div className="mt-3 flex gap-3 overflow-x-auto pb-2">{cats.map(([n,img])=><button key={n} className="w-[92px] shrink-0 text-center"><img src={img} alt={n} className="h-[76px] w-full rounded-xl bg-[#f5f5f5] object-cover"/><span className="mt-2 block text-[11px] font-semibold leading-tight">{n}</span></button>)}</div>
   <div className="mt-7 flex items-center justify-between"><h2 className="text-xl font-black">Annonces récentes</h2><button className="text-xs font-bold text-[#078a49]">Voir toutes →</button></div>
   <div className="mt-3 flex gap-2 overflow-x-auto pb-3">{['Tout','Près de chez vous','Bonnes affaires','Enchères'].map((x,i)=><button key={x} className={`shrink-0 rounded-full px-4 py-2 text-xs ${i===0?'bg-[#078a49] text-white':'bg-[#f4f5f4]'}`}>{x}</button>)}</div>
   <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{ads.map(([p,n,d,l,b,img])=><article key={n} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"><div className="relative"><img src={img} alt={n} className="h-32 w-full object-cover md:h-44"/><button className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90"><Heart size={18}/></button></div><div className="p-3"><b className="text-lg text-[#078a49]">{p}</b><h3 className="text-sm font-bold">{n}</h3><p className="mt-1 text-[11px] text-neutral-500">{d}</p><div className="mt-3 flex items-center justify-between text-[10px]"><span className="flex items-center gap-1"><MapPin size={12}/>{l}</span><span className={`rounded-md px-2 py-1 font-bold ${b==='Troc'?'bg-yellow-200':'bg-emerald-100 text-emerald-800'}`}>{b}</span></div></div></article>)}</div>
   <div className="my-6 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-[#07572f] to-[#087b43] p-4 text-white"><Leaf className="shrink-0 text-[#d9ff6b]" size={38}/><div className="flex-1"><b className="text-lg">Donnez une seconde vie aux objets</b><p className="text-xs text-white/80">Ensemble pour une consommation plus responsable.</p></div><button className="hidden rounded-xl bg-white px-4 py-3 text-xs font-bold text-black sm:block">Rejoindre Dealora →</button></div>
   <div className="mb-5 grid grid-cols-3 text-center text-xs text-neutral-600"><span>♻ Économique</span><span>🌍 Écologique</span><span>♡ Solidaire</span></div>
  </section>
  <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t bg-white px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 md:hidden">{[[Home,'Accueil'],[Search,'Rechercher'],[Plus,'Déposer'],[Heart,'Favoris'],[MessageCircle,'Messages']].map(([I,n],i)=><button key={n} className={`flex flex-col items-center gap-1 text-[10px] ${i===0?'text-[#078a49]':'text-neutral-700'}`}><span className={i===2?'grid h-10 w-10 place-items-center rounded-full bg-[#078a49] text-white':''}><I size={21}/></span>{n}</button>)}</nav>
 </main>
}