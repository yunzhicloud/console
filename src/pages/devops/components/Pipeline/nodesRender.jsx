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
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'
import Card from './Card'
import Edges from './Edges'

@observer
export default class PipelineNodes extends React.Component {
  static defaultProps = {}

  @observable
  heights = []

  @computed
  get sumHeights() {
    const { stages = [] } = this.props

    return this.heights.slice(0, stages.length).map(height => {
      let tempHeight = 0
      return height.map(_height => {
        tempHeight += _height
        return tempHeight
      })
    })
  }

  handleAddBranch = index => () => {
    this.props.store.handleAddBranch(index)
  }

  onInsertColunm = index => {
    this.props.store.insertColunm(index)
  }

  handleFocus = index => colunmIndex => {
    this.props.store.setFocus(index, colunmIndex)
  }

  @action
  onAddStep = () => {
    this.props.store.isAddingStep = true
  }

  @action
  setHeight = index => heights => {
    const _heights = [...this.heights]
    _heights[index] = heights
    this.heights = _heights
  }

  render() {
    const { stages, isEditMode } = this.props

    if (!stages.length && isEditMode) {
      return (
        <Edges
          onInsertColunm={this.onInsertColunm}
          isEditMode={isEditMode}
          index={-1}
          heights={[]}
        />
      )
    }
    return (
      <React.Fragment>
        <Edges
          onInsertColunm={this.onInsertColunm}
          isEditMode={isEditMode}
          index={-1}
          heights={this.sumHeights}
        />
        {stages.map((stage, index) => (
          <React.Fragment key={`${stage.name}${index}`}>
            <Card
              onAddBranch={this.handleAddBranch(index)}
              onAddStep={this.onAddStep}
              isEditMode={isEditMode}
              nodes={stage}
              index={index}
              setHeight={this.setHeight(index)}
              onFocus={this.handleFocus(index)}
            />
            <Edges
              onInsertColunm={this.onInsertColunm}
              isEditMode={isEditMode}
              index={index}
              heights={this.sumHeights}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  }
}
