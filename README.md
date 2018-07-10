# Coding Take-Home Project for BSM: Sudoku App

## Description
This project uses an algorithm to generate a valid sudoku grid and serves it via an API to the endpoint [localhost:8080/sudoku/board]

## Building and running
This project requires the commands `node` and `npm` to be installed. Instructions can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) or by entering the following in the terminal (results may vary depending on your shell.):
```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
$ source ~/.bashrc
$ nvm install 8.11.3
$ nvm use 8.11.3
```

Running the command `npm install` in the root of the repository will install and build the dependencies. The app itself can be started with `node app/app.js`.

## Tools
This is the first time I attempted my own Node.js project from scratch. I considered using Ruby on Rails, which I did a lot of a year ago, but thought this would be a good opportunity to learn something.

Both the API and front end are served from the same file `app/app.js`, which uses [here](https://expressjs.com/). This seemed to be the simplest way to get a server up and running, given that it was a relatively simple project.

Jasmine was also added as a dependency so that tests could be written

## Algorithm
The API depends on `app/sudoku.js`, which runs the algorithm that generates a random sudoku board. I found this algorithm at [https://www.codeproject.com/articles/23206/sudoku-algorithm-generates-a-valid-sudoku-in]. It seemed reasonably efficient and had a block diagram that make it relatively easy to implement using a `while` loop. It seems to run fast, even in JavaScript. When running in combination with the single page app, there is no visible delay.

## Single Page App
The single page app is served from the root of [localhost:8080/]. Since there was not a lot that it was required to do, I did not use any frameworks, but just included a set of static files in the directory `app/spa`. The HTML file was based on another simple text-based app from one of my repositories, and the main logic in `app/spa/js/main.js` is to draw an array of 81 integers on a sudoku board.

The other function of `main.js` is to provide an animation while waiting for the API response. Unfortunately, the response is so fast that this never actually gets seen without programming in an artificial delay.

This code only works if a mono-space font is used, so there are some obvious drawbacks that would make it not very generalizable if you wanted to make a sudoku-style grid that went beyond 9x9.

## Acceptance Criteria

### Level 1
1. Single command: I had trouble figuring out the conventional way to build and run apps using npm. `npm install` will build the app, but `npm test` is required to run the tests. This could be fixed by adding a `build.sh` script that calls both.
2. Tests: I made a test to see that the generator produced a valid grid, which is the only exported function in the file. The test is not ideal, since it requires a helper function with some complicated logic. This code could be moved to another file with its own tests. There are currently no tests for the express app itself.
3. Request: The API can be accessed using `curl http://localhost:8080/sudoku/board`
4. Speed: The request is much faster than 500ms when run from localhost.
5. Validity: The algorithm checks the validity of each number as it is put into the array.
6. Documentation: This file documents the steps to build and run the app.

### Level 2
1. Single command: See above
2. Unit testing: No additional tests were made for the app itself.
3. Nginx: I did not get very far researching this at [https://nginx.org/en/docs/beginners_guide.html]. This seems like a major topic that I should just admit I don't yet have much experience with. This was the most significant roadblock preventing me from completing the first two levels.
4. Load the board: The site loads the board very quickly
5. Progress spinner: This works in theory, but only if there is an artificial delay on calling the API. There is a button specifically for showing the loading animation.
6. Reload: The reload button works as expected.

7. Validity: see above
8. Documentation: see above

### Level 3
Level 3 has some interesting things to do, and the backend algorithm I chose could be adjusted so that the `gridSquare` objects had a Boolean `frozen` flag. The frozen values could then be passed to the backend by query params. However, there are parts of Levels 1 and 2 that are still incomplete.
