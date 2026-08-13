// Meta Pixel Event Tracking Service for EXE DIGITAL WORLD Meta Ads Integration (INR Currency)

export function trackMetaPixel(eventName, eventData = {}) {
  const payload = {
    event: eventName,
    data: eventData,
    timestamp: new Date().toISOString()
  };

  console.log(`[Meta Pixel Event Fired] 👉 ${eventName}`, eventData);

  // Trigger browser window fbq if Meta Pixel JS is installed
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData);
  }

  // Dispatch custom event for our visual debugging UI toast
  if (typeof window !== 'undefined') {
    const customEvent = new CustomEvent('meta_pixel_fired', { detail: payload });
    window.dispatchEvent(customEvent);
  }
}

// Meta Pixel Standard Event Helper Shortcuts
export const MetaPixel = {
  viewContent: (product) => trackMetaPixel('ViewContent', {
    content_name: product.name,
    content_category: product.category,
    content_ids: [product.id],
    value: product.salePrice || product.offerPrice,
    currency: 'INR'
  }),

  addToCart: (product) => trackMetaPixel('AddToCart', {
    content_name: product.name,
    content_ids: [product.id],
    value: product.salePrice || product.offerPrice,
    currency: 'INR'
  }),

  initiateCheckout: (product, total) => trackMetaPixel('InitiateCheckout', {
    content_name: product ? product.name : 'Multi-Item Checkout',
    value: total,
    currency: 'INR',
    num_items: 1
  }),

  purchase: (order) => trackMetaPixel('Purchase', {
    transaction_id: order.id,
    value: order.totalAmount,
    currency: 'INR',
    content_ids: (order.items || []).map(i => i.productId)
  })
};
