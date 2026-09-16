'use client'
import Link from 'next/link'
import {useState} from 'react'
import {createClient} from '../../lib/supabase/client'

export default function Login(){
 const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [mode,setMode]=useState('login');const [status,setStatus]=useState('')
 async function submit(e){e.preventDefault();setStatus('Connexion…');const supabase=createClient();const action=mode==='signup'?supabase.auth.signUp({email,password}):supabase.auth.signInWithPassword({email,password});const {error}=await action;if(error){setStatus(error.message);return}setStatus(mode==='signup'?'Compte créé. Vérifiez votre e-mail si demandé.':'Connecté. Redirection…');if(mode==='login')window.location.href='/compte'}
 return <main className="formPage"><header className="simpleNav"><Link className="logo" href="/">Dealora<span>.</span></Link><Link href="/">Retour</Link></header><form className="listingForm authForm" onSubmit={submit}><p className="eyebrow">BIENVENUE SUR DEALORA</p><h1>{mode==='login'?'Se connecter':'Créer un compte'}</h1><p className="formIntro">Un compte pour acheter, vendre, troquer, enchérir et discuter en sécurité.</p><label>E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/></label><label>Mot de passe<input type="password" minLength="8" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete={mode==='login'?'current-password':'new-password'}/></label><button className="submit" type="submit">{mode==='login'?'Se connecter':'Créer mon compte'}</button>{status&&<p className="formStatus">{status}</p>}<button type="button" className="switchAuth" onClick={()=>{setMode(mode==='login'?'signup':'login');setStatus('')}}>{mode==='login'?'Pas encore de compte ? Créer un compte':'Déjà inscrit ? Se connecter'}</button></form></main>
}
