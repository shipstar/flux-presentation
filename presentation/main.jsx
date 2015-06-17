import React from 'react'
import PageActions from 'actions/page'

class Presentation extends React.Component {
  constructor() {
    super()

    this.state = {
      page: 1
    }
  }

  componentDidMount() {
    setTimeout(() => {
      PageActions.change(this.state.page + 1)
    }, 1000)
  }

  render() {
    return <div>{this.state.page}</div>
  }
}

React.render(<Presentation />, document.getElementById('app'))
