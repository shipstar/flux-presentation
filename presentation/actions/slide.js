import dispatcher from 'dispatcher'

export default {
  change(page) {
    dispatcher.handle({
      type: 'PAGE_CHANGE',
      source: 'VIEW',
      data: { page }
    })
  },

  add(slide) {
    dispatcher.handle({
      type: 'ADD_SLIDE',
      source: 'VIEW',
      data: { slide }
    })
  }
}
