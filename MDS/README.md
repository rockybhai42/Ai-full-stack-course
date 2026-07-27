## day01
I wirite html code to create a helloworld site
## day02
I create a portfolio with basic html,
in the process i learned about the accessibility ,semantics,ai auditing .
i did auditing four time with the help of claude and i fixed all the issues.

## day03
we learned about the css boxmodle, flexbox, grid, responsive layer .
and i learned about the differance between claude in website and claude in the VS code , i learened about to ask the qustion about the particular file in claude in vs code. its even better to debug the code and asking qustions.
i understand that when i use the claude in the website it will give generic responses because we did't refer the file or exact code.

after that i make the porfolio even better styling with the help of claude code .
## day04
we learn about javascript veriables, datatypes, array ,objects and explain with claude.ai.
and we also learn about the functions in javascript and for loop, while loop, for of loop.
then we learn about the contions in javascript.

and we did some debuging with claude ai .

## day05:
today we learn about the dom and how to manipulte dom,
git and github version controls, how to create a branch and and how merge a main and the scendory branch , and how to deploy the pages in github .

## homework :
i did a data driven page with my portfolio ,
i can render the projects cards dynamicaly without change the html.

## day06:

today i learn about the concepts :
Destructuring
Spread & Rest
 ES Modules
Promises
async/await
 fetch API

then we did some homework:
i created a test blog site its fetch the posts as a json format, from the public api.
## day07:(09-07-2026)
i learn about the react :
 * props
 * components
 * jsx
 * vite
  we learn that concepts depply , now i can understant the recat and i
  can do some simple projects on react.




## day09:(10-07-2026)
  ## Topics Covered

-   React state (`useState`)
-   Props
-   Callback props
-   Lifting state up
-   Form submission
-   Fetch API
-   Async/Await
-   Error handling
-   Conditional rendering
-   JavaScript short-circuit evaluation
-   React debugging
-   Component design

we learn the basics about the topics 
i did a to do list project app for this lession 


## day10:(11-07-2026)
 
 

## day12:(20-07-2026)
i built a simple CRUD REST API for a task list using express.

| Method | Path         | Description         | Body                          |
| ------ | ------------ | -------------------- | ------------------------------ |
| GET    | /tasks       | get all tasks         | -                               |
| POST   | /tasks       | create a new task     | `{ "title": string, "done": boolean }` |
| PUT    | /tasks/:id   | update a task by id   | `{ "title": string, "done": boolean }` |
| DELETE | /tasks/:id   | delete a task by id   | -                               |

## day13:(15-07-2026) ----------------


## day16:(21-07-2026)_______________________________________________________

topics covered:

🔗 CORS
🔐 Auth tokens
🐛 Integration debugging
🎉 Full-stack app

i made a wesite my fav criket players :

mongodb 
express
react
node  with all this .

i learned about the cors and some debugs;
i sort out some probloms with the auth tokens and mongo db ;



## day17:(23-07-2026)_______________________________________________________


* DEBUGGING, CODE REVIEW &
REFACTORING
  🔍 Debugging process 
  📜 Stack traces 
  🧹 Refactoring
  🤖 AI code review

debugging process:
1
Reproduce — make the bug happen on demand, every time
2
Isolate — narrow it to the smallest piece of code that shows it
3
Hypothesize — form one specific, testable theory of the cause
4
Test — check that one theory, and only that one
5
Verify — confirm the fix works, and nothing else broke


we should repeat the process untill find the bug:
Hypothesize: "The ownership check compares task.userId to req.user instead of req.user.id — an
object vs. a string."
4
Test: add one console.log(task.userId, req.user), run the exact reproduction, read the printed
values.
5
Verify: fix the comparison, re-run the reproduction, then run yesterday's full test suite.
