const categories = ['Véhicules','Immobilier','Mode','High-tech','Maison','Loisirs','Collection','Services']
const listings = [
  {title:'Montre automatique',price:'245 €',tag:'Achat',emoji:'⌚'},
  {title:'Vélo électrique urbain',price:'1 190 €',tag:'Troc possible',emoji:'🚲'},
  {title:'Console nouvelle génération',price:'Enchère · 380 €',tag:'Enchère',emoji:'🎮'},
  {title:'Canapé design',price:'690 €',tag:'Achat',emoji:'🛋️'}
]

export default function Home(){
 return <main>
  <header className="nav"><a className="logo" href="/">Dealora<span>.</span></a><div className="search">⌕ <input placeholder="Que recherchez-vous ?"/></div><nav><a href="#explorer">Explorer</a><a href="#how">Comment ça marche</a><button className="ghost">Se connecter</button><button>+ Déposer une annonce</button></nav></header>
  <section className="hero"><div className="heroGlow"></div><p className="eyebrow">LA MARKETPLACE QUI VOUS DONNE LE CHOIX</p><h1>Tout peut trouver<br/><em>une nouvelle histoire.</em></h1><p className="lead">Achetez, vendez, troquez ou enchérissez. En main propre ou livré partout dans le monde.</p><div className="actions"><button>Découvrir les annonces →</button><button className="ghost">Vendre un objet</button></div><div className="trust"><span>✓ Paiements sécurisés</span><span>✓ Profils vérifiés</span><span>✓ Protection acheteur</span><span>✓ International</span></div></section>
  <section className="section" id="explorer"><div className="sectionHead"><div><p className="eyebrow">EXPLOREZ</p><h2>Tout ce que vous cherchez.</h2></div><a href="#all">Voir toutes les catégories →</a></div><div className="categories">{categories.map((x,i)=><button className="cat" key={x}><b>{['🚗','🏠','👟','💻','🪑','🎸','💎','🛠️'][i]}</b><span>{x}</span></button>)}</div>
  <div className="sectionHead"><h2>À découvrir maintenant</h2><div className="tabs"><button>Pour vous</button><button className="ghost">Près de vous</button><button className="ghost">Enchères</button></div></div><div className="grid">{listings.map(x=><article className="card" key={x.title}><div className="photo">{x.emoji}<span>♡</span></div><div className="cardbody"><small>{x.tag}</small><h3>{x.title}</h3><strong>{x.price}</strong><p>📍 France · Expédition disponible</p><div className="meta"><span>🧾 Facture : Oui</span><span>🛡️ Achat protégé</span></div></div></article>)}</div></section>
  <section className="how" id="how"><p className="eyebrow">UN OBJET, PLUSIEURS POSSIBILITÉS</p><h2>Vous décidez comment faire affaire.</h2><div className="modes"><article><b>01</b><h3>Acheter</h3><p>Payez en toute sécurité et choisissez livraison ou remise en main propre.</p></article><article><b>02</b><h3>Vendre</h3><p>Publiez rapidement, précisez l'état, la facture et vos options de remise.</p></article><article><b>03</b><h3>Troquer</h3><p>Proposez un échange et négociez directement avec l'autre membre.</p></article><article><b>04</b><h3>Enchérir</h3><p>Suivez les enchères en temps réel et recevez vos alertes personnalisées.</p></article></div></section>
  <section className="world"><div><p className="eyebrow">SANS FRONTIÈRES</p><h2>Du quartier au monde entier.</h2><p>Dealora prévoit les options de livraison, les frais d'envoi et l'estimation des frais d'importation pour rendre les transactions internationales plus claires.</p></div><div className="orb">DEALORA<br/><small>GLOBAL</small></div></section>
  <footer><a className="logo">Dealora<span>.</span></a><p>Achetez. Vendez. Troquez. Enchérissez.</p><small>© 2026 Dealora. Tous droits réservés.</small></footer>
 </main>
}
