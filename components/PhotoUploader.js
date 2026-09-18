'use client'
import {useRef,useState} from 'react'
import {createClient} from '../lib/supabase/client'

export default function PhotoUploader({onUploaded}){
 const [busy,setBusy]=useState(false)
 const [error,setError]=useState('')
 const [previews,setPreviews]=useState([])
 const cameraInput=useRef(null),galleryInput=useRef(null)
 async function upload(e){
  const files=[...e.target.files].slice(0,8)
  if(!files.length)return
  setPreviews(files.map(file=>({name:file.name,url:URL.createObjectURL(file)})))
  setBusy(true);setError('')
  try{
   const supabase=createClient()
   const {data:{user},error:userError}=await supabase.auth.getUser()
   if(userError||!user){setError('Connectez-vous pour ajouter des photos.');return}
   const urls=[]
   for(const file of files){
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){setError('Photos JPG, PNG ou WebP, 10 Mo maximum.');continue}
    const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'-')
    const path=`${user.id}/${crypto.randomUUID()}-${safe}`
    const {error:upErr}=await supabase.storage.from('listing-images').upload(path,file,{upsert:false})
    if(upErr){setError('Impossible d’envoyer une photo.');continue}
    const {data}=supabase.storage.from('listing-images').getPublicUrl(path)
    urls.push({path,url:data.publicUrl})
   }
   onUploaded?.(urls)
  }catch{setError('Service photo momentanément indisponible.')}
  finally{setBusy(false);e.target.value=''}
 }
 return <div className="uploader">
  <div className="uploadBox">
   <b>{busy?'Envoi des photos…':'Ajoutez jusqu’à 8 photos'}</b>
   <span>JPG, PNG ou WebP · 10 Mo max/photo</span>
   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,width:'100%',marginTop:12}}>
    <button type="button" className="choice" disabled={busy} onClick={()=>cameraInput.current?.click()}>📷 Prendre une photo</button>
    <button type="button" className="choice" disabled={busy} onClick={()=>galleryInput.current?.click()}>🖼️ Choisir dans la galerie</button>
   </div>
   <input ref={cameraInput} type="file" accept="image/*" capture="environment" onChange={upload} disabled={busy} style={{display:'none'}}/>
   <input ref={galleryInput} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} disabled={busy} style={{display:'none'}}/>
   {previews.length>0&&<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,width:'100%',marginTop:14}}>{previews.map((p,i)=><img key={i} src={p.url} alt="" style={{width:'100%',aspectRatio:'1',objectFit:'cover',borderRadius:10}}/>)}</div>}
  </div>
  {error&&<small>{error}</small>}
 </div>
}
