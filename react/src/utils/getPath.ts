export const getPath = (path: string | undefined) => {
  if (typeof path == 'undefined') {
    return ''
  }
  
  return new URL(`../assets/${path}`, import.meta.url).href
}