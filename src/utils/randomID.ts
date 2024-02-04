export const randomID = (extraName: string = 'juju') => {
  return btoa(Math.random() * 100 + Date.now() + extraName)
}
