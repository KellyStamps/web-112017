import React from 'react'
import PaintingsSearch from './PaintingsSearch'
import PaintingsList from './PaintingsList'
import PaintingItem from './PaintingItem'
import { Route, Switch, Redirect } from 'react-router-dom'
import api from '../api/adapter'


class PaintingsContainer extends React.Component {
  state = {
    filter: {
      filterName: "",
      filterDate: ""
    },
    updating: true,
    paintings: []
  }

  getPaintings = () => {
    console.log("getting")
    api.paintings.getPaintings().then(painting_data => {
      this.setState({
        paintings: painting_data,
      }, () => {
        this.setState({
          updating: false
        })
      })
    })
  }

  componentDidMount() {
    this.getPaintings()
  }

  shouldComponentUpdate(newProps, newState) {
    return this.state.updating !== newState.updating
  }

  componentDidUpdate() {
    if (this.state.updating) {
      this.getPaintings()
    }
  }

  setFilter = (f) => {
    const newFilter = {...this.state.filter, ...f}
    this.setState({
      filter: newFilter
    })
  }

  render() {
    return (
      <Switch>
        <Route path="/paintings/new" component={ NewPaintingForm } />
        <Route path="/paintings/:id" render={ (routerProps) => {
          const id = parseInt(routerProps.match.params.id)
          const painting = this.state.paintings.find((p) => p.id === id)
          if (painting) {
            return <PaintingItem painting={painting} />
          } else {
            return <Redirect to="/404" />
          }
        } } />
        <Route path="/paintings" render={ (props) => {
          return (<div className="paintings-container">
            <PaintingsSearch setFilter={ this.setFilter } />
            <PaintingsList paintings={ this.state.paintings } filter={this.state.filter} />
          </div>)
        } } />
      </Switch>
    )
  }
}

const NewPaintingForm = (props) => {
  console.log(props)
  return (
    <form>
      <input type="text" />
      <input type="submit" />
    </form>
  )
}
export default PaintingsContainer
