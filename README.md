# PongCam 🏓

A modern take on the classic Pong game that uses hand tracking through your webcam to control the paddle. Play against an AI opponent using just your index finger!

## Features

- 👆 Control the paddle with your index finger
- 📹 Real-time hand tracking using your webcam
- 🤖 Play against an AI opponent
- 🎮 Classic Pong gameplay mechanics
- ✨ Modern React implementation

## Tech Stack

- React
- TypeScript
- [MediaPipe](https://developers.google.com/mediapipe) for hand tracking
- HTML5 Canvas for game rendering
- CSS for styling

## How to run

Play directly online at [deniz.fyi/pongcam](http://deniz.fyi/pongcam) or run it locally by following these steps:

1. Clone the repository:

```sh
git clone https://github.com/deniz-oezdemir/pongcam.git
cd pongcam
```

2. Install dependencies:

```sh
pnpm install
```

3. Start the development server:

```sh
pnpm dev
```

4. Open your browser and navigate to: [http://localhost:5173](http://localhost:5173)

## Learnings

### React & TypeScript

- **Component:** A self-contained unit that renders UI, encapsulating its structure, styles, and behavior.
- **Controller:** In MVC architectures, it mediates user input and updates either the view or the model.
- **Hook:** Functions in React that enable stateful behavior and side effects in function components.
- Emphasized TypeScript best practices, such as using a 2-space indentation style.

### Build Process

- Built using Vite with the command `pnpm run build`:
  - Compiles and bundles React code.
  - Minifies JavaScript and CSS.
  - Produces optimized static files under the `dist` directory.
  - Auto-generates an `index.html` with references to these assets.

## Future Work

- Enhance testing across various machines and lighting conditions.
- Fine-tune webcam sensitivity parameters for optimal hand tracking.
- Implement features to capture and save webcam snapshots:
  - Save a photo for every scored point on the player’s side.
  - Save a photo for every lost point on the opponent’s side.

## Sources

### TypeScript

- [Codecademy: Learn TypeScript Fundamentals](https://www.codecademy.com/courses/learn-typescript-fundamentals)
- [Learn X in Y Minutes: TypeScript](https://learnxinyminutes.com/typescript/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Wikipedia: Source-to-source Compiler](https://en.wikipedia.org/wiki/Source-to-source_compiler)
- [Learn TypeScript](https://learntypescript.dev/)

### React

#### General

- [React Documentation: createElement](https://react.dev/reference/react/createElement)
- [React Reference](https://react.dev/reference/react)
- [React DOM Components](https://react.dev/reference/react-dom/components/common)
- [Codecademy: React 101](https://www.codecademy.com/enrolled/courses/react-101)
- [React JSX Docs](https://www.codecademy.com/resources/docs/react/jsx)
- [React Programming Patterns Cheatsheet](https://www.codecademy.com/learn/react-101/modules/react-programming-patterns/cheatsheet)
- [YouTube Tutorial](https://www.youtube.com/watch?v=Tn6-PIqc4UM)
- [YouTube Tutorial: Creating React Projects](https://www.youtube.com/watch?v=jwRAdGLUarw)

#### Specific

- [YouTube: Advanced React Concepts](https://www.youtube.com/watch?v=2OTq15A5s0Y)
- [Codesandbox Templates](https://codesandbox.io/templates/new)
- [Next.js vs. Vite Discussion](https://www.reddit.com/r/nextjs/comments/1avem93/nextjs_or_vite/)
- [Vite Documentation](https://vite.dev/)
- [JavaScript: Export Statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [Spread Syntax in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [Sharing State in React](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)

### MediaPipe

- [MediaPipe Hand Landmarker](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker)
