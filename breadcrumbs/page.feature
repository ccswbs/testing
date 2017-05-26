Feature: Breadcrumbs for basic page content type
  This test covers the format of breadcrumbs for
  hjckrrh basic pages.

  Scenario: Page excluded from menu includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a basic page node [page] with node ID [nid]
    When  the /node/[nid] page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Page excluded from menu using path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a basic page node [page] with node ID [nid] and path alias [page_alias]
    When  the /[page_alias] page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Page at top level of menu includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a basic page node [page] with node ID [nid]
    When  the /node/[nid] page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Page at top level of menu using path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a basic page node [page] with node ID [nid] and path alias [page_alias]
    When  the /[page_alias] page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Page on a sublevel of menu includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a basic page node [parent] with node ID [pnid]
      And a basic page node [child] with node ID [cnid] as a child of [parent]
    When  the /node/[nid] page is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by the [parent] link

  Scenario: Page on a sublevel of menu using path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a basic page node [parent] with node ID [pnid] and path alias [parent_alias]
      And a basic page node [child] with node ID [cnid] and path alias [child_alias] as a child of [parent]
    When  the /[parent_alias]/[child_alias] page is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by the [parent] link