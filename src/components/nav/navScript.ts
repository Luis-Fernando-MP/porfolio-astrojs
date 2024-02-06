import { NAV } from './themes'

const { body, documentElement } = document
document?.addEventListener('scroll', () => {
  const nav = body.querySelector('nav')
  if (!nav || !(nav instanceof HTMLElement)) return
  if (documentElement.scrollTop > 150) return nav.classList.add('active')
  nav?.classList.remove('active')
})

const links = Array(...document.querySelectorAll('a.hash-link'))
const linksContainer = document.querySelector('ul#nav-links-container')
const borderLink = linksContainer?.querySelector('div.nav-border')
const main = NAV?.parentNode as HTMLElement

const getSizeIcon = () =>
  getComputedStyle(document.body)
    .getPropertyValue('--icon-size')
    .trim()
    .replace(/px$/, '')
let GLOBAL_SIZE_ICON = getSizeIcon()

function changeActiveNav({ id: sectionId }: HTMLElement) {
  if (links.length <= 0) return
  const indexLink = (links as HTMLElement[]).findIndex(link => {
    return link.dataset.link === sectionId
  })
  if (indexLink === -1) return

  const leftNavItem = Number(GLOBAL_SIZE_ICON) * 3
  if (!(borderLink instanceof HTMLElement) || !borderLink) return
  borderLink.style.left = `${leftNavItem * indexLink}px`
  const path = window.location.pathname + `#${sectionId}`
  window.history.replaceState({}, document.title, path)
  // document.documentElement.style.setProperty(`--${color}`, colors[color])
}

function callbackObserver(entries: IntersectionObserverEntry[]) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    changeActiveNav(entry.target as HTMLElement)
  })
}

function automaticHashScroll() {
  const sections = document.querySelectorAll('.hash-nav') || []
  const options = {
    threshold: 0.5
  }
  const observer = new IntersectionObserver(callbackObserver, options)
  sections.forEach(section => observer.observe(section))
}

document.addEventListener('DOMContentLoaded', () => {
  automaticHashScroll()
})

//Used because the size is changed in the "media Query" to 15px
//layouts/layout.scc line 6
const mediaQuery = window.matchMedia('(max-width: 576px)')
function handleMediaQueryChange() {
  GLOBAL_SIZE_ICON = getSizeIcon()
  automaticHashScroll()
}
mediaQuery.addEventListener('change', handleMediaQueryChange)

// Nav style
document.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop
  if (scrollPosition > 50) return main?.classList.add('scroll')
  main?.classList.remove('scroll')
})
