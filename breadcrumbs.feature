Feature: Breadcrumbs for all hjckrrh content types
  This test covers the format of all content types
  that have public facing pages; that is: course outlines,
  events, FAQ, news, pages, profiles, and services.

  ####################
  ## Course Outline ##
  ####################

  Scenario: Course outline listing page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the course outline listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Course outline listing page filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a course outline category term [term] with term ID [tid]
    When  the course outline listing page filtered by [tid] is viewed
    Then  the page title should be "[term] Course Outlines"
      And the breadcrumbs should display only the 'Home' link

  Scenario: Course outline listing page under menu follows menu structure in breadcrumb
    Given path breadcrumbs is enabled and configured
      And a course outline listing page as a child page
    When  the course outline listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages

  Scenario: Course outline details page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a course outline node [course_outline] with node ID [nid]
    When  the /node/[nid] page is viewed
    Then  the page title should be "[course_outline]"
      And the breadcrumbs should display only the 'Home' and 'Course Outlines' links

  Scenario: Course outline details page using a path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a course outline node [course_outline] with node ID [nid]
    When  the /course-outline/[course_outline] page is viewed
    Then  the page title should be "[course_outline]"
      And the breadcrumbs should display only the 'Home' and 'Course Outlines' links

  ############
  ## Events ##
  ############

  Scenario: Events listing page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the events listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Events listing page filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And an event category term [tid]
    When  the events listing page filtered by [tid] is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Event details page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And an event node [event]
    When  the [event] details page is viewed
    Then  the breadcrumbs should display only the 'Home' and 'Events' links

  #########
  ## FAQ ##
  #########

  Scenario: FAQ listing page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the FAQ listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: FAQ listing page filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the FAQ listing page filtered by term is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: FAQ details page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And an FAQ node [faq]
    When  the [faq] details page is viewed
    Then  the breadcrumbs should display only the 'Home' and 'FAQ' links

  ##########
  ## News ##
  ##########


  ##########
  ## Page ##
  ##########


  #############
  ## Profile ##
  #############


  #############
  ## Service ##
  #############