import React from 'react'

import lodash from 'lodash'

import SlideActions from 'actions/slide'
import slideStore from 'stores/slide'

class Presentation extends React.Component {
  constructor() {
    super()

    this.state = _.extend(this.getState(), {
      adding: false
    })
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
      SlideActions.change(this.state.page + 1)
    }
  }

  back() {
    if (slideStore.hasPrev()) {
      SlideActions.change(this.state.page - 1)
    }
  }

  toggleAddSlide(e) {
    e.preventDefault()

    this.setState({ adding: !this.state.adding })
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

    let addSlideForm
    if (this.state.adding) {
      addSlideForm = <SlideForm id={slideStore.getNextId()} onCancel={e => this.toggleAddSlide(e)} />
    }

    return (
      <div className='slide'>
        <div className='slide__title'>{this.state.slide.title}</div>
        <div className='slide__body'>{this.state.slide.body}</div>
        <div className='slide__form'>{addSlideForm}</div>
        <div className='slide__nav'>
          <a href='#' onClick={e => this.toggleAddSlide(e)}>+</a>
          <br/>
          {prevLink}
          {this.state.page}
          {nextLink}
        </div>
      </div>
    )
  }
}

class SlideForm extends React.Component {
  constructor(props) {
    super()

    this.state = {
      id: props.id,
      title: '',
      body: ''
    }
  }

  componentWillMount() {

  }

  changeValue(e) {
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  submit(e) {
    e.preventDefault()

    SlideActions.add(this.state)
    this.props.onCancel(e)
  }

  render() {
    return (
      <form onSubmit={e => this.submit(e)}>
        <label>Title</label>
        <input name='title'
               autoFocus={true}
               value={this.state.title}
               onChange={e => this.changeValue(e)} />

        <br/>

        <label>Body</label>
        <input name='body'
               value={this.state.body}
               onChange={e => this.changeValue(e)} />

        <br/>

        <button>Add</button> or <a href='#' onClick={e => this.props.onCancel(e)}>cancel</a>
      </form>
    )
  }
}

React.render(<Presentation />, document.getElementById('app'))
