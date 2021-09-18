import styled from 'styled-components/macro'

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`

export const ActiveText = styled.div`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 20px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.text[500]};
  @media (max-width: ${(props) => props.theme.breakpoints.md}px) {
    font-size: 16px;
  }
`
