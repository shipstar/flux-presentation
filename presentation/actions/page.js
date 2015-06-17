import dispatcher from 'dispatcher'

export default {
  change(page) {
    dispatcher.handle({
      type: 'PAGE_CHANGE',
      source: 'VIEW',
      data: { page }
    })
  }
}
