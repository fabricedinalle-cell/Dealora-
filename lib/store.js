export const demoUser={id:'u1',name:'Alex Martin',rating:4.9,verified:true,location:'France'}

export const demoListings=[
{id:'l1',sellerId:'u2',title:'Montre automatique',category:'Mode',condition:'Très bon état',description:'Montre automatique révisée, bracelet acier.',price:245,mode:'sale',invoice:true,pickup:true,shipping:true,international:true,location:'France',emoji:'⌚',favorites:18},
{id:'l2',sellerId:'u3',title:'Vélo électrique urbain',category:'Véhicules',condition:'Bon état',description:'VAE entretenu, batterie et chargeur inclus.',price:1190,mode:'trade',invoice:true,pickup:true,shipping:false,international:false,location:'France',emoji:'🚲',favorites:31},
{id:'l3',sellerId:'u4',title:'Console nouvelle génération',category:'High-tech',condition:'Comme neuf',description:'Console complète avec boîte et manette.',price:380,mode:'auction',invoice:true,pickup:true,shipping:true,international:true,location:'France',emoji:'🎮',favorites:54}
]

export const demoMessages=[{id:'m1',listingId:'l2',from:'u3',preview:'Bonjour, votre proposition de troc m’intéresse.',unread:true},{id:'m2',listingId:'l1',from:'u2',preview:'Oui, la facture originale est disponible.',unread:false}]

export function formatPrice(value){return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value)}
