# AON3D Coding Challenge

## Part 1: Processing

Create a _simple_ web page and API endpoint that takes as input a G-code file for upload, and displays on the page statistics about the file including:

1. File size in B, KB, MB, or depending on what is the most appropriate unit (up to you!)
2. Distance traveled.
3. Estimated print time in minutes.

An example [G-code file](model/nut.gcode) and the [source 3D model](model/nut.stl) are provided in the [model](model) folder.

## Part 2: Display

On the front-end view, implement a simple viewer using any technology that you would like (e.g., canvas, WebGL, SVG) that displays the toolpaths of a given layer height on a Cartesian plane.
The viewer should allow for changing which layer is visible in some way.
As an additional bonus, only G-code commands that include an extrusion (i.e., contain an `E___` parameter) should be displayed, and the colour of the path displayed should be based on the feed rate `F___`.

## Part 3: Documentation

Write documentation that explains any build process or requirements for other developers who may want to contribute to the work done in parts 1 and 2.

### Background

G-code is the de-facto standard language for controlling 3D printers.
It is a simple command set that is parsed by machines line-by-line, and each command has a specific action associated with it.
All 3D printer manufacturers implement this slightly differently, so we will only focus on a minimal set of two commands:

* `G0 X__._ Y__._ Z__._ F____` - this is a "move" command and will move the machine to the cartesian position as indicated by the XYZ coordinates, and move at the speed designated by `F`.
* `G28` - this is a "homing" will move the machine to the origin position of the machine, `(0,0,0)`.

### Assumptions

* The machine starting position is `(0, 0, 0)`
* All lines of G-code for motion (`G0` commands) will include `X`, `Y`, `Z`, and `F` parameters.
* All units of travel are in mm, and all speeds (indicated by the `F` parameter) are in mm/s.
* To simplify things, all motion for a given move is at a constant speed without any acceleration.
* All uploaded files will be valid GCode, and not so large as to run out of memory on the server side.
* The [example GCode file](model/nut.gcode) includes extra GCode commands not described above.
  * These commands may be ignored for the challenge.
  * More information may be found here: http://marlinfw.org/meta/gcode/

## Conditions

* You may use whatever libraries or frameworks that you would like, however we have provided a basic flask boilerplate.
* There is no need to concern yourself with best practices for servers such as CORS, CSRF, security, or other extraneous things that would typically be included for a piece of production software. We only want to evaluate the code directly related to the challenge!
* You may extend and change the challenge. If you think of features that may be useful, or a clever way to display the data, that is up to you!
