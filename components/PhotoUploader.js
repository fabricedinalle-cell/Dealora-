'use client'
import {useState} from 'react'
import {createClient} from '../lib/supabase/client'

export default function PhotoUploader({userId,onUploaded}){
 const [busy,setBusy]=useState(false);const [error,setError]=useState('')
 async function upload(e){const files=[...e.target.files].slice(0,8);if(!files.length)return;setBusy(true);setError('');const supabase=createClient();const urls=[];for(const file of files){if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){setError('Photos JPG, PNG ou WebP, 10 Mo maximum.');continue}const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'-');const path=`${userId}/${crypto.randomUUID()}-${safe}`;const {error:upErr}=await supabase.storage.from('listing-images').upload(path,file,{upsert:false});if(upErr){setError(upErr.message);continue}const {data}=supabase.storage.from('listing-images').getPublicUrl(path);urls.push({path,url:data.publicUrl})}setBusy(false);onUploaded?.(urls)}
 return <div className="uploader"><label className="uploadBox">📷 <b>{busy?'Envoi des photos…':'Ajouter jusqu’à 8 photos'}</b><span>JPG, PNG ou WebP · 10 Mo max/photo</span><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} disabled={busy}/></label>{error&&<small>{error}</small>}</div>
}
