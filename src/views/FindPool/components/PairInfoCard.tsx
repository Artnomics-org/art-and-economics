import React from 'react'
import styled from 'styled-components/macro'
import { LightCard } from '../../../components/Card'
import { AutoColumn } from '../../../components/Column'
import { InternalLink } from '../../../components/Link'

interface PairInfoCardProps {
  link?: string
  linkText?: string
}

const PairInfoCard: React.FC<PairInfoCardProps> = ({ link, linkText, children }) => {
  return (
    <LightCard padding="45px 10px">
      <AutoColumn gap="sm" justify="center">
        <Text>{children}</Text>
        {link && <InternalLink to={link}>{linkText}</InternalLink>}
      </AutoColumn>
    </LightCard>
  )
}

const Text = styled.p`
  margin: 0;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
`

export default PairInfoCard
