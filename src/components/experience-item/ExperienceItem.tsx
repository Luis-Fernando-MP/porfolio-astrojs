import './style.scss'
import './responsiveStyle.scss'

import workExperiences from '@data/workExperiences.json'
import type { JSX, FC, ReactNode } from 'react'
import { slugify } from '@/utils/format'
import { Eye } from '@icons/index'

type IWorkExperience = (typeof workExperiences)[0]
interface TExperienceItem extends IWorkExperience {
  children?: ReactNode[]
}
const ExperienceItem: FC<TExperienceItem> = ({ ...work }): JSX.Element => {
  const { background, title, date, url } = work
  const etc = title.length > 25 ? '...' : ''
  return (
    <section className='experienceItem'>
      <aside className='experienceItem-company'>
        <img
          src='/me.webp'
          alt='foto luis Fernando'
          loading='lazy'
          decoding='async'
          width={20}
          height={20}
        />
        <a href={url || '#'} target={url && '_blank'} rel='noopener noreferrer'>
          <img
            src={`/companies/${background}`}
            alt={title}
            loading='lazy'
            decoding='async'
            width={20}
            height={20}
          />
        </a>
      </aside>
      <h3>{title.slice(0, 25) + etc}</h3>
      <p>{date}</p>
      <a
        className='experienceItem-anchor btn'
        href={`/works/${slugify(title)}`}
      >
        <img
          src={Eye.src}
          alt='view more'
          loading='lazy'
          decoding='async'
          width={20}
          height={20}
        />
        <p>Inspeccionar</p>
      </a>
    </section>
  )
}

export default ExperienceItem
