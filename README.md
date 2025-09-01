# cypress_demoQA
Projeto de teste na app Demo Qa com Cypress e BDD 


BASE URL:
https://demoqa.com


----------------------------------------
Como instalar:
npm install

-----------------------------------------
Dependências:
Cypress,
badeball/cypress-cucumber-preprocessor
esbuild

------------------------------------------

Teste BackEnd - API:   file: cypress > e2e > features > bookStore.feature 

Testes API "Backend"  Cypress + cucumber + javascript.
Cenários implementados
   Criar um usuário - POST /Account/v1/User
   Gerar um token de acesso - POST /Account/v1/GenerateToken  
   Confirmar se o usuário está autorizado - POST /Account/v1/Authorized
   Listar os livros disponíveis - GET /BookStore/v1/Books
   Alugar dois livros - POST /BookStore/v1/Books
   Listar detalhes do usuário com livros - GET /Account/v1/User/{userID}

Como executar:

Executar teste: npx cypress run --spec "cypress/e2e/features/bookStore.feature"  
ou direto pela interface do cypress com npx cypress open e escolhendo o spec bookStore.feature


OBS: 
Testes que Criam usuario, geram token de acesso, confirmação de autorização de user, lista de itens disponíveis(livros), lista de detalhes de user, ou seja, cenário completo de verificação.



Arquivo Json gerado após teste Backend:
"flowlog.json"


-------------------------------------------
Teste frontend ( todos os cenários ) 

Teste (Frontend) E2E:       

Arquivos para testes FRONTEND:

form.feature 
interactions.feature
myBrowser.feature
progressBar.feature
web_tables_bulk.feature
webTables.feature  
--------------------------------


Navegação: Url  Base é sempre na homepage

Upload files: Apenas no formulário Practice Form

Drag & Drop: Funcionalidade de ordenação no Sortable

Verificação de progressoBar: Progress Bar com validação de percentuais

Modal handling: Tratamento de popups e janelas

BDD : Cucumber 



-----TODOS OS TESTES CORRERÃO EM FORMATO BDD, GERANDO RELATÓRIO ESPECÍFICO EM FICHEIRO JSON PARA OS TESTES DE API -------


Desenvolvimento que utilizei como fontes:

Consultas ao ChatGPT / GEMINI para tratar problemas específicos
Documentação oficial do Cypress
Buscas na plataforma Google



