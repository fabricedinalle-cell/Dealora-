export const SALE_MODES = ['buy', 'swap', 'auction']
export const DELIVERY_MODES = ['pickup', 'shipping']

export const categories = [
  'Véhicules','Immobilier','Mode','High-tech','Maison','Loisirs','Collection','Services'
]

export function calculateListingTotal({ price = 0, shipping = 0, importFees = 0, buyerProtection = 0 }) {
  return [price, shipping, importFees, buyerProtection].reduce((sum, value) => sum + Number(value || 0), 0)
}

export function validateListing(listing) {
  const errors = {}
  const title = listing.title?.trim() || ''
  const description = listing.description?.trim() || ''

  if (title.length < 3) errors.title = 'Le titre doit contenir au moins 3 caractères.'
  else if (title.length > 100) errors.title = 'Le titre ne peut pas dépasser 100 caractères.'
  if (!listing.category) errors.category = 'Choisissez une catégorie.'
  if (!listing.mode || !SALE_MODES.includes(listing.mode)) errors.mode = 'Choisissez achat, troc ou enchère.'
  if (listing.mode !== 'swap' && Number(listing.price) <= 0) errors.price = 'Indiquez un prix supérieur à 0.'
  if (description.length < 10) errors.description = 'La description doit contenir au moins 10 caractères.'
  else if (description.length > 5000) errors.description = 'La description ne peut pas dépasser 5 000 caractères.'
  if (!listing.condition) errors.condition = "Indiquez l'état du bien."
  if (typeof listing.hasInvoice !== 'boolean') errors.hasInvoice = 'Précisez si vous avez une facture.'
  if (!listing.delivery?.length) errors.delivery = 'Choisissez au moins un mode de remise.'
  if (listing.contactPhone?.trim() && !/^[+0-9().\s-]{6,30}$/.test(listing.contactPhone.trim())) errors.contactPhone = 'Indiquez un numéro de téléphone valide.'
  if (listing.showContactPhone && !listing.contactPhone?.trim()) errors.contactPhone = 'Ajoutez un numéro avant de choisir de l’afficher.'
  return errors
}
