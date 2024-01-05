# Opções de deploy

- [Render](render.com)
- [Fly](fly.io)
- [Railway](railway.app)

# Deploy no render

- Criar conta
- Criar novo banco Postgres
    - Copiar a internal database url
- Criar um novo webservice e conectálo a um repositório de seu git
    - Definir um nome
    - Hospedar na mesma localização do banco
    - Selecionar a branch (caso tenha mais de uma)
    - A pasta raiz (caso haja mais de um projeto no repositório)
    - No build command coloque o comando completo para gerar o build do projeto
      ```bash
        # instale as dependências
        # rode as migrations
        # gere o build
        npm install && npm run knex -- migrate:latest && npm run build
      ```
    - No start command coloque `node build/server.js`
    - Escolha o plano free ou o que preferir.
    - Clique em advanced e adicione as variáveis de ambiente:
        - DATABASE_CLIENT ('pg' já que é o banco opensource que tem no render)
        - DATABASE_URL (internal database url que você copio anteriormente)
    **Ponto de atenção** a variável PORT é criada automaticamente pelo render como uma string.
    - Clique em "Create Web Service"
- O deploy vai começar em seguida
- O endereço (url) vai estar disponível na página do seu web service no render