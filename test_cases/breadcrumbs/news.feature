Feature: Breadcrumbs for news content type
  This test covers the format of breadcrumbs for
  hjckrrh news.

  Scenario: News listing page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the news listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: News listing page filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a news category term [term] with term ID [tid]
    When  the news listing page filtered by [tid] is viewed (/news/category/24)
    Then  the page title should be "[term]"
      And the breadcrumbs should display only the 'Home' link followed by 'News'

  Scenario: News listing page under menu follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And a news listing page as a child page
    When  the news listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages

  Scenario: News listing page under menu filtered by term follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And a news listing page as a child page
      And a news category term [term] with term ID [tid]
    When  the news listing page filtered by [tid] is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages, followed by 'News'

  Scenario: News details page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a news node [news] with node ID [nid]
    When  the /node/[nid] page is viewed
    Then  the page title should be "[news]"
      And the breadcrumbs should display only the 'Home' and 'News' links

  Scenario: News details page using a path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a news node [news] with node ID [nid] and URL alias [news_alias]
    When  the /news/[news_alias] page is viewed
    Then  the page title should be "[news]"
      And the breadcrumbs should display only the 'Home' and 'News' links