import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchListCallback } from '../../../hooks/lists'
import { AppDispatch, AppState } from '../../../state'
import { removeList } from '../../../state/lists/actions'
import { uriToHttp } from '../../../utils'
import { parseENSAddress } from '../../../utils/ethers'
import { FullColumn, PaddedColumn, SearchInput, Separator, Text } from './styleds'
import { BackIconLink } from '../../Link'
import { CloseButton } from '../../Button'
import ModalTitle from './ModalTitle'
import QuestionHelper from '../../QuestionHelper'
import Row from '../../Row'

interface ListSelectProps {
  onDismiss: () => void
  onBack: () => void
}

const ListSelect: React.FC<ListSelectProps> = ({ onDismiss, onBack }) => {
  const [listUrlInput, setListUrlInput] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const lists = useSelector<AppState, AppState['lists']['byUrl']>((state) => state.lists.byUrl)
  const adding = Boolean(lists[listUrlInput]?.loadingRequestId)
  const [addError, setAddError] = useState<string | null>(null)
  const fetchList = useFetchListCallback()

  const validUrl: boolean = useMemo(() => {
    return uriToHttp(listUrlInput).length > 0 || Boolean(parseENSAddress(listUrlInput))
  }, [listUrlInput])
  const sortedLists = useMemo(() => {
    const listUrls = Object.keys(lists)
    return listUrls
      .filter((listUrl) => {
        return Boolean(lists[listUrl].current)
      })
      .sort((u1, u2) => {
        const { current: l1 } = lists[u1]
        const { current: l2 } = lists[u2]
        if (l1 && l2) {
          return l1.name.toLowerCase() < l2.name.toLowerCase()
            ? -1
            : l1.name.toLowerCase() === l2.name.toLowerCase()
            ? 0
            : 1
        }
        if (l1) return -1
        if (l2) return 1
        return 0
      })
  }, [lists])

  const handleSearchInput = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
    setListUrlInput(e.target.value)
    setAddError(null)
  }, [])
  const handleAddList = useCallback(() => {
    if (adding) return
    setAddError(null)
    fetchList(listUrlInput)
      .then(() => {
        setListUrlInput('')
      })
      .catch((error) => {
        setAddError(error.message)
        dispatch(removeList(listUrlInput))
      })
  }, [adding, dispatch, fetchList, listUrlInput])
  const handleEnterKey = useCallback(
    (e) => {
      if (validUrl && e.key === 'Enter') {
        handleAddList()
      }
    },
    [handleAddList, validUrl],
  )

  const addListQuestion =
    'Token lists are an open specification for lists of ERC20 tokens. You can use any token list by entering its URL below. Beware that third party token lists can contain fake or malicious ERC20 tokens.'

  return (
    <FullColumn>
      <PaddedColumn>
        <BackIconLink to="#" onClick={onBack} />
        <ModalTitle>Manage Lists</ModalTitle>
        <CloseButton onClick={onDismiss} />
      </PaddedColumn>
      <Separator />
      <PaddedColumn gap="14px">
        <Text>
          Add a list <QuestionHelper text={addListQuestion} />
        </Text>
      </PaddedColumn>
      <Row>
        <SearchInput
          type="text"
          id="list-add-input"
          placeholder="https:// or ipfs:// or ENS name"
          value={listUrlInput}
          onChange={handleSearchInput}
          onKeyDown={handleEnterKey}
        />
      </Row>
    </FullColumn>
  )
}

export default ListSelect
