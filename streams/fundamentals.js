// process.stdin
//   .pipe(process.stdout)

import { Readable } from 'node:stream'

// Uma stream de leitura que retorna números de 1 até 100 de 1 em 1 segundo
class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        // só podemos enviar buffers ou string de uma stream
        const buf = Buffer.from(i.toString())
  
        // outra opção seria enviar somente i.toString() ao invés de buf
        this.push(buf)
      }
    }, 1000)
  }
}

new OneToHundredStream()
  .pipe(process.stdout)