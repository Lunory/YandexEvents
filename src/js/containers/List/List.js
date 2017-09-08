import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { Card, Spinner } from 'ui-components'

import { DataApi } from 'utils/DataApi'

class ListContainer extends Component {
  state = {
    elements: [],
    route: {},
    loading: true,
  }

  componentWillMount() {
    this.getData(this.props)
  }

  componentWillUpdate(nextProps) {
    const isCategoryEqual = this.props.categoryId === nextProps.categoryId
    const isFilterByDateEqual = this.props.filterByDate === nextProps.filterByDate

    if (!isCategoryEqual || !isFilterByDateEqual) {
      this.getData(nextProps)
    }
  }

  getData = (props) => {
    if (props.params) {
      DataApi
        .prepareQuery(props.params)
        .perform()
        .then(response => this.setState({
          elements: response.data.data,
          route: props.route,
          loading: false,
        }))
    }
    else {
      const getEventsRequest = DataApi.getEvents().byHoliday(1)

      if (props.filterByDate) {
        getEventsRequest.byDate(props.filterByDate)
      }

      getEventsRequest.byCategory(props.categoryId)
        .perform()
        .then(response => this.setState({
          elements: response.data.data,
          route: { url: '/events/%' },
          loading: false,
        }))
    }
  }

  viewEvent = (route, eventData) => {
    this.props.onViewEvent(route, eventData)
  }

  render() {
    return (
      <div
        style={{
          ...this.props.style,
          margin: 16,
          marginBottom: this.props.categoryId ? 16 * 4 : 16,
        }}
      >
        {this.state.loading
          ? (<Spinner />)
          : (
            <div>
              {this.props.title
                ? <h3
                  style={{
                    fontSize: '1.25rem',
                    margin: '16px 0',
                  }}
                >{this.props.title}</h3>
                : null
              }
              {this.state.elements.map(element => (
                <Card
                  key={element.id}
                  title={element.title}
                  src={`http://io.yamblz.ru/i/events/${element.id}_small.jpg`}
                  location={element.location_title}
                  size='medium'
                  style={{
                    ...this.props.cardStyle,
                    marginBottom: 20,
                  }}
                  onClick={() => this.viewEvent(this.state.route.url, element)}
                  date={`${element.dateFormatted.day} ${element.dateFormatted.month} ${element.dateFormatted.time} `}
                />
              ))}
            </div>
          )
        }
      </div>
    )
  }
}

ListContainer.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  cardSize: PropTypes.string,
  cardStyle: PropTypes.object,
  params: PropTypes.object,
  categoryId: PropTypes.string,
}

export default connect(
  state => ({}),
  dispatch => ({
    onViewEvent: (route, element) => {
      dispatch(sendModalEventData(element))
      dispatch(push(route.replace('%', element.id)))
    },
  })
)(ListContainer)
