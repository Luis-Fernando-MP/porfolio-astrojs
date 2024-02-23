import './style.scss'
import './responsiveStyle.scss'

import type { TFilter } from '@components/filters/Filters'
import type { IWorkExperience } from '@pages/works/indexBlock'
import type { IProjectBlock } from '@pages/projects/indexBlock'
import Autosuggest from 'react-autosuggest'
import { useState, type JSX, type ReactNode, type FC } from 'react'
import { randomID } from '@/utils/randomID'
import { Filters, Suggestion } from '@components/index'

type TypesFilterBlock = IProjectBlock | IWorkExperience

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
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState(dataBlock)

  const filterAndSetSuggestion = ({ value }: { value: string }) => {
    const validateStringRegex = /^[a-zA-Z\s,]*$/
    if (!validateStringRegex.test(value)) {
      return setInputValue(value.slice(0, value.length - 1))
    }
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
      <article className='filterBlock-form'>
        <Autosuggest
          theme={{}}
          suggestions={data}
          onSuggestionsFetchRequested={filterAndSetSuggestion}
          focusInputOnSuggestionClick={true}
          getSuggestionValue={suggestion => suggestion.title}
          onSuggestionsClearRequested={() => {}}
          onSuggestionSelected={(_, data) => setData([data.suggestion])}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: '¿Qué proyecto buscas? 🐶',
            value: inputValue,
            onChange: (_, { newValue }) => setInputValue(newValue)
          }}
        />
        <section className='filterBlock-filters'>
          {inputValue.length <= 0 && (
            <Filters
              data={dataBlock}
              filters={filters}
              onFilter={newData => setData(newData)}
            />
          )}
        </section>
      </article>
      <ul className='filterBlock-data'>
        {data.map(itemData => (
          <RenderItemComponent key={itemData.title} {...itemData} />
        ))}
      </ul>
      {data.length < 1 && (
        <article className='filterBlock-nothing'>
          <h4>Ups!! no hay nada por aca 😥</h4>
          <img src='./nothing.gif' alt='nothing bro' />
        </article>
      )}
    </section>
  )
}

export default FilterBlock
