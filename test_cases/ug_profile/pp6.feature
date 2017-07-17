Feature: People Profiles PP6 listing view

  Scenario: Selected fields show on PP6 listing view
    Given UG Profile feature is enabled and configured
    When PP6 listing view is displayed
    Then Node Title shows
    And Teaser summary shows
    And Phone shows
    And Email shows
    And Office shows