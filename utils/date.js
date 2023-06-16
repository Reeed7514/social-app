import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

const dayJS = dayjs.extend(utc)

function localDate(date) {
	return dayJS.utc(date).local().format('hh:mm A, MMM DD, YYYY')
}

export default localDate