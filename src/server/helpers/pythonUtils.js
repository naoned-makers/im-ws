import PythonShell from 'python-shell';

// List of current movements
let moves = [];

/**
 * Executes Python script to achieve a preset movement
 * 
 * @param {String} name the name of the movement to achieve
 */
const launchPython = (name) => {
  if (moveIsInProgress(name)) {
    return;
  }

  const options = {
    mode: 'text',
    pythonPath: process.env.PYTHON_PATH,
    pythonOptions: ['-u'],
    scriptPath: 'python/',
    args: ['value1', 'value2', 'value3']
  };

  console.log(`Movement ${name} start`);
  PythonShell.run(name + '.py', options, (err, results) => {
    if (err) throw err;
    console.log(`Movement ${name} end`);
    console.log('%j', results);
    moves = moves.filter((move) => move !== name);
  });
}

/**
 * Checks if the movement is not already in progress.
 * 
 * A movement on the same member / body part cannot be achieved more than once simultaneously.
 * However, several movements on different body parts can be achieved simultaneously.
 * 
 * @param {String} move the name of the movement to control
 */
const moveIsInProgress = (move) => {
  if (moves.find((m) => m === move)) {
    return true;
  } else {
    moves = moves.concat(move);
    return false;
  }
}

export const moveLeftArm = (message) => {
  console.log(message);
  launchPython('moveleftarm');
}
export const moveRightArm = (message) => {
  console.log(message);
  launchPython('moverightarm');
}
export const moveLeftHand = (message) => {
  console.log(message);
  launchPython('movelefthand');
}
export const moveRightHand = (message) => {
  console.log(message);
  launchPython('moverighthand');
}
export const moveHead = (message) => {
  console.log(message);
  launchPython('movehead');
}
export const lightEyes = (message) => {
  console.log(message);
  launchPython('lighteyes');
}
export const lightTorso = (message) => {
  console.log(message);
  launchPython('energy');
}