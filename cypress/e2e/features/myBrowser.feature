Feature: Navegação e Interação com Nova Janela
  Como um usuário
  Quero abrir uma nova janela no DemoQA
  Para verificar se o conteúdo exibido é o esperado

  Scenario: Abrir nova janela e verificar o conteúdo
    Given que eu acesso a página inicial do DemoQA
    When eu navego até Browser Windows
    And eu clico no botão para abrir uma nova janela
    Then a nova janela deve ser aberta
    And a URL da nova janela deve conter "/sample"
    And a página deve exibir o texto "This is a sample page"
