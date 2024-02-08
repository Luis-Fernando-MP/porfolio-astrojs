import type { JSX, FC, ReactNode } from 'react'

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
      <h3>{title}</h3>
      <p>{description}...</p>
      <img src={image} alt={title} width={50} />
    </>
  )
}

export default Suggestion
