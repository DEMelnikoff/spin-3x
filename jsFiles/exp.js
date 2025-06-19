

const exp = (function() {


    var p = {};


   /*
    *
    *   INSTRUCTIONS
    *
    */

    const html = {
        intro: [
            `<div class='parent'>
                <p><strong>Welcome to Spin the Wheel!</strong></p>
                <p>In Spin the Wheel, you'll spin a series of prize wheels.</p>
                <p>With each spin, you'll earn points.</p>
                <p>Your goal is to earn as many points as possible!</p>
            </div>`,

            `<div class='parent'>
                <p>Each wheel is divided into six wedges, like this:</p>
                <img src="./img/arrow-up.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>When a wheel stops spinning, the wedge you land on will activate.</p>
                <p>The activated wedge will turn black, like this:</p>
                <img src="./img/standard-outcome.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>The number on the activated wedge is added to your total score.</p>
                <p>In this example, you'd gain 7 points.</p>
                <img src="./img/standard-outcome.png" style="width:50%; height:50%">
            </div>`],

        postIntro: [
            `<div class='parent'>
                <p>To spin a prize wheel, just grab it with your cursor and give it a spin!</p>
                <p>Watch the animation below to see how it's done.</p>
                <img src="./img/spin-gif.gif" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>Throughout Spin the Wheel, you'll answer questions about your feelings.</p>
                <p>Specifically, you'll report how <strong>immersed and absorbed</strong> you feel while spinning each wheel.</p>
            </div>`,      

            `<div class='parent'>
                <p>You're ready to start playing Spin the Wheel!</p>
                <p>Continue to the next screen to begin.</p>
            </div>`,      
        ],

        postTask: [
            `<div class='parent'>
                <p>Spin the Wheel is now complete!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`
        ],
    };


    const intro = {
        type: jsPsychInstructions,
        pages: html.intro,
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    let correctAnswers = [`9`, `7`, `3`, `1`, `Earn as many points as possible.`];

    const errorMessage = {
        type: jsPsychInstructions,
        pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand the game, please continue to re-read the instructions.</p></div>`],
        show_clickable_nav: true,
        allow_keys: false,
    };

    const attnChk = {
        type: jsPsychSurveyMultiChoice,
        preamble: `<div class='parent'>
            <p>Please answer the following questions.</p>
            </div>`,
        questions: [
            {
                prompt: `If you land on a 9, how many points will you earn?`, 
                name: `attnChk1`, 
                options: ['9', '7', '3', '1'],
            },
            {
                prompt: `If you land on a 7, how many points will you earn?`, 
                name: `attnChk2`, 
                options: ['9', '7', '3', '1'],
            },
            {
                prompt: `If you land on a 3, how many points will you earn?`, 
                name: `attnCh3`, 
                options: ['9', '7', '3', '1'],
            },
            {
                prompt: `If you land on a 1, how many points will you earn?`, 
                name: `attnCh4`, 
                options: ['9', '7', '3', '1'],
            },
            {
                prompt: `What is your goal?`, 
                name: `attnChk5`, 
                options: [`Spin the wheel as fast as possible.`, `Earn as few points as possible.`, `Earn as many points as possible.`],
            },
        ],
        scale_width: 500,
        on_finish: (data) => {
              const totalErrors = getTotalErrors(data, correctAnswers);
              data.totalErrors = totalErrors;
        },
    };

    const conditionalNode = {
      timeline: [errorMessage],
      conditional_function: () => {
        const fail = jsPsych.data.get().last(1).select('totalErrors').sum() > 0 ? true : false;
        return fail;
      },
    };

    p.instLoop = {
      timeline: [intro, attnChk, conditionalNode],
      loop_function: () => {
        const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
        return fail;
      },
    };

    p.postIntro = {
        type: jsPsychInstructions,
        pages: html.postIntro,
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    p.consent = {
        type: jsPsychExternalHtml,
        url: "./html/consent.html",
        cont_btn: "advance",
    };

    
   /*
    *
    *   TASK
    *
    */

    let colors = ["#0077CC", "#FF6B2D"];

    colors = jsPsych.randomization.repeat(colors, 1);

    // define each wedge
    const wedges = {
        one: {color: colors[0], font: 'white', label:"1", points: 1},
        nine: {color: colors[1], font: 'white', label:"9", points: 9},
    };

    // define each wheel
    let wheels = [
            {sectors: [ wedges.one, wedges.one, wedges.one, wedges.one, wedges.one, wedges.nine ], wheel_id: 1, reliability: 1, label: "100%", ev: 2.33, mi: .65},
            {sectors: [ wedges.one, wedges.nine, wedges.one, wedges.nine, wedges.one, wedges.nine ], wheel_id: 2, reliability: 1, label: "100%", ev: 5, mi: 1},
            {sectors: [ wedges.one, wedges.nine, wedges.nine, wedges.nine, wedges.nine, wedges.nine ], wheel_id: 3, reliability: 1, label: "100%", ev: 7.67, mi: .65},
        ];

    wheels = jsPsych.randomization.repeat(wheels, 1);


    const MakeSpinLoop = function(wheel, round) {

        let outcome;
        let trial = 1;

        // trial: spinner
        const spin = {
            type: jsPsychCanvasButtonResponse,
            stimulus: function(c, spinnerData) {
                createSpinner(c, spinnerData, wheel.sectors, false);
            },
            canvas_size: [500, 500],
            scoreBoard: function() {
                return '';
            },
            data: {round: round + 1, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi},
            on_finish: function(data) {
                data.trial = trial;
                outcome = data.outcome;
            }
        };

        const tokens = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                let standardFeedback;

                if (outcome == "9") {
                    standardFeedback = `<div class="score-board-blank"></div> <div class="feedback-area"> <div class="win-text" style="color:${colors[1]}">+9 Points</div> </div>`;
                } else {
                    standardFeedback = `<div class="score-board-blank"></div> <div class="feedback-area"> <div class="win-text" style="color:${colors[0]}">+1 Point</div> </div>`;
                }

                return standardFeedback;

            },
            choices: "NO_KEYS",
            trial_duration: 2000,
            data: {round: round + 1},
            on_finish: function(data) {
                data.trial = trial;
                trial++;
            },
        };

        const spin_loop = {
            timeline: [spin, tokens],
            repetitions: 12,
        }

        const flowMeasure = {
            type: jsPsychSurveyLikert,
            questions: [
                {prompt: `How <b>immersed</b> and <b>absorbed</b> did you feel spinning the last wheel?`,
                name: `flow`,
                labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
            ],
            randomize_question_order: false,
            scale_width: 600,
            data: {round: round + 1, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi},
            on_finish: function(data) {
                let scoreArray = jsPsych.data.get().select('score').values;
                data.score = scoreArray[scoreArray.length - 1];
                saveSurveyData(data);
            }
        };

        this.timeline = [spin_loop, flowMeasure];
    }


    p.round1 = new MakeSpinLoop(wheels[0], 0)
    p.round2 = new MakeSpinLoop(wheels[1], 1)
    p.round3 = new MakeSpinLoop(wheels[2], 2)

   /*
    *
    *   Demographics
    *
    */

    p.demographics = (function() {


        const taskComplete = {
            type: jsPsychInstructions,
            pages: html.postTask,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const gender = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your gender?</p>',
            choices: ['Male', 'Female', 'Other'],
            on_finish: (data) => {
                data.gender = data.response;
            }
        };

        const age = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Age:", name: "age"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const ethnicity = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your race?</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
            on_finish: (data) => {
                data.ethnicity = data.response;
            }
        };

        const english = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
            on_finish: (data) => {
                data.english = data.response;
            }
        };  

        const finalWord = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Questions? Comments? Complains? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const demos = {
            timeline: [taskComplete, gender, age, ethnicity, english, finalWord]
        };

        return demos;

    }());


   /*
    *
    *   SAVE DATA
    *
    */

    p.save_data = {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "qHOCEKxexzr9",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [exp.consent, exp.instLoop, exp.postIntro, exp.round1, exp.round2, exp.round3, exp.demographics, exp.save_data];

jsPsych.run(timeline);
