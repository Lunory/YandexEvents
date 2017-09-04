import React from 'react'

import { List } from 'components'
import { Slider } from 'ui-components'
import style from 'components/List/style.scss'

const SliderList = props => (
  <div>
    <h3 className={style.list__title}>{props.title}</h3>
    <Slider>
      {
        props.payload.map(item => (
          <div>
            <List key={item.id} type='slider_events' data={item} />
          </div>
        ))
      }
    </Slider>
  </div>
)

export default SliderList
