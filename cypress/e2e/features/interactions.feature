Feature: Interações - Sortable
  Como um usuário
  Quero reorganizar itens da lista na página Sortable
  Para garantir que eles fiquem em ordem correta

  Background:
    Given que eu acesso a página inicial do DemoQA

  Scenario: Navegar até a página Sortable
    When eu navego para Interactions e clico em Sortable
    Then a lista de itens deve estar visível

  Scenario: Reordenar os itens da lista para ordem crescente
    Given que eu acesso diretamente a página Sortable
    When eu reordeno os itens da lista
    Then os itens devem estar em ordem crescente "One, Two, Three, Four, Five, Six"
