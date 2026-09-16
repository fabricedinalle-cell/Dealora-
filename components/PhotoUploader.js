'use client'
import {useState} from 'react'
import {createClient} from '../lib/supabase/client'

export default function PhotoUploader({onUploaded}){
 const [busy,setBusy]=useState(false)
 const [error,setError]=useState('')
 async function upload(e){
  const files=[...e.target.files].slice(0,8)
  if(!files.length)return
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
 return <div className="uploader"><label className="uploadBox">📷 <b>{busy?'Envoi des photos…':'Ajouter jusqu’à 8 photos'}</b><span>JPG, PNG ou WebP · 10 Mo max/photo</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} disabled={busy}/></label>{error&&<small>{error}</small>}</div>
}
