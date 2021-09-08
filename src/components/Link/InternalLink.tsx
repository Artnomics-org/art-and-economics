import styled from 'styled-components/macro'
import { Link as RouterLink } from 'react-router-dom'

export const InternalLink = styled(RouterLink)`
  display: inline-block;
  font-family: 'Helvetica Neue LT W05_53 Ext';
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.6px;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.grey[600]};
  text-decoration: underline;
`

export const BlackInternalLink = styled(InternalLink)`
  font-family: inherit;
  align-self: center;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.grey[600]};
  text-decoration: none;
  padding: 10px 16px;
`
