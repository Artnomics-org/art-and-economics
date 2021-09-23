import { Currency } from '@art-economics/swap-sdk'
import React from 'react'
import { WrappedTokenInfo } from '../../../hooks/lists'
import { MouseoverTooltip } from '../../Tooltip'
import { TagContainer, Tag } from './styleds'

interface TokenTagsProps {
  currency: Currency
}

const TokenTags: React.FC<TokenTagsProps> = ({ currency }) => {
  if (!(currency instanceof WrappedTokenInfo)) {
    return <span />
  }

  const tags = currency.tags
  if (!tags || tags.length === 0) return <span />
  const tag = tags[0]
  const tagText = tags
    .slice(1)
    .map(({ name, description }) => `${name}: ${description}`)
    .join('; \n')

  return (
    <TagContainer>
      <MouseoverTooltip text={tag.description}>
        <Tag key={tag.id}>{tag.name}</Tag>
      </MouseoverTooltip>
      {tags.length > 1 ? (
        <MouseoverTooltip text={tagText}>
          <Tag>...</Tag>
        </MouseoverTooltip>
      ) : null}
    </TagContainer>
  )
}

export default TokenTags
