import { Dispatcher } from 'flux'

class PresentationDispatcher extends Dispatcher {
  handle(action) {
    if (!action.type) { throw 'Undefined action type' }
    console.log(`Handling ${action.source} action`, action)
    this.dispatch(action)
  }
}

export default new PresentationDispatcher
