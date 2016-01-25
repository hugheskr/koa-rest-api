#Use a Different Server Side Framework: koa-rest-api
A CRUD API built on Koa for CodeFellows 401 JavaScript
##Non-express
This Movie database works like most other CRUD applications that we have built in 401.  
However it uses Koa's framework instead of Vanilla js or Express.

##KOA vs Express

The biggest differences between KOA and Express:

    -KOA uses generators instead of callbacks to manage async  
    -KOA does not have any middleware bundled
    -KOA is a very small framework
    -KOA does not have a separate req and res object, they are wrapped in 'this' and are 
     accessible with various methods like this.body.

Generators behave similarly to promises to manage async functions.  And here is what a generator looks like:
```
    function *doSomething(){
             yield 'hey';
             yield 'you';
           };
```
When we call this generator, the code inside does not immediately run.   We call the function with next() to return each process of our inner function.  When we call the function with next(), an iterator object is returned with properties value and done.  The function then runs until we hit yield.  Yield tells the function to wait.  Notice in the example below that value is reset with each call to next().
```
    doSomething().next();  // {value: hey ,done: false}
          doSomething().next();  // {value: you ,done: true}
```
If we want to get the values stored in our two objects we would call the functions like so:
```
    doSomething().next().value;   // hey
          doSomething().next().value;   //you
```
We can avoid callback mayhem that we sometimes encounter in express by using our KOA generator functions and yield.  If we place yield before an async process like fs.readFile(), the generator function will wait until the process of reading the file is completed.  After the readFile is complete we will reenter the generator function and continue with the next process.  This process is similar to a promise in that we are assuring that the async process is complete before continuing with the next process that will rely on our async function's returned data.


#A quick walkthrough of the app
The file server.js, can be run or imported.  Once executed, a server will be up on port 3000.
A database directory can be created and populated by via the app.

##Let's take a look at how that works.

Our schema for our database has 5 fields: title (required), genre (required), date, director, and actors.

A router is populated with a get, post, put, and delete function in the file app/route.js.

*The `get` generator function who's uri is '/movie', simply assigns every entry in the Movie database 
 as an array to `this.body`. This is done in the same statement as the yield that lets koa know 
 it can move on to the next middleware.

*The `post` generator function also with the uri of '/movie', first checks if the title of the movie to be posted 
 already exists. If it doesn't, we'll add the movie to the database and yield at that point. If it does,
 we simply yield and assign `this.body` to "An event with that name already exists".

*The `put` generator function replaces an existing movie with whatever fields are given by the user at what uri is given.  
 The title is given in the uri '/movie/:title' and provides which movie document will be updated. After updating
 the existing document and yielding, it sends out a 'Successful PUT' to the user.

*The `delete` generator function deletes the movie whose title matches the uri in a similar way to the `put` generator,
 '/movie/:title'.  It yields during the call to delete and assigns `this.body` to a message, 'Successful DELETE'.

#Comparing working with KOA and past Frameworks
From a birds-eye view KOA and express aren't that different. You can set up servers and routers in a very similar way.
The intricacies are really based in just a couple areas -- generators and using a `this` keyword over the `req` and `res` objects.
After getting used to the way that generators use the `yield` statement to deal with async work, using generators becomes a very
simple and powerful tool.  Not to say that organizing and planning many steps of middleware with yields has no potential to become
complicated, it does give one more tool to deal with async hell.  The other point mentioned seems like mere syntax for the user/dev
in that the req and res objects are accessed by what seems like context where `this` can mean either req or res depending on how it's 
used.

## Dependencies

```
"dependencies": {
    "koa": "^1.1.2",
    "koa-bodyparser": "^2.0.1",
    "koa-route": "^2.4.2",
    "koa-router": "^5.3.0",
    "mongoose": "^4.3.6"
  },
  "devDependencies": {
    "chai": "^3.4.1",
    "chai-http": "^1.0.0",
    "gulp": "^3.9.0",
    "gulp-eslint": "^1.1.1",
    "gulp-mocha": "^2.2.0",
    "mocha": "^2.3.4"
  }
```

## Authors

This server/router was written by [Kristopher Hughes](https://github.com/hugheskr),
[Jason Montoya](https://github.com/jacethelefty), [Samuel Heutmaker](https://github.com/SamHeutmaker),
and [James Vermillion](https://github.com/jamesvermillion) as coursework for the
Javascript 401 course at Code Fellows.


##Sources
- [Koa: Understanding the next-generation web framework for Node.js](https://www.youtube.com/watch?v=RVxx2T7SPw8)
- [Getting Started with Koa, part 1 - Generators](https://blog.risingstack.com/introduction-to-koa-generators/)

## License

This project is licensed under the terms of the MIT license.

