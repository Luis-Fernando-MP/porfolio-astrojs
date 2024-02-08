import type { TFilter } from '@components/filters/Filters'
import type { IProjectBlock } from '@pages/projects/ProjectsBlock'
import Autosuggest from 'react-autosuggest'
import { useState, type JSX, type ReactNode, type FC } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { randomID } from '@/utils/randomID'
import { Filters, Suggestion } from '@components/index'
import './style.scss'

import workExperiences from '@data/workExperiences.json'
type temporal = (typeof workExperiences)[0]

type TypesFilterBlock = IProjectBlock | temporal

type TFilterBlock = {
  children?: ReactNode[] | ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RenderItemComponent: FC<any>
  dataBlock: TypesFilterBlock[]
  filters: TFilter[]
  publicName: string
  onFilterData: (currentValue: string) => TypesFilterBlock[]
}

const FilterBlock: FC<TFilterBlock> = ({
  dataBlock,
  filters,
  onFilterData,
  publicName,
  RenderItemComponent
}): JSX.Element => {
  const [parent] = useAutoAnimate()
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState(dataBlock)

  const filterAndSetSuggestion = ({ value }) => {
    const cleanValue = value.trim().toLowerCase()
    const filterData = onFilterData(cleanValue)
    setData(filterData)
  }

  const renderSuggestion = (suggestion: TypesFilterBlock) => {
    const { title, description, background } = suggestion
    const props = {
      title,
      description,
      image: `/${publicName}/${background}`
    }
    return <Suggestion {...props} key={randomID(title)} />
  }

  return (
    <section className='filterBlock'>
      <Autosuggest
        suggestions={data}
        onSuggestionsFetchRequested={filterAndSetSuggestion}
        focusInputOnSuggestionClick={true}
        getSuggestionValue={suggestion => suggestion.title}
        onSuggestionsClearRequested={() => {}}
        onSuggestionSelected={(_, data) => setData([data.suggestion])}
        renderSuggestion={renderSuggestion}
        highlightFirstSuggestion
        alwaysRenderSuggestions
        inputProps={{
          placeholder: '¿Quieres buscar algo en particular?',
          value: inputValue,
          onChange: (_, { newValue }) => setInputValue(newValue)
        }}
      />
      <Filters
        data={dataBlock}
        filters={filters}
        onFilter={newData => setData(newData)}
      />
      <ul ref={parent}>
        {data.map(itemData => (
          <RenderItemComponent key={itemData.title} {...itemData} />
        ))}
      </ul>
    </section>
  )
}

export default FilterBlock
