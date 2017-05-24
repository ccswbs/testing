Feature: Breadcrumbs for profile content type
  This test covers the format of breadcrumbs for
  hjckrrh profiles.

  Scenario: Profile listing page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the profile listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Profile listing page filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a profile category term [term] with term ID [tid]
    When  the profile listing page filtered by [tid] is viewed
    Then  the page title should be "[term]"
      And the breadcrumbs should display only the 'Home' link followed by 'Profiles'

  Scenario: Profile listing page under menu follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And a profile listing page as a child page
    When  the profile listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages

  Scenario: Profile listing page under menu filtered by term follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And a profile listing page as a child page
      And a profile category term [term] with term ID [tid]
    When  the profile listing page filtered by [tid] is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages, followed by 'Profiles'

  Scenario: Profile details page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a profile node [profile] with node ID [nid]
    When  the /node/[nid] page is viewed
    Then  the page title should be "[profile]"
      And the breadcrumbs should display only the 'Home' and 'Profiles' links

  Scenario: Profile details page using a path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a profile node [profile] with node ID [nid] and URL alias [profile_alias]
    When  the /course-outlines/[profile_alias] page is viewed
    Then  the page title should be "[profile]"
      And the breadcrumbs should display only the 'Home' and 'Profiles' links