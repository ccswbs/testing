Feature: People Profiles PP7 teaser list view
  Allows users to see a teaser list of people profiles

  #-------------------------------#
  # Sort Order
  #-------------------------------#

  Scenario: Profiles are shown randomly on Profiles PP7 teaser list view
    Given UG Profile feature is enabled and configured
    When PP7 teaser view is displayed
    Then Profiles displayed in PP7 teaser view appear randomly

  #-------------------------------#
  # Field Visibility
  #-------------------------------#

  Scenario: Selected fields show on Profiles PP7 teaser list view
    Given UG Profile feature is enabled and configured
    When PP7 teaser view is displayed
    Then Node Title shows
    And Image shows
    And Teaser summary shows

  #-------------------------------#
  # Title Overrides
  #-------------------------------#

  Scenario: Title can be overridden on Profiles PP7 teaser list view by Site Manager
    Given UG Profile feature is enabled and configured
      And Site Manager (role) is logged in
     When PP7 teaser view is displayed
      And Site Manager role overrides PP7 view pane title
     Then PP7 title displays overridden title

  Scenario: More button text can be overridden on Profiles PP7 teaser list view by Site Manager
    Given UG Profile feature is enabled and configured
      And Site Manager (role) is logged in
     When PP7 teaser view is displayed
      And Site Manager role overrides PP7 view pane more button text
     Then PP7 more button displays overridden text

  #-------------------------------#
  # Filtering
  #-------------------------------#

  Scenario: Profiles PP7 teaser list view can be filtered by category term by Site Manager
    Given UG Profile feature is enabled and configured
      And Site Manager (role) is logged in
    When PP7 teaser view is displayed
     And Site Manager role filters PP7 view pane by category term
    Then Profiles displayed in PP7 teaser view are filtered by category term
     And Profile more button links to people/categoryTermID

  Scenario: Profiles PP7 teaser list view can be filtered by keyword term by Site Manager
    Given UG Profile feature is enabled and configured
      And Site Manager (role) is logged in
     When PP7 teaser view is displayed
      And Site Manager role filters PP7 view pane by keyword term
     Then Profiles displayed in PP7 teaser view are filtered by keyword term
      And Profile more button links to people/keywordTermID