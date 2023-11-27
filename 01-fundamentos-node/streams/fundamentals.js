// usando o pipe para ligar uma stream de leitura em uma de saida
// process.stdin
//   .pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream'

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

// Stream de tranformação, que inverte o sinal do número que receber
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, transformed.toString())
  }
}

// Stream de escrita que log no console o número recebido multiplicado por 10
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())