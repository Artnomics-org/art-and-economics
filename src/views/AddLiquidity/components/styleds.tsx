import styled from 'styled-components/macro'
import { AutoColumn } from '../../../components/Column'

export const PageCard = styled.div`
  box-sizing: border-box;
  margin-top: 80px;
  margin-bottom: 80px;
  width: 640px;
  border-radius: 13.5px;
  border: solid 2px ${(props) => props.theme.color.grey[600]};
  padding: 20px;
  background-color: ${(props) => props.theme.color.bg};
  position: relative;
  overflow: hidden;
`

export const Wrapper = styled.div`
  position: relative;
`

export const ContentCard = styled.div`
  border-radius: 13.5px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background-color: ${(props) => props.theme.color.grey[400]};
  color: ${(props) => props.theme.color.grey[600]};
  h4,
  p {
    margin: 0;
  }
`

export const PositionCard = styled(AutoColumn)`
  margin-top: -60px;
  width: 520px;
  box-sizing: border-box;
  margin-bottom: 80px;
  position: relative;
  overflow: hidden;
`

export const SmallText = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 14px;
`
