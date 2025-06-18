

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
                <p>Each time you spin a prize wheel, you'll earn points.</p>
                <p>Your goal is to earn as many points as possible by spinning the prize wheels!</p>
            </div>`,

            `<div class='parent'>
                <p>Each wheel has four wedges, like this:</p>
                <img src="./img/spinner_75-25.png" style="width:40%; height:40%">
            </div>`,

            `<div class='parent'>
                <p>Each wheel has a "point minimum."</p>
                <p>The point minimum is the minimum number of points you'll earn per spin.</p>
            </div>`,

            `<div class='parent'>
                <p>Before each new wheel, you'll see a message indicating the wheel's point minimum.</p>
                <p>For example, this message indicates that the upcoming wheel has a 5-point minimum.</p>
                <br>
                <p><span style='font-size:100px'><strong>+5</strong></span></p>
                <p><span style='font-size:40px'>Minimum Points Per Spin</span></p>            
            </div>`,

            `<div class='parent'>
                <p>In addition to the point minimum, you can earn 10-point bonuses.</p>
                <p>Your probability of winning a 10-point bonus depends on where you land.</p>
                <p>For example, landing on 75% gives you an 75% of winning a 10-point bonus; landing on 25% gives you a 25% chance of winning a 10-point bonus.</p>
                <img src="./img/spinner_75-25.png" style="width:40%; height:40%">
            </div>`,

            `<div class='parent'>
                <p>If you earn a 10-point bonus, the wedge will turn green.</p>
                <p>You'll see you earned 10 points plus the minimum.</p>
                <p>In this example, the minimum was 5, so the total is 15.</p>
                <img src="./img/spinner_bonus.png" style="width:40%; height:40%">
            </div>`,

            `<div class='parent'>
                <p>If you don't earn a 10-point bonus, the wedge will turn blue.</p>
                <p>You'll see you only earned the minimum.</p>
                <p>In this example, the minimum was 5, so the total is 5.</p>
                <img src="./img/spinner_no-bonus.png" style="width:40%; height:40%">
            </div>`,

            `<div class='parent'>
                <p>Different wheels give you different probabilities of earning 10-point bonuses.</p>
                <p>This wheel gives you a 60% or 40% chance, depending on where you land.</p>
                <img src="./img/spinner_60-40.png" style="width:40%; height:40%">
            </div>`,

           `<div class='parent'>
                <p>This wheel gives you a 90% or 10% chance of a 10-point bonus, depending on where you land.</p>
                <img src="./img/spinner_90-10.png" style="width:40%; height:40%">
            </div>`],

        postIntro: [
            `<div class='parent'>
                <p>To spin a prize wheel, just grab it with your cursor and give it a spin!</p>
                <p>Watch the animation below to see how it's done.</p>
                <img src="./img/spin-gif.gif" style="width:40%; height:40%">
            </div>`,

            `<div class='parent'>
                <p>Throughout Spin the Wheel, you'll answer questions about your feelings.</p>
                <p>Specifically, you'll report how <strong>immersed and engaged</strong> you feel while spinning each wheel,<br>
                as well as how <strong>happy</strong> you currently feel.</p>
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

    let correctAnswers = [
        `I have a 90% chance of winning a 10-point bonus.`, 
        `I have a 60% chance of winning a 10-point bonus.`, 
        `I have a 10% chance of winning a 10-point bonus.`];

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
                prompt: "What does it mean if you land on a wedge that says 90%?", 
                name: `attnChk1`, 
                options: [`I have a 90% chance of winning a 10-point bonus.`, `I have a 60% chance of winning a 10-point bonus.`, `I have a 10% chance of winning a 10-point bonus.`],
            },
            {
                prompt: "What does it mean if you land on a wedge that says 60%?", 
                name: `attnChk2`, 
                options: [`I have a 90% chance of winning a 10-point bonus.`, `I have a 60% chance of winning a 10-point bonus.`, `I have a 10% chance of winning a 10-point bonus.`],
            },
            {
                prompt: "What does it mean if you land on a wedge that says 10%?", 
                name: `attnChk3`, 
                options: [`I have a 90% chance of winning a 10-point bonus.`, `I have a 60% chance of winning a 10-point bonus.`, `I have a 10% chance of winning a 10-point bonus.`],
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


    // define each wedge
    const wedges = {
        pct_90: {color:"#616360", font: 'white', label:"90%", pct: .9},
        pct_10: {color:"#c7c8c7", font: 'black', label:"10%", pct: .1},
        pct_75: {color:"#616360", font: 'white', label:"75%", pct: .75},
        pct_25: {color:"#c7c8c7", font: 'black', label:"25%", pct: .25},
        pct_60: {color:"#616360", font: 'white', label:"60%", pct: .6},
        pct_40: {color:"#c7c8c7", font: 'black', label:"40%", pct: .4},
    };


    // define each wheel
    const wheels = [

            {sectors: [ wedges.pct_90, wedges.pct_10, wedges.pct_90, wedges.pct_10 ], wheel_id: 1, value: 2, ev: 7, sd: 5, mi: .531},
            {sectors: [ wedges.pct_75, wedges.pct_25, wedges.pct_75, wedges.pct_25 ], wheel_id: 2, value: 2, ev: 7, sd: 5, mi: .189},
            {sectors: [ wedges.pct_60, wedges.pct_40, wedges.pct_60, wedges.pct_40 ], wheel_id: 3, value: 2, ev: 7, sd: 5, mi: .029},

            {sectors: [ wedges.pct_90, wedges.pct_10, wedges.pct_90, wedges.pct_10 ], wheel_id: 4, value: 5, ev: 10, sd: 5, mi: .531},
            {sectors: [ wedges.pct_75, wedges.pct_25, wedges.pct_75, wedges.pct_25 ], wheel_id: 5, value: 5, ev: 10, sd: 5, mi: .189},
            {sectors: [ wedges.pct_60, wedges.pct_40, wedges.pct_60, wedges.pct_40 ], wheel_id: 6, value: 5, ev: 10, sd: 5, mi: .029},

            {sectors: [ wedges.pct_90, wedges.pct_10, wedges.pct_90, wedges.pct_10 ], wheel_id: 7, value: 8, ev: 13, sd: 5, mi: .531},
            {sectors: [ wedges.pct_75, wedges.pct_25, wedges.pct_75, wedges.pct_25 ], wheel_id: 8, value: 8, ev: 13, sd: 5, mi: .189},
            {sectors: [ wedges.pct_60, wedges.pct_40, wedges.pct_60, wedges.pct_40 ], wheel_id: 9, value: 8, ev: 13, sd: 5, mi: .029},

        ];

    let scoreTracker = 0; // track current score

    let round = 1;  // track current round

    const pointMin = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            let value = jsPsych.timelineVariable('value')
            let html = `<div class='parent'>
                <p><span style='font-size:100px'><strong>+${value}</strong></span></p>
                <p><span style='font-size:40px'>Minimum Points Per Spin</span></p>            
            </div>`;
            return html;
        },
        data: {wheel_id: jsPsych.timelineVariable('wheel_id'), ev: jsPsych.timelineVariable('ev'), sd: jsPsych.timelineVariable('sd'), value: jsPsych.timelineVariable('value'), mi: jsPsych.timelineVariable('mi')},
        choices: "NO_KEYS",
        trial_duration: 3000,
    };      

    const spin = {
        type: jsPsychCanvasButtonResponse,
        stimulus: function(c, spinnerData) {
            createSpinner(c, spinnerData, scoreTracker, jsPsych.timelineVariable('sectors'), jsPsych.timelineVariable('value'));
        },
        canvas_size: [500, 500],
        score: function() {
            return scoreTracker
        },
        point_minimum: jsPsych.timelineVariable('value'),
        post_trial_gap: 1000,
        data: {wheel_id: jsPsych.timelineVariable('wheel_id'), ev: jsPsych.timelineVariable('ev'), sd: jsPsych.timelineVariable('sd'), value: jsPsych.timelineVariable('value'), mi: jsPsych.timelineVariable('mi')},
        on_finish: function(data) {
            data.round = round;
            scoreTracker = data.score
        }
    };

    // trial: flow DV
    const flowMeasure = {
        type: jsPsychSurveyLikert,
        questions: [
            {prompt: `During the last round of Spin the Wheel,<br>to what extent did you feel immersed and engaged in what you were doing?`,
            name: `flow`,
            labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
        ],
        randomize_question_order: false,
        scale_width: 600,
        data: {wheel_id: jsPsych.timelineVariable('wheel_id'), ev: jsPsych.timelineVariable('ev'), sd: jsPsych.timelineVariable('sd'), value: jsPsych.timelineVariable('value'), mi: jsPsych.timelineVariable('mi')},
        on_finish: function(data) {
            data.round = round;
            let scoreArray = jsPsych.data.get().select('score').values;
            data.score = scoreArray[scoreArray.length - 1];
            saveSurveyData(data);
        }
    };

    // trial: happiness DV
    const happinessMeasure = {
        type: jsPsychSurveyLikert,
        questions: [
            {prompt: `How happy are you right now?`,
            name: `happiness`,
            labels: ['0<br>Very unhappy', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Very happy']},
        ],
        randomize_question_order: false,
        scale_width: 600,
        data: {wheel_id: jsPsych.timelineVariable('wheel_id'), ev: jsPsych.timelineVariable('ev'), sd: jsPsych.timelineVariable('sd'), value: jsPsych.timelineVariable('value'), mi: jsPsych.timelineVariable('mi')},
        on_finish: function(data) {
            data.round = round;
            let scoreArray = jsPsych.data.get().select('score').values;
            data.score = scoreArray[scoreArray.length - 2];
            saveSurveyData(data);
            round++;
        }
    };

    // timeline: main task
    p.task = {
        timeline: [pointMin, spin, flowMeasure, happinessMeasure],
        repetitions: 1,
        timeline_variables: wheels,
        randomize_order: true,
    };

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

        const genFlowScale = ['-2<br>Totally<br>Disagree', '-1<br>Disagree', '0<br>Neither agree<br>nor disagree', '1<br>Agree', '2<br>Totally<br>Agree'];

        const flowGenQuestions = {
            type: jsPsychSurveyLikert,
            preamble:
                `<div style='padding-top: 50px; width: 900px; font-size:16px'>
                    <p>Please express the extent to which you disagree or agree with each statement.</p>
                </div>`,
            questions: [

                {
                    prompt: `I rarely find tasks only moderately engaging—I find most activities either completely immersive or extremely boring.`,
                    name: `genFlow_1`,
                    labels: genFlowScale,
                    required: true,
                },

                {
                    prompt: `I often alternate between feelings of intense engagement and complete boredom.`,
                    name: `genFlow_2`,
                    labels: genFlowScale,
                    required: true,
                },

                {
                    prompt: `For me, activities are either extremely engaging or dull—there's rarely an in-between.`,
                    name: `genFlow_3`,
                    labels: genFlowScale,
                    required: true,
                },

                {
                    prompt: `My mood often swings between being deeply engaged in what I'm doing and feeling totally bored.`,
                    name: `genFlow_4`,
                    labels: genFlowScale,
                    required: true,
                },
            ],
            randomize_question_order: false,
            scale_width: 500,
            on_finish: (data) => {
                saveSurveyData(data); 
            },
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
            timeline: [taskComplete, flowGenQuestions, gender, age, ethnicity, english, finalWord]
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
        experiment_id: "vwGeB3lWbIBU",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [exp.consent, exp.instLoop, exp.postIntro, exp.task, exp.demographics, exp.save_data];

jsPsych.run(timeline);
