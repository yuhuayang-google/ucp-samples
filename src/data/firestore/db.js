const ordersRef = db.collection('orders');

await ordersRef.doc('chair').set({
  name: 'cair', state: 'CA', country: 'USA',
  onsale: false, price: 860000
});
await ordersRef.doc('table').set({
  name: 'table', state: 'CA', country: 'USA',
  onsale: false, price: 3900000
});
await ordersRef.doc('sofa').set({
  name: 'sofa', state: null, country: 'USA',
  onsale: true, price: 680000
});
await ordersRef.doc('couch').set({
  name: 'couch', state: null, country: 'Japan',
  onsale: true, price: 9000000
});
await ordersRef.doc('cabinet').set({
  name: 'cabinet', state: null, country: 'China',
  onsale: true, price: 21500000
});