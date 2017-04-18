# Hjckrrh Test Suite
A TestCafe-based functional testing suite for the hjckrrh codebase.

## Setup
This project requires node.js to run. It was developed on v7.8.0 but will also work on the LTS v6.10.1. Once node.js is installed, setup is as follows:
1. Clone the repo
2. Run `npm install` and `npm install --only=dev` in the project directory
3. Create an `environment.js` file using `environment.example.js` as a guide
   - Replace "http://127.0.0.1/test" under baseURL with the URL you will be testing
   - Replace "admin" under username with the username for the site you are testing
   - Replace "password" under password with the password for the site you are testing
   - **Note:** Your credentials and URL should be in quotes
   - **Note:** You must add http:// or 'https://` in the baseURL or TestCafe will not work

## Usage
Tests are run from the project directory with the `testcafe` command:

`testcafe browsers testfile [addl_testfile...]`

The 'browsers' argument is a comma-separated list of browsers in lowercase type with no spaces (e.g. chrome,firefox,nightmare). At least one testfile must be supplied, additional testfiles may be included by separating them with spaces. Wildcard matching is permitted, so `*.test.js` would be a good way to run all testfiles.

## Development
Tests are written in ES6 (JavaScript) and allow all node.js functionality such as modules. The TestCafe API documentation can be found at [http://devexpress.github.io/testcafe/documentation/test-api/](http://devexpress.github.io/testcafe/documentation/test-api/), note that this is distinct from the 'testcafe.devexpress.com' site which contains an API reference for an unrelated product derived from the node-based TestCafe library.

All testfiles are stored in the root directory and end in `.test.js` for ease of identification. Each page that is referenced should have it's selectors defined in a pagefile located in `./pages` and named to match the url; that is, `http://127.0.0.1/testsite/admin/content` would have its selectors defined in `./pages/admin_content.js`. If the pagefile already exists, it should first be checked for the required selector and a new selector added to the existing file if there is not already one that suits the need.

Any general utilities such as methods to generate random numbers or strings reside in the `./utils.js` file. Any additional utilities should be added to this file. In order to reference any utilities in a test, the library should be imported as `Util` to maintain consistency.

## Unit Testing
The ava.js framework provides unit testing capabilities for the test suite itself. Ava tests can be run using `npm test` which will target any tests in the `./unit_tests` directory. Documentation for writing Ava tests is in the README in the ava.js repository here: https://github.com/avajs/ava.
