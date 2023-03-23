
class d {
  constructor(tokens, current) {
    this.tokens = tokens
    this.current = current
    this.add()
  }

  add() {
    this.current += 1
    this.sub()
  }
}

class c extends d {
  constructor(tokens, current) {
    super(tokens, current)
    this.sub()
  }

  sub() {
    this.current -= 1
  }
}

class b extends c {
  constructor(tokens, current) {
    super(tokens, current)
    this.bu()
  }

  bu() {
    this.current += 2
  }
}

class a extends b {
  constructor(tokens, current) {
    super(tokens, current)
    const num = this.getCurrent()
    console.log('num', num)
  }

  getCurrent() {
    return this.current
  }

}


const arr = [1, 2, 3, 4, 5]
const obj = new a(arr, 0)

// 输出了什么
console.log(obj)
