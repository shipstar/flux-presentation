import dispatcher from 'dispatcher'

export default {
  change(page) {
    dispatcher.handle({
      type: 'FOO',
      source: 'VIEW',
      data: 'hello!'
    })
  }
}
