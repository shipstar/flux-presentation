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
      <div className='slide'>
        <div className='slide__title'>{this.state.slide.title}</div>
        <div className='slide__body'>{this.state.slide.body}</div>
        <div className='slide__nav'>{this.state.page}</div>
      </div>
    )
  }
}

React.render(<Presentation />, document.getElementById('app'))
