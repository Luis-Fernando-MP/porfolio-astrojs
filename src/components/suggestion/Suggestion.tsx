import type { JSX, FC, ReactNode } from 'react'
import './style.scss'
import './responsiveStyle.scss'

type TSuggestion = {
  children?: ReactNode[]
  image: string
  title: string
  description: string
}

const Suggestion: FC<TSuggestion> = ({
  description,
  image,
  title
}): JSX.Element => {
  return (
    <>
      <img src={image} alt={title} className='suggestion-image' />
      <div className='suggestion-info'>
        <h4 className='suggestion-title'>{title.slice(0, 50)}</h4>
        <p className='suggestion-shortDescription'>
          {description.slice(0, 100)}...
        </p>
      </div>
    </>
  )
}

export default Suggestion
