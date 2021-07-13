import styled from 'styled-components/macro'

interface SwapWrapperProps {
  bg: string
}
export const SwapWrapper = styled.div<SwapWrapperProps>`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.grey[500]};
  background-image: url(${(props) => props.bg});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: bottom center;
  margin-bottom: -18px;
`

export const SwapBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  max-width: ${(props) => props.theme.siteWidth}px;
  margin-left: auto;
  margin-right: auto;
`

export const Title = styled.h1`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 36px;
  text-align: center;
  color: ${(props) => props.theme.color.white};
  text-transform: uppercase;
  margin-top: -56px;
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
  width: 566px;
  margin-left: auto;
  margin-right: auto;
`

export const ErrorText = styled.p<{ severity?: 0 | 1 | 2 | 3 | 4 }>`
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme, severity }) =>
    severity === 3 || severity === 4
      ? theme.color.red[500]
      : severity === 2
      ? theme.color.yellow
      : severity === 1
      ? theme.color.text[500]
      : theme.color.green[500]};
`

export const Text = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.text[500]};
`

export const SectionBreak = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.color.grey[500]};
  margin: 8px 0;
`

export const BottomGrouping = styled.div`
  margin-top: 50px;
`

export const TradePriceText = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.color.text[500]};
`

export const AdvancedCard = styled.div`
  width: 100%;
  padding: 16px;
  color: ${({ theme }) => theme.color.text[400]};
  border: 1px solid ${({ theme }) => theme.color.grey[600]};
  border-radius: 13.5px;
`
