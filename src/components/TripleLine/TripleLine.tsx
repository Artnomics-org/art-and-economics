import React from 'react'
import styled from 'styled-components/macro'

interface TripleLineProps {
  color: string
}

const TripleLine: React.FC<TripleLineProps> = ({ color }) => {
  return (
    <div>
      <StyledLine color={color} />
      <StyledLine color={color} />
      <StyledLine color={color} />
    </div>
  )
}

const StyledLine = styled.div<TripleLineProps>`
  width: 100%;
  height: 2px;
  margin: 0 0 4px;
  background-color: ${(props) => props.color};
`

export default TripleLine
