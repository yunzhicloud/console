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

import { getIndexRoute } from 'utils/router.config'

import AlertingRules from './AlertRules'
import MonitoringTarget from './MonitoringTarget'
import NotificationRules from './NotificationRules'
import AlertingHistory from './AlertHistory'

const PATH = '/clusters/:cluster/alert-policies/:name'

export default [
  {
    path: `${PATH}/alert-rules`,
    title: 'Alerting Rules',
    component: AlertingRules,
    exact: true,
  },
  {
    path: `${PATH}/monitoring-target`,
    title: 'Monitoring Target',
    component: MonitoringTarget,
    exact: true,
  },
  {
    path: `${PATH}/notification-rules`,
    title: 'Notification Rules',
    component: NotificationRules,
    exact: true,
  },
  {
    path: `${PATH}/alert-history`,
    title: 'Alerting History',
    component: AlertingHistory,
    exact: true,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/alert-rules`, exact: true }),
]
