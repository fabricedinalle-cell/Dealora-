'use client'
import { useState } from 'react'
import { categories, validateListing } from '../../lib/marketplace'

const initial = { title:'', category:'', mode:'buy', price:'', description:'', condition:'', hasInvoice:null, delivery:['pickup'], international:false }

export default function SellPage(){
 const [form,setForm]=useState(initial); const [errors,setErrors]=useState({}); const [sent,setSent]=useState(false)
 const set=(key,value)=>setForm(v=>({...v,[key]:value}))
 const toggleDelivery=value=>set('delivery',form.delivery.includes(value)?form.delivery.filter(x=>x!==value):[...form.delivery,value])
 function submit(e){e.preventDefault();const next=validateListing(form);setErrors(next);if(!Object.keys(next).length)setSent(true)}
 if(sent)return <main className="formPage"><section className="success"><b>✓</b><h1>Annonce prête.</h1><p>Le formulaire fonctionne. La prochaine étape connectera sa publication au compte utilisateur et à la base de données.</p><a className="primaryLink" href="/">Retour à Dealora</a></section></main>
 return <main className="formPage"><header className="simpleNav"><a className="logo" href="/">Dealora<span>.</span></a><a href="/">← Retour</a></header><form className="listingForm" onSubmit={submit}><p className="eyebrow">VENDRE SUR DEALORA</p><h1>Déposez votre annonce.</h1><p className="formIntro">Décrivez votre bien et choisissez comment vous souhaitez conclure l'affaire.</p>
 <label>Titre<input value={form.title} onChange={e=>set('title',e.target.value)} placeholder="Ex. iPhone 16 Pro 256 Go"/>{errors.title&&<small>{errors.title}</small>}</label>
 <div className="two"><label>Catégorie<select value={form.category} onChange={e=>set('category',e.target.value)}><option value="">Sélectionner</option>{categories.map(x=><option key={x}>{x}</option>)}</select>{errors.category&&<small>{errors.category}</small>}</label><label>État<select value={form.condition} onChange={e=>set('condition',e.target.value)}><option value="">Sélectionner</option><option>Neuf</option><option>Comme neuf</option><option>Très bon état</option><option>Bon état</option><option>À rénover / réparer</option></select>{errors.condition&&<small>{errors.condition}</small>}</label></div>
 <fieldset><legend>Mode de transaction</legend><div className="choiceRow">{[['buy','Vente'],['swap','Troc'],['auction','Enchère']].map(([v,l])=><button type="button" className={form.mode===v?'selected':'choice'} onClick={()=>set('mode',v)} key={v}>{l}</button>)}</div></fieldset>
 {form.mode!=='swap'&&<label>{form.mode==='auction'?'Prix de départ':'Prix'}<div className="money"><input type="number" min="0" value={form.price} onChange={e=>set('price',e.target.value)} placeholder="0"/><span>€</span></div>{errors.price&&<small>{errors.price}</small>}</label>}
 <label>Description<textarea rows="7" value={form.description} onChange={e=>set('description',e.target.value)} placeholder="Décrivez précisément le bien, son état et ce qui est inclus..."/>{errors.description&&<small>{errors.description}</small>}</label>
 <fieldset><legend>Avez-vous la facture ?</legend><div className="choiceRow"><button type="button" className={form.hasInvoice===true?'selected':'choice'} onClick={()=>set('hasInvoice',true)}>Oui</button><button type="button" className={form.hasInvoice===false?'selected':'choice'} onClick={()=>set('hasInvoice',false)}>Non</button></div>{errors.hasInvoice&&<small>{errors.hasInvoice}</small>}</fieldset>
 <fieldset><legend>Remise du bien</legend><div className="checks"><label><input type="checkbox" checked={form.delivery.includes('pickup')} onChange={()=>toggleDelivery('pickup')}/> Remise en main propre</label><label><input type="checkbox" checked={form.delivery.includes('shipping')} onChange={()=>toggleDelivery('shipping')}/> Expédition</label><label><input type="checkbox" checked={form.international} onChange={e=>set('international',e.target.checked)}/> Expédition internationale</label></div>{errors.delivery&&<small>{errors.delivery}</small>}</fieldset>
 <button className="submit" type="submit">Continuer →</button></form></main>
}
