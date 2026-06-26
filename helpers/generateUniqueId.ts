export default function generateUniqueId(prefix: string = ''): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return prefix + crypto.randomUUID()
  }

  return (
    prefix +
    Date.now().toString(36) +
    '-' +
    Math.random().toString(36).slice(2, 10)
  )
}
