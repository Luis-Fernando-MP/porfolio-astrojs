import type { JSX } from 'react'
import FilterBlock from '@components/filterBlock/FilterBlock'
import workExperiences from '@data/workExperiences.json'
import {
  OldManSmiling,
  NoBaggage,
  Lecturer,
  BallerinaFullBody,
  SourceCode
} from '@icons/index'
import { ExperienceItem } from '@components/index'

export type IWorkExperience = (typeof workExperiences)[0]

const filters = [
  {
    icon: OldManSmiling,
    name: 'Mas tiempo'
  },
  {
    icon: BallerinaFullBody,
    name: 'Practicante'
  },
  {
    icon: Lecturer,
    name: 'Cabecilla de equipo'
  },
  {
    icon: NoBaggage,
    name: 'No relacionados'
  },
  {
    icon: SourceCode,
    name: 'desarrollado web'
  }
]

const ProjectsBlock = (): JSX.Element => {
  const handleFilterData = (currentValue: string) => {
    const filterData = workExperiences.filter(
      work =>
        work.title.toLowerCase().includes(currentValue) ||
        work.description.toLowerCase().includes(currentValue) ||
        work.finalArgument.toLowerCase().includes(currentValue) ||
        work.position.toLowerCase().includes(currentValue) ||
        work.rel.some(keyword =>
          keyword.toLowerCase().includes(currentValue)
        ) ||
        work.responsibilities.some(keyword =>
          keyword.toLowerCase().includes(currentValue)
        )
    )
    return filterData
  }

  return (
    <section>
      <FilterBlock
        dataBlock={workExperiences}
        filters={filters}
        onFilterData={handleFilterData}
        publicName='companies'
        RenderItemComponent={ExperienceItem}
      />
    </section>
  )
}

export default ProjectsBlock
