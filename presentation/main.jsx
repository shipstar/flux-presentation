import React from 'react'
import PageActions from 'actions/page'
import slideStore from 'stores/slide'

class Presentation extends React.Component {
  constructor() {
    super()

    this.state = this.getState()
  }

  getState() {
    return {
      page: slideStore.getPage(),
      slide: slideStore.getCurrentSlide()
    }
  }

  componentDidMount() {
    slideStore.addChangeListener(e => this.onStoreChange())

    window.onkeydown = (e) => {
      switch (e.keyIdentifier) {
        case 'Right':
          if (slideStore.hasNext()) {
            PageActions.change(this.state.page + 1)
          }
          break

        case 'Left':
          if (slideStore.hasPrev()) {
            PageActions.change(this.state.page - 1)
          }
          break
      }
    }
  }

  componentWillUnmount() {
    slideStore.removeChangeListener(e => this.onStoreChange())
  }

  onStoreChange() {
    this.setState(this.getState())
  }

  render() {
    return (
      <div>
        <h1>{this.state.slide.title}</h1>
        <div>{this.state.slide.body}</div>
        <div>{this.state.page}</div>
      </div>
    )
  }
}

React.render(<Presentation />, document.getElementById('app'))
