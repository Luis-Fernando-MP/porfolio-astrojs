import './style.scss'
import './responsiveStyle.scss'
import {
  AdministrativeTools,
  Database,
  MySql,
  Picasso,
  SourceCode,
  ViewMore
} from '@icons/index'
import { useState, type JSX } from 'react'
import technologies from '@data/programmingLanguages.json'
import { Filters } from '@components/index'
import { randomID } from '@/utils/randomID'
import { filterData } from '@components/filters/Filters'

const filters = [
  {
    icon: AdministrativeTools,
    name: 'Herramientas de desarrollo'
  },
  {
    icon: SourceCode,
    name: 'Lenguajes de programación'
  },
  {
    icon: MySql,
    name: 'Desarrollo backend'
  },
  {
    icon: Picasso,
    name: 'Desarrollo frontend'
  },
  {
    icon: Database,
    name: 'Base de datos'
  },
  {
    icon: ViewMore,
    name: 'Otros'
  }
]

const DEFAULT_FILTER = filters[0].name

const Technologies = (): JSX.Element => {
  const [skills, setSkills] = useState(filterData(technologies, DEFAULT_FILTER))

  return (
    <section className='skills section'>
      <article className='skills-filters'>
        <h2 className='sub-title'>
          Mis <b className='dg'>Habilidades</b>
          <br />
          Tecnológicas
        </h2>
        <p className='skills-description'>
          Mi evolución en el desarrollo Full-Stack me ha posibilitado la
          integración de habilidades adquiridas y en constante crecimiento,
          guiada por las mejores prácticas. Esta transformación se refleja en mi
          pasión por la entrega de un servicio excepcional.
        </p>
        <h3>Filtrar por:</h3>
        <Filters
          data={technologies}
          filters={filters}
          onFilter={newData => setSkills(newData)}
          defaultFilter={DEFAULT_FILTER}
        />
      </article>
      <ul className='skills-technologies'>
        {skills.map(skill => {
          const { color, name, src, state } = skill
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const itemStyle = { '--color-skill': color + '30' } as any
          return (
            <li
              className='skills-technology'
              key={randomID(name)}
              style={itemStyle}
            >
              <p>{name}</p>
              <img src={src} alt={name} />
              <div className='skills-technology__description'>
                <span>{name}</span>
                <p>{state}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Technologies
