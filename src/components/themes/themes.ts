import themes from '@data/themes.json'

const NAME_STORAGE_THEME = 'theme'

export const themesParent = document.querySelector('div.themes')
const layoutThemes = document.querySelector('ul#themes-items')

const toggleSelectorTheme = () => {
  layoutThemes?.classList.toggle('select-theme')
}

themesParent?.addEventListener('click', ({ target }) => {
  const currentElement = target instanceof HTMLElement
  if (!currentElement || !target) return
  const btnSelector = target.closest('button#themes-selector')
  const btnTheme = target.closest('button#theme-item')
  console.log(btnSelector, btnTheme)
  if (btnSelector) {
    toggleSelectorTheme()
  } else if (btnTheme) {
    const { title } = btnTheme.parentNode as HTMLElement
    setTheme(title)
    toggleSelectorTheme()
  } else {
    layoutThemes?.classList.remove('select-theme')
  }
})

const setTheme = (selectTitleTheme: string) => {
  const currentTheme = themes.find(({ title }) => title === selectTitleTheme)
  if (!currentTheme) return
  const { colors } = currentTheme
  for (const color in colors) {
    document.documentElement.style.setProperty(`--${color}`, colors[color])
  }
  localStorage.setItem(NAME_STORAGE_THEME, selectTitleTheme)
}

const consultLocalStorage = () => {
  const storageTheme = localStorage.getItem(NAME_STORAGE_THEME)
  try {
    if (!storageTheme) return
    setTheme(storageTheme)
  } catch (error) {
    console.error(error)
  }
}

consultLocalStorage()
