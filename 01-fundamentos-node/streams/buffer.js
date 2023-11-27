// buffer -> representação de um espaço na memória do computador
// usado para transitar dados de maneira muito rápida
// pois os dados são guardadas de maneira binária, 
// e por isso são mais rápidos de ler e escrever na memória

const buf = Buffer.from("Hello")

console.log(buf)
console.log(buf.toJSON())