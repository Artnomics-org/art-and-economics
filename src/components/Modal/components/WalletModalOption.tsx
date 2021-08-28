/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import styled from 'styled-components/macro'
import { ExternalLink } from '../../Link'

interface WalletModalOptionProps {
  id: string
  color: string
  header: React.ReactNode
  subheader: React.ReactNode | null
  icon: string
  active?: boolean
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
}

const WalletModalOption: React.FC<WalletModalOptionProps> = ({
  id,
  size,
  color,
  header,
  icon,
  active = false,
  subheader = null,
  onClick = null,
  clickable = true,
  link = null,
}) => {
  const content = (
    <OptionCardClickable id={id} onClick={onClick} clickable={clickable && !active} active={active}>
      <OptionCardLeft>
        <HeaderText color={color}>
          {active ? (
            <CircleWrapper>
              <GreenCircle>
                <div />
              </GreenCircle>
            </CircleWrapper>
          ) : (
            ''
          )}
          {header}
        </HeaderText>
        {subheader && <SubHeader>{subheader}</SubHeader>}
      </OptionCardLeft>
      <IconWrapper size={size}>
        <img src={icon} alt={'Icon'} />
      </IconWrapper>
    </OptionCardClickable>
  )

  if (link) {
    return <ExternalLink href={link}>{content}</ExternalLink>
  }

  return content
}

const InfoCard = styled.button<{ active?: boolean }>`
  background-color: ${({ theme, active }) => (active ? theme.color.bg : theme.color.grey[500])};
  padding: 1rem;
  outline: none;
  border: 1px solid;
  border-radius: 6px;
  width: 100% !important;
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.primary1};
  }
  border-color: ${({ theme, active }) => (active ? 'transparent' : theme.color.grey[500])};
`

const OptionCard = styled(InfoCard as any)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`

const OptionCardLeft = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: 100%;
`

const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean }>`
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.color.text[400]}` : ``)};
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`

const GreenCircle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.color.green[500]};
    border-radius: 50%;
  }
`

const CircleWrapper = styled.div`
  color: ${({ theme }) => theme.color.green[500]};
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderText = styled.div`
  display: flex;
  flex-flow: row nowrap;
  color: ${(props) =>
    props.color === 'blue' ? ({ theme }) => theme.color.text[500] : ({ theme }) => theme.color.text[400]};
  font-size: 1rem;
  font-weight: 500;
`

const SubHeader = styled.div`
  color: ${({ theme }) => theme.color.text[500]};
  margin-top: 10px;
  font-size: 12px;
`

const IconWrapper = styled.div<{ size?: number | null }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
  /* ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `}; */
`

export default WalletModalOption
