# Cognizant exercise

This exercise emulates a machine wich sensors send its value in real time to an Angular.js app using the Socket.io library.

## Install and start

It is a Node.js app, so the start up process is the usual in this kind of apps.

```bash
git clone https://github.com/doscientosuno/cognizant-exercise.git exercise && cd exercise
npm install
npm start
```
Then, we can visit [http://localhost:3000](http://localhost:3000).

## Server part

Server is based on Express and Socket.io in a Node.js environment.

The Express part serves the Angular.js app files from the "public" directory. The default port is 3000 and is defined at the config.js file.

The Socket.io part send real-time randomly generated values (the maximum value is defined at config.js) from a randomly selected sensor (within a range defined at config.js) in a randomly generated interval of time (also defined at config.js). It uses an IFF that calls itself in a loop.

## Front-end part

Front-end is based on Angular and Angular Router. The different architectural items are separated in different JS files at the *src/js* directory:
- **app.js**: This files requires the libraries, services, directives, controllers and filters, injects them in the app and configurate the routes. These routes are only two:
  - **/**: Main page of the application.
  - **/sensors/:sensorId**: Single sensor page. It takes the ID of the sensor as route parameter.
- **services.js**: The unique service I have defined is called **socket**. It is the heart of the app. It communicates in real time with the server via Socket.io. Every time the server send data, it is stored as a JSON array at Local Storage, and all the stored data is broadcasted to the app. The socket service has one private and four public methods usable by the app controllers:
  - **saveAndEmitData()**: Private function. It saves the updated data at **localStorage** and broadcasts it to all the app scopes.
  - **socket.clean()**: Resets the data to the original 2 dimensions empty array.
  - **socket.addSensor()**: Add an empty array to the data array, as a new sensor to listen to.
  - **socket.getData()**: If no argument is provided, it returns the complete data array. If an integer is provided as argument, it returns the array that matches that index.
  - **socket.setValue()**: This method change the array value with the coordinates that matches the first and second arguments to the value provided by the third argument.
- **directives.js**: There is only one directive. It is used to generate each sensor view at the main page. It uses the sensor data from the parent scope and its index in the array (the same as the ID of the sensor).
- **controllers.js**: There are two controllers.
  - **mainCtrl**: The Main Controller is used at the main page to retrieve the stored data from the *socket* service and to upgrade the scope every time the *socket* service broadcasts new data. It also make available to the scope the *clean* and *addSensor* methods of the socket service.
  - **sensorCtrl**: The Sensor Controller is used at the single sensor page to get the sensor ID from *$routeParams* and the sensor data from the socket service. It upgrades the scope every time the socket broadcast new data. It also make available the *socket.setValue()* method at the scope.
- **filters.js**: The app uses two array filters, **getMin** and **getMax**, that returns the minimum and maximum values of an array. They are called from the *sensor-view.html* and the *sensor.html* templates.

### CSS

The CSS code is generated by the SASS file main.sass. It uses some BEM principles to define the style of the different front-end components.

## Development

I use Gulp.js with a very basic gulpfile. It watches changes in different file extensions at certain directories to automate develoment process tasks. These task are:
- **bundle**: Generate a single app.js JS file via Browserify.
- **sass**: Compile and minify the SASS code into a single main.css file.
- **imgmin**: Minify SVG, JPEG, PNG and GIF files.
- **tpl**: Copy the HTML files with the same directory structure.
- **nodemon**: Restart the server every time the server code changes.

To watch all the file changes use the following command.

```bash
gulp
```

## Testing

To do.