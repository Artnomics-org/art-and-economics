import styled from 'styled-components/macro'

interface SwapWrapperProps {
  bg: string
}
export const SwapWrapper = styled.div<SwapWrapperProps>`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.grey[500]};
  background-image: url(${props => props.bg});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: bottom center;
  margin-bottom: -18px;
`

export const SwapBody = styled.div`
  max-width: ${props => props.theme.siteWidth}px;
  margin-left: auto;
  margin-right: auto;
`

export const Title = styled.h1`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 36px;
  text-align: center;
  color: ${props => props.theme.color.white};
  text-transform: uppercase;
  margin-top: 104px;
  margin-bottom: 88px;
`

export const IconArrow = styled.img`
  object-fit: contain;
  height: 160px;
  position: absolute;
  right: 30px;
  bottom: 320px;
`

export const InputBody = styled.div`
  max-width: 566px;
  margin-left: auto;
  margin-right: auto;
`
