import styled from 'styled-components/macro'

export const PageCard = styled.div`
  box-sizing: border-box;
  margin-top: 120px;
  width: 640px;
  border-radius: 14px;
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
  border-radius: 14px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background-color: ${(props) => props.theme.color.grey[400]};
  color: ${(props) => props.theme.color.grey[600]};
  h4, p {
    margin: 0;
  }
`
