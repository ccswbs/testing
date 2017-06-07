Feature: Breadcrumbs for course outline content type
  This test covers the format of breadcrumbs for
  hjckrrh course outlines.

  Scenario: Course outline listing page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
    When  the course outline listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Course outline listing page filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a course outline category term [term] with term ID [tid]
    When  the course outline listing page filtered by [tid] is viewed
    Then  the page title should be "[term] Course Outlines"
      And the breadcrumbs should display only the 'Home' link followed by 'Course Outlines'

  Scenario: Course outline listing page under menu includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a course outline listing page as a child page
    When  the course outline listing page is viewed
    Then  the breadcrumbs should display only the 'Home' link

  Scenario: Course outline listing page under menu filtered by term includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a course outline listing page as a child page
      And a course outline category term [term] with term ID [tid]
    When  the course outline listing page filtered by [tid] is viewed
    Then  the breadcrumbs should display only the 'Home' link followed by parent pages, followed by 'Course Outlines'

  Scenario: Course outline details page includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a course outline node [course_outline] with node ID [nid]
    When  the /node/[nid] page is viewed
    Then  the page title should be "[course_outline]"
      And the breadcrumbs should display only the 'Home' and 'Course Outlines' links

  Scenario: Course outline details page using a path alias includes the proper links in the breadcrumb
    Given path breadcrumbs is enabled and configured
      And a course outline node [course_outline] with node ID [nid] and URL alias [course_outline_alias]
    When  the /course-outlines/[course_outline_alias] page is viewed
    Then  the page title should be "[course_outline]"
      And the breadcrumbs should display only the 'Home' and 'Course Outlines' links