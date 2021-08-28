import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import Jazzicon from 'jazzicon'
import { useActiveWeb3React } from '../../hooks/wallet'

const Identicon: React.FC = () => {
  const ref = useRef<HTMLDivElement>()

  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)))
    }
  }, [account])

  return <StyledIdenticonContainer ref={ref} />
}

const StyledIdenticonContainer = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.bg};
`

export default Identicon
