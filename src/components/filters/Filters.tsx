import './style.scss'
import './responsiveStyle.scss'

import { randomID } from '@/utils/randomID'
import type { ImageMetadata } from 'astro'
import { type JSX, type FC, type ReactNode, useState } from 'react'
import { LowIndicatorFilter } from '@icons/index'

type TFilter = {
  icon: ImageMetadata
  name: string
}
type TFiltersData = {
  rel: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type TFilters = {
  children?: ReactNode[]
  filters: TFilter[]
  data: TFiltersData[]
  defaultFilter?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilter: (data: any) => void
}

const Filters: FC<TFilters> = ({
  data,
  onFilter,
  filters,
  defaultFilter
}): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState(defaultFilter ?? 'all')

  const handleFilter = (filter: string): void => {
    onFilter(filterData(data, filter))
    setActiveFilter(filter)
  }

  return (
    <ul className='filters'>
      <li className='filters-item'>
        <button
          className={`filters-action error ${
            activeFilter === 'all' && 'active'
          } btn`}
          onClick={() => handleFilter('all')}
        >
          <img
            src={LowIndicatorFilter.src}
            alt='no filters'
            className='pIcon'
            loading='lazy'
            decoding='async'
          />
          <p>Sin filtros</p>
        </button>
      </li>
      {filters.map(({ icon, name }) => (
        <li key={randomID(name)} className='filters-item'>
          <button
            className={`filters-action ${
              activeFilter === name && 'active'
            } btn`}
            onClick={() => handleFilter(name)}
          >
            <img
              src={icon.src}
              alt={name}
              className='pIcon'
              loading='lazy'
              decoding='async'
            />
            <p>{name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Filters

export const filterData = (data: TFilters['data'], filter: string) => {
  const newData = data.filter(item => item.rel.includes(filter))
  return filter === 'all' ? data : newData
}
