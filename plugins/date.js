import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'


export default defineNuxtPlugin(() => {
  
  const dayJS = dayjs.extend(utc)

  return {
    provide: {
      localDate: (date) => dayJS.utc(date).local().format('hh:mm A, MMM DD, YYYY')
    }
  }
})