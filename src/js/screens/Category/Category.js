import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import { InfiniteList as InfiniteListContainer } from 'containers'

import { DataApi } from 'utils'

import style from './style.scss'

/**
 * @class Category
 * @description Экран просмотра категории
 */
class Category extends Component {
  /**
   * @static propTypes
   */
  static propTypes = {
    params: PropTypes.shape().isRequired,
  }

  /**
   * @property state
   * @description Состояние компонента
   */
  state = {
    filterByDate: null,
    holiDates: [],
  }

  componentWillMount() {
    this.getHoliDates(this.props)
  }

  componentWillUpdate(nextProps) {
    const isCategoryEqual = this.props.params.categoryId === nextProps.params.categoryId

    if (!isCategoryEqual) {
      this.getHoliDates(nextProps)
    }
  }

  /**
   * @method getHoliDates
   * @description ?
   * @param {Object} props
   */
  getHoliDates(props) {
    DataApi.getDatesWithEvents()
      .byHoliday(1)
      .byCategory(props.params.categoryId)
      .perform()
      .then((response) => {
        this.setState({
          holiDates: response.data.data,
        })
      })
  }

  /**
   * @method filterByDate
   * @description Фильтрация по дате
   * @param {Object} date
   */
  filterByDate = (date) => {
    if (date !== this.state.filterByDate) {
      this.setState({
        filterByDate: date,
      })
      return
    }
    this.setState({
      filterByDate: null,
    })
  }

  render() {
    return (
      <div>
        {
          this.state.holiDates.length > 1
            ? <div style={{ padding: '16px 16px 16px 16px', display: 'flex' }}>
              {this.state.holiDates.map(item => (
                <button
                  key={item.date}
                  type='button'
                  className={
                    ClassNames(
                      style.filter_date,
                      this.state.filterByDate === item.date ? style.filter_date__active : '',
                    )}
                  onClick={() => this.filterByDate(item.date)}
                >{item.dateFormatted.day} {item.dateFormatted.month}</button>
              ))}
            </div>
            : null
        }
        <InfiniteListContainer
          categoryId={this.props.params.categoryId}
          filterByDate={this.state.filterByDate}
        />
      </div>
    )
  }
}

export default Category
