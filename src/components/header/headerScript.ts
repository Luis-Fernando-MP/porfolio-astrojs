import codeIcons from '@data/programmingLanguages.json'

type TCodeIcon = (typeof codeIcons)[0]
type THistory = TCodeIcon & {
  left: number
  top: number
  animation: number
  haveBG: boolean
}

let history: string[] = []
const additionalHeader = document.querySelector(
  'ul.header-additional__container'
) as HTMLElement
let tempLeftIconsPosition = 0

const createNewIconData = (icon: TCodeIcon): THistory => {
  const RLeft = tempLeftIconsPosition
  return {
    ...icon,
    top: Math.random() * 80,
    left: RLeft,
    animation: Math.random() * 3 + 4.5,
    haveBG: Math.floor(Math.random() * 19) % 2 === 0
  }
}

const pushHistory = () => {
  const iconKeys = Object.keys(codeIcons)
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    const randomIconKey = iconKeys[Math.floor(Math.random() * iconKeys.length)]
    history.push(randomIconKey)
    if (history.length % 7 === 0) break
  }
  const filterHistory: string[] = []
  for (const tempKey of history) {
    if (filterHistory.includes(tempKey)) continue
    filterHistory.push(tempKey)
  }
  history = [...filterHistory]
  if (history.length < 14) return pushHistory()
  history.splice(0, 6)
}

const drawIcons = ({ src, left, animation, haveBG, color, top }: THistory) => {
  const iconElement = document.createElement('li')
  iconElement.classList.add('header-additional__icon')
  if (haveBG) iconElement.classList.add('differentIcon')
  iconElement.innerHTML = `<img src="${src}" >`
  iconElement.style.setProperty('--optional-animation', `${animation}s`)
  iconElement.style.setProperty('--optional-background', `${color}20`)
  iconElement.style.left = `${left}px`
  iconElement.style.top = `${top}%`
  additionalHeader.appendChild(iconElement)
}

function bootstrap() {
  if (!additionalHeader || !(additionalHeader instanceof HTMLElement)) return
  additionalHeader.innerHTML = ''
  pushHistory()
  for (const iconKey of history) {
    const newIcon = createNewIconData(codeIcons[iconKey])
    drawIcons(newIcon)
    tempLeftIconsPosition += additionalHeader?.offsetWidth / 7
  }
  tempLeftIconsPosition = 0
}

setInterval(bootstrap, 6700)
bootstrap()
