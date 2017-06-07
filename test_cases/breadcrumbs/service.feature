Feature: Breadcrumbs for service content type
  This test covers the format of breadcrumbs for
  hjckrrh services.

  Scenario: Services listing page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the services listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Services listing page filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a service category term [term] with term ID [tid]
    When  the services listing page filtered by [tid] is viewed
    Then  the page title should be "[term]"
      And the breadcrumbs should display only the 'Home' link followed by 'Services'

  Scenario: Services listing page under menu follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And a services listing page as a child page
    When  the services listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages

  Scenario: Services listing page under menu filtered by term follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And a services listing page as a child page
      And a services category term [term] with term ID [tid]
    When  the services listing page filtered by [tid] is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages, followed by 'Services'

  Scenario: Services details page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a services node [service] with node ID [nid]
    When  the /node/[nid] page is viewed
    Then  the page title should be "[service]"
      And the breadcrumbs should display only the 'Home' and 'Services' links

  Scenario: Services details page using a path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a services node [service] with node ID [nid] and URL alias [service_alias]
    When  the /course-outlines/[service_alias] page is viewed
    Then  the page title should be "[service]"
      And the breadcrumbs should display only the 'Home' and 'Services' links