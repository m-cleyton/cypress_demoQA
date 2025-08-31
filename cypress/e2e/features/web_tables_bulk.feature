Feature: Gerenciamento em Massa de Registros em Web Tables

  @web_tables
  Scenario: Criar e Deletar múltiplos novos registros
    Given eu estou na página "Web Tables"
    When eu crio "12" novos registros
      | First Name | Last Name | Email            | Age | Salary | Department |
      | John       | Doe       | john@example.com |  30 |  50000 | Sales      |
      | Jane       | Smith     | jane@example.com |  25 |  45000 | Marketing  |
      | New        | Record1   | r1@example.com   |  20 |   1000 | IT         |
      | New        | Record2   | r2@example.com   |  21 |   1100 | IT         |
      | New        | Record3   | r3@example.com   |  22 |   1200 | IT         |
      | New        | Record4   | r4@example.com   |  23 |   1300 | IT         |
      | New        | Record5   | r5@example.com   |  24 |   1400 | IT         |
      | New        | Record6   | r6@example.com   |  25 |   1500 | IT         |
      | New        | Record7   | r7@example.com   |  26 |   1600 | IT         |
      | New        | Record8   | r8@example.com   |  27 |   1700 | IT         |
      | New        | Record9   | r9@example.com   |  28 |   1800 | IT         |
      | New        | Record10  | r10@example.com  |  29 |   1900 | IT         |
      # ... adicione mais 10 linhas de dados aqui
      # Para o desafio, pode ser útil usar dados dinâmicos nas Step Definitions
      # mas para um exemplo Gherkin, listamos alguns
    Then os "12" novos registros devem estar visíveis na tabela
    And eu deleto todos os registros visíveis na tabela
    Then a tabela deve estar vazia
