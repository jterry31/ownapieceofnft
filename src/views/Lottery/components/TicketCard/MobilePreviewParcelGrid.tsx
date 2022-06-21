import styled from 'styled-components'
import { BaseLayout } from 'uikit'

const MobilePreviewParcelGrid = styled(BaseLayout)`
  padding-bottom: 24px;
  padding-top: 24px;

  & > div {
    grid-column: span 6;
  }
`

export default MobilePreviewParcelGrid
