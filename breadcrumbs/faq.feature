Feature: Breadcrumbs for FAQ content type
  This test covers the format of breadcrumbs for
  hjckrrh FAQs.

  Scenario: FAQ listing page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the FAQ listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: FAQ listing page filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And an FAQ category term [term] with term ID [tid]
    When  the FAQ listing page filtered by [tid] is viewed
    Then  the page title should be "Frequently Asked Questions"
      And the breadcrumbs should display only the 'Home' link followed by 'FAQs'

  Scenario: FAQ listing page under menu follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And an FAQ listing page as a child page
    When  the FAQ listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages

  Scenario: FAQ listing page under menu filtered by term follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And an FAQ listing page as a child page
      And an FAQ category term [term] with term ID [tid]
    When  the FAQ listing page filtered by [tid] is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages, followed by 'FAQs'

  Scenario: FAQ details page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And an FAQ node [faq] with node ID [nid]
    When  the /node/[nid] page is viewed
    Then  the page title should be "[faq]"
      And the breadcrumbs should display only the 'Home' and 'FAQs' links

  Scenario: FAQ details page using a path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And an FAQ node [faq] with node ID [nid] and URL alias [faq_alias]
    When  the /faq/[faq_alias] page is viewed
    Then  the page title should be "[faq]"
      And the breadcrumbs should display only the 'Home' and 'FAQs' links