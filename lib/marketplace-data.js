import {createClient} from './supabase/client'

export async function publishListing(form,photos=[]){
 const supabase=createClient()
 const {data:{user}}=await supabase.auth.getUser()
 if(!user)throw new Error('LOGIN_REQUIRED')
 const row={seller_id:user.id,title:form.title.trim(),category:form.category,transaction_mode:form.mode,price:form.mode==='swap'?null:Number(form.price),description:form.description.trim(),condition:form.condition,has_invoice:form.hasInvoice,pickup:form.delivery.includes('pickup'),shipping:form.delivery.includes('shipping'),international:form.international,status:'active'}
 const {data,error}=await supabase.from('listings').insert(row).select('id').single()
 if(error)throw error
 if(form.contactPhone?.trim()){
  const {error:contactError}=await supabase.from('listing_contacts').insert({listing_id:data.id,seller_id:user.id,phone:form.contactPhone.trim(),show_phone:Boolean(form.showContactPhone)})
  if(contactError)throw contactError
 }
 if(photos.length){
  const imageRows=photos.map((photo,index)=>({listing_id:data.id,storage_path:photo.path,public_url:photo.url,position:index}))
  const {error:imageError}=await supabase.from('listing_photos').insert(imageRows)
  if(imageError)throw imageError
 }
 return data.id
}

export async function loadListings({mode,category,query}={}){const supabase=createClient();let request=supabase.from('listings').select('*,listing_photos(public_url,position),profiles!listings_seller_id_fkey(display_name,rating,verified)').eq('status','active').order('created_at',{ascending:false});if(mode)request=request.eq('transaction_mode',mode);if(category)request=request.eq('category',category);if(query)request=request.ilike('title',`%${query}%`);const {data,error}=await request;if(error)throw error;return data||[]}

export async function toggleFavorite(listingId){const supabase=createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error('LOGIN_REQUIRED');const {data:existing}=await supabase.from('favorites').select('listing_id').eq('user_id',user.id).eq('listing_id',listingId).maybeSingle();if(existing){const {error}=await supabase.from('favorites').delete().eq('user_id',user.id).eq('listing_id',listingId);if(error)throw error;return false}const {error}=await supabase.from('favorites').insert({user_id:user.id,listing_id:listingId});if(error)throw error;return true}
