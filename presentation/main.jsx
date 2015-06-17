import React from 'react'
import PageActions from 'actions/page'
import pageStore from 'stores/page'

class Presentation extends React.Component {
  constructor() {
    super()

    this.state = this.getState()
  }

  getState() {
    return {
      page: pageStore.page
    }
  }

  componentDidMount() {
    pageStore.addChangeListener(e => this.onStoreChange())

    setTimeout(() => {
      PageActions.change(this.state.page + 1)
    }, 1000)
  }

  componentWillUnmount() {
    pageStore.removeChangeListener(e => this.onStoreChange())
  }

  onStoreChange() {
    this.setState(this.getState())
  }

  render() {
    return <div>{this.state.page}</div>
  }
}

React.render(<Presentation />, document.getElementById('app'))
