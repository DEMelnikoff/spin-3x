
// initialize jsPsych
const jsPsych = initJsPsych({
    on_finish: (data) => {
        data.boot = boot;
        if(!boot) {
            document.body.innerHTML = 
                `<div align='center' style="margin: 10%">
                    <p>Thank you for participating!<p>
                    <b>You will be automatically re-directed to Prolific in a few moments.</b>
                </div>`;
            setTimeout(() => { 
                location.href = `https://app.prolific.co/submissions/complete?cc=${completionCode}`
            }, 2000);
        }
    },
});

// set and save subject ID
let subject_id = jsPsych.data.getURLVariable("PROLIFIC_PID");
if (!subject_id) { subject_id = jsPsych.randomization.randomID(10) };
jsPsych.data.addProperties({ subject: subject_id });

// define file name
const filename = `${subject_id}.csv`;

// define completion code for Prolific
const completionCode = "CW0CMZ8Y";

// track fps
let frames = 0, tic = performance.now(), fpsAdjust;
(function getFpsAdjust() {
    const req = window.requestAnimationFrame(getFpsAdjust);
    frames++;
    if (frames == 120) { 
        fpsAdjust = (performance.now() - tic) / 2000;
        jsPsych.data.addProperties({fpsAdjust: fpsAdjust});
        frames = 0;
        tic = performance.now();
    };
})();

// when true, boot participant from study without redirecting to Prolific
let boot = false;

// function for saving survey data in wide format
const saveSurveyData = (data) => {
    const names = Object.keys(data.response);
    const values = Object.values(data.response);
    for(let i = 0; i < names.length; i++) {
        data[names[i]] = values[i];
    };      
};

const getTotalErrors = (data, correctAnswers) => {
    const answers = Object.values(data.response);
    const errors = answers.map((val, index) => val === correctAnswers[index] ? 0 : 1)
    const totalErrors = errors.reduce((partialSum, a) => partialSum + a, 0);
    return totalErrors;
};

// code for spinner task
const createSpinner = function(canvas, spinnerData, score, sectors, value) {

  /* get context */
  const ctx = canvas.getContext("2d"); 

  /* get pointer */
  const pointer = document.querySelector("#spin");
  pointer.innerText = ``;

  /* get score message */
  const scoreMsg = document.getElementById("score");

  /* get wheel properties */
  let wheelWidth = canvas.getBoundingClientRect()['width'];
  let wheelHeight = canvas.getBoundingClientRect()['height'];
  let wheelX = canvas.getBoundingClientRect()['x'] + wheelWidth / 2;
  let wheelY = canvas.getBoundingClientRect()['y'] + wheelHeight / 2;
  const tot = sectors.length; // total number of sectors
  const rad = wheelWidth / 2; // radius of wheel
  const PI = Math.PI;
  const arc = (2 * PI) / tot; // arc sizes in radians

  /* spin dynamics */
  const friction = 0.97;  // 0.995=soft, 0.99=mid, 0.98=hard
  const angVelMin = 5; // Below that number will be treated as a stop
  let angVelMax = 0; // Random ang.vel. to acceletare to 
  let angVel = 0;    // Current angular velocity
  let dt = (60 / 1000) * fpsAdjust;


  /* state variables */
  let isGrabbed = false;       // true when wheel is grabbed, false otherwise
  let isDragging = false;      // true when wheel is being dragged, false otherwise
  let isSpinning = false;      // true when wheel is spinning, false otherwise
  let isAccelerating = false;  // true when wheel is accelerating, false otherwise
  let lastAngles = [0,0,0];    // store the last three angles
  let correctSpeed = [0]       // speed corrected for 360-degree limit
  let startAngle = null;       // angle of grab
  let oldAngle = 0;            // wheel angle prior to last perturbation
  let currentAngle = null;     // wheel angle after last perturbation
  let onWheel = false;         // true when cursor is on wheel, false otherwise


  /* define spinning functions */

  const onGrab = (x, y) => {
    if (!isSpinning) {
      canvas.style.cursor = "grabbing";
      isGrabbed = true;
      startAngle = calculateAngle(x, y);
    };
  };

  const calculateAngle =  (currentX, currentY) => {
    let xLength = currentX - wheelX;
    let yLength = currentY - wheelY;
    let angle = Math.atan2(xLength, yLength) * (180/Math.PI);
    return 360 - angle;
  };

  const onMove = (x, y) => {
    if(isGrabbed) {
      canvas.style.cursor = "grabbing";
      isDragging = true;
    };
    if(!isDragging)
      return
    lastAngles.shift();
    let deltaAngle = calculateAngle(x, y) - startAngle;
    currentAngle = deltaAngle + oldAngle;
    lastAngles.push(currentAngle);
    let speed = lastAngles[2] - lastAngles[0];
    if (Math.abs(speed) < 200) {
      correctSpeed.shift();
      correctSpeed.push(speed);
    };
    render(currentAngle);
  };

  const render = (deg) => {
    canvas.style.transform = `rotate(${deg}deg)`;
  };

  const onRelease = function() {
    isGrabbed = false;
    if(isDragging){
      isDragging = false;
      oldAngle = currentAngle;
      let speed = correctSpeed[0];
      if (Math.abs(speed) > angVelMin) {
        isAccelerating = true;
        isSpinning = true;
        angVelMax = rand(25, 50);
        giveMoment(speed)
      };
    };   
  };

  const giveMoment = function(speed) {

    // stop accelerating when max speed is reached
    if (Math.abs(speed) >= angVelMax) isAccelerating = false;

    // accelerate
    if (isAccelerating) {
      speed *= (1.06 ** fpsAdjust); // Accelerate
      const req = window.requestAnimationFrame(giveMoment.bind(this, speed));
      oldAngle += speed;
      lastAngles.shift();
      lastAngles.push(oldAngle);
      render(oldAngle);
    }
    
    // decelerate and stop
    else {
      isAccelerating = false;
      speed *= (friction ** fpsAdjust); // Decelerate by friction  
      const req = window.requestAnimationFrame(giveMoment.bind(this, speed));
      if (Math.abs(speed) > angVelMin * .1) {
        // decelerate
        oldAngle += speed;
        lastAngles.shift();
        lastAngles.push(oldAngle);
        render(oldAngle);       
      } else {
        // stop spinner
        speed = 0;
        currentAngle = oldAngle;
        let index = getIndex();
        let sector = sectors[index];
        let random_draw = Math.random();
        let bonus = (sector.pct > random_draw) ? 10 : 0;
        console.log(sector.pct, random_draw, bonus);
        let total_points = value + bonus;
        let color = (bonus > 0) ? `#4CAF50` : `#4682b4`;
        spinnerData.pct_outcomes.push(sector.pct);
        spinnerData.bonus_outcomes.push(total_points);
        setTimeout(() => {
          drawSector(sectors, index, total_points, color);
          updateScore(total_points, color);
        }, 500);
        window.cancelAnimationFrame(req);
      };
    };
  };

  /* generate random float in range min-max */
  const rand = (m, M) => Math.random() * (M - m) + m;

  const updateScore = (points, color) => {
    score += points;
    spinnerData.score = score;
    scoreMsg.innerHTML = `<span style="color:${color}; font-weight: bolder">${score}</span>`;
    setTimeout(() => {
      scoreMsg.innerHTML = `${score}`
      drawSector(sectors, null, null, null);
      isSpinning = (spinnerData.pct_outcomes.length == 8) ? true : false;
      onWheel ? canvas.style.cursor = "grab" : canvas.style.cursor = "";
    }, 1000);
  };

  const getIndex = () => {
    let normAngle = 0;
    let modAngle = currentAngle % 360;
    if (modAngle > 270) {
      normAngle = 360 - modAngle + 270;
    } else if (modAngle < -90) { 
      normAngle =  -modAngle - 90;
    } else {
      normAngle = 270 - modAngle;
    }
    let sector = Math.floor(normAngle / (360 / tot))
    return sector
  }

  //* Draw sectors and prizes texts to canvas */
  const drawSector = (sectors, sector, bonus, color) => {
    for (let i = 0; i < sectors.length; i++) {
      const ang = arc * i;
      ctx.save();
      // COLOR
      ctx.beginPath();
    //  ctx.fillStyle = sectors[i].color;
      ctx.fillStyle = (isSpinning && i == sector) ? color : sectors[i].color;
      ctx.moveTo(rad, rad);
      ctx.arc(rad, rad, rad - 10, ang, ang + arc);
      ctx.lineTo(rad, rad);
      ctx.fill();

      // OUTLINE
      ctx.strokeStyle = 'black';  // Set outline color to black
      ctx.lineWidth = 2;          // Adjust this value for the outline thickness
      ctx.stroke();

      // TEXT
      ctx.translate(rad, rad);
      ctx.rotate( (ang + arc / 2) + arc );
      ctx.textAlign = "center";
      if (isSpinning && i == sector) {
        ctx.font = "bolder 75px sans-serif"
        ctx.fillStyle = (bonus > 10) ? 'yellow' : 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8;
        ctx.strokeText(`+${bonus}`, 0, -130);
        ctx.fillText(`+${bonus}`, 0, -130);
      } else {
        ctx.font = "bold 45px sans-serif"
        ctx.fillStyle = sectors[i].font;
        ctx.fillText(sectors[i].label, 0, -140);
      }

      // RESTORE
      ctx.restore();
    }
  };

  drawSector(sectors, null, null, null);

  /* add event listners */
  canvas.addEventListener('mousedown', function(e) {
      if (onWheel) { onGrab(e.clientX, e.clientY) };
  });

  canvas.addEventListener('mousemove', function(e) {
      let dist = Math.sqrt( (wheelX - e.clientX)**2 + (wheelY - e.clientY)**2 );
      dist < rad ? onWheel = true : onWheel = false;
      onWheel && !isGrabbed && !isSpinning ? canvas.style.cursor = "grab" : canvas.style.cursor = "";
      if(isGrabbed && onWheel) { onMove(e.clientX, e.clientY) };
  });

  window.addEventListener('mouseup', onRelease);

  window.addEventListener('resize', function(event) {
    wheelWidth = canvas.getBoundingClientRect()['width'];
    wheelHeight = canvas.getBoundingClientRect()['height'];
    wheelX = canvas.getBoundingClientRect()['x'] + wheelWidth / 2;
    wheelY = canvas.getBoundingClientRect()['y'] + wheelHeight / 2;
  }, true);

};





    




