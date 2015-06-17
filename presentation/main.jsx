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
      page: slideStore.page
    }
  }

  componentDidMount() {
    slideStore.addChangeListener(e => this.onStoreChange())

    window.onkeydown = (e) => {
      switch (e.keyIdentifier) {
        case 'Right':
          PageActions.change(this.state.page + 1)
          break

        case 'Left':
          PageActions.change(this.state.page - 1)
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
    return <div>{this.state.page}</div>
  }
}

React.render(<Presentation />, document.getElementById('app'))
