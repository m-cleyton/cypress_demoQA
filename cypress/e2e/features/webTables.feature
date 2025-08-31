Feature: Web Tables
  Como usuário da app
  Quero gerenciar registros em uma tabela
  Para validar as operações de CRUD (criar, editar, deletar)

  Background:
    Given que eu acesso a página Web Tables no DemoQA

  Scenario: Criar um novo registro na tabela
    When eu adiciono um novo registro com os dados:
      | firstName | lastName | email         | age | salary | department |
      | Test01    | Test     | test@test.com |  20 |   1800 | TI         |
    Then o registro "Test01" deve estar visível na tabela com os dados corretos

  Scenario: Editar um registro existente
    Given que eu tenho um registro com os dados:
      | firstName | lastName | email         | age | salary | department |
      | Test01    | Test     | test@test.com |  20 |   1800 | TI         |
    When eu edito o registro e altero o "firstName" para "Edivania"
    Then o registro "Edivania" deve estar visível na tabela com sobrenome "Test" e email "test@test.com"

  Scenario: Deletar um registro específico
    Given que eu tenho um registro com os dados:
      | firstName   | lastName  | email            | age | salary | department |
      | DeletarTest | Sobrenome | deletar@test.com |  30 |   2500 | QA         |
    When eu deleto o registro "DeletarTest"
    Then o registro "DeletarTest" não deve estar mais visível na tabela

  Scenario: Deletar todos os registros da tabela
    Given que eu tenho múltiplos registros na tabela:
      | firstName | lastName | email          | age | salary | department |
      | Bulk1     | L        | bulk1@test.com |  20 |    100 | Dep        |
      | Bulk2     | L        | bulk2@test.com |  21 |    200 | Dep        |
      | Bulk3     | L        | bulk3@test.com |  22 |    300 | Dep        |
    When eu deleto todos os registros
    Then a tabela deve exibir "No rows found"

  Scenario: Criar 12 novos registros aleatórios usando Faker
    When eu adiciono 12 novos registros gerados aleatoriamente
    Then os 12 registros devem estar visíveis na tabela
