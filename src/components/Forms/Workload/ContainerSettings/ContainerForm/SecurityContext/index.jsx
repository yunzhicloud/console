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
import { Form } from 'components/Base'

import AccessControl from './AccessControl'
import UserGroup from './UserGroup'
import SELinuxOptions from './SELinuxOptions'
import Capabilities from './Capabilities'

export default class SecurityContext extends React.PureComponent {
  render() {
    return (
      <Form.Group
        label={t('Container Security Context')}
        desc={t('CONTAINER_SECURITY_CTX_DESC')}
        checkable
      >
        <AccessControl />
        <UserGroup />
        <SELinuxOptions />
        <Capabilities />
      </Form.Group>
    )
  }
}
