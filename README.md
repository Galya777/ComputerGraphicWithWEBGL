# Computer Graphics with WebGL

## Course Description
This repository contains solutions for the Computer Graphics course using WebGL. The course covers fundamental concepts in computer graphics including 3D rendering, transformations, lighting, textures, and interactive graphics.

## Exercises

### Week 1: Introduction
- Introduction to WebGL and canvas rendering

### Week 2: Primitives
- Drawing basic primitives (points, lines, triangles)
- Working with colors and GLSL shaders

### Week 3: Variables and Primitives
- Working with vertex buffers
- Random colors and positions
- Mixed buffers

### Week 4: GLSL
- GLSL shader programming
- Vector and matrix operations
- Clamp, step, and smoothstep functions

### Week 5: Matrices
- Orthographic and perspective projection
- Viewpoint and camera
- Translation, rotation, and scaling

## Homeworks

### Homework 02: The Rug
Simple 2D rug pattern using WebGL primitives.

### Homework 03: The Wall
Interactive wall with clickable bricks.

### Homework 04: The Wave
Animated sine wave with vertex displacement.

### Homework 05: The Cube (Rubik's Cube)
3D Rubik's cube with:
- 27 cubies in 3x3x3 grid
- Per-face coloring for each cubie
- Rotation animation

### Homework 06: The Knot
Trefoil knot with:
- Tubular mesh generation
- Frenet-Serret frame for orientation
- Smooth surface rendering

### Homework 07: The Cradle
Newton's cradle with:
- 8 swinging balls
- Physics-based animation
- Wooden frame
- Collision detection

### Homework 08: The Robot (Flying Bird)
Animated bird robot with:
- 8-segment wings with leading-edge behavior
- Body rocking animation
- Head turning
- Flying motion

### Homework 09: The Virus (Bezier)
Virus model with:
- 60 uniformly distributed spikes (Fibonacci sphere)
- Bezier surface profiles for spikes
- Two color modes:
  1. White body with black tips
  2. Each spike in different color

### Homework 10: The Ball (Relief Earth)
Earth globe with:
- Texture mapping (land/ocean)
- Elevation-based displacement
- Relief exaggeration for visibility

### Homework 11: The Graph
Interactive function graphs with:
- 8 mathematical functions
- 10,000 data points per function
- Zoom and pan controls
- Automatic vertical scaling

## Running the Code

To run any of the exercises or homeworks:

1. Open the HTML file in a web browser
2. For local development, use a local server:
   ```bash
   # Using Python
   python -m http.server
   
   # Using Node.js
   npx http-server
   ```

## Technical Details

### WebGL Library (webgl-fmi.js)
Custom WebGL helper library providing:
- Context and shader management
- Matrix operations (translation, rotation, scaling)
- 3D primitives (Sphere, Cube, Cylinder, Cone, etc.)
- Texture support
- Animation helpers

### Shader System
Custom GLSL shaders for:
- Vertex transformation
- Fragment coloring
- Lighting (ambient, diffuse, specular)
- Texture mapping

## Dependencies
- WebGL-capable browser
- webgl-fmi.js library (included in each homework folder)

## Course Information
- **University:** FMI (Faculty of Mathematics and Informatics)
- **Subject:** Computer Graphics
- **Technology:** WebGL, JavaScript, GLSL

## License
For educational purposes.
