import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from 'uikit'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledNotFound>
        <LogoIcon width="20vh" mb="8px" />
        <h1 style={{fontSize: "10vh"}}>404</h1>
        <h2 style={{marginBottom: "5vh", marginTop: "2vh"}}> Oops, page not found... </h2>
        <Button as="a" href="/" size="sm">
          {TranslateString(999, 'Back Home')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
