import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

/**
 * Outbound link that handles firing google analytics events
 */
const ExternalLink: React.FC<Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href?: string }> =
  ({ target = '_blank', href, rel = 'noopener noreferrer', ...rest }) => {
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        const isNewTab = target === '_blank' || event.ctrlKey || event.metaKey
        if (!href || href === '#') return
        // don't prevent default, don't redirect if it's a new tab
        if (!isNewTab) event.preventDefault()
      },
      [href, target],
    )
    return <StyledLink target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
  }

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text[500]};
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
    text-decoration: underline;
  }
  :active {
    text-decoration: none;
  }
`

export default ExternalLink
