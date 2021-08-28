import React from 'react'
import styled from 'styled-components/macro'

interface TripleLineProps {
  color: string | string[]
  height?: number
  space?: number
}

const TripleLine: React.FC<TripleLineProps> = ({ color, height = 2, space = 4 }) => {
  const getColor = (color: string | string[], index: number) => {
    if (Array.isArray(color)) {
      return color[index]
    }
    return color
  }
  return (
    <StyledTripleLine>
      {[...Array<number>(3).keys()].map((i) => (
        <StyledLine color={getColor(color, i)} height={height} space={space} key={`line-${i}`} />
      ))}
    </StyledTripleLine>
  )
}

const StyledTripleLine = styled.div`
  width: 100%;
`

interface StyledLineProps {
  color: string
  height: number
  space: number
}

const StyledLine = styled.div<StyledLineProps>`
  width: 100%;
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.space}px;
  background-color: ${(props) => props.color};
`

export default TripleLine
