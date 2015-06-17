import dispatcher from 'dispatcher'

import lodash from 'lodash'

import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'
const emitter = new EventEmitter
emitter.setMaxListeners(0)

class SlideStore {
  constructor() {
    this.dispatchToken = dispatcher.register(e => this.handleAction(e))

    this.page = 1
    this.slides = [
      { id: 1, title: 'Hello', body: 'World!' },
      { id: 2, title: 'Another slide', body: 'Page 2 of my magnum opus' },
      { id: 3, title: "Here's a third slide", body: '...to tide you over' }
    ]
    this.nextId = this.slides.length + 1
  }

  getPage() {
    return this.page
  }

  getNextId() {
    return this.nextId
  }

  getCurrentSlide() {
    return _.findWhere(this.slides, { id: this.page })
  }

  hasNext() {
    return this.page < this.slides.length
  }

  hasPrev() {
    return this.page > 1
  }

  handleAction(action) {
    switch (action.type) {
      case 'PAGE_CHANGE':
        this.changePage(action.data)
        this.emitChange()
        break
    }
  }

  changePage({ page }) {
    this.page = page
  }

  addChangeListener(callback) {
    emitter.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    emitter.removeListener(CHANGE_EVENT, callback)
  }

  emitChange() {
    emitter.emit(CHANGE_EVENT)
  }
}

export default new SlideStore
