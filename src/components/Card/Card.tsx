import { BoxProps } from 'rebass'
import styled from 'styled-components/macro'

interface CardProps extends BoxProps {
  padding?: string
  border?: string
  borderRadius?: string
}
const Card = styled.div<CardProps>`
  width: 100%;
  border-radius: 6px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  box-sizing: border-box;
`

export default Card
