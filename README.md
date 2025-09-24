# Desafio OnFly✈️ - Custom node n8n.

## 📋 O que é este projeto?

Este é um **custom node para [n8n](https://n8n.io)** que desenvolvido como parte do processo seletivo para OnFly. Este nó consome a [API Random.org](https://www.random.org/integers/) para gerar números aleatórios com intervalos personalizáveis.

## 🚀 Como Executar

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js 18+](https://nodejs.org/) para desenvolvimento
- [Git](https://git-scm.com/)

### Passo a Passo

#### 1. Clone e Configure

```bash
# Clone este repositório
git clone https://github.com/tiagoestevam26/n8n-nodes-random-node.git
cd n8n-nodes-random

# Configure as variáveis de ambiente
cp .env.example .env
```

#### 2. Edite o arquivo .env

Abra `.env` e **altere todas as senhas**:

```env
# 🔒 IMPORTANTE: Altere estas senhas!
POSTGRES_PASSWORD=sua_senha_super_segura_aqui
N8N_ENCRYPTION_KEY=sua_chave_criptografia_longa_minimo_32_caracteres
N8N_BASIC_AUTH_PASSWORD=sua_senha_admin_aqui

# Configurações básicas (pode manter)
POSTGRES_USER=n8n
POSTGRES_DB=n8n
N8N_BASIC_AUTH_USER=admin
N8N_HOST=localhost
N8N_PORT=5678
```

#### 3. Build e Execute

```bash
# Instale dependências e compile o custom node
npm install
npm run build

# Suba os containers (n8n + PostgreSQL)
docker-compose up -d

#### 4. Acesse o n8n

1. Abra: `http://localhost:5678`
2. Login com as credenciais do `.env`
3. Procure por "Random" na paleta de nodes! 🎉

## 🛠️ Desenvolvimento

### Fluxo de Desenvolvimento

```bash
# 1. Faça suas alterações no código
# 2. Recompile
npm run build

# 3. Reinicie apenas o n8n (mais rápido)
docker-compose restart n8n

# 4. Ou rebuild completo se necessário
docker-compose up -d --build n8n
```

### Comandos Úteis

```bash
# 📋 Ver todos os logs
docker-compose logs -f

# 🔄 Parar tudo
docker-compose down

# 🗑️ Reset completo (⚠️ apaga dados!)
docker-compose down -v
```

## 🔧 Como Usar o Node

### Exemplo Básico

1. **Crie um novo workflow** no n8n
2. **Adicione o Random Node** da paleta (ícone roxo)
3. **Configure os parâmetros** Min/Max para números
4. **Execute** e veja o resultado!



<div align="center">


**Desenvolvido com ❤️ para o processo seletivo da OnFly, obrigado pela oportunidade!**


</div>

