# Dockerfile
# Este arquivo deve estar na RAIZ do seu projeto.

# --- Stage 1: Build do Frontend ---
# Usamos uma imagem Node.js para construir a aplicação frontend.
FROM node:20-alpine AS frontend_builder

# Define o diretório de trabalho dentro do container para o frontend.
WORKDIR /app/frontend

# Copia os arquivos de configuração de dependências do frontend.
# Isso permite que o Docker utilize o cache de camadas se esses arquivos não mudarem.
# Os caminhos são relativos à pasta onde o Dockerfile está (a raiz do seu projeto).
COPY app/frontend/package.json app/frontend/package-lock.json ./

# Instala as dependências do frontend.
# O '--omit=dev' é opcional aqui, mas ajuda a reduzir o tamanho da imagem temporária.
# O '--force' é um fallback caso haja problemas de compatibilidade/resolução de dependências.
# Tente sem ele primeiro e adicione se houver erros de instalação.
RUN npm install --omit=dev --force

# Copia o restante dos arquivos do frontend.
COPY app/frontend/ .

# Executa o comando de build do frontend.
# ESTE COMANDO DEVE ESTAR DEFINIDO NO 'scripts' do package.json do seu frontend (app/frontend/package.json).
# Ex: "build": "react-scripts build" ou "build": "vue-cli-service build"
RUN npm run build

# --- Stage 2: Build do Backend ---
# Usamos outra imagem Node.js para instalar as dependências do backend.
FROM node:20-alpine AS backend_builder

# Define o diretório de trabalho dentro do container para o backend.
WORKDIR /app/backend

# Copia os arquivos de configuração de dependências do backend.
COPY app/backend/package.json app/backend/package-lock.json ./

# Instala as dependências do backend.
# O '--omit=dev' garante que as dependências de desenvolvimento não sejam incluídas na imagem final.
RUN npm install --omit=dev --force

# Copia o restante dos arquivos do backend.
COPY app/backend/ .

# --- Stage 3: Imagem Final ---
# Esta é a imagem leve que será deployada.
# Usamos uma imagem Node.js Alpine, que é menor e mais eficiente.
FROM node:20-alpine

# Define o diretório de trabalho principal dentro do container final.
WORKDIR /app

# Copia os artefatos (código e node_modules) do backend do estágio 'backend_builder'.
# Isso garante que apenas o necessário para rodar o backend seja copiado.
COPY --from=backend_builder /app/backend /app/backend

# Copia os arquivos estáticos construídos do frontend do estágio 'frontend_builder'.
# ATENÇÃO: Substitua 'build' pela pasta real onde seu frontend gera os arquivos estáticos.
# Exemplos comuns são 'build' (React), 'dist' (Vue, Angular), 'out' (Next.js export).
# O '/app/backend/public' é o caminho para onde seu servidor Express (no backend)
# irá procurar para servir os arquivos estáticos do frontend.
COPY --from=frontend_builder /app/frontend/build /app/backend/public

# Define uma variável de ambiente para a porta.
# O Vercel (e outros ambientes de nuvem) geralmente expõem na porta 3000 por padrão.
ENV PORT 3000

# Informa ao Docker que o container vai expor a porta 3000.
# Isso não publica a porta, apenas a documenta.
EXPOSE $PORT

# Comando para iniciar sua aplicação.
# ATENÇÃO: Substitua 'server.js' pelo nome do arquivo principal que inicia seu servidor Express.
# Ex: 'index.js', 'app.js', etc. Este arquivo deve estar dentro da pasta 'app/backend'.
CMD ["node", "/app/backend/src/server.ts"]