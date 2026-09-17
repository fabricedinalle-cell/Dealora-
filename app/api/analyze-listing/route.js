import {NextResponse} from 'next/server'

const allowedCategories=['Mode','Véhicules','Maison','Électronique','Loisirs','Immobilier','Services','Autres']

export async function POST(request){
 try{
  if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:'AI_NOT_CONFIGURED'},{status:503})
  const {images=[]}=await request.json()
  const safeImages=images.filter(url=>typeof url==='string'&&/^https:\/\//.test(url)).slice(0,4)
  if(!safeImages.length)return NextResponse.json({error:'NO_IMAGE'},{status:400})
  const prompt=`Tu aides à créer une annonce sur Dealora. Analyse uniquement ce qui est réellement visible. N'invente jamais marque, modèle, année, kilométrage, taille, pointure ou état. Retourne UNIQUEMENT un JSON valide: {"category":"","objectType":"","title":"","condition":"","color":"","brand":"","model":"","descriptionOptions":["","",""],"fields":[{"key":"","label":"","value":"","placeholder":""}]}. category doit être l'une de: ${allowedCategories.join(', ')}. Pour les informations inconnues, value doit être vide et placeholder doit indiquer par exemple "À compléter : marque". Les descriptions doivent être naturelles en français et conserver [MARQUE], [MODÈLE], [TAILLE], [KILOMÉTRAGE], etc. quand l'information n'est pas visible. Pour un véhicule, proposer notamment marque, modèle, année, kilométrage, carburant et boîte. Pour un vêtement/chaussures, proposer marque, modèle, taille/pointure, couleur et matière si pertinent.`
  const content=[{type:'input_text',text:prompt},...safeImages.map(image_url=>({type:'input_image',image_url}))]
  const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_VISION_MODEL||'gpt-5-mini',input:[{role:'user',content}],text:{format:{type:'json_object'}}})})
  if(!response.ok){console.error('Dealora AI error',response.status,await response.text());return NextResponse.json({error:'AI_FAILED'},{status:502})}
  const data=await response.json()
  const text=data.output_text||data.output?.flatMap(item=>item.content||[]).find(item=>item.type==='output_text')?.text
  if(!text)return NextResponse.json({error:'AI_EMPTY'},{status:502})
  const result=JSON.parse(text)
  if(!allowedCategories.includes(result.category))result.category='Autres'
  return NextResponse.json(result)
 }catch(error){console.error('Dealora analyze listing failed',error);return NextResponse.json({error:'ANALYSIS_FAILED'},{status:500})}
}
