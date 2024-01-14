import { codeIcons } from '@icons/code/'

type TCodeIcon = typeof codeIcons.AstroJs
type THistory = TCodeIcon & {
  left: number
  top: number
  right: number
  bottom: number
  animation: number
  haveBG: boolean
}

let history: THistory[] = []
const additionalHeader = document.querySelector(
  'ul.header-additional__container'
) as HTMLElement

const createNewIconData = (icon: TCodeIcon): THistory => {
  const SIZE_ICON = 80
  const RLeft = Math.random() * (additionalHeader?.offsetWidth - SIZE_ICON)
  const RTop = Math.random() * (additionalHeader.offsetHeight - SIZE_ICON)

  return {
    ...icon,
    left: RLeft,
    top: RTop - 50,
    right: RLeft + SIZE_ICON,
    bottom: RTop + SIZE_ICON,
    animation: Math.random() * 5 + 4,
    haveBG: Math.floor(Math.random() * 19) % 2 === 0
  }
}

const pushHistory = () => {
  const iconKeys = Object.keys(codeIcons)

  for (let i = 0; i < 7; i++) {
    const randomIconKey = iconKeys[Math.floor(Math.random() * iconKeys.length)]
    const newIcon = createNewIconData(codeIcons[randomIconKey])
    history.push(newIcon)
    if (history.length % 7 === 0) break
  }

  const tempHistorySet = new Set<string>()
  const filterHistory: THistory[] = []

  for (const tempIcon of history) {
    if (tempHistorySet.has(tempIcon.src)) continue
    tempHistorySet.add(tempIcon.src)
    filterHistory.push(tempIcon)
  }
  history = [...filterHistory]
  if (history.length < 14) return pushHistory()
  history.splice(0, 6)

  history = [...updatedLocationIcons()]
}

const updatedLocationIcons = () =>
  history.map((icon, index, array) => {
    const shouldUpdate = array.some((otherIcon, otherIndex) => {
      if (index !== otherIndex) {
        const verticalDifference =
          Math.abs(icon.top - otherIcon.top) <= 100 ||
          Math.abs(icon.bottom - otherIcon.bottom) <= 100
        const horizontalDifference =
          Math.abs(icon.left - otherIcon.left) <= 100 ||
          Math.abs(icon.right - otherIcon.right) <= 100

        return verticalDifference || horizontalDifference
      }
      return false
    })
    if (!shouldUpdate) return icon
    const newLeft = Math.min(
      Math.max(icon.left - 50, 0),
      additionalHeader.offsetWidth - icon.width
    )
    return { ...icon, left: newLeft }
  })

const drawIcons = ({ src, left, top, animation, haveBG, color }: THistory) => {
  const iconElement = document.createElement('li')
  iconElement.classList.add('header-additional__icon')
  if (haveBG) iconElement.classList.add('differentIcon')
  iconElement.innerHTML = `<img src="${src}" >`
  iconElement.style.setProperty('--optional-animation', `${animation}s`)
  iconElement.style.setProperty('--optional-background', `${color}`)

  iconElement.style.left = `${left}px`
  iconElement.style.top = `${top}px`

  additionalHeader.appendChild(iconElement)
}

function bootstrap() {
  if (!additionalHeader || !(additionalHeader instanceof HTMLElement)) return
  additionalHeader.innerHTML = ''
  pushHistory()
  history.forEach(icon => drawIcons(icon))
}

setInterval(bootstrap, 9000)
bootstrap()
