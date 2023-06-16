// For Nuxt 3
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage, faSquarePollHorizontal, faRetweet, faFire } from '@fortawesome/free-solid-svg-icons'
import { faSmile, faCalendar, faComment, faHeart, faBookmark } from '@fortawesome/free-regular-svg-icons'

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faImage)
library.add(faSquarePollHorizontal)
library.add(faSmile)
library.add(faCalendar)
library.add(faComment)
library.add(faRetweet)
library.add(faFire)
library.add(faHeart)
library.add(faBookmark)


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})
