import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { darken } from 'polished'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children?: React.ReactNode,
  disabled?: boolean,
  href?: string,
  onClick?: () => void,
  size?: 'sm' | 'md' | 'lg',
  text?: string,
  to?: string,
  variant?: 'default' | 'secondary' | 'tertiary'
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
}) => {
  const { spacing, color } = useContext(ThemeContext)

  let buttonColor: string
  switch (variant) {
    case 'secondary':
      buttonColor = color.text[500]
      break
    case 'default':
    default:
      buttonColor = color.white
  }

  let buttonSize: number
  let buttonPadding: number
  let fontSize: number
  switch (size) {
    case 'sm':
      buttonPadding = spacing[3]
      buttonSize = 40
      fontSize = 14
      break
    case 'lg':
      buttonPadding = spacing[4]
      buttonSize = 72
      fontSize = 16
      break
    case 'md':
    default:
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    const ele = text || children
    if (to) {
      return <StyledLink to={to}>{ele}</StyledLink>
    } else if (href) {
      return <StyledExternalLink href={href} target="__blank">{ele}</StyledExternalLink>
    } else {
      return ele
    }
  }, [children, href, text, to])

  return (
    <StyledButton
      color={buttonColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
    >
      {ButtonChild}
    </StyledButton>
  )
}

interface StyledButtonProps {
  color: string,
  disabled?: boolean,
  fontSize: number,
  padding: number,
  size: number
}

const StyledButton = styled.button<StyledButtonProps>`
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: solid 2px ${({ color, disabled }) => !disabled ? color : `${color}55`};
  color: ${({ color, disabled }) => !disabled ? color : `${color}55`};
  font-family: 'Helvetica Neue LT W05_93 Blk E';
  font-size: ${({ fontSize }) => fontSize}px;
  text-transform: uppercase;
  height: ${({ size }) => size}px;
  padding-left: ${({ padding }) => padding}px;
  padding-right:${({ padding }) => padding}px;
  pointer-events: ${({ disabled }) => !disabled ? undefined : 'none'};
  width: 100%;
  &:hover {
    color: ${({ color }) => darken(0.25, color)};
    border-color: ${({ color }) => darken(0.25, color)};
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${({ theme }) => -theme.spacing[4]}px;
  padding: 0 ${({ theme }) => theme.spacing[4]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${({ theme }) => -theme.spacing[4]}px;
  padding: 0 ${({ theme }) => theme.spacing[4]}px;
  text-decoration: none;
`

export default Button