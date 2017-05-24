Feature: Breadcrumbs for event content type
  This test covers the format of breadcrumbs for
  hjckrrh events.

  Scenario: Event listing page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the event listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Event listing page filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And an event category term [term] with term ID [tid]
    When  the event listing page filtered by [tid] is viewed
    Then  the page title should be "Events related to [term]"
      And the breadcrumbs should display only the 'Home' link followed by 'Events'

  Scenario: Event listing page under menu follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And an event listing page as a child page
    When  the event listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages

  Scenario: Event listing page under menu filtered by term follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And an event listing page as a child page
      And an event category term [term] with term ID [tid]
    When  the event listing page filtered by [tid] is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages, followed by 'Events'

  Scenario: Event details page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And an event node [event] with node ID [nid]
    When  the /node/[nid] page is viewed
    Then  the page title should be "[event]"
      And the breadcrumbs should display only the 'Home' and 'Events' links

  Scenario: Event details page using a path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And an event node [event] with node ID [nid] and URL alias [event_alias]
    When  the /events/[event_alias] page is viewed
    Then  the page title should be "[event]"
      And the breadcrumbs should display only the 'Home' and 'Events' links