import dispatcher from 'dispatcher'

import lodash from 'lodash'

import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'
const emitter = new EventEmitter
emitter.setMaxListeners(0)

const rawSlides = [
  {
    title: 'Flux is a thing',
    body: 'Kyle Shipley'
  },
  {
    title: 'Why Flux?',
    body: ''
  },
  {
    title: 'State is hard',
    body: `<blockquote>
      <p>
        And you may ask yourself,
        <br/>
        well...how did I get here?
      </p>
      &mdash; <cite>David Byrne</cite>
    `
  },
  {
    title: 'vs. Backbone et al',
    body: `
      <ul>
        <li>Have to dig deep into Backbone to override/cache</li>
        <li>Hard to handle non-local updates</li>
        <li>Backbone very opinionated about REST</li>
      </ul>
    `
  },
  {
    title: "vs. two-way binding",
    body: `
      <ul>
        <li>Hard to keep parents and children synced</li>
        <li>What the hell is a digest cycle?</li>
        <li>Appeal to authority: Angular and Ember are both moving React's way</li>
      </ul>
    `
  },
  {
    title: "vs. components:",
    body: `
      <ul>
        <li>Hard to share data (e.g. multiple data sources)</li>
        <li>Bloated top-level components</li>
        <li>Separation of concerns (esp. data + rendering, server-side)</li>
      </ul>
    `
  },
  {
    title: "Debugging",
    body: "omg guys it's so easy!"
  },
  {
    title: "What is Flux?",
    body: ''
  },
  {
    title: "One-way data flow",
    body: `<img src='http://blog.krawaller.se/img/flux-diagram.png' style="max-width: 800px;" />`
  },
  {
    title: 'Views',
    body: `
      <ol>
        <li>Data -> DOM</li>
        <li>Fire actions in response to UI events</li>
      </ol>
    `
  },
  {
    title: 'Action Creators',
    body: `
      <ol>
        <li>Fire off AJAX requests</li>
        <li>Dispatch actions</li>
      </ol>
    `
  },
  {
    title: 'Dispatcher',
    body: `
      <ol>
        <li>Notify store listeners of new actions</li>
        <li>(Optional) Centralized logging</li>
      </ol>
    `
  },
  {
    title: 'Stores',
    body: `
      <ol>
        <li>Manage state</li>
        <li>Notify view listeners of updates</li>
      </ol>
    `
  },
  {
    title: 'Code!',
    body: 'Buckle up.'
  },
  {
    title: 'Boilerplate?',
    body: 'Hate it. But start simple and refactor once you understand the tradeoffs.'
  },
  {
    title: 'Libraries',
    body: `
      <ul>
        <li>
          <strong>Marty.js</strong>
          <br/>
          Pros: Great tooling, sensible abstractions
          <br/>
          Cons: App registry a bit awkward
        </li>
        <br/>
        <li>
          <strong>Redux</strong>
          <br/>
          Pros: @gaearon is a wizard, highly functional, recommended by Flummox guy (which was good)
          <br/>
          Cons: Don't understand it yet
        </li>
      </ul>
    `
  },
  {
    title: "Libraries (cont'd)",
    body: `
      <p>...And about 100 more</p>
      (see https://github.com/voronianski/flux-comparison for some other big ones)
    `
  },
  {
    title: 'Ongoing debates',
    body: `
      <ul>
        <li>Single dispatcher vs. self-dispatching?</li>
        <li>Single atom vs. many stores?</li>
        <li>Singleton stores?</li>
        <li>Stores fetching data vs. actions vs. queries?</li>
        <li>Local component state vs. stores for UI?</li>
      </ul>
    `
  },
  {
    title: 'What else?',
    body: ''
  },
  {
    title: 'Thanks!',
    body: `
      <p>Kyle Shipley</p>
      <p>@kyleashipley</p>
      <p>P.S. HealthPro is hiring a DevOps-y person!</p>
    `
  }
]

class SlideStore {
  constructor() {
    this.dispatchToken = dispatcher.register(e => this.handleAction(e))

    this.slides = _.map(rawSlides, ({ title, body }, i) => {
      return {
        id: i + 1,
        title,
        body
      }
    })
    this.page = 1
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

      case 'ADD_SLIDE':
        this.addSlide(action.data)
        this.emitChange()
        break
    }
  }

  changePage({ page }) {
    this.page = page
  }

  addSlide({ slide }) {
    this.slides.push(slide)
    this.nextId++
    this.page = slide.id
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
