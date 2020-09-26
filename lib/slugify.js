export default function Slugify(str) {
  return str
    .replace(/^\s+|\s+$/g, '') // trim
    .replace(/[^a-z0-9 -]/g, '') // remove invalid characters
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
}
