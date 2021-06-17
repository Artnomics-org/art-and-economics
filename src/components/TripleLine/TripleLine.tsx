import React from 'react'
import styled from 'styled-components/macro'

interface TripleLineProps {
  color: string | string[]
}

const TripleLine: React.FC<TripleLineProps> = ({ color }) => {
  const getColor = (color: string | string[], index: number) => {
    if (Array.isArray(color)) {
      return color[index]
    }
    return color
  }
  return (
    <StyledTripleLine>
      {[...Array<number>(3).keys()].map(i => (
        <StyledLine color={getColor(color, i)} key={`line-${i}`} />
      ))}
    </StyledTripleLine>
  )
}

const StyledTripleLine = styled.div`
  width: 100%;
`

interface StyledLineProps {
  color: string
}

const StyledLine = styled.div<StyledLineProps>`
  width: 100%;
  height: 2px;
  margin: 0 0 4px;
  background-color: ${(props) => props.color};
`

export default TripleLine
