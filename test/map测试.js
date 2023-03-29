function query(arr, isMax) {
  let i = 0
  for (let j = 0; j < arr.length; j++) {
    if (isMax) {
      if (arr[j] > arr[i]) {
        i = j
      }
    } else {
      if (arr[j] < arr[i]) {
        i = j
    }
    }
  }

  return arr[i]
}

const result = query([1, 2, 3, 4, 5, 6, 7, 8, 9], true )

console.log(result)
let i = 0


