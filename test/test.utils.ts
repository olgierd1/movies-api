
const random = (length = 5) : string => Math.random().toString(36).substr(2, length)

export default {
  random,
}