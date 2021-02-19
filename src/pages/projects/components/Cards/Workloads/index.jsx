/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'

import { Panel, List } from 'components/Base'
import Item from './Item'

import styles from './index.scss'

export default class WorkloadsCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    data: PropTypes.array,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    prefix: '',
    data: [],
    isLoading: false,
  }

  renderContent() {
    const { data, isLoading, prefix } = this.props

    if (isEmpty(data) && !isLoading) {
      return (
        <div className={styles.empty}>
          {t('NOT_AVAILABLE', { resource: t('Workload') })}
        </div>
      )
    }

    return (
      <List className={styles.list}>
        {data.map(workload => (
          <Item
            key={`${workload.type}-${workload.name}`}
            prefix={prefix}
            detail={workload}
          />
        ))}
      </List>
    )
  }

  render() {
    const { className } = this.props

    return (
      <Panel
        className={classnames(styles.main, className)}
        title={t('Workloads')}
      >
        {this.renderContent()}
      </Panel>
    )
  }
}
