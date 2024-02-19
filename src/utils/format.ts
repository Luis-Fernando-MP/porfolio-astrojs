export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC'
  })
}

export function getName(path: string) {
  const completePath = path.split('/').pop()
  if (!completePath) return 'custom'
  const removeExtension = completePath.split('.')[0]
  return removeExtension
}
