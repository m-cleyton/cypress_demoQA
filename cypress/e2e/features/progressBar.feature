Feature: Progress Bar
  Como um usuário
  Quero interagir com a barra de progresso no DemoQA
  Para validar seu funcionamento do início até o reset

  Background:
    Given que eu acesso a página inicial do DemoQA

  Scenario: Executar Progress Bar do início ao reset
    When eu navego até a seção Progress Bar
    Then a barra de progresso deve iniciar em "0%"
    When eu clico em Start e paro antes de 25%
    Then a barra deve estar menor que 25%
    When eu clico em Start novamente até 100%
    Then a barra deve exibir "100%"
    When eu clico em Reset
    Then a barra deve voltar para "0%"
