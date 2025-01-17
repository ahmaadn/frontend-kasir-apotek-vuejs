export function clamp(number, min, max) {
   return Math.min(Math.max(min, number), max)
}

export function currency(value) {
   return new Intl.NumberFormat('id', { currency: 'IDR', style: 'currency' }).format(value)
}

export function formatDate(value) {
   if (typeof value === 'string') {
      value = new Date(value)
   }
   return new Intl.DateTimeFormat('ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'short',
   }).format(value)
}

export function dateToStr(date) {
   let dd = date.getDate()
   let mm = date.getMonth() + 1
   let yyyy = date.getFullYear()
   if (dd < 10) {
      dd = '0' + dd
   }
   if (mm < 10) {
      mm = '0' + mm
   }
   return yyyy + '-' + mm + '-' + dd
}

export function shortCurrency(value) {
   if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'M'
   }
   if (value >= 1000000) {
      return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'jt'
   }
   if (value >= 1000) {
      return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'rb'
   }
   return value.toString()
}
