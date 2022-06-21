import styled from 'styled-components'
import Container from './Container'

const Page = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
  align-items: flex-start;
  overflow: hidden;
  background: rgb(103,103,103);
  background: linear-gradient(133deg, rgba(103,103,103,1) 0%, rgba(0,0,0,1) 79%);
  // background-size: 100%;
  // background: linear-gradient(294.48deg, #222222 7.55%, #1E1E1E 97.74%);
  // background-attachment: fixed;
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position 275% 0;
  // animation: animatedBackground 240s linear infinite;


  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

export default Page
