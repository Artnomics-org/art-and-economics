import styled from 'styled-components/macro'
import { Link as RouterLink } from 'react-router-dom'

export const PoolWrapper = styled.div`
  flex: 1;
  max-width: ${props => props.theme.siteWidth}px;
  padding-top: 94px;
  padding-bottom: 82px;
`

export const VoteCard = styled.div`
  width: 100%;
  margin-bottom: 40px;
`

export const Title = styled.h1`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 36px;
  letter-spacing: 2.1px;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.grey[600]};
  margin-bottom: 16px;
`

export const Content = styled.p`
  font-family: 'Helvetica Neue LT W05_53 Ext';
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.6px;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.grey[600]};
`

export const Link = styled.a`
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 54px;
`

export const Button = styled.button`
  appearance: none;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 60px;
  border: solid 2px ${(props) => props.theme.color.grey[600]};
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  font-family: 'Helvetica Neue LT W05_53 Ext';
  text-transform: uppercase;
  color: ${(props) => props.theme.color.grey[600]};
  background-color: transparent;
  min-width: 271px;
  margin: 0;
`

export const Info = styled.p`
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.6px;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.color.grey[600]};
`

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

export const PositionCardWrapper = styled.div`
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 48px;
`
