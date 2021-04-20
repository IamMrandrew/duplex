import React, { ReactElement } from 'react'
import MaterialToolTip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import { makeStyles } from '@material-ui/core'

type Props = {
  title: string
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
  style?: any
  children: ReactElement //  tooltip must have children
}

const Tooltip = (props: Props): ReactElement => {
  const { title, placement = 'right', style = {fontSize: '14px'}, children, ...rest } = props
  const tagName = title.charAt(0).toUpperCase() + title.replace('_', ' ').slice(1)
  const classes = makeStyles(() => ({
    customToolTip: {
      ...style,
    },
  }))()
  return (
    <MaterialToolTip
      arrow
      title={tagName}
      placement={placement}
      classes={{ tooltip: classes.customToolTip }}
      TransitionComponent={Zoom}
      {...rest}
    >
      {children}
    </MaterialToolTip>
  )
}

export default Tooltip

// example: showing a tooltip if button on hover
// <Tooltip content='text shown when hover'>
//   <button />
// </Tooltip>
