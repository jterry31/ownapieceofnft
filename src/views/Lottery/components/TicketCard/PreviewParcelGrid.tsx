import styled from 'styled-components'
import { BaseLayout } from 'uikit'

const PreviewParcelGrid = styled(BaseLayout)`
  padding-bottom: 24px;
  padding-top: 24px;
  max-width: 50vw;

  & > div {
    grid-column: span 6;
  }
`

export default PreviewParcelGrid
