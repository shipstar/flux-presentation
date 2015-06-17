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
          this.forward()
          break

        case 'Left':
          this.back()
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

  forward() {
    if (slideStore.hasNext()) {
      PageActions.change(this.state.page + 1)
    }
  }

  back() {
    if (slideStore.hasPrev()) {
      PageActions.change(this.state.page - 1)
    }
  }

  render() {
    let prevLink
    if (slideStore.hasPrev()) {
      prevLink = <a className='slide__prev' href='#' onClick={e => this.back()}>{'<'}</a>
    }

    let nextLink
    if (slideStore.hasNext()) {
      nextLink = <a className='slide__next' href='#' onClick={e => this.forward()}>{'>'}</a>
    }

    return (
      <div className='slide'>
        <div className='slide__title'>{this.state.slide.title}</div>
        <div className='slide__body'>{this.state.slide.body}</div>
        <div className='slide__nav'>
          {prevLink}
          {this.state.page}
          {nextLink}
        </div>
      </div>
    )
  }
}

React.render(<Presentation />, document.getElementById('app'))
