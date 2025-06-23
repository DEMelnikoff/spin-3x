

const exp = (function() {


    var p = {};

    // const playOrPredict = ["play", "predict"][Math.floor(Math.random() * 2)]; 

    const playOrPredict = ["play", "predict"][0]; 

    const nTrials = 12;

    const colorCondition = Math.floor(Math.random() * 2);

    const colors = [["#0077CC", "#FF6B2D"], ["#FF6B2D", "#0077CC"]][colorCondition];

    const gif = ["spin-gif_orange", "spin-gif_blue"][colorCondition];

    const pic_2win = ["2win_orange", "2win_blue"][colorCondition];

    const pic_3win = ["3win_orange", "3win_blue"][colorCondition];

    const pic_4win = ["4win_orange", "4win_blue"][colorCondition];

    const pic_won = ["won_orange", "won_blue"][colorCondition];

    jsPsych.data.addProperties({
        playOrPredict: playOrPredict,
        colorCondition: colorCondition,
    });


   /*
    *
    *   INSTRUCTIONS
    *
    */

    const html = {
        intro_play: [
            `<div class='parent'>
                <p><strong>Welcome to Feel the Spin!</strong></p>
                <p>In Feel the Spin, you'll spin a series of prize wheels.</p>
                <p>With each spin, you'll earn points.</p>
                <p>Your goal is to earn as many points as possible!</p>
            </div>`,

            `<div class='parent'>
                <p>You'll spin the following wheels 12 times each:</p>
                <div class='wheel-parent'>
                    <img src="./img/${pic_2win}.png">
                    <img src="./img/${pic_3win}.png">
                    <img src="./img/${pic_4win}.png">
                </div>
            </div>`,

            `<div class='parent'>
                <p>'W' wedges are worth 10 points.</p><p>'L' wedges are worth 0 points.</p>
                <div class='wheel-parent'>
                    <img src="./img/${pic_2win}.png">
                    <img src="./img/${pic_3win}.png">
                    <img src="./img/${pic_4win}.png">
                </div>            
            </div>`,

            `<div class='parent'>
                <p>When a wheel stops spinning, the wedge it lands on will activate.</p>
                <p>The activated wedge will turn black, like this:</p>
                <img src="./img/${pic_won}.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>After each spin, you'll see how many points you earned.</p>
                <p>If you land on a 'W' wedge, you'll see this message:</p>
                <div class="win-text-inst" style="color:${colors[1]}; margin-bottom: 100px">+10 Points</div>
            </div>`,

            `<div class='parent'>
                <p>If you land on a 'L' wedge, you'll see this message:</p>
                <div class="win-text-inst" style="color:${colors[0]}; margin-bottom: 100px">+0 Points</div>
            </div>`,

            `<div class='parent'>
                <p>To spin a prize wheel, just grab and pull it with your cursor.</p>
                <p>Watch the animation below to see how it's done.</p>
                <img src="./img/${gif}.gif" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>Throughout Feel the Spin, you'll answer questions about your feelings.</p>
                <p>Specifically, you'll report how <b>immersed</b> and <b>absorbed</b> you felt spinning each wheel.</p>
                <p><b>IMPORTANT:</b> You will <i>not</i> rate how much you liked or enjoyed spinning each wheel. The focus is solely on your sense of immersion and absorption.</p>
            </div>`,
        ],

        intro_predict: [
            `<div class='parent'>
                <p><strong>Welcome to Feel the Spin!</strong></p>
                <p>In Feel the Spin, players spin a series of prize wheels.</p>
                <p>With each spin, players earn points.</p>
                <p>The goal is to earn as many points as possible!</p>
            </div>`,

            `<div class='parent'>
                <p>Each wheel is divided into four wedges, like this:</p>
                <div class='wheel-parent'>
                    <img src="./img/${pic_2win}.png">
                    <img src="./img/${pic_3win}.png">
                    <img src="./img/${pic_4win}.png">
                </div>       
            </div>`,

            `<div class='parent'>
                <p>'W' wedges are worth 10 points.</p><p>'L' wedges are worth 0 points.</p>
                <div class='wheel-parent'>
                    <img src="./img/${pic_2win}.png">
                    <img src="./img/${pic_3win}.png">
                    <img src="./img/${pic_4win}.png">
                </div>       
            </div>`,

            `<div class='parent'>
                <p>When a wheel stops spinning, the wedge it lands on will activate.</p>
                <p>The activated wedge will turn black, like this:</p>
                <img src="./img/${pic_won}.png" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>After each spin, players see how many points they earned.</p>
                <p>If a player lands on a 'W' wedge, they'll see this message:</p>
                <div class="win-text-inst" style="color:${colors[1]}; margin-bottom: 100px">+10 Points</div>
            </div>`,

            `<div class='parent'>
                <p>If a player lands on a 'L' wedge, they'll see this message:</p>
                <div class="win-text-inst" style="color:${colors[0]}; margin-bottom: 100px">+0 Points</div>
            </div>`,

            `<div class='parent'>
                <p>To spin a prize wheel, players just grab and pull it with their cursor.</p>
                <p>Watch the animation below to see how it's done.</p>
                <img src="./img/${gif}.gif" style="width:50%; height:50%">
            </div>`,

            `<div class='parent'>
                <p>Throughout Feel the Spin, players answer questions about their feelings.</p>
                <p>Specifically, players report how <b>immersed</b> and <b>absorbed</b> they felt spinning each wheel.</p>
                <p><b>IMPORTANT:</b> Players do <i>not</i> rate how much they liked or enjoyed spinning each wheel. The focus is solely on their sense of immersion and absorption.</p>
            </div>`,

            `<div class='parent'>
                <p>Your goal in Feel the Spin is to guess how <b>immersed</b> and <b>absorbed</b> an average person would feel while spinning different wheels.</p>
                <p>You'll see a variety of wheels, each with its own set of values. For each wheel, your job is to guess how <b>immersed</b> and <b>absorbed</b> an average person would feel while spinning it.</p>
                <p>Simply provide your best guess about the typical experience.</p>
            </div>`,   
        ],

        postIntro: [   

            `<div class='parent'>
                <p>You're ready to begin Feel the Spin!</p>
                <p>Continue to the next screen to begin.</p>
            </div>`,      
        ],

        postTask: [
            `<div class='parent'>
                <p>Feel the Spin is now complete!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`
        ],
    };


    const intro = {
        type: jsPsychInstructions,
        pages: (playOrPredict == "play") ? html.intro_play : html.intro_predict,
        show_clickable_nav: true,
        post_trial_gap: 500,
        allow_keys: false,
    };

    const correctAnswer_play = [`I will report how immersed and absorbed I felt spinning each wheel.`];

    const correctAnswer_predict = [`I will predict how immersed and absorbed an average person would feel spinning each wheel.`];

    const correctAnswer = (playOrPredict == "play") ? correctAnswer_play : correctAnswer_predict;

    const options_play = [
        `I will report how happy I felt spinning each wheel.`, 
        `I will report how much I enjoyed spinning each wheel.`,
        `I will report how immersed and absorbed I felt spinning each wheel.`,
        `I will report how much I liked spinning each wheel.`
    ];

    const options_predict = [
        `I will predict how happy an average person would feel spinning each wheel.`, 
        `I will predict how much an average person would enjoy spinning each wheel.`,
        `I will predict how immersed and absorbed an average person would feel spinning each wheel.`,
        `I will predict how much an average person would like spinning each wheel.`];

    const options = (playOrPredict == "play") ? options_play : options_predict;

    const errorMessage = {
        type: jsPsychInstructions,
        pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand the game, please continue to re-read the instructions.</p></div>`],
        show_clickable_nav: true,
        allow_keys: false,
    };

    const attnChk = {
        type: jsPsychSurveyMultiChoice,
        preamble: `<div class='parent'>
            <p>Please answer the following question.</p>
            </div>`,
        questions: [
            {
                prompt: `Which of the following statements is true?`, 
                name: `attnChk1`, 
                options: options,
            },
        ],
        scale_width: 500,
        on_finish: (data) => {
              const totalErrors = getTotalErrors(data, correctAnswer);
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
        lose: {color: colors[0], font: 'white', label:"L", points: 0},
        win: {color: colors[1], font: 'white', label:"W", points: 10},
    };

    // define each wheel
    let wheels = [
            {sectors: [ wedges.lose, wedges.lose, wedges.win, wedges.lose, wedges.lose, wedges.win ], wheel_id: 1, reliability: 1, label: "100%", ev: 2.33, mi: .65},
            {sectors: [ wedges.lose, wedges.win, wedges.lose, wedges.win, wedges.lose, wedges.win ], wheel_id: 2, reliability: 1, label: "100%", ev: 5, mi: 1},
            {sectors: [ wedges.win, wedges.win, wedges.lose, wedges.win, wedges.win, wedges.lose ], wheel_id: 3, reliability: 1, label: "100%", ev: 7.67, mi: .65},
        ];

    wheels = jsPsych.randomization.repeat(wheels, 1);


    const MakeSpinLoop = function(wheel, round, play) {

        let outcome;
        let trial = 1;

        // trial: spinner
        const spin = {
            type: jsPsychCanvasButtonResponse,
            stimulus: function(c, spinnerData) {
                createSpinner(c, spinnerData, wheel.sectors, false, true);
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

                if (outcome == "W") {
                    standardFeedback = `<div class="score-board-blank"></div> <div class="feedback-area"> <div class="win-text" style="color:${colors[1]}">+10 Points</div>`;
                } else {
                    standardFeedback = `<div class="score-board-blank"></div> <div class="feedback-area"> <div class="win-text" style="color:${colors[0]}">+0 Points</div>`;
                };

                return standardFeedback;

            },
            choices: "NO_KEYS",
            trial_duration: 2000,
            data: {round: round + 1, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi},
            on_finish: function(data) {
                data.trial = trial;
                trial++;
            },
        };

        const spin_loop = {
            timeline: [spin, tokens],
            repetitions: nTrials,
        }

        const flowMeasure_predict = {
            type: jsPsychCanvasLikert,
            stimulus: function(c, spinnerData) {
                createSpinner(c, spinnerData, wheel.sectors, false, false);
            },
            questions: [
                {prompt: `How <b>immersed</b> and <b>absorbed</b><br>would an average person feel spinning this wheel?`,
                name: `flow`,
                labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
            ],
            randomize_question_order: false,
            scale_width: 600,
            data: {round: round + 1, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi},
             on_finish: function(data) {
                data.trial = trial - 1;
                saveSurveyData(data);
            }
        };

        const flowMeasure_play = {
            type: jsPsychSurveyLikert,
            questions: [
                {prompt: `How <b>immersed</b> and <b>absorbed</b><br>did you feel spinning the last wheel?`,
                name: `flow`,
                labels: ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Extremely']},
            ],
            randomize_question_order: false,
            scale_width: 600,
            data: {round: round + 1, wheel_id: wheel.wheel_id, ev: wheel.ev, reliability: wheel.reliability, mi: wheel.mi},
             on_finish: function(data) {
                data.trial = trial - 1;
                saveSurveyData(data);
            }
        };


        if (play == "play") {
            this.timeline = [spin_loop, flowMeasure_play];
        } else {
            this.timeline = [flowMeasure_predict];
        }
    }


    p.round1 = new MakeSpinLoop(wheels[0], 0, playOrPredict)
    p.round2 = new MakeSpinLoop(wheels[1], 1, playOrPredict)
    p.round3 = new MakeSpinLoop(wheels[2], 2, playOrPredict)

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
        experiment_id: "CAAX3No74jY1",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [exp.consent, exp.instLoop, exp.postIntro, exp.round1, exp.round2, exp.round3, exp.demographics, exp.save_data];

jsPsych.run(timeline);
