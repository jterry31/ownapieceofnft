import React from 'react'
import styled from 'styled-components';

import { Tag, VerifiedIcon, WarningIcon, CommunityIcon, BinanceIcon } from 'uikit'

const RiskTag = ({ risk }) => (
  <Tag variant={risk >= 3 ? 'failure' : 'success'} outline startIcon={<VerifiedIcon />}>
    Risk {risk}
  </Tag>
)

const ClosingTag = ({ day }) => (
  <Tag variant='failure' outline startIcon={<WarningIcon />}>
    WILL BE INACTIVE IN {day} DAYS
  </Tag>
)

const CoreTag = () => (
  <Tag variant='secondary' outline startIcon={<VerifiedIcon />}>
    4% Fee
  </Tag>
)

const NoFeeTag = () => (
  <Tag variant="success" outline startIcon={<VerifiedIcon />}>
    No Fees
  </Tag>
)


const CommunityTag = () => (
  <Tag variant='textSubtle' outline startIcon={<CommunityIcon />}>
    Community
  </Tag>
)

const BinanceTag = () => (
  <Tag variant='binance' outline startIcon={<BinanceIcon />}>
    Binance
  </Tag>
)

export { CoreTag, CommunityTag, BinanceTag, RiskTag, NoFeeTag, ClosingTag}
