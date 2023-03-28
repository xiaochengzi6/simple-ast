const map = new Map()
map.set(0, {
  start: 0,
  end: 1
})

map.set(1, {
  start: 2, 
  end: 3
})

map.set(2, {
  start: 3,
  end: 5
})

console.log(map)
const value = new Set(map.values())

console.log(value)

const arr = Array.from(map.values())
console.log(arr)