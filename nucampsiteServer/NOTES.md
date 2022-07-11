# Challenge Question: Express Generator Dependencies - Part 1

## Packages | API features I chose...
1. cookie-parser | cookieParser.signedCookies(cookies, secret)
2. http-errors | createError.isHttpError(val)
3. jade (pug) | pug.renderFile(path, ?options, ?callback)

***

## "cookie-parser" 

**Official Documentation -** https://github.com/expressjs/cookie-parser

**Quick Note:** a cookie is a piece of data comprised of 3 components - name, value, and optional attributes defined in name/value pairs, It's sent to the client-side in a request and stored by the user's web browser. Cookies contain helpful data like user information for personalization and user tracking, browsing history, and user sessions for session management.

### What is it?
The "cookie-parser" is middleware that makes use of cookies by parsing (analyzing each part of code and determining it's purpose or intended use) the cookies attached to the client request object in the Cookie header. It then populates the request object's cookie property (req.cookies) to send back the proper response. The property, req.cookies is an object that contains objects keyed by the name of the cookie. The cookie parser can also decrypt signed cookies if support is enabled.

### Some Specifics:
The response object's res.cookie() function is used to set the HTTP Set-Cookie header to the options that are provided to it - properties like domain, expires, signed, maxAge, encode... The value parameter may be a string or object converted to JSON.

Syntax: 

  ```res.cookie(name, value [, options]);```

### Implementation:
First, make sure express is imported and a new Express application is created:

    const express = require('express');
    ...
    const app = express();

Then...
* install it: ```$ npm install cookie-parser```
* import it: ```const cookieParser = require('cookie-parser');```
* mount it: ```app.use(cookieParser());```
* use it:

  send the cookie to the route specified in the first arg 
  
  ```app.get('/', ...```
  
  then pass the request (req) and response (res) objects into the callback (second arg) to get access to them.
  
  ```app.get('/', (req, res) => { ...```
  
  set the response object's cookie name parameter a value ('EnaCookie')
  
  ``` res.cookie('name', 'EnaCookie').send('Cookie-Parser'); ...```

  So...

      app.get('/', (req, res) => { 
        res.cookie('name', 'EnaCookie').send('Cookie-Parser'); 
      }); 
  
  Listen to the port 3000 with a callback that will either return an error or success...

      app.listen(3000, (err) => { 
          if(err){ console.log(err) }  
          else { console.log('Success!!') } 
      }); 


  Test it...

      console.log(document.cookie); // "name = EnaCookie"
      console.log('Cookies: ', req.cookies); // Cookies: { name: 'EnaCookie' }


### API Feature: cookieParser.signedCookies(cookies, secret)
  * Signing a cookie is optional. 

  * Cookies can be signed to prevent tampering. Next time the cookie is recieved, the signature is evaluated to detect whether or not the cookie has been tampered with.

  * Signed cookies are used in authentication.

  * A cookie is signed using a secret string or array. When the middleware attempts to parse the Cookie header in the request, if a cookie's secret is not provided, signed cookies will not be parsed - and will therefore remain signed.

  * If the secret that is provided is a string, the parser will simply use the string to attempt to unsign the cookie. 

  * If the secret is an array, the parser will iterate through the array, attempting to unsign the cookie with each item in the array, in order.

  * Once middleware exposes the request's cookie header data as the req.cookies property, and exposes the secret as req.signedCookies, these properties become name/value paired properties of the named cookie in the cookie's value property.

  * Signed cookies whose secret is correct will be unsigned and their name/value pairs will be moved to the req.signedCookie object in the value property. Signed cookies who's secret (or signature) is not correct (or validated) will return a value of 'false'

#### In Summary...
**cookieParser.signedCookies(str, secret)** will parse a cookie value as a signed cookie, process it as stated above using the secret provided, and return one of the following values: 
  
  * signed cookie/valid signature: unsigned cookie
  * signed cookie/invalid signature: false
  * unsigned cookie: original value
  
#### API Feature Implementation:

Import Express and middleware...

    const express = require('express'); 
    const cookieParser = require('cookie-parser');

Create a new Express application and assign it to the variable 'app' for easier use, then mount middleware and pass in the secret that will be injected into the request object to sign your cookie...

    const app = express(); 
    ... 
    app.use(cookieParser('secretSignatureForEnaCookie'));  

Send an http GET request with a callback that will create a signed cookie...
       
    app.get('/', (req, res) => {
      res.cookie('name', 'EnaCookie', { signed: true }).send(); 
    }) 

Listen on the port for connections requests to endpoints. If the request is not successful (err == true), return the error..

    app.listen(3000, (err) => { 
      if(err) { console.log(err) } 
      else { console.log('Success') } 
    }) 

View all signed cookies...

    console.log(req.signedCookies);

View a specific cookie...

    console.log(req.cookies.EnaCookie);


### More on HTTP Cookie Header...

> GeeksForGooks.org:
"HTTP headers are used to pass additional information with HTTP response or HTTP requests. A cookie is an HTTP request header i.e. used in the requests sent by the user to the server. It contains the cookies previously sent by the server using set-cookies. It is an optional header.

>Syntax:

    Cookie: <cookie-list>
    
    // In case of single cookie syntax is as follow:
    Cookie: name=value
    
    // In case of multiple cookies syntax is as follow:
    Cookie: name=value; name=value; name=value
  
  >The HTTP header **_Set-Cookie_** is a response header and used to send cookies from the server to the user agent. So the user agent can send them back to the server later so the server can detect the user.

  >Syntax:

    Set-Cookie: <cookie-name>=<cookie-value> | Expires=<date> 
                  | Max-Age=<non-zero-digit> | Domain=<domain-value>
                  | Path=<path-value> | SameSite=Strict|Lax|none"


### Research Resources:

* https://www.geeksforgeeks.org/express-cookie-parser-signed-and-unsigned-cookies/

* https://expressjs.com/en/5x/api.html#res.cookie

* https://www.geeksforgeeks.org/http-headers-cookie/

* https://www.quora.com/What-exactly-does-cookie-parser-do-and-why-do-I-need-it

* https://expressjs.com/en/api.html

* https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

* https://tools.ietf.org/html/rfc6265

* https://www.geeksforgeeks.org/http-headers-set-cookie/

* https://en.wikipedia.org/wiki/HTTP_cookie

* https://expressjs.com/en/resources/middleware/cookie-parser.html#:~:text=cookieParser(secret%2C%20options)&text=secret%20a%20string%20or%20array,with%20each%20secret%20in%20order.

* https://github.com/expressjs/cookie-parser/blob/master/index.js#L50

* https://stackoverflow.com/questions/33222074/about-app-listen-callback/33222176


***

## "http-errors"

**Official Documentation -** https://github.com/jshttp/http-errors#readme

**Quick Note:** 

**HttpError** is as an abstract class that contains properties with usable, human readable services error / server error information that can be accessed to create helpful, informative, detailed error messaging for developers and the client. The HttpError extends the generic Error object. 

The **generic Error object** has standard, built-in error types for errors that occur during run-time (the period of time that a program is running and is allocating/freeing memory, linking to libraries, executing functions, using services, running utilities, etc...). It provides information about things that have gone wrong with your program's processes and code.

>w3schools.com/ - An abstract class is a restricted class that cannot be used to create objects (to access it, it must be inherited from another class).

**Question:** 
In researching HttpError, I've seen references to it being an abstract class and an interface. I've also seen it being instantiated, which is confusing if it's an abstract class. Why is it being references as both? Is the type declared by the person developing the utility by using the abstract and interface keywords; or does it have a set type that differs from language to language?

>Stackoverflow.com - There are technical differences between Abstract Classes and Interfaces, that being an Abstract Class can contain implementation of methods, fields, constructors, etc, while an Interface only contains method and property prototypes. A class can implement multiple interfaces, but it can only inherit one class (abstract or otherwise).

>...the most important difference between Interfaces and Abstract Classes is the semantic difference. An Interface defines what something can do (how it behaves), and an Abstract Class defines what something is.

### What is it?

"http-errors" is an npm utility that makes it quick and easy to create server error messaging by extending the response error object returned from your http response. You can use built-in properties of the error object coupled with custom error messaging to send to the client for logging and other error handling. It uses the properties inherited by the error object: expose, headers, message, status, and statusCode. 

Basically, you can throw the HttpErrors like regular errors thrown in your code, but you can use them to define more detailed, custom responses and messaging.

```createError.HttpError``` allows you to extend the error object by attaching custom properties.


### Some Specifics:

Create a new error object with the given message msg...

```createError([status], [message], [properties]);``` 

Extend the given error object with createError.HttpError properties. 

```createError([status], [error], [properties]);```

#### Implementation:

First, make sure express is imported and a new Express application is created:

    const express = require('express');
    ...
    const app = express();

Then...
* install it: ```$ npm install http-errors```
* import it: ```const createError = require('http-errors');```
* mount and use it: (example)

      // if there is no user present, send the error into an express error handler through the next() argument....
      // if so go to the next appropriate middleware function.

      app.use((req, res, next) => { 
        if (!req.user) return next( 
          createError(401, 'Login Requried!!')); 
        next(); 
      }); 

* Listen on the specified port for connections requests to endpoints. If the request is not successful (err == true), return the error passed into the function. If it is, log the success message.
    app.listen(3000, (err) => { 
      if (err) console.log(err); 
      console.log( 
    `Server Running at http://localhost:8080`); 
    }); 


### API Feature: createError.isHttpError(val)

You can pass the error object you recieve into this method to evaluate whether or not it is an HttpError. The following will return true if:
* the error inherits from this module's HttpError constructor...

* 'duck typing' - the error's properties and methods match the kinds of properties and methods an error would have if it was created from the http-errors module

* a non-HttpError is passed into the "factory" ( an object creation design pattern that decouples the construction of the object from the object itself by not exposing the creational logic to the client and not having to specify the exact class ) **Need to understand the mechanics of this further

>ericlippert.com - In computer programming with object-oriented programming languages, **duck typing** is a style of typing in which an object's methods and properties determine the valid semantics, rather than its inheritance from a particular class or implementation of a specific interface.


#### Implementation:
// if the error is not a server error type...

    app.use((err, req, res, next) => { 
      if (!createError.isHttpError(err)) {
        console.log('This is not a server error.'); 
        next();
      }
    }); 

### Research Resources:
* https://www.geeksforgeeks.org/generating-errors-using-http-errors-module-in-node-js/

* https://javascript.info/custom-errors

* https://developer.here.com/documentation/data-inspector-library/api_reference_typedoc/classes/_here_olp_sdk_dataservice_api.httperror-1.html#constructor

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

* https://stackoverflow.com/questions/3900549/what-is-runtime

* https://blog.stackpath.com/runtime/#:~:text=Runtime%20is%20a%20system%20used,which%20a%20program%20is%20running.

* https://stackoverflow.com/questions/15178219/whats-the-difference-between-an-abstract-class-and-an-interface/15178292#:~:text=There%20are%20technical%20differences%20between,contains%20method%20and%20property%20prototypes.&text=In%20summary%2C%20classes%20define%20what,define%20what%20something%20can%20do.

* https://ericlippert.com/2014/01/02/what-is-duck-typing/#:~:text=In%20computer%20programming%20with%20object,implementation%20of%20a%20specific%20interface.

* https://www.npmjs.com/package/@openfinance/http-errors

* https://zellwk.com/blog/express-errors/

* https://developer.aliyun.com/mirror/npm/package/@openfinance/http-errors/v/1.2.0


## "jade (pug)"

**Official Documentation** 
https://www.npmjs.com/package/pug
https://pugjs.org/api/getting-started.html
https://pugjs.org/api/reference.html

**Quick Note:** 
The project named 'Jade' is deprecated due to trademark issues, so the package and project has been renamed to 'Pug' and moved. It's recommended to install pug in jade's place

**Pug**
>npmjs.com **Pug** is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.

### What is it?
Pug is a highly readable, whitespace-based templating engine with simplified syntax (based on haml) that compiles to html. It has loops, includes, conditionals, mixins, and supports javascript natively. 

With Pug you can create reusable html and render database and API data into the html elements using variables. It allows you to reuse the static html elements while dynamically populating them with data at runtime to create different views. It also helps to keep application logic and display logic seperate. 

Similar to haml, Pug uses indentation to determine tag nesting, so you'll need to be careful about how you use whitespace.

#### Implementation:

Install Pug into your project:

```npm install pug --save```

Set your view engine to Pug: 

```app.set(‘view engine’, ‘pug’);```

Set your default views (not sure if this is needed?)

```app.set("views", __dirname + "/views");``` 

Create a ```.pug``` file and add some code:

    doctype html
    html(lang="en")
      head
        title= pageTitle
        script(type='text/javascript').
          if (foo) bar(1 + 5)
      body
        h1= message
        #container.col
          if youAreUsingPug
            p You are amazing
          else
            p Get on it!
          p.
            Pug is a terse and simple templating language with a
            strong focus on performance and powerful features.

Create a route to render the view:

    app.get('/', function (req, res) {
      res.render('index', { title: 'Another Pug Template', message: 'This is an h1 heading!' })
    });

Then it compiles to:

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Another Pug Template</title>
        <script type="text/javascript">
          if (foo) bar(1 + 5)
        </script> 
      </head>
      <body>
        <h1>This is an h1 heading!</h1>
        <div id="container" class="col">
          <p>You are amazing</p>
          <p>Pug is a terse and simple templating language with a strong focus on performance and powerful features.</p>
        </div>
      </body>
    </html>

### API Feature: pug.renderFile(path, ?options, ?callback)

### Some Specifics:
```path:``` string
The path to the Pug file to render

```options:``` ?options
An options object, also used as the locals object

```callback:``` ?function
Node.js-style callback receiving the rendered results. This callback is called synchronously.

```returns:``` string
The resulting HTML string

https://github.com/pugjs/babel-plugin-transform-react-pug


#### Implementation:
Import Pug...
```const pug = require('pug');```

Point to a file on the server 
```const html = pug.renderFile('path/to/file.pug', options);```

Possibly use Pug templates to write react components?
https://github.com/pugjs/babel-plugin-transform-react-pug

>```babel-plugin-transform-react-pug``` is a plugin for babel which transpiles pug syntax within template literals to jsx.

Write your components this way:

    export const ReactComponent = props => pug`
      .wrapper
        if props.shouldShowGreeting
          p.greeting Hello World!

        button(onClick=props.notify) Click Me
    `
And it will be transpiled into:

    export const ReactComponent = props => (
      <div className="wrapper">
        {props.shouldShowGreeting ? (
          <p className="greeting">Hello World!</p>
        ) : null}
        <button onClick={props.notify}>Click Me</button>
      </div>
    )

### Research Resources:
* https://www.npmjs.com/package/pug
* https://pugjs.org/api/getting-started.html
* https://pugjs.org/api/reference.html
* https://www.sitepoint.com/a-beginners-guide-to-pug/
* https://www.geeksforgeeks.org/pugjs-basics-and-installation/
* https://github.com/pugjs/babel-plugin-transform-react-pug
* https://codeburst.io/what-is-pug-js-jade-and-how-can-we-use-it-within-a-node-js-web-application-69a092d388eb
* https://expressjs.com/en/guide/using-template-engines.html


# Challenge Question: Express Generator Dependencies - Part 2

_What are some other packages that could be useful to use with Express? Research this question and provide your answer below with links to articles and sample code._

## babel-plugin-transform-react-pug*
>```babel-plugin-transform-react-pug``` is a plugin for babel which transpiles pug syntax within template literals to jsx.
https://github.com/pugjs/babel-plugin-transform-react-pug

Write your components this way:

    export const ReactComponent = props => pug`
      .wrapper
        if props.shouldShowGreeting
          p.greeting Hello World!

        button(onClick=props.notify) Click Me
    `
And it will be transpiled into:

    export const ReactComponent = props => (
      <div className="wrapper">
        {props.shouldShowGreeting ? (
          <p className="greeting">Hello World!</p>
        ) : null}
        <button onClick={props.notify}>Click Me</button>
      </div>
    )

## helmet, express-session, JOI

There were several at hackernoon.com but I'll only list the first few. 
https://hackernoon.com/express-js-important-npm-packages-related-to-security-2393466e18d5

```helmet```
The helmet is really like a helmet for your applications. It protects your application by setting up various HTTP headers.

    const express = require('express');
    const helmet = require('helmet');
    const app = express();
    app.use(helmet());

```express-session```
The express-session middleware stores session data on the server; it only saves the session ID in the cookie itself, not session data.

    var app = express();
    app.set('trust proxy', 1); // trust first proxy
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    }));

```JOI```
Object schema description language and validator for JavaScript objects by hapi. It is very useful to validate the user input.

    const Joi = require('joi');
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        access_token: [Joi.string(), Joi.number()],
        birthyear: Joi.number().integer().min(1900).max(2013),
        email: Joi.string().email({
            minDomainAtoms: 2
        })
    }).with('username', 'birthyear').without('password', 'access_token');
    // Return result.
    const result = Joi.validate({
        username: 'abc',
        birthyear: 1994
    }, schema);
    // result.error === null -> valid
    // You can also pass a callback which will be called synchronously with the validation result.
    Joi.validate({
        username: 'abc',
        birthyear: 1994
    }, schema, function(err, value) {}); // err === null -> valid

## passport
https://www.npmjs.com/package/passport
http://www.passportjs.org/

>npmjs.com - Passport is Express-compatible authentication middleware for Node.js.

>Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies. Passport does not mount routes or assume any particular database schema, which maximizes flexibility and allows application-level decisions to be made by the developer. The API is simple: you provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.

>Before authenticating requests, the strategy (or strategies) used by an application must be configured.

    passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!user.verifyPassword(password)) { return done(null, false); }
          return done(null, user);
        });
      }
    ));

>Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });

>To use Passport in an Express or Connect-based application, configure it with the required passport.initialize() middleware. 

    var app = express();
    app.use(require('serve-static')(__dirname + '/../../public'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());

>Passport provides an authenticate() function, which is used as route middleware to authenticate requests.

    app.post('/login', 
      passport.authenticate('local', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });


# Notes Node, MongoDB, and Express

* MongoDB is a database technology that uses JSON-like documents instead of Structured Query Language (SQL). It is newer and works well with NodeJS.

* Mongoose ODM (Object Data Modeling) library makes working together with Node and MongoDB easier.

* Node was created by Ryan Dahl in 2009. It took the Chrome V8 Javascript Engine and uses it to create a runtime environment for JS outside of the browser so it can be used for server-side applications. Before this, developers had to use a backend language on the server-side. 

* Node uses callbacks and an event loop for a 'non-blocking, asynchronous I/O model'

* NPM - Node Package Manager was created in 2010 and it allows javascript developers to package, version, and share their code through the NPM registry

## HTTP

* Postman provides a graphical user interface for sending test HTTP requests to a server.

## Node Modules

* Javascript was intended for browser scripting and now it's being used for writing full fledged applications

* JS was not designed with a set of standard libraries that access the underlying hardware and provide a structured way of taking pieces of code from multiple files and combining them together into a single app. Languages like C, C++, Java all have these common libraries.

* In 2009 CommonJS was created to fill this need. It defined a module format for breaking up a JS app into multiple files or 'modules'. Node and NPM was developed using the CommonJS format for working with modules. The entire Node and NPM ecosystem is built on top of CommonJS

* Node Modules can be in 3 formats:
  1. External, 3rd-Party: Installed into the node_modules folder using NPM.
  2. Core Modules: Built into Node and are intentionally minimal. Not managed by NPM. They include 'path', 'fs', 'OS', 'util', and a few others.
  3. File-Based Modules: They are created within our own application. They use 'module.exports' syntax to export code from JS files and they import into other files using Node's built-in 'require' function. It's similar to and basically performs the same function as ES6's 'import/export' concept which is also available in Node 8.5 and up. The 'require' function is standard, and while it is not a part of vanilla js, it is built into Node.

    exports.double = x => x * 2; // example.js
    const exampleModule = require('./example.js'); // imports whatever is being exported from test.js
    console.log(exampleModule.double(3)); // when you run the file in Node by typing "node test" you get 6

* NodeJS is organized into a 'single threaded event loop'. 
* While JS is single threaded, modern system kernels are multi threaded and can handle multiple parallel operations in the background
* Node event loop picks up requests as they come in and executes them one after another.  
* Whenever it needs to, it will offload I/O requests to the system kernel - the central program of the operating system. When it's finished, it lets node js know so it can put any associated callbacks in the queue. The callbacks are then executed by the event loop. The event loop is a continuously running loop that picks up requests form a queue and services them one at a time.
* Node JS is single threaded so it is only able to do one thing at a time, but it gets more things done by delagating time intensive work and using callbacks to pick up where it left off once the delagated work is completed

## Six phases of the Node Event Loop
1. Timer Phase **
2. Pending Callback Phase
3. Idle, Prepare Phase
4. Poll Phase ** where most of the action happens. processes the queue of callbacks and will wait for and process any new request and timers once the queue is empty
5. Check Phase ** - handles callbacks from setImmediate() timer function when the queue in the poll phase in empty
6. Close Callbacks Phase - emots the 'close' event if a socket or handle is closed abruptly

  ** you will primarily use these

## Notes from:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

* Node.js has had the ability to split JavaScript programs up into separate modules that can be imported when needed for a long time, and there are a number of JavaScript libraries and frameworks that enable module usage (for example, other CommonJS and AMD-based module systems like RequireJS, and more recently Webpack and Babel).

* modern browsers have started to support module functionality natively — browsers can optimize loading of modules, making it more efficient than having to use a library and do all of that extra client-side processing and extra round trips.

* Use of native JavaScript modules is dependent on the import and export statements.

* .mjs versus .js
  -- It is good for clarity, i.e. it makes it clear which files are modules, and which are regular JavaScript. It ensures that your module files are parsed as a module by runtimes such as Node.js, and build tools such as Babel.

  -- To get modules to work correctly in a browser, you need to make sure that your server is serving them with a Content-Type header that contains a JavaScript MIME type such as text/javascript. If you don't, you'll get a strict MIME type checking error along the lines of "The server responded with a non-JavaScript MIME type" and the browser won't run your JavaScript. Most servers already set the correct type for .js files, but not yet for .mjs files. Servers that already serve .mjs files correctly include GitHub Pages and http-server for Node.js.

  -- If you really value the clarity of using .mjs for modules versus using .js for "normal" JavaScript files, but don't want to run into the problem described above, you could always use .mjs during development and convert them to .js during your build step.

  -- Some tools may never support .mjs, such as TypeScript. The ```<script type="module">``` attribute is used to denote when a module is being pointed to

  -- ```import 'commonjs-package/src/index.mjs';```
// Loaded as ES module since .mjs is always loaded as ES module.


  ## Exporting and Importing
  
* You can export functions, var, let, const, classes
* You can use a single statement of comma separated items to export all the things you'd like to make available in a more efficient way: export { name, draw, reportArea, reportPerimeter };
* Once you've exported some features out of your module, you need to import them into your script to be able to use them. The simplest way to do this is as follows:
  import { name, draw, reportArea, reportPerimeter } from './modules/square.js';
* Note: In some module systems, you can omit the file extension and the leading /, ./, or ../ (e.g. 'modules/square'). This doesn't work in native JavaScript modules.



## Notes from: https://flaviocopes.com/commonjs/

* Modules let you encapsulate all sorts of functionality, and expose this functionality to other JavaScript files as libraries. 

* import syntax: 
  const package = require('module-name')
  // For example...
  exports.uppercase = (str) => str.toUpperCase() // uppercase.js
  const uppercaseModule = require('uppercase.js')
  uppercaseModule.uppercase('test')

## Notes from: https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/

* You can think of the require module as the command and the module module as the organizer of all required modules. We rquire a file by loading the content of a file into memory.

* When Node invokes the require() function with a local file path as the function’s only argument, Node goes through the following sequence of steps:

  1. Resolving: To find the absolute path of the file. Node will look for the required module js file in all the paths specified by the module.paths in order.
  
  2. Loading: To determine the type of the file content.
  
  3. Wrapping: To give the file its private scope. This is what makes both the require and module objects local to every file we require.
  
  4. Evaluating: This is what the VM eventually does with the loaded code.
  
  5. Caching: So that when we require this file again, we don’t go over all the steps another time.

### The Module Object
  Module {
  id: 'usually the full path to the file', // every module object gets a property id
  exports: {},
  parent: undefined,
  filename: null,
  loaded: false,
  children: [],
  paths: [ ... ] }

So...
  Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/home/jim/Desktop/index.js',
  loaded: false,
  children: [],
  paths:
   [ '/home/jim/Desktop/node_modules',
     '/home/jim/node_modules',
     '/home/node_modules',
     '/node_modules' ] }

* Modules can also be folders with index.js files

## Notes from: https://www.sitepoint.com/understanding-module-exports-exports-node-js/

* Different Module Formats - the main ones:
  1. The Asynchronous Module Definition (AMD) format is used in browsers and uses a define function to define modules.

  2. The CommonJS (CJS) format is used in Node.js and uses require and module.exports to define dependencies and modules. The npm ecosystem is built upon this format.

  3. The ES Module (ESM) format. As of ES6 (ES2015), JavaScript supports a native module format. It uses an export keyword to export a module’s public API and an import keyword to import it.

  4. The System.register format was designed to support ES6 modules within ES5.

  5. The Universal Module Definition (UMD) format can be used both in the browser and in Node.js. It’s useful when a module needs to be imported by a number of different module loaders.

  More info: https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/ 

* requiring a module assigns the result to a variable. This is then used to invoke any method the module exposes.

* in CommonJS, modules are loaded synchronously and processed in the order they occur.

## Callback Functions, Higher Order Functions, and First-Class Fuctions
* First-Class Fuctions - functions tha are treated like any other variable. They can be assigned to variables, passed as arguments, and used as the return value of another function.

* Higher Order Functions - a function that passes in another function as an argument or returns another function as it's return value

* Callback Functions - a function that's passed to another function as an argument. A common example is asynchronous code. A callback is passed into the function and waits to execute until an async operation like a setTimeout or data fetching is complete. We need callbacks because javascript is an event driven language so rather than waiting for a response before moving on - it continues to execute while listening for other events. Callbacks are a way to make sure certain code doesn’t execute until other code has already finished execution.

  Simply put: A callback is a function that is to be executed after another function has finished executing — hence the name ‘call back’.

  For example, a setTimeout function is a higher order function that takes a callback function as it's first argument:

      setTimeout( () => callback function, timer interval );  
      setTimeout( () => console.log("This will execute after 2000ms"), 2000 );

  Also...

      const myCallbackFn () => console.log("This will execute after 2000ms");
      setTimeout( myCallbackFn, 2000);


* Closure - an innner function that has accesss to it's closing scope.

      const outerFn = () => {
        const x = 5;
        const innerFn = () => console.log(x);
        return innerFn; // 5
      }

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures...
  A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

  When we say that JS is lexically scoped, what we mean is that a function will have access to the variables in the context of which it was defined not in which it is called 

    function init() {
      var name = 'Mozilla'; // name is a local variable created by init
      function displayName() { // displayName() is the inner function, a closure
        alert(name); // use variable declared in the parent function
      }
      displayName();
    }
    init();

  ```init()``` creates a local variable called name and a function called ```displayName()```. The ```displayName()``` function is an inner function that is defined inside ```init()``` and is available only within the body of the ```init()``` function. Note that the ```displayName()``` function has no local variables of its own. However, since inner functions have access to the variables of outer functions, ```displayName()``` can access the variable name declared in the parent function, ```init()```.

  ** ```console.dir()``` will give you info on the function

## Notes from https://bytearcher.com/articles/io-vs-cpu-bound/
**"What do the terms 'CPU bound' and 'I/O bound' mean?"**
Bound implies performance bottleneck
Computation is said to be bound by something when that resource is the bottleneck for achieving performance increase. When trying to figure out if your program is CPU, memory or I/O-bound, you can think the following. By increasing which resource would your program perform better? Does increasing CPU performance increase the performance of your program? Memory, hard disk speed or network connection? All of these questions lead you to right to the source, of which resource your program is being held upon.

**Express.js app is I/O bound.** I/O-bound application waits most of the time for network, filesystem and database to complete. Increasing hard disk speed or network connection improves the overall performance. Node.js is best suited for this type of computing. All I/O in Node.js is non-blocking, and it allows other requests to be served while waiting for a particular read or write to complete.

**CPU-bound**
This kind of application leads to trouble in Node.js. If the application spends too much time performing a CPU-intensive task, all other requests are being held up. Node.js runs a single-threaded event loop to concurrently advance many computations, for example, serving multiple incoming HTTP requests. This works well as long as all event handlers are small and yet wait for more events themselves. But if you perform CPU intensive calculation, your concurrent web server Node.js application will come to a screeching halt. Other incoming requests will wait as only one request is being served at a time - not a very good service level.

There are strategies for coping with CPU intensive tasks. You can separate the calculation to elsewhere - forking a child process or using cluster module, using low level worker thread from libuv or creating a separate service. If you still want to do it in the main thread, the least you can do is give the execution back to the event loop frequently with nextTick(), setImmediate() or await.


### Notes from https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

The Node.js Event Loop, Timers, and process.nextTick()
What is the Event Loop?
The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.

Event Loop Explained

       ┌───────────────────────────┐
    ┌─>│           timers          │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    │  │     pending callbacks     │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    │  │       idle, prepare       │
    │  └─────────────┬─────────────┘      ┌───────────────┐
    │  ┌─────────────┴─────────────┐      │   incoming:   │
    │  │           poll            │<─────┤  connections, │
    │  └─────────────┬─────────────┘      │   data, etc.  │
    │  ┌─────────────┴─────────────┐      └───────────────┘
    │  │           check           │
    │  └─────────────┬─────────────┘
    │  ┌─────────────┴─────────────┐
    └──┤      close callbacks      │
       └───────────────────────────┘


1. timers: this phase executes callbacks scheduled by setTimeout() and setInterval().

  A timer specifies the threshold after which a provided callback may be executed rather than the exact time a person wants it to be executed. Timers callbacks will run as early as they can be scheduled after the specified amount of time has passed; however, Operating System scheduling or the running of other callbacks may delay them.

  Note: Technically, the poll phase controls when timers are executed.

2. pending callbacks: executes I/O callbacks deferred to the next loop iteration.

  This phase executes callbacks for some system operations such as types of TCP errors. For example if a TCP socket receives ECONNREFUSED when attempting to connect, some *nix systems want to wait to report the error. This will be queued to execute in the pending callbacks phase.

3. idle, prepare: only used internally.

4. poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.

  The poll phase has two main functions:

  Calculating how long it should block and poll for I/O, then
  Processing events in the poll queue.
  When the event loop enters the poll phase and there are no timers scheduled, one of two things will happen:

  If the poll queue is not empty, the event loop will iterate through its queue of callbacks executing them synchronously until either the queue has been exhausted, or the system-dependent hard limit is reached.

  If the poll queue is empty, one of two more things will happen:

  If scripts have been scheduled by setImmediate(), the event loop will end the poll phase and continue to the check phase to execute those scheduled scripts.

  If scripts have not been scheduled by setImmediate(), the event loop will wait for callbacks to be added to the queue, then execute them immediately.

  Once the poll queue is empty the event loop will check for timers whose time thresholds have been reached. If one or more timers are ready, the event loop will wrap back to the timers phase to execute those timers' callbacks.

5. check: setImmediate() callbacks are invoked here.

  This phase allows a person to execute callbacks immediately after the poll phase has completed. If the poll phase becomes idle and scripts have been queued with setImmediate(), the event loop may continue to the check phase rather than waiting.

  setImmediate() is actually a special timer that runs in a separate phase of the event loop. It uses a libuv API that schedules callbacks to execute after the poll phase has completed.

  Generally, as the code is executed, the event loop will eventually hit the poll phase where it will wait for an incoming connection, request, etc. However, if a callback has been scheduled with setImmediate() and the poll phase becomes idle, it will end and continue to the check phase rather than waiting for poll events.

6. close callbacks: some close callbacks, e.g. socket.on('close', ...).

  If a socket or handle is closed abruptly (e.g. socket.destroy()), the 'close' event will be emitted in this phase. Otherwise it will be emitted via process.nextTick().

  setImmediate() vs setTimeout()
  setImmediate() and setTimeout() are similar, but behave in different ways depending on when they are called.

  setImmediate() is designed to execute a script once the current poll phase completes.
  setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.
  The order in which the timers are executed will vary depending on the context in which they are called. If both are called from within the main module, then timing will be bound by the performance of the process (which can be impacted by other applications running on the machine).


* process.nextTick()
Understanding process.nextTick()
You may have noticed that process.nextTick() was not displayed in the diagram, even though it's a part of the asynchronous API. This is because process.nextTick() is not technically part of the event loop. Instead, the nextTickQueue will be processed after the current operation is completed, regardless of the current phase of the event loop. Here, an operation is defined as a transition from the underlying C/C++ handler, and handling the JavaScript that needs to be executed.

Looking back at our diagram, any time you call process.nextTick() in a given phase, all callbacks passed to process.nextTick() will be resolved before the event loop continues. This can create some bad situations because it allows you to "starve" your I/O by making recursive process.nextTick() calls, which prevents the event loop from reaching the poll phase.


Also see: https://developer.ibm.com/tutorials/learn-nodejs-the-event-loop/



## Using ES6 Modules in Node
* The official standard for packaging up javascript code for reuse is 'ECMAScript Modules' By default, experimental support for ES Modules is enabled in Node even though CommonJS is default - but with limited interoperability with CommonJS.

One of the ways to use ES Modules in Node is to use the .mjs extension for ES6 module files. Files with this extension will be interpreted as ES Modules even if the type field in the nearest package.json file (located in the same folder or any parent folder) is set to "commonjs". This value determines how the build tools and loaders are interpreted. If "type" is set to "module", the build tools and loaders will interpret files with a .js extension as ES Modules. This "module" setting also applies to files referenced in import statements and import() expressions.





The official standard for packaging up pieces javascript code for reuse is 'ECMAScript Modules'. By default, experimental support for ES Modules is enabled in Node - but with limited interoperability with CommonJS.

One of the ways to use ES Modules in Node is to add the .mjs extension to js files with ES Module syntax. The "type" value determines how the build tools and loaders are interpreted. If "type" is set to "module", the build tools and loaders will interpret files with a .js extension as ES Modules. Files with this extension will be interpreted as ES Modules even if the type field in the nearest package.json file (located in the same folder or any parent folder) is set to "commonjs". This "module" setting also applies to files referenced in import statements and import() expressions. 

## HTTP and Networking
More info:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
https://www.codecademy.com/articles/http-requests
https://www.lifewire.com/definition-of-protocol-network-817949
https://www.plixer.com/blog/network-layers-explained/



* Backend of web apps are typically hosted in the cloud by services like AWS, Heroku, Digital Ocean, Azure, etc

* When your web app communicates with the server, there may be delays or errors. Your front end needs to be able to handles these errors and delays, and communicate to the user.

* Networking Protocols - a set of rules that determine how two networked systems will talk to each other...
  -- What kind of data will be exchanged?
  -- How will the data be formatted?
  -- How will the systems respond to certain types of requests?

* Different types of protocols (TCP, UDP, FTP, SMTP) operate at differnt network layers from the physical layer to the application layer.

* HTTP (Hyper Text Transfer Protocol) is an application layer protocol. It is a foundation of data communication on the web. Every time you load a new webpage into the browser from the web:
  1. browser sends request to the server via 'HTTP request'. it doesn't go directly to the server - it takes a complicated route to get there - but if it is successful, it arrives at the correct server...
  2. then that server processes the request and responds to the request via 'HTTP response'


### HTTP Request 
* Always supplies an HTTP method or (HTTP Action) - 'GET/PUT/POST/DELETE'
* HTTP Protocol Version: typically 'HTTP/1.1'
* URL target
* Headers that provide more data about the request (optional): Host, Accept-Language
* Body that contains data for the request. (if it exists) POST will have this

### HTTP Response
* HTTP Status code https://httpstatuses.com/
* HTTP Protocol bversion
* Headers: Date, Server, Last-Modified, Etag, Accept-Ranges, Content-Length, Content-type
* Body

#### Status Codes
1. 1×× Informational
  * 100 Continue
  * 101 Switching Protocols
  * 102 Processing
2. 2×× Success
  * 200 OK
  * 201 Created
  * 202 Accepted
  * 203 Non-authoritative Information
  * 204 No Content
  * 205 Reset Content
  * 206 Partial Content
  * 207 Multi-Status
  * 208 Already Reported
  * 226 IM Used
3. 3×× Redirection
  * 300 Multiple Choices
  * 301 Moved Permanently
  * 302 Found
  * 303 See Other
  * 304 Not Modified
  * 305 Use Proxy
  * 307 Temporary Redirect
  * 308 Permanent Redirect
4. 4×× Client Error
  * 400 Bad Request
  * 401 Unauthorized
  * 402 Payment Required
  * 403 Forbidden
  * 404 Not Found
  * 405 Method Not Allowed
  * 406 Not Acceptable
  * 407 Proxy Authentication Required
  * 408 Request Timeout
  * 409 Conflict
  * 410 Gone
  * 411 Length Required
  * 412 Precondition Failed
  * 413 Payload Too Large
  * 414 Request-URI Too Long
  * 415 Unsupported Media Type
  * 416 Requested Range Not Satisfiable
  * 417 Expectation Failed
  * 418 I'm a teapot
  * 421 Misdirected Request
  * 422 Unprocessable Entity
  * 423 Locked
  * 424 Failed Dependency
  * 426 Upgrade Required
  * 428 Precondition Required
  * 429 Too Many Requests
  * 431 Request Header Fields Too Large
  * 444 Connection Closed Without Response
  * 451 Unavailable For Legal Reasons
  * 499 Client Closed Request
5. 5×× Server Error
  * 500 Internal Server Error
  * 501 Not Implemented
  * 502 Bad Gateway
  * 503 Service Unavailable
  * 504 Gateway Timeout
  * 505 HTTP Version Not Supported
  * 506 Variant Also Negotiates
  * 507 Insufficient Storage
  * 508 Loop Detected
  * 510 Not Extended
  * 511 Network Authentication Required
  * 599 Network Connect Timeout Error

### Transferring Data: XML vs JSON
More info:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction

* static sites: every new page makes HTTP requests to server for all assets
* SPA: most assets and files are dowloaded in beginning in one dowloand and the client requests the data for the current view when it changes. Two mosy common ways text data if formatted: XML and JSON

* JSON is encoded specifically to be transferred over networks and is easy for javascript apps and databases to parse. It's used by RESTful web services. Double quotes are mandatory.

* XML is similar to HTML but is not meant to be read by a browser. It's for storing and transferring data and it's typically used by the SOAP protocol

* SOAP


* REST


## Node HTTP Module
* There is a core HTTP Module built into Node that upi must require in order to use: const http = require('http');

* This module provides an http.createServer() method which creates a new instance of the http.Server class. It is passed a callback function parameter that handles the requests. The callback is sometimes called the request handler or the request listener and it listens to requests and the callback is called every time there is a new server request.

* the server.listen() method listens for requests on the port name or host name you give it. 

* the http module request handler callback has two parameters: request and response (req, res). these objects contain information about the request from the client and the response that will be sent back to the client

* 'req' object contains info about the request like method, url, headers, status, etc

* 'res' object is given information for the response like header, status code. etc... and we do not create this our selves. it is generated

* set a message for the response body using the res.write(); method and make sure to use the res.end() method to finish. it signals to the server that all of the response headers and body has been sent and the message is complete. You can also omit the write() method and include the message as an argument in the end() method

### Path snd FS core modules
More Info:
https://www.w3schools.com/nodejs/nodejs_http.asp
https://nodejs.org/api/http.html
https://anasshekhamis.com/2017/10/09/handling-http-requests-using-the-http-module/
http://zetcode.com/javascript/http/

* Path provides a utility for working with files and directory paths on the server.
  -- path.extname() returna file extension from given file
  -- path.resolve() converts relative path to absolute

* FS provides utilities for interacting with local file system of the server
  -- fs.access() checks whether a file can be accessed
  -- fs.createReadStream() reads from a file in small chunks of data instead of loading the entire file into memory

  https://nodejs.org/es/docs/guides/anatomy-of-an-http-transaction/
  https://nodejs.org/api/path.html#path_path
  https://nodejs.org/api/http.html#http_class_http_incomingmessage
  https://nodejs.org/api/http.html#http_class_http_serverresponse
  https://nodejs.org/api/stream.html
  https://nodesource.com/blog/understanding-streams-in-nodejs/
  https://flaviocopes.com/nodejs-streams/


  ## Express and NPM
  * Express is a framework for building HTTP servers


  ## REST (Representational State Transfer) and SOAP (Simple Object Access Protocol)
https://developers.google.com/maps/documentation/javascript/tutorial
https://www.guru99.com/web-service-architecture.html
https://danielmiessler.com/study/url-uri/
https://symfonycasts.com/screencast/rest/rest
https://www.w3schools.com/xml/xml_soap.asp
https://developer.twitter.com/en/docs
https://developer.wordpress.org/rest-api/
https://developers.google.com/maps/documentation/javascript/tutorial

  * REST is a software architectural style that defines a set of constraints for creating web services.

  * Web Services - resources avaiable over the web

  * SOAP uses WSDL (Web Services Description Language) to specify how two endpoints in a network communicate with one another and it depends on XML for it's messaging fornmat

  * REST can use xml, html, json, or plain text

  * SOAP is a strict protocol while REST describes an approach and does not enforce specifications

  * 6 defining constraints of REST:
    1. Client server separation
    2. Statelessness
    3. Uniform Interface
    4. Cacheable
    5. Layered System
    6. Code on Demand (optional)

  * Restful services are built on the http protocol and use the 9 http methods or verbs
    1. POST
    2. DELETE
    3. PUT
    4. HEAD
    5. CONNECT
    6. OPTIONS
    7. TRACE
    8. CATCH
    9. GET
  
  * POST/GET/PUT/DELETE are analogous to CRUD operations in database programming CREAT/READ/UPDATE/DELETE

  * all but POST are considered Idempotent methods - they do not change the thing being operated upon beyond the first operation if at all. POST will create a new resource every time. Remember which operations are safe to repeat over and over.

  * When the server responds to a client request, it does not send the resource. it sends a representation of that resource usually in the form od json or xml

  * OR the client will send a POST or PUT request via a json or xml representation and the server will create a resource from it


## Express Router
https://expressjs.com/en/starter/basic-routing.html
https://expressjs.com/en/guide/routing.html
https://expressjs.com/en/4x/api.html#routing-methods
http://expressjs.com/en/guide/routing.html#route-parameters
http://expressjs.com/en/api.html#router

* Express routing methods: app.get(), app.put(), app.delete(), app.post(), app.all() etc

* each has 2 required params: path and callback function. the callback function is a middleware function used to handle the server request to the endpoint:

// endpoint: a path + an HTTP verb like GET or PUT

  app.get('/campsites', (req, res, next) => {
    ...
  });

* Route Parameters: use a colon to parse a string in a request path into a parameter stored in req.params

  // if the server recieves GET request for /campsite/23, it will store 23 as the value for req.params.campsiteId

  app.get('/campsites/:campsiteId', (req, res, next ) => {
    ...
  });

* built in express.json() middleware automatically parses JSON data into properties of the req.body javascript object so we can use the data easily

* express router is built in middleware that subdivide the routing into different modules. it handles routing for paths. for example: a router module called campsiteRouter can be used to deal with requests that involve paths beginning with '/campsites'

https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/
https://blog.grossman.io/expressjs-tips-for-large-applications/


## MongoDB and SQL (Structured Query Language)
https://docs.mongodb.com/manual/
https://docs.mongodb.com/manual/reference/bson-types/
https://docs.mongodb.com/manual/reference/method/ObjectId/
https://www.thorntech.com/2019/03/sql-vs-nosql/
https://youtu.be/ZS_kXvOeQ5Y

* SQL is a relational database. It's based on relational algebra and the relational model of data. Syntax examples:

  -- SELECT * FROM Partners;
    selects all the rows in the partners table

  -- CREATE DATABASE campsites;
  creates new databases named campsites

* SQL respresented in a table by rows and columns and is designed to be easy to sort / analyze data; and easy to create new tables with queries using specific criteria

* it has a strict schema - every row in the table must have identical structure.

* RDBMS - Relational Database Managhement System: MS Access, Oracle, MySQL

* NoSQL - a new class of databases that are not SQL-based relational databases. They are loosely grouped into at least 4 categories: 
  1. key-value based
  2. column-family based
  3. graph based
  4. document based (MongoDB)

* Mongo is short for humongous. It's created to handle very large amounts of data. it contains collections (table), the collections contain documents (rows), the rows contain fields (cells). 

* MongoDB does not enforce inherent structure on documents, so docs in the same collection can have different structures. You can enforce structure using document schemas.

* BSON - binary JSON. it extends the JSON model to provide additional data types and ordered fields. it also allows for greater efficiency for encoding and decoding within different languages

* _id: - a unique, immutable once set, primary key in Mongo that every document must have. you can set it yourself or Mongo will set it automatically via the ObjectId api using the object's timestamp, increment value, etc, every time the object is generated.

* ObjectId is one of the additional data types provided by the BSON format. Other types: date, regular expression. binary data

* The major advantage of NoSQL databases is scalability. 
  1. Horizontal scaling: distributing database over multiple servers i ideal for cloud computing
  2. Vertical scaling: improving capacity of the existong server to be able to handle more data (RAM, CPU, disk space, etc)
* SQL databases are difficult to distribute and are limited to vertical scaling. NoSQL databases like Mongo are designed for horizontal scaling via a method called 'sharding'

* NoSQL databases are also easier to deploy. the JSON-like data formats make databases like Mongo easier to map data to javascript objects for use in applications such as node based ones. these are particularly popular in web-development based applications. SQL databases require much more work to map it's data to an application's server-side language.

* HOWEVER... SQL databases perform complex analytical queries faster. it's also more stable for things like banking applications where data integrity is important and there are lots of transactions and frequent updates to records. SQL is older and more established - so it is tested, has more tools and support, and has a larger userbase.

* choose a database based on priorities and use: SQL vs NoSQL or MySQL vs MongoDB - Youtube video from Academind channel https://youtu.be/ZS_kXvOeQ5Y

### MongoDB installation:
Windows Users:

* Download MongoDB from https://www.mongodb.com/download-center/community, and install with default options. Complete setup, with the following exception: 
When you are asked if you want to Install MongoD as a Service, uncheck the box as shown below and hit Next. 

* After installing MongoDB, add the path to the MongoDB's binaries folder C:\Program Files\MongoDB\Server\4.2\bin (mind the version you are installing and change the path accordingly if necessary) to your System Path variable. This will let you run the mongod and mongo commands globally without needing to specify the full path every time.

* Confirm your installation mongod --version

### Set up folders and start the server, then add data through the Mongo REPL shell

https://docs.mongodb.com/manual/reference/method/index.html
https://docs.mongodb.com/manual/mongo/#working-with-the-mongo-shell
https://docs.mongodb.com/manual/reference/insert-methods/#additional-inserts
https://docs.mongodb.com/manual/reference/method/ObjectId/index.html
https://docs.mongodb.com/manual/tutorial/query-documents/

* Create a folder named ```mongodb``` inside your NucampFolder/5-NodeJS-Express-MongoDB folder, and create a subfolder under it named ```data```. 

* Open a bash terminal in the mongodb folder and then start the MongoDB server by typing the following at the prompt:

```mongod --dbpath=data```

* Open another bash terminal (in any location), then type the following command to start the Mongo REPL (Read Evaluate Print Loop) shell: 

```mongo```

* The Mongo REPL shell will start running, inside which you can issue commands to the MongoDB server. At this prompt, enter the following commands one by one and observe the results: 

```db```

```use nucampsite```

```db```

```db.help()```

* Next, create a collection named ```campsites```, and insert a new campsite document in the collection: 

```db.campsites.insert({ name: "React Lake Campground", description: "Test" });```

* Then to print out the campsites in the collection, type: 

```db.campsites.find().pretty();```

  gives us...

      {
        "_id" : ObjectId("5fc046c6912d4ed27485126f"),
        "name" : "React Lake Campground",
        "description" : "Test"
      }

* Note the "_id" that was automatically assigned to the campsite. Next, we will learn the information encoded into an instance of ObjectId by typing the following at the prompt: 

```const id = new ObjectId();```

```id.getTimestamp();``` // ISODate("2020-11-27T00:23:22Z")

* To exit the REPL shell, type exit at the prompt:

```exit```

* DB methods:

        db.adminCommand(nameOrDocument) - switches to 'admin' db, and runs command [just calls db.runCommand(...)]
        db.aggregate([pipeline], {options}) - performs a collectionless aggregation on this database; returns a cursor
        db.auth(username, password)
        db.cloneDatabase(fromhost) - will only function with MongoDB 4.0 and below    
        db.commandHelp(name) returns the help for the command
        db.copyDatabase(fromdb, todb, fromhost) - will only function with MongoDB 4.0 
        and below
        db.createCollection(name, {size: ..., capped: ..., max: ...})
        db.createUser(userDocument)
        db.createView(name, viewOn, [{$operator: {...}}, ...], {viewOptions})
        db.currentOp() displays currently executing operations in the db
        db.dropDatabase(writeConcern)
        db.dropUser(username)
        db.eval() - deprecated
        db.fsyncLock() flush data to disk and lock server for backups
        db.fsyncUnlock() unlocks server following a db.fsyncLock()
        db.getCollection(cname) same as db['cname'] or db.cname
        db.getCollectionInfos([filter]) - returns a list that contains the names and options of the db's collections
        db.getCollectionNames()
        db.getLastError() - just returns the err msg string
        db.getLastErrorObj() - return full status object
        db.getLogComponents()
        db.getMongo() get the server connection object
        db.getMongo().setSecondaryOk() allow queries on a replication secondary server
        db.getName()
        db.getProfilingLevel() - deprecated
        db.getProfilingStatus() - returns if profiling is on and slow threshold       
        db.getReplicationInfo()
        db.getSiblingDB(name) get the db at the same server as this one
        db.getWriteConcern() - returns the write concern used for any operations on this db, inherited from server object if set
        db.hostInfo() get details about the server's host
        db.isMaster() check replica primary status
        db.hello() check replica primary status
        db.killOp(opid) kills the current operation in the db
        db.listCommands() lists all the db commands
        db.loadServerScripts() loads all the scripts in db.system.js
        db.logout()
        db.printCollectionStats()
        db.printReplicationInfo()
        db.printShardingStatus()
        db.printSecondaryReplicationInfo()
        db.resetError()
        db.runCommand(cmdObj) run a database command.  if cmdObj is a string, turns it into {cmdObj: 1}
        db.serverStatus()
        db.setLogLevel(level,<component>)
        db.setProfilingLevel(level,slowms) 0=off 1=slow 2=all
        db.setVerboseShell(flag) display extra information in shell output
        db.setWriteConcern(<write concern doc>) - sets the write concern for writes to the db
        db.shutdownServer()
        db.stats()
        db.unsetWriteConcern(<write concern doc>) - unsets the write concern for writes to the db
        db.version() current version of the server
        db.watch() - opens a change stream cursor for a database to report on all  changes to its non-system collections.




https://mongodb.github.io/node-mongodb-native/3.6/api/
http://mongodb.github.io/node-mongodb-native/3.4/api/index.html
https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html#.connect
https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne
https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne
https://nodejs.org/dist/latest-v14.x/docs/api/assert.html#assert_assert_strictequal_actual_expected_message
https://docs.mongodb.com/ecosystem/drivers/node/
https://flaviocopes.com/node-mongodb/
https://www.w3schools.com/nodejs/nodejs_mongodb.asp
https://github.com/mongodb/node-mongodb-native/releases/tag/v3.2.1


## MongoDB and Mongoose ODM

* MongoDB allows you to impose your own structure on your database
* you can do this using Mongoose ODM (ODM is not in the official name)
* ODM refers to Object Document Mapping or Object Data Model
* Mongoose is built on top of the MongoDB node driver and wraps around that api
* once you install and require mongoose, you will use ```mongoose.connect()``` instead of ```MongoClient.connect()``` because mongoose.connect() is using MongoClient.connect() behind the scenes
* it's similar to how the Express api wraps around node core's http module
* how mongoose allows you to enforce a structure
  1. define a schema (fields, data types, etc...)
  2. generate a ```Model``` for a ```Schema``` and a specific MongoDB collection
  3. use ```Model``` to instantiate new documents for the specified collection. it's similar to javascript classes
  4. the ```Model``` will enforce structure from ```Schema``` and it will validate documents to make sure it follows structure
  5. ```Model``` also interacts with documents through the model's static methods. static methods are a concept in javascript https://javascript.info/static-properties-methods

* **static methods** - The static keyword defines a static method or property for a class. Neither static methods nor static properties can be called on instances of the class. Instead, they're called on the class itself. Static methods are often utility functions, such as functions to create or clone objects, whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

syntax:

```static methodName() { ... }```

```static propertyName [= value];```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static

### Mongoose Schemas and Models
https://mongoosejs.com/
https://gitter.im/Automattic/mongoose
https://css-tricks.com/understanding-javascript-constructors/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static

#### Schemas
* Schemas - javascript onjects that contain info about doc structure
* a schema instance is an object whose properties pre-define fields of a document ()
* you can configure the fields to have mongoose validate them and throw an error if the wrong schema type is used
* schema types: String, Number, Date, Mixed, ObjectId, Array, Buffer, Boolean, Decimal128, Map...
* other config types: required, unique, default, min, max...
* schemas support nesting for 'subdocuments'

#### Models
* Models - use a schema to create a model
* the model copies the schema and uses it when creating new documents
* create a new Model using the mongoose.model() method. pass in a name that will be uses to figure out the collection the Model will be used for, and the Schema to use
* the first argument should be the capitalized, singular version of the MOngoDB collection name the Model is for.

```const Campsite = mongoose.model('Campsite', campsiteSchema)```

* Mongoose automatically figures out the plural, lowercase version and looks for the corresponding collection. it will also create it if it doesn't exist

* the model is created as a constructor function rather than classes because mongoose was created before ES6. classes are ES6's syntactic sugar for constructor functions

* you can think of models as classes. models are used to instantiate new documents.

* the model validates the new doc against a copy of the schema it was created with

* the model will insert the doc into the corresponding collection

* models have static methods that are used to interact with all instances of the model. static methods live on the class or constructor fuction rather than the instance

* for example: .find(), .deleteOne(), countDocuments()...
  Campsite.find() // finds all docs instantiated from Campsite Model

* Non-Static Methods - will be defined: Model.prototype.methodName() any not defined this way are static


## REST API with Express, MongoDB and Mongoose

GET request lets the Express server know that the client wants to retrieve data from the server whether in the form of a static file or regular data. The Express server then performs business logic on the request once it figures out what type of data is being requested: 
  * how to represent the data...
  * checking to see if the request is valid...
  * what to indclude in the response header...
  * how to handle errors...
  * checking for proper authorization if needed...
  * other operations that help the server figure out how to respond to the request.
  * if CRUD is needed, Express takes on the role of client to MDB Server because the Express application is now the entity making the request to the server. This is enabled through the MDB Node Driver which we wrap with Mongoose to enforce schemas. Once the DB operation is complete, Express takes on the role of server again and sends a response back to the HTTP client that originated this request cycle. That client could be a web browser or other application like Postman.
  
**Basically:**
  1. Client makes a request (GET, PUT, POST, DELETE). If the request is asking for data and not a static file...
  2. Express initiates a corresponding database operation behind the scenes so it can behave like a client to the MDB database server - so the HTTP client doesn't have to handle any complicated logic...
  
      ```HTTP client (browser or application) request for data --> Express Server (applies business logic: figures out how to get and package data and handle any error, and sends data back) --> MongoDB (has data)```


# Challenge Question: Arrays and Objects

## Question #1: 
1. What is at least one way to add an object to an existing array? 
2. What is at least one way to add an array to an existing object?

*** 

## Object --> Array: ```push()```, ```splice()```, ```unshift()```

### ```push()``` || Array.prototype.push()
Push is a simple way to put one or more values onto the end of the array. This method will return the array's length.

    let arr = [1,2,3,4,5,6,7,8]; 
    // length = 8

    arr.push({ firstNumber: 100, secondNumber: 200 }); 
    
    arr; 
    // returns [1, 2, 3, 4, 5, 6, 7, 8, { firstNumber: 100, secondNumber: 200 }] 
    // length = 10 

    arr[8];
    // returns { firstNumber: 100, secondNumber: 200 }

    arr[8].firstNumber; 
    // returns 100
    

#### **Syntax**

```arr.push(element or objectName or {object literal} or [array literal]);```

#### **Return value**
The new length property of the object upon which the method was called.

*** 

### ```splice()``` | Array.prototype.splice()
```splice()``` will change the contents of your array by:
  1. removing existing elements...
  2. replacing existing elements...
  3. or adding new elements in place of existing elements.
  
The operation starts at a specific index. It takes 3 parameters:
  1. the starting index...
  2. the number of elements to delete...
  3. the items to be added to the array. 
  
If you specify the second param (deleteCount) as 0, you can insert the element/object without deleting any other elements

    let myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

    let fishStuff = {
      food: 'Flakey Time Plankton Bits',
      decor: [ 'pebbles', 'pineapple house', 'seaweed' ],
      equipment: 'filter'
    };

    const aquarium = (arrToSplice) => {
      arrToSplice.splice(4, 0, fishStuff);
      return arrToSplice;
    }

    aquarium(myFish);
    // returns ["angel", "clown", "mandarin", "sturgeon", { ...fishStuff Object... }]

**Syntax:**

```arr.splice( start, deleteCount, item list )```

***

### ```unshift()``` || Array.prototype.unshift()
The unshift() method adds an element to the beginning of the array an returns the length of the modified array.

    let arr = [1,2,3,4,5]; // length = 5

    arr[0]; // returns 1

    arr.unshift({beginningNumber: 'zero'}); // [{beginningNumber: 'zero'},1,2,3,4,5] | returns 6

    arr[0]; // returns {beginningNumber: 'zero'}


## Array --> Object: ```Add as a property```
An array can be added to an object as the value of a property in the object;

    let product = {
      name: 'Thing-a-ma-bob',
      description: 'Some kind of cool product thingy',
      price: '5.99'
    }

    let reviewsToAdd = [
      {
        reviewerName: 'John Doe',
        rating: '3',
        review: 'Meh.'
      },
      {
        reviewerName: 'Ena Jenkins',
        rating: '5',
        review: 'Great Product!'
      },
      {
        reviewerName: 'Mary Christmas',
        rating: '1',
        review: 'This sucks!'
      }
    ];

    product.reviews = reviewsToAdd;
    // add the array to the object as a property

    product.reviews[0]; 
    // returns {reviewerName: "John Doe", rating: "3", review: "Meh."}

    product.reviews[1]; 
    // returns {reviewerName: "Ena Jenkins", rating: "5", review: "Great Product!"}

    product.reviews[1].review;
    // returns "Great Product!" 

# Question #2: 
* How can you find the length of an array? 
* How can you find the number of properties in an object?

## The Length Property || ```arr.length```
The .length property returns the number of elements in an array.

      let arrayOfAnimals = ["cat", "dog", "rat", "snake"];
      arrayOfAnimals.length; // 4

You can also change the length of the array.

      let arrayOfAnimals = ["cat", "dog", "rat", "snake"];
      arrayOfAnimals.length = 10; // ["cat", "dog", "rat", "snake", ,,,,,,]


## Counting an object's properties

https://attacomsian.com/blog/javascript-iterate-objects
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

### Write a ```for/in``` loop...
Simply iterate through the objects properties as you update the count.
For the most part, this is an easily readable, straighforward way to do this. It's obvious what is happening. If you have an object that isn't linked to a prototype, this may be fine. 

      let myObject = {
        firstKey: 'foo',
        secondKey: 'bar',
        thirdKey: 'baz'
      } 

      let count = 0;
      for ( var x in myObject ) {
        ++count
      } // count will be 3

However, please note that a for/in loop in javascript will count not just the enumerable properties of the object... but also the properties of any objects linked to it by it's prototype chain...

      let originalObject = {
        unexpectedKey: 'This property will be counted because it\'s linked as myObject\'s prototype below'
      }

      let myObject = Object.create(originalObject); 
      myObject.firstKey = 'foo';
      myObject.secondKey = 'bar';
      myObject.thirdKey = 'baz';

      let count = 0;
      for ( var i in myObject ) {
        ++count
      } // count will be 4 

...you could always filter out properties from the prototype chain by wraping the action you are taking inside the for/in loop with a conditional:

      if (myObject.hasOwnProperty(i)) {
        ++count
      } // count will be 3

...or you could use methods ```Object.keys()``` or ```getOwnPropertyNames()``` that will ONLY count the properties belonging directly to the object you are calling the method on. 

You can also use ```Object.getOwnPropertySymbols()`` to access proerties whose keys are Symbols. These properties are left out of the count when using the methods above because of the nature of the key name. You can read more about this in the notes section.

***

### Use ```Object.keys()``` and loop through the resulting array...
```keys()``` will only count the object's own ```enumerable``` properties. It will return an array containing all of the object's enumerable property names (keys). ```keys()``` does not traverse the object's prototype chain looking for more property names.

      let myObject = {
        firstKey: 'foo',
        secondKey: 'bar',
        thirdKey: 'baz',
        fourthKey: 'has be previously defined as non-enumerable'
      } // length = 3

      const keys = Object.keys(myObject);
      // returns ["firstKey", "secondKey", "thirdKey"]

...loop through the resulting array to count them:

      // iterate over object
      keys.forEach((key, index) => {
          console.log(`${index}. ${key}: ${myObject[key]}`);
      });

      OUTPUT:
      0. firstKey: foo
      1. secondKey: bar
      2. thirdKey: baz

### Use ```Object.getOwnPropertyNames()``` and loop through the resulting array...
```getOwnPropertyNames()``` will count all of an object's own property names whether the key has been defined as non-enumerable or not, and will return an array with all of those names. 

      let myObject = {
        firstKey: 'foo',
        secondKey: 'bar',
        thirdKey: 'baz',
        fourthKey: 'has be previously defined as non-enumerable'
      }  // length = 4

      const keys = Object.getOwnPropertyNames(myObject);
      // returns ["firstKey", "secondKey", "thirdKey", "fourthKey"]

...loop through the resulting array to count them:

      // iterate over object
      keys.forEach((key, index) => {
          console.log(`${index}. ${key}: ${myObject[key]}`);
      });

OUTPUT:

0. firstKey: foo
1. secondKey: bar
2. thirdKey: baz
3. fourthKey: has be previously defined as non-enumerable

*** 
## Notes on concepts mentioned...

>### **Enumerability and ownership of properties**
>#### https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
>Enumerable properties are those properties whose internal enumerable flag is set to ```true```, which is the default for properties created via simple assignment or via a property initializer (properties defined via ```Object.defineProperty``` and such default enumerable to false). Enumerable properties show up in for...in loops unless the property's key is a ```Symbol```. Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain. Properties of an object can also be retrieved in total. There are a number of built-in means of detecting, iterating/enumerating, and retrieving object properties, with the chart showing below which are available. Some sample code follows which demonstrates how to obtain the missing categories.

>### **Symbol**
>#### https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
>Finding symbol properties on objects
The method ```Object.getOwnPropertySymbols()``` returns an array of symbols and lets you find symbol properties on a given object. Note that every object is initialized with no own symbol properties, so that this array will be empty unless you've set symbol properties on the object.

  https://medium.com/intrinsic/javascript-symbols-but-why-6b02768f4a5c

  https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/

  https://exploringjs.com/es6/ch_symbols.html#sec_overview-symbols

  https://javascript.info/symbol


# Question #3: 

Let's say you have a MongoDB collection of documents, and you've used a Mongoose/MongoDB Node Driver method such as collection.find() that returns the documents as objects in an array. How would you go about checking to see if a specific object already exists in that array?

