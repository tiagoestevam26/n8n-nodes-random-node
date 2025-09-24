FROM n8nio/n8n:latest

USER root

# Copiar o custom node para o diretório correto
COPY dist /home/node/.n8n/custom/node_modules/n8n-nodes-random

# Definir as permissões corretas
RUN chown -R node:node /home/node/.n8n/custom

USER node
