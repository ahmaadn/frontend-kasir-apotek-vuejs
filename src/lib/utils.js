export function currency(value) {
   return Intl.NumberFormat('id', { currency: 'IDR', style: 'currency' }).format(value)
}

export function formatDate(value) {
   if (typeof value === 'string') {
      value = new Date(value)
   }
   return Intl.DateTimeFormat('ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'short',
   }).format(value)
}
