import dispatcher from 'dispatcher'

import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'
const emitter = new EventEmitter
emitter.setMaxListeners(0)

class SlideStore {
  constructor() {
    this.dispatchToken = dispatcher.register(e => this.handleAction(e))
    this.page = 1
  }

  getPage() {
    return this.page
  }

  handleAction(action) {
    console.warn('handling', action)

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
