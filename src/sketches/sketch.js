import Vec from "./Vec";

let size = 50;
let speed = 20;
let startAlgo = "rand";
let nVectors = 50;
let coloursArgs = "ffffff-ff0000-7d0000";
let strokeWeight = 3;
let loop = true;
const radius = 10;
const margin = 50;

function populateColoursArray(colours) {
  if (coloursArgs) {
    const coloursList = coloursArgs.split("-");
    if (coloursList.length > 1) {
      const percent = 1 / (nVectors / (coloursList.length - 1));
      for (let i = 0; i < coloursList.length - 1; i++) {
        let j = 0;
        while (j <= 1) {
          const colour1 = "#" + coloursList[i];
          const colour2 = "#" + coloursList[i + 1];
          colours.push(interpolateColours(colour1, colour2, j));
          j += percent;
        }
      }
    } else {
      colours = ["#" + coloursArgs];
    }
  }
  return colours;
}

function createInitialVectors(vectors, space, colours) {
  switch (startAlgo) {
    case "rand":
      vectors = randomStartVectors(size, space, colours);
      break;
    case "circ":
      vectors = circularStartVectors(nVectors, radius, space, colours);
      break;
    case "diag":
      vectors = diagonalStartVectors(space, colours);
      break;
    default:
      break;
  }
  return vectors;
}

function moveVectors(vectors, linesObject) {
  let allVectorsFinished = true;

  for (const vector of vectors) {
    if (!vector.isFinished) {
      allVectorsFinished = false;
      const line = vector.move();
      if (line) {
        if (vector.step in linesObject) {
          linesObject[vector.step].push(line);
        } else {
          linesObject[vector.step] = [line];
        }
      }
    }
  }

  return (allVectorsFinished) ? true : false;
}

function moveInitialVectors(vectors, linesObject) {
  let isFinished;
  do {
    isFinished = moveVectors(vectors, linesObject);
  } while (!isFinished);
}

function createCleanupVectors(space, colours, linesObject) {
  // If any spaces are still empty, these vectors will fill them out
  let vectorsIndex = 0;
  // Set first cleanup vectors step as final vector step to begin rendering cleanup vectors only after all initial vectors
  const startStep = Math.max(...Object.keys(linesObject).map(Number));
  for (let i = 0; i < space.length; i++) {
    for (let j = 0; j < space[0].length; j++) {
      if (space[i][j][0] === 0) {
        vectorsIndex++;
        const coloursIndex = Math.floor(Math.random() * colours.length);
        const cleanupVector = new Vec(vectorsIndex, i, j, space, colours[coloursIndex]);
        cleanupVector.step = startStep + 1;

        let isFinished;
        do {
          isFinished = moveVectors([cleanupVector], linesObject);
        } while (!isFinished);
      }
    }
  }
}

function indexToPos(index, canvasSize) {
  return 20 + ((canvasSize - 40) / (size - 1)) * index;
}

function randomStartVectors(size, space, colours) {
  let coloursIndex = 0;
  let vectors = [];

  for (let i = 0; i < nVectors; i++) {
    const randX = Math.floor(Math.random() * size);
    const randY = Math.floor(Math.random() * size);
    const newVec = new Vec(i + 1, randX, randY, space, colours[coloursIndex]);
    vectors.push(newVec);
    coloursIndex++;
    coloursIndex = (coloursIndex === colours.length) ? 0 : coloursIndex;
  }

  return vectors;
}

function circularStartVectors(nVectors, r, space, colours) {
  // Get indexes along circumference of circle centered inside the centre of the grid
  const centreX = Math.floor(space.length / 2);
  const centreY = Math.floor(space[0].length / 2);
  let indexes = [];
  const slice = 2 * Math.PI / nVectors;
  for (let i = 0; i < nVectors; i++) {
    const angle = slice * i;
    const newX = Math.round((centreX + r * Math.cos(angle)));
    const newY = Math.round((centreY + r * Math.sin(angle)));
    if (!indexes.includes([newX, newY])) indexes.push([newX, newY]);
  }

  // Create vectors
  let coloursIndex = 0;
  let vectors = [];
  for (let i = 0; i < indexes.length; i++) {
    const newVec = new Vec(i + 1, indexes[i][0], indexes[i][1], space, colours[coloursIndex]);
    vectors.push(newVec);
    coloursIndex++;
    coloursIndex = (coloursIndex === colours.length) ? 0 : coloursIndex;
  }
  return vectors;
}

function diagonalStartVectors(space, colours) {
  let coloursIndex = 0;
  let vectors = [];
  let vectorIndex = 0;

  // Create vectors on diagonal 1
  for (let i = 0, j = 0; i < space.length, j < space[0].length; i++, j++) {
    const newVec = new Vec(vectorIndex, i, j, space, colours[coloursIndex]);
    vectorIndex++;
    vectors.push(newVec);
    coloursIndex++;
    coloursIndex = (coloursIndex === colours.length) ? 0 : coloursIndex;
  }

  // Create vectors on diagonal 2
  for (let i = space.length - 1, j = 0; i > 0, j < space[0].length; i--, j++) {
    const newVec = new Vec(vectorIndex, i, j, space, colours[coloursIndex]);
    vectorIndex++;
    vectors.push(newVec);
    coloursIndex++;
    coloursIndex = (coloursIndex === colours.length) ? 0 : coloursIndex;
  }

  return vectors;
}

function drawLine(p, i, lines) {
  if (i < lines.length) {
    const line = lines[i];
    const x1 = line[0];
    const y1 = line[1];
    const x2 = line[2];
    const y2 = line[3];
    const colour = line[4];

    p.stroke(colour);
    p.line(
      indexToPos(x1, p.width),
      indexToPos(y1, p.width),
      indexToPos(x2, p.width),
      indexToPos(y2, p.width)
    );
  }
}

function interpolateColours(colour1, colour2, percent) {
  // Convert the hex colors to RGB values
  const r1 = parseInt(colour1.substring(1, 3), 16);
  const g1 = parseInt(colour1.substring(3, 5), 16);
  const b1 = parseInt(colour1.substring(5, 7), 16);
  const r2 = parseInt(colour2.substring(1, 3), 16);
  const g2 = parseInt(colour2.substring(3, 5), 16);
  const b2 = parseInt(colour2.substring(5, 7), 16);

  // Interpolate the RGB values
  const r = Math.round(r1 + (r2 - r1) * percent);
  const g = Math.round(g1 + (g2 - g1) * percent);
  const b = Math.round(b1 + (b2 - b1) * percent);

  // Convert the interpolated RGB values back to a hex color
  const outColour = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return outColour;
}

export default function sketch(p) {
  let space, vectors, linesObject, flattenedLinesArray, timer, pause, lineStep, reverse, colours;
  let canvasSize = (p.windowHeight < p.windowWidth) ? p.windowHeight - margin : p.windowWidth - margin;

  p.updateWithProps = props => {
    if (props.size) size = Number(props.size);
    if (props.speed) speed = Number(props.speed);
    if (props.nVectors) nVectors = Number(props.nVectors);
    if (props.lineWidth) strokeWeight = Number(props.lineWidth);
    if (props.colours) coloursArgs = props.colours;
    if (props.startAlgo) startAlgo = props.startAlgo;
    if (props.loop) loop = (props.loop === "true");
    p.setup();
  };

  p.setup = () => {
    p.createCanvas(canvasSize, canvasSize, p.P2D);

    space = Array.from({ length: size }).map(() => Array.from({ length: size }).fill([0, undefined]));
    vectors = [];
    linesObject = {};
    flattenedLinesArray = [];
    timer = 0;
    pause = false;
    lineStep = 0;
    reverse = false;
    colours = [];

    colours = populateColoursArray(colours);
    vectors = createInitialVectors(vectors, space, colours);
    moveInitialVectors(vectors, linesObject);
    createCleanupVectors(space, colours, linesObject);

    for (let step in linesObject) {
      flattenedLinesArray = flattenedLinesArray.concat(linesObject[step])
    }

    p.background(0);
    p.strokeWeight(strokeWeight);
  }

  p.windowResized = () => {
    canvasSize = (p.windowHeight < p.windowWidth) ? p.windowHeight - margin : p.windowWidth - margin;
    p.resizeCanvas(canvasSize, canvasSize)
  }

  p.draw = () => {
    if (!pause) {
      p.clear();

      if (lineStep < 0) {
        lineStep = 0;
        reverse = false;
        pause = true;
        timer = p.millis();
      }
      if (lineStep > flattenedLinesArray.length) {
        lineStep = flattenedLinesArray.length;
        reverse = true;
        pause = true;
        timer = p.millis();
      }

      for (let i = 0; i < lineStep; i++) {
        drawLine(p, i, flattenedLinesArray);
      }

      if (!reverse) {
        lineStep += speed;
      } else {
        lineStep -= speed;
      }
    }

    if (pause && p.millis() >= 1000 + timer && loop) {
      pause = false;
    }
  };
}

