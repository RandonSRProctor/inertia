# Inertia: *A Water Motion Simulation Project by Randy Proctor*

## Concept

Inertia is an ongoing experiment to build a water simulation from ground up without importing a third party physics engine.

Rather than rush the final product, there are many stops to reformat and consider different coding styles.

A particularly high effort is oriented towards writing extremely readable code.

## Technology

The entire project is built with Vanilla JS, HTML, and CSS.

Segmenting is performed using <div> tags and then spreading them across a finite container <div> using flexbox.

## Logic Explanation

At the beginning of the script setInterval() starts scanning each square to determine if it has been clicked.

Event handlers on each square are set to assign a "momentum" field to the DOM element upon onClick.  The first value assigned to the "momentum" field is "outward".

There is branched logic set up so that momentum is passed onto each surround square depending on the direction of momentum.

In addition to DOM element field manipulation, the functions pass along class names which determine color assignment.


## Notes

- This while in Production the project is not split into folders for ease in quickly publishing examples to codepen.io.  See this project and other demos here: https://codepen.io/randonsrproctor

- I'm not doing sprints or adding functionality at any set interval, this is a passion project.  I'm having great fun taking my time and playing around with JS concepts.

-I absolutely encourage anyone to contact me to talk about the project.  Casual conversation and criticisms are welcome alike.