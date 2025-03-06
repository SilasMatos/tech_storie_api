# Gerenciamento de Transporte de Pacientes

Bem-vindo ao sistema de gerenciamento de transporte de pacientes do Hospital Geral Clériston Andrade. Este sistema visa facilitar e otimizar as atividades dos maqueiros, proporcionando um serviço mais eficiente e seguro aos usuários.

## Características

- **Agendamento de transporte de pacientes**
- **Rastreamento de pacientes**
- **Gestão de prioridades**
- **Registro de incidentes**
- **Acesso seguro e restrito**

## Requisitos do Sistema

- Node.js
- Fastify
- MongoDB

## Instalação

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/SilasMatos/api_hcga.git
    ```

2. **Instale as dependências**:
    ```bash
    cd seu-repositorio
    npm install
    ```

3. **Configure as variáveis de ambiente**:
    ```bash
    cp .env.example .env
    ```
    Edite o arquivo `.env` com suas configurações.

4. **Inicie o servidor**:
    ```bash
    npm start
    ```

## Endpoints da API

### Pacientes

- `POST /pacientes` - Cria um novo paciente
- `GET /pacientes` - Obtém todos os pacientes
- `GET /pacientes/:id` - Obtém um paciente específico por ID
- `PUT /pacientes/:id` - Atualiza um paciente específico por ID
- `DELETE /pacientes/:id` - Deleta um paciente específico por ID

### Transportes

- `POST /transportes` - Cria uma nova solicitação de transporte
- `GET /transportes` - Obtém todas as solicitações de transporte
- `GET /transportes/:id` - Obtém uma solicitação de transporte específica por ID
- `PUT /transportes/:id/status` - Atualiza o status de uma solicitação de transporte (aceitar/recusar)
- `PUT /transportes/:id/prioridade` - Atualiza a prioridade de uma solicitação de transporte
- `PUT /transportes/:id/incidente` - Registra um incidente ou problema durante o transporte
- `PUT /transportes/:id/localizacao` - Atualiza a localização e o status do paciente durante o transporte

### Usuários

- `POST /register` - Registra um novo usuário
- `POST /login` - Faz login no sistema
- `GET /users/:id` - Obtém informações de um usuário específico (requer autenticação)

## Segurança

Este sistema utiliza tokens JWT para autenticação e autorização. Certifique-se de manter suas chaves seguras e configure as variáveis de ambiente adequadamente.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

[Visite o Repositório](https://github.com/SilasMatos/api_hcga.git)
