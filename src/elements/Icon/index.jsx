import React from 'react'
import T from 'prop-types'

import { ReactComponent as SadFaceIcon } from 'assets/sadFace.svg'
import { ReactComponent as DragIcon } from 'assets/drag.svg'
import { ReactComponent as FormatIcon } from 'assets/format.svg'
import { ReactComponent as CrossIcon } from 'assets/cross.svg'
import { ReactComponent as SuccessBadgeIcon } from 'assets/successbadge.svg'
import { ReactComponent as ErrorBadgeIcon } from 'assets/errorbadge.svg'
import { ReactComponent as SeparatorIcon } from 'assets/separator.svg'
import { ReactComponent as LogoutIcon } from 'assets/logout.svg'
import { ReactComponent as LogoIcon } from 'assets/logo.svg'
import { ReactComponent as FullScreenIcon } from 'assets/fullscreen.svg'
import { ReactComponent as SmallScreenIcon } from 'assets/smallscreen.svg'
import { ReactComponent as LoaderIcon } from 'assets/loader.svg'

import { withTheme } from 'elements/ThemeTag'

const icons = {
  DragIcon,
  FormatIcon,
  CrossIcon,
  LogoIcon,
  SadFaceIcon,
  SuccessBadgeIcon,
  ErrorBadgeIcon,
  SeparatorIcon,
  LogoutIcon,
  FullScreenIcon,
  SmallScreenIcon,
  LoaderIcon,
}

function Icon({ iconName, tag: IconTag }) {
  return <IconTag tagName={icons[iconName]} />
}

Icon.propTypes = {
  iconName: T.oneOf(Object.keys(icons)).isRequired,
  tag: T.elementType.isRequired,
}

export default withTheme(Icon)
