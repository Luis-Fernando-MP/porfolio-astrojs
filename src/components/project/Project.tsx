import './style.scss'
import './responsiveStyle.scss'
import type { IProject } from '@components/projects/Projects.astro'
import { Figma, GitHub, Internet } from '@icons/index'
import type { JSX, FC, ReactNode } from 'react'

interface TProject extends IProject {
  children?: ReactNode[]
}

const iconLinks = {
  figma: Figma,
  github: GitHub,
  web: Internet
}

const Project: FC<TProject> = (props): JSX.Element => {
  const { background, description, links, title, state } = props

  return (
    <li
      className={`project ${state === 'terminado' ? 'finish' : 'progress'}`}
      data-state={state}
    >
      <div className='project-background'>
        <img src={`./projects/${background}`} alt={title} />
      </div>
      <section className='project-description'>
        <h4>{title.slice(0, 35)}...</h4>
        <p>{description.slice(0, 70)}...</p>
        <aside className='project-links'>
          {Object.entries(links)
            .filter(link => link[1] !== '')
            .map(([name, link]) => (
              <a
                key={name}
                href={link}
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='icon'>
                  <img src={iconLinks[name].src} alt={name} />
                </div>
              </a>
            ))}
        </aside>
      </section>
    </li>
  )
}

export default Project
