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

import { isEmpty } from 'lodash'
import React from 'react'
import { when, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Tabs } from '@pitrix/lego-ui'

import AppVersionStore from 'stores/openpitrix/version'
import AppFileStore from 'stores/openpitrix/file'

import { Card } from 'components/Base'
import Markdown from 'components/Base/Markdown'
import TextPreview from 'components/TextPreview'
import VersionInfo from '../VersionInfo'

import styles from './index.scss'

const { TabPanel } = Tabs

@inject('rootStore', 'detailStore')
@observer
export default class AppTemplate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 'readme',
    }

    this.store = props.detailStore
    this.module = props.module

    this.appVersionStore = new AppVersionStore()
    this.appFileStore = new AppFileStore()

    when(
      () => !isEmpty(this.store.detail),
      () => this.getData()
    )
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  getData() {
    const { detail } = toJS(this.store)
    const { app_id, version_id } = detail

    this.appVersionStore.fetchList({
      app_id,
      status: 'active',
    })

    this.appFileStore.fetch({ app_id, version_id })
  }

  handleTabChange = tab => {
    this.setState({ tab })
  }

  handleUpgrade = async version_id => {
    const {
      detail: { cluster_id, name, app_id, env },
    } = toJS(this.store)
    const { workspace, namespace, cluster } = this.props.match.params
    await this.store.upgrade(
      {
        app_id,
        cluster_id,
        name,
        version_id,
        conf: env,
      },
      { workspace, namespace, cluster, cluster_id }
    )

    this.props.rootStore.routing.push(
      `/${workspace}/clusters/${cluster}/projects/${namespace}/applications/template`
    )
  }

  handleRollback = () => {}

  renderReadme() {
    const files = this.appFileStore.files

    const readme = files['README.md']
    if (readme || this.appFileStore.isLoading) {
      return (
        <Markdown source={files['README.md']} className={styles.markdown} />
      )
    }

    return <p>{t('The app has no documentation.')}</p>
  }

  renderSettings() {
    const files = this.appFileStore.files
    return <TextPreview files={files} />
  }

  renderVersionInfo() {
    const { detail } = toJS(this.store)
    const { cluster, workspace, namespace } = this.props.match.params
    const { data, isLoading } = toJS(this.appVersionStore.list)

    return (
      <VersionInfo
        data={data}
        loading={isLoading}
        detail={detail}
        cluster={cluster}
        workspace={workspace}
        namespace={namespace}
        onUpgrade={this.handleUpgrade}
        onRollback={this.handleRollback}
      />
    )
  }

  render() {
    const { tab } = this.state
    return (
      <Card title={t('App Description')} className={styles.wrapper}>
        <Tabs
          className="tabs-default"
          activeName={tab}
          onChange={this.handleTabChange}
        >
          <TabPanel label={t('App Description')} name="readme">
            {this.renderReadme()}
          </TabPanel>
          <TabPanel label={t('Configuration Files')} name="settings">
            {this.renderSettings()}
          </TabPanel>
          <TabPanel label={t('Version Info')} name="version">
            {this.renderVersionInfo()}
          </TabPanel>
        </Tabs>
      </Card>
    )
  }
}
