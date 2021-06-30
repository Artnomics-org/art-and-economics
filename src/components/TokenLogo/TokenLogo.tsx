import React, { useState } from 'react'
import { HelpCircle } from 'react-feather'

const BAD_SRCS: { [tokenAddress: string]: true } = {}

export interface TokenLogoProps extends Pick<React.HTMLProps<HTMLImageElement>, 'style' | 'alt' | 'className'> {
  srcs: string[]
}

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
const TokenLogo: React.FC<TokenLogoProps> = ({ srcs, alt, ...rest }) => {
  const [, refresh] = useState<number>(0)

  const src: string | undefined = srcs.find((src) => !BAD_SRCS[src])

  // @ts-ignore margin from styled components
  delete rest.margin

  if (src) {
    return (
      <img
        {...rest}
        alt={alt}
        src={src}
        onError={() => {
          if (src) BAD_SRCS[src] = true
          refresh((i) => i + 1)
        }}
      />
    )
  }

  return <HelpCircle {...rest} />
}

export default TokenLogo
