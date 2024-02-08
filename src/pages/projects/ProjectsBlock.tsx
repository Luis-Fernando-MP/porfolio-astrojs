import FilterBlock from '@components/filterBlock/FilterBlock'
import { Project } from '@components/index'
import dataProjects from '@data/projects.json'
import { ArtificialIntelligence, Database, MySql, Picasso } from '@icons/index'
import type { JSX } from 'react'

export type IProjectBlock = (typeof dataProjects)[0]

const filters = [
  {
    icon: MySql,
    name: 'Tecnologías backend'
  },
  {
    icon: ArtificialIntelligence,
    name: 'Con Inteligencia Artificial'
  },
  {
    icon: Picasso,
    name: 'Tecnologías frontend'
  },
  {
    icon: Database,
    name: 'Base de datos'
  }
]

const ProjectsBlock = (): JSX.Element => {
  const handleFilterData = (currentValue: string) => {
    const filterData = dataProjects.filter(
      project =>
        project.title.toLowerCase().includes(currentValue) ||
        project.description.toLowerCase().includes(currentValue) ||
        project.state.toLowerCase().includes(currentValue) ||
        project.rel.some(keyword =>
          keyword.toLowerCase().includes(currentValue)
        )
    )
    return filterData
  }

  return (
    <section>
      <FilterBlock
        dataBlock={dataProjects}
        filters={filters}
        onFilterData={handleFilterData}
        publicName='projects'
        RenderItemComponent={Project}
      />
    </section>
  )
}

export default ProjectsBlock
