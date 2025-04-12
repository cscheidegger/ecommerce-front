# Proteus.lab - Plataforma de Serviços de Impressão 3D

![Proteus.lab Logo](https://via.placeholder.com/800x200/1D2D50/FFCF02?text=Proteus.lab)

## Visão Geral

O Proteus.lab é uma plataforma de serviços de impressão 3D que conecta clientes a soluções de prototipagem rápida, modelagem 3D personalizada e produtos impressos em 3D. Nossa arquitetura de microserviços oferece uma experiência fluida, permitindo aos usuários solicitar orçamentos, visualizar portfólio de projetos e encomendar serviços de impressão 3D com facilidade.

## Arquitetura do Sistema

O projeto segue uma arquitetura de microserviços, composta por três componentes principais distribuídos em repositórios separados:

```
┌───────────────────┐     ┌────────────────────┐     ┌─────────────────┐
│                   │     │                    │     │                 │
│ Frontend (React)  │────▶│ API Principal      │────▶│ API Instagram   │
│                   │◀────│ (FastAPI)          │◀────│                 │
│                   │     │                    │     │                 │
└───────────────────┘     └────────────────────┘     └─────────────────┘
                                    │
                                    ▼
                          ┌────────────────────┐
                          │                    │
                          │  Banco de Dados    │
                          │  (PostgreSQL)      │
                          │                    │
                          └────────────────────┘
```

## Repositórios

O projeto está organizado em três repositórios separados:

1. **Frontend (React)**  
   Repositório: [https://github.com/cscheidegger/ecommerce-front.git](https://github.com/cscheidegger/ecommerce-front.git)  
   Interface de usuário responsiva que permite aos clientes navegar por serviços, solicitar orçamentos e visualizar trabalhos anteriores.

2. **API Principal (FastAPI)**  
   Repositório: [https://github.com/cscheidegger/ecommerce-api.git](https://github.com/cscheidegger/ecommerce-api.git)  
   Gerencia a lógica de negócios, processamento de pedidos, orçamentos e armazenamento de modelos 3D.

3. **DevOps (Configuração e Instagram API)**  
   Repositório: [https://github.com/cscheidegger/e-commerce-devops.git](https://github.com/cscheidegger/e-commerce-devops.git)  
   Contém a configuração Docker Compose, scripts de manutenção e o serviço de integração com Instagram.

## Pré-requisitos

- Docker e Docker Compose
- Git
- Espaço em disco: mínimo 5GB
- Acesso à internet para clonagem dos repositórios e download de imagens Docker

## Instalação e Configuração

### 1. Clone os Repositórios

```bash
# Clone o repositório DevOps
git clone https://github.com/cscheidegger/e-commerce-devops.git
cd e-commerce-devops

# O docker-compose.yml já referencia os repositórios remotos, 
# então não é necessário clonar os outros repositórios manualmente
```

### 2. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo e configure-o com seus valores
cp .env.example .env

# Edite o arquivo .env conforme necessário
nano .env
```

### 3. Inicie os Serviços

```bash
# Inicie todos os serviços utilizando Docker Compose
docker-compose up -d

# Verifique se todos os containers estão em execução
docker-compose ps
```

### 4. Acesse a Aplicação

Após a inicialização bem-sucedida, a aplicação estará disponível em:

- Frontend: http://localhost:3000
- API Principal (Swagger): http://localhost:8000/docs
- API Instagram: http://localhost:8001/docs

## Estrutura do Projeto DevOps

O repositório DevOps contém:

```
e-commerce-devops/
├── docker-compose.yml       # Configuração para orquestração de todos os serviços
├── .env.example             # Exemplo de variáveis de ambiente
├── instagram-service/       # Código do serviço de integração com Instagram
│   ├── Dockerfile           # Configuração do container para o serviço Instagram
│   ├── requirements.txt     # Dependências Python
│   └── app/                 # Código-fonte do serviço
├── scripts/                 # Scripts utilitários
│   ├── init-db.sh           # Inicialização do banco de dados
│   └── backup.sh            # Backup do banco de dados
└── uploads/                 # Diretório para armazenamento de arquivos enviados
```

## Detalhes dos Containers

O sistema é composto pelos seguintes containers Docker:

1. **frontend**: Aplicação React servida através do Nginx
2. **api**: Aplicação FastAPI para a lógica de negócios
3. **instagram-service**: Serviço de integração com Instagram
4. **db**: Banco de dados PostgreSQL
5. **pgadmin**: Interface web para administração do PostgreSQL (opcional)

## Comandos Úteis

```bash
# Iniciar todos os serviços
docker-compose up -d

# Verificar status dos containers
docker-compose ps

# Ver logs de um serviço específico
docker-compose logs -f frontend
docker-compose logs -f api
docker-compose logs -f instagram-service

# Parar todos os serviços
docker-compose down

# Reconstruir imagens e iniciar (após alterações)
docker-compose up -d --build
```

## Desenvolvimento Local

### Frontend

Se você deseja trabalhar no frontend localmente:

```bash
# Clone o repositório do frontend
git clone https://github.com/cscheidegger/ecommerce-front.git
cd ecommerce-front

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### API Principal

Para desenvolver a API localmente:

```bash
# Clone o repositório da API
git clone https://github.com/cscheidegger/ecommerce-api.git
cd ecommerce-api

# Crie e ative um ambiente virtual
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

# Instale as dependências
pip install -r requirements.txt

# Execute a API em modo de desenvolvimento
uvicorn app.main:app --reload
```

## Solução de Problemas

### Os containers não iniciam corretamente

Verifique os logs para identificar o problema:

```bash
docker-compose logs -f
```

### Problemas de conexão entre serviços

Certifique-se de que os nomes de host no arquivo .env correspondem aos nomes dos serviços no docker-compose.yml.

### Banco de dados não inicializa

Execute o script de inicialização manualmente:

```bash
docker-compose exec db psql -U postgres -f /docker-entrypoint-initdb.d/init.sql
```

## Contribuição

1. Clone o repositório específico que deseja modificar
2. Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
3. Faça commit das alterações: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## Roadmap

- [ ] Calculadora de custos automática para modelos 3D
- [ ] Visualizador 3D online de arquivos .STL e .OBJ
- [ ] Marketplace para fornecedores de serviços de impressão 3D
- [ ] Editor paramétrico para criação de modelos simples online
- [ ] Integração com serviços de pagamento

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

Proteus.lab - [@proteus.lab](https://www.instagram.com/proteus.lab/) - proteus.lab3d@gmail.com

---

Desenvolvido por Caio Scheidegger
