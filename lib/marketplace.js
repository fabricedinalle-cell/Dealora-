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
  if (!listing.title?.trim()) errors.title = 'Le titre est obligatoire.'
  if (!listing.category) errors.category = 'Choisissez une catégorie.'
  if (!listing.mode || !SALE_MODES.includes(listing.mode)) errors.mode = 'Choisissez achat, troc ou enchère.'
  if (listing.mode !== 'swap' && Number(listing.price) <= 0) errors.price = 'Indiquez un prix supérieur à 0.'
  if (!listing.description?.trim()) errors.description = 'Ajoutez une description.'
  if (!listing.condition) errors.condition = "Indiquez l'état du bien."
  if (typeof listing.hasInvoice !== 'boolean') errors.hasInvoice = 'Précisez si vous avez une facture.'
  if (!listing.delivery?.length) errors.delivery = 'Choisissez au moins un mode de remise.'
  return errors
}
