Feature: Preenchimento do formulário DemoQA
  Como um usuário
  Quero preencher e submeter o formulário de prática
  Para validar que os dados são enviados corretamente

  Background:
    Given que eu acesso o DemoQA Practice Form

  Scenario: Preencher e submeter o formulário com sucesso
    When eu preencho o campo First Name com "Test"
    And eu preencho o campo Last Name com "QA"
    And eu preencho o campo Email com "testqa@test.com"
    And eu seleciono o gênero "Male"
    And eu preencho o campo Mobile com "1199999999"
    And eu seleciono a data de nascimento "15" "August" "1990"
    And eu seleciono a matéria "Math"
    And eu seleciono o hobbie "Sports"
    And eu faço upload do ficheiro "cypress/fixtures/testqa.txt"
    And eu preencho o campo Address com "endereco A"
    And eu seleciono o estado "Uttar Pradesh"
    And eu seleciono a cidade "Agra"
    And eu submeto o formulário
    Then o modal de confirmação deve aparecer
    And o modal deve conter os dados submetidos corretamente
