Feature: DemoQA Bookstore API

	Scenario: Create user and rent books
		Given I create a new user
		And I generate a token
		And I am authorized
		When I rent 2 books
		Then the user should have 2 books rented
