

const exp = (function() {


    var p = {};

   /*
    *
    *   CONDITION ASSIGNMENT    
    *
    */

    const winRateDraw = Math.floor(Math.random() * 2);
    let settings = {
        winRate: [.9, .5][winRateDraw],
        wedgeText: [['9 winning wedges (which are green)', '1 losing wedge (which is gray)'], ['5 winning wedges (which are green)', '5 losing wedges (which are gray)']][winRateDraw],
        gameType: [['binary', 'streak'], ['streak', 'binary']][Math.floor(Math.random() * 2)],
        streakType: ['continuous', 'binary'][Math.floor(Math.random() * 2)],
        gif: [`<img src="./img/easyWheel.gif" style="width:400px; height:400px">`, `<img src="./img/mediumWheel.gif" style="width:400px; height:400px">`][winRateDraw],
        nSpins: 30,
    };

    jsPsych.data.addProperties({
        gameType_1: settings.gameType[0],
        gameType_2: settings.gameType[1],
        streakType: settings.streakType,
        winRate: settings.winRate,
        nSpins: settings.nSpins,
    });

    console.log(settings.gameType, settings.streakType);


   /*
    *
    *   INSTRUCTIONS
    *
    */

    const html = {
        welcome: [
            `<div class='parent' style='text-align:left'>
                <p><strong>What makes some activities more immersive and engaging than others?</strong></p>
                <p>We're interested in why people feel effortlessly engaged in some activities (such as engrossing video games), but struggle to focus on other activities.</p>
                <p>To help us, you'll play two rounds of a game called <b>Spin the Wheel</b>. After each round, you'll report how immersed and engaged you felt.</p>
                <p>To learn about and play Spin the Wheel, continue to the next screen.</p>
            <div>`,

            `<div class='parent' style='text-align:left'>
                <p>Throughout both rounds of Spin the Wheel, you'll be competing for a chance to win a <b>$100.00 bonus prize</b>.
                Specifically, you'll earn tokens. The tokens you earn will be entered into a raffle, and if one of your tokens is drawn, you'll win $100.00.</p>
                <p>To maximize your chances of winning a $100.00 bonus, you'll need to earn as many tokens as possible. Continue to learn how to earn tokens!</p>
            </div>`,
        ],

        binary_1: [            
            `<div class='parent'>
                <p>In both rounds of Spin the Wheel, you'll earn tokens by spinning a prize wheel like this one.
                <br>The wheel contains ${settings.wedgeText[0]} and ${settings.wedgeText[1]}.</p>
                <p>To spin the wheel, simply grab it with your mouse cursor and give it a spin!</p>
                ${settings.gif}
            </div>`,

            `<div class='parent'>
                <p>In Round 1 of Spin the Wheel, you'll earn tokens each time you land on a winning wedge.</p>
                <p>Specifically, each time you land on a winning wedge, you'll earn 10 tokens.
                <br>You'll earn 0 tokens each time you land on a losing wedge.</p>
            </div>`,

            `<div class='parent'>
                <p>If you land on a winning wedge,
                <br>you'll see this message indicating that you earned 10 tokens.</p>
                <div class="win-text-inst">+10 Tokens</div>
            </div>`,

            `<div class='parent'>
                <p>If you land on a losing wedge,
                <br>you'll see this message indicating that you earned 0 tokens.</p>
                <div class="loss-text-inst">+0 Tokens</div>
            </div>`,
        ],

        binary_2: [            
            `<div class='parent'>
                <p>Round 2 of Spin the Wheel is identical to Round 1 with one exception: Instead of earning tokens for streaks of consecutive wins, you'll earn tokens for each individual win.</p>
                <p>Specifically, each time you land on a winning wedge, you'll earn 10 tokens.
                You'll earn 0 tokens each time you land on a losing wedge.</p>
            </div>`,

            `<div class='parent'>
                <p>If you land on a winning wedge,
                <br>you'll see this message indicating that you earned 10 tokens.</p>
                <div class="win-text-inst">+10 Tokens</div>
            </div>`,

            `<div class='parent'>
                <p>If you land on a losing wedge,
                <br>you'll see this message indicating that you earned 0 tokens.</p>
                <div class="loss-text-inst">+0 Tokens</div>
            </div>`,
        ],

        cStreak_1: [
            `<div class='parent'>
                <p>In both rounds of Spin the Wheel, you'll earn tokens by spinning a prize wheel like this one.
                <br>The wheel contains ${settings.wedgeText[0]} and ${settings.wedgeText[1]}.</p>
                <p>To spin the wheel, simply grab it with your mouse cursor and give it a spin!</p>
                ${settings.gif}
            </div>`,

            `<div class='parent'>
                <p>In Round 1 of Spin the Wheel, you'll earn tokens for streaks of consecutive wins.</p>
                <p>Specifically, you'll earn 10 tokens for every consecutive spin that lands on a winning wedge. A streak of 2 is worth 20 tokens, a streak of 3 is worth 30 tokens, and so on.</p>
            </div>`,
            
            `<div class='parent'>
                <p>Throughout the game, you'll see the length of your current streak.
                <br>For example, after three consecutive wins, you'd see the following:</p>
                <div class="score-board">
                    <div class="score-board-title">Current Streak:</div>
                    <div class="score-board-score">3</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>Each time you land on a losing wedge,
                <br>you'll see how many tokens you earned from your streak.</p>
                <div class="score-board">
                    <div class="score-board-title">Current Streak:</div>
                    <div class="score-board-score">3</div>
                </div>
            </div>`,
            
            `<div class='parent'>
                <p>For example, if you break a streak of three,
                <br>you'll see this message indicating that you earned 30 tokens.</p>
                <div class="score-board">
                    <div class="score-board-title">Final Streak:</div>
                    <div class="score-board-score">3</div>
                </div>
                <div class="win-text-inst">+30 Tokens</div>
            </div>`,

            `<div class='parent'>
                <p>If you lose before starting a streak,
                <br>you'll see this message indicating that you earned 0 tokens.</p>
                <div class="score-board">
                    <div class="score-board-title">Final Streak:</div>
                    <div class="score-board-score">0</div>
                </div>
                <div class="loss-text-inst">+0 Tokens</div>
            </div>`,
        ],

        cStreak_2: [
            `<div class='parent'>
                <p>Round 2 of Spin the Wheel is identical to Round 1 with one exception: Instead of earning tokens for each individual win, you'll earn tokens for streaks of consecutive wins.</p>
                <p>Specifically, you'll earn 10 tokens for every consecutive spin that lands on a winning wedge. A streak of 2 is worth 20 tokens, a streak of 3 is worth 30 tokens, and so on.</p>
            </div>`,
            
            `<div class='parent'>
                <p>Throughout Round 2, you'll see the length of your current streak.
                <br>For example, after three consecutive wins, you'd see the following:</p>
                <div class="score-board">
                    <div class="score-board-title">Current Streak:</div>
                    <div class="score-board-score">3</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>Each time you land on a losing wedge,
                <br>you'll see how many tokens you earned from your streak.</p>
                <div class="score-board">
                    <div class="score-board-title">Current Streak:</div>
                    <div class="score-board-score">3</div>
                </div>
            </div>`,
            
            `<div class='parent'>
                <p>For example, if you break a streak of three,
                <br>you'll see this message indicating that you earned 30 tokens.</p>
                <div class="score-board">
                    <div class="score-board-title">Final Streak:</div>
                    <div class="score-board-score">3</div>
                </div>
                <div class="win-text-inst">+30 Tokens</div>
            </div>`,

            `<div class='parent'>
                <p>If you lose before starting a streak,
                <br>you'll see this message indicating that you earned 0 tokens.</p>
                <div class="score-board">
                    <div class="score-board-title">Final Streak:</div>
                    <div class="score-board-score">0</div>
                </div>
                <div class="loss-text-inst">+0 Tokens</div>
            </div>`,
        ],

        bStreak_1: [
            `<div class='parent'>
                <p>In both rounds of Spin the Wheel, you'll earn tokens by spinning a prize wheel like this one.
                <br>The wheel contains ${settings.wedgeText[0]} and ${settings.wedgeText[1]}.</p>
                <p>To spin the wheel, simply grab it with your mouse cursor and give it a spin!</p>
                ${settings.gif}
            </div>`,

            `<div class='parent'>
                <p>In Round 1 of Spin the Wheel, you'll earn tokens for achieving streaks of 3 consecutive wins.</p>
                <p>Specifically, you'll earn 30 tokens if you land on a winning wedge 3 spins in a row.
                If you land on a losing wedge before achieving a streak of 3, you'll earn 0 tokens.</p>
            </div>`,
            
            `<div class='parent'>
                <p>Throughout the game, you'll see the length of your current streak.
                <br>For example, after two consecutive wins, you'd see the following:</p>
                <div class="score-board">
                    <div class="score-board-title">Current Streak:</div>
                    <div class="score-board-score">2 / 3</div>
                </div>
            </div>`,
            
            `<div class='parent'>
                <p>If you achieve a streak of 3,
                <br>you'll see this message indicating that you earned 30 tokens.</p>
                <div class="score-board">
                    <div class="score-board-title">Current Streak:</div>
                    <div class="score-board-score">3 / 3</div>
                </div>
                <div class="win-text-inst">+30 Tokens</div>
            </div>`,

            `<div class='parent'>
                <p>If you lose before achieving a streak of 3,
                <br>you'll see this message indicating that you earned 0 tokens.</p>
                <div class="loss-text-inst">+0 Tokens</div>
            </div>`,
        ],

        bStreak_2: [
            `<div class='parent'>
                <p>Round 2 of Spin the Wheel is identical to Round 1 with one exception: Instead of earning tokens for each individual win, you'll earn tokens for achieving streaks of 3 consecutive wins.</p>
                <p>Specifically, you'll earn 30 tokens if you land on a winning wedge 3 spins in a row. If you land on a losing wedge before achieving a streak of 3, you'll earn 0 tokens.</p>
            </div>`,
            
            `<div class='parent'>
                <p>Throughout Round 2, you'll see the length of your current streak.
                <br>For example, after two consecutive wins, you'd see the following:</p>
                <div class="score-board">
                    <div class="score-board-title">Current Streak:</div>
                    <div class="score-board-score">2 / 3</div>
                </div>
            </div>`,
            
            `<div class='parent'>
                <p>If you achieve a streak of 3,
                <br>you'll see this message indicating that you earned 30 tokens.</p>
                <div class="score-board">
                    <div class="score-board-title">Current Streak:</div>
                    <div class="score-board-score">3 / 3</div>
                </div>
                <div class="win-text-inst">+30 Tokens</div>
            </div>`,

            `<div class='parent'>
                <p>If you lose before achieving a streak of 3,
                <br>you'll see this message indicating that you earned 0 tokens.</p>
                <div class="loss-text-inst">+0 Tokens</div>
            </div>`,
        ],

        readyToPlay_1: [
            `<div class='parent'>
                <p>You're ready to play Round 1 of Spin the Wheel!</p>
                <p>Continue to the next screen to begin.</p>
            </div>`,      
        ],

        readyToPlay_2: [
            `<div class='parent'>
                <p>You're ready to play Round 2 of Spin the Wheel!</p>
                <p>Continue to the next screen to begin.</p>
            </div>`,      
        ],

        tasksComplete: [
            `<div class='parent'>
                <p>Both rounds of Spin the Wheel are now complete!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`
        ],

        intro_round2: [
            `<div class='parent'>
                <p>Round 1 of Spin the Wheel is now complete!</p>
                <p>Next, you'll continue to earn tokens by playing a second round of Spin the Wheel.</p>
            </div>`
        ],
    };

    function MakeIntro_1(settings) {

        const welcomeToRound1 = {
            type: jsPsychInstructions,
            pages: html.welcome,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const intro = {
            type: jsPsychInstructions,
            pages: function () {
                if (settings.gameType[0] == "binary") {
                    return html.binary_1;
                } else if (settings.streakType == "continuous") {
                    return html.cStreak_1;
                } else {
                    return html.bStreak_1;
                }
            },
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const roundToPlay = {
            type: jsPsychInstructions,
            pages: html.readyToPlay_1,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const errorMessage = {
            type: jsPsychInstructions,
            pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand Spin the Wheel, please continue to re-read the instructions.</p></div>`],
            show_clickable_nav: true,
            allow_keys: false,
        };

        const attnChk_option = (settings.streakType == "continuous") ? `Streaks of consecutive wins.` : `Streaks of 3 consecutive wins.`;
        const correctAnswer = (settings.gameType[0] == "binary") ? [`Each individual win.`] : [attnChk_option];

        const attnChk = {
            type: jsPsychSurveyMultiChoice,
            preamble: `Please select the correct ending to the following sentence:`,
            questions: [
                {
                    prompt: "In Round 1 of Spin the Wheel, I'll earn tokens for...", 
                    name: `attnChk1`, 
                    options: [`Each individual win.`, attnChk_option],
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

        const instLoop = {
          timeline: [intro, attnChk, conditionalNode],
          loop_function: () => {
            const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };

        const introTimeline = {
            timeline: [welcomeToRound1, instLoop, roundToPlay],
        }

        this.timeline = [introTimeline];
    };

    function MakeIntro_2(settings) {


        const welcomeToRound2 = {
            type: jsPsychInstructions,
            pages: html.intro_round2,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const intro = {
            type: jsPsychInstructions,
            pages: function () {
                if (settings.gameType[1] == "binary") {
                    return html.binary_2;
                } else if (settings.streakType == "continuous") {
                    return html.cStreak_2;
                } else {
                    return html.bStreak_2;
                }
            },
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const roundToPlay = {
            type: jsPsychInstructions,
            pages: html.readyToPlay_2,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const errorMessage = {
            type: jsPsychInstructions,
            pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand Spin the Wheel, please continue to re-read the instructions.</p></div>`],
            show_clickable_nav: true,
            allow_keys: false,
        };

        const attnChk_option = (settings.streakType == "continuous") ? `Streaks of consecutive wins.` : `Streaks of 3 consecutive wins.`;
        const correctAnswer = (settings.gameType[1] == "binary") ? [`Each individual win.`] : [attnChk_option];

        const attnChk = {
            type: jsPsychSurveyMultiChoice,
            preamble: `Please select the correct ending to the following sentence:`,
            questions: [
                {
                    prompt: "In Round 2 of Spin the Wheel, I'll earn tokens for...", 
                    name: `attnChk1`, 
                    options: [`Each individual win.`, attnChk_option],
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

        const instLoop = {
          timeline: [intro, attnChk, conditionalNode],
          loop_function: () => {
            const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };

        const introTimeline = {
            timeline: [welcomeToRound2, instLoop, roundToPlay],
        }

        this.timeline = [introTimeline];
    };

    p.consent = {
        type: jsPsychExternalHtml,
        url: "./html/consent.html",
        cont_btn: "advance",
    };

    const intro_1 = new MakeIntro_1(settings);
    const intro_2 = new MakeIntro_2(settings);

    
   /*
    *
    *   TASK
    *
    */


    const makeWedgeArray = function(winRate) {
        const wedges = {
            win: {color:"green", label:"W"},
            loss: {color:"grey", label:"L"},
        };
        const nWins = (winRate == .9) ? 9 : 5;
        const nLoss = (winRate == .9) ? 1 : 5;
        const winArray = Array(nWins).fill(wedges.win);
        const lossArray = Array(nLoss).fill(wedges.loss);
        const wedgeArray = lossArray.concat(winArray);
        return wedgeArray;
    };

    const wedgeArray = makeWedgeArray(settings.winRate);

    const MakeSpinLoop = function(settings, sectors, round) {

        let outcome;
        let currentStreak = 0;
        let finalStreak = 0;
        let trial = 1;

        const scoreBoard_html = `<div class="score-board">
            <div class="score-board-title">{title}</div>
            <div class="score-board-score">{number}</div>
        </div>`;

        // trial: spinner
        const spin = {
            type: jsPsychCanvasButtonResponse,
            stimulus: function(c, spinnerData) {
                let sectorsShuffled = (trial == settings.nSpins) ? sectors : jsPsych.randomization.repeat(sectors, 1);
                let loss = (trial == settings.nSpins) ? true : false;
                createSpinner(c, spinnerData, sectors, loss);
            },
            canvas_size: [500, 500],
            scoreBoard: function() {
                if (settings.gameType[round] == "binary") {
                    return ''
                };
                if (settings.gameType[round] == "streak" && settings.streakType == "continuous") {
                    return scoreBoard_html.replace('{title}', 'Current Streak:').replace('{number}', currentStreak);
                };
                if (settings.gameType[round] == "streak" && settings.streakType == "binary") {
                    return scoreBoard_html.replace('{title}', 'Current Streak:').replace('{number}', `${currentStreak} / 3`);
                };
            },
            data: {round: round + 1},
            on_finish: function(data) {
                data.trial = trial;
                outcome = data.outcome;
                if (outcome == "W") {
                    currentStreak++;
                };
                if (outcome == "L" || settings.gameType[round] == "streak" && settings.streakType == "binary" && currentStreak == 3) {
                    finalStreak = currentStreak;
                    currentStreak = 0;
                };
            },
        };

        const tokens = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                let standardFeedback;

                if (settings.gameType[round] == "binary") {
                    if (outcome == "W") {
                        standardFeedback = '<div class="score-board-blank"></div> <div class="feedback-area"> <div class="win-text">+10 Tokens</div> </div>';
                    } else {
                        standardFeedback = '<div class="score-board-blank"></div> <div class="feedback-area"> <div class="loss-text">+0 Tokens</div> </div>';
                    }
                };

                if (settings.gameType[round] == "streak" && settings.streakType == "continuous") {
                    if (outcome == "W") {
                        standardFeedback = scoreBoard_html.replace('{title}', 'Current Streak:').replace('{number}', `<span class="text-highlight">${currentStreak}</span>`) + `<div class="feedback-area"></div>`;
                    } else if (finalStreak > 0) {
                        standardFeedback = scoreBoard_html.replace('{title}', 'Final Streak:').replace('{number}', `<span class="text-highlight">${finalStreak}</span>`) + `<div class="feedback-area"> <div class="win-text">+${10 * finalStreak} Tokens</div> </div>`;
                    } else {
                        standardFeedback = scoreBoard_html.replace('{title}', 'Final Streak:').replace('{number}', finalStreak) + `<div class="feedback-area"> <div class="loss-text">+${10 * finalStreak} Tokens</div> </div>`;
                    }
                };

                if (settings.gameType[round] == "streak" && settings.streakType == "binary") {
                    if (outcome == "W" && finalStreak == 3) {
                        standardFeedback = scoreBoard_html.replace('{title}', 'Current Streak:').replace('{number}', `<span class="text-highlight">${finalStreak}</span> / <span class="text-highlight">3</span>`) + `<div class="feedback-area"> <div class="win-text">+${10 * finalStreak} Tokens</div> </div>`;
                    } else if (outcome == "W" && finalStreak < 3) {
                        standardFeedback = scoreBoard_html.replace('{title}', 'Current Streak:').replace('{number}', `<span class="text-highlight">${currentStreak}</span> / 3`) + `<div class="feedback-area"></div>`;
                    } else {
                        standardFeedback = scoreBoard_html.replace('{title}', 'Final Streak:').replace('{number}', `${finalStreak} / 3`) + `<div class="feedback-area"> <div class="loss-text">+0 Tokens</div> </div>`;
                    }                  
                }

                return standardFeedback;

            },
            choices: "NO_KEYS",
            trial_duration: 2000,
            data: {round: round + 1},
            on_finish: function(data) {
                data.trial = trial
                if (settings.gameType[round] == "streak" && settings.streakType == "binary" && finalStreak == 3) {
                    finalStreak = 0;
                };
                trial++;
            },
        };

        this.timeline = [spin, tokens];
        this.repetitions = settings.nSpins;
    }
    
    const spin_round1 = new MakeSpinLoop(settings, wedgeArray, 0)
    const spin_round2 = new MakeSpinLoop(settings, wedgeArray, 1)

   /*
    *
    *   DVs
    *
    */


    const zeroToExtremely = ["0<br>A little", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>Extremely"];
    const zeroToALot = ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>A lot'];

    // constructor functions
    function MakeFlowQs(round) {
        const secondVersion = (round == 1) ? 'Round 1' : 'Round 2';
        this.type = jsPsychSurveyLikert;
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px; color:rgb(109, 112, 114)'>
        <p>Thank you for completing ${secondVersion} of Spin the Wheel!</p>
        <p>During ${secondVersion} of Spin the Wheel, to what extent did you feel<br><b>immersed</b> and <b>engaged</b> in what you were doing?</p>
        <p>Report the degree to which you felt immersed and engaged by answering the following questions.</p></div>`;
        this.questions = [
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>During ${secondVersion} of Spin the Wheel, how <strong>absorbed</strong> did you feel in what you were doing?</div>`,
                name: `absorbed`,
                labels: ["0<br>Not very absorbed", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>More absorbed than I've ever felt"],
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>During ${secondVersion} of Spin the Wheel, how <strong>immersed</strong> did you feel in what you were doing?</div>`,
                name: `immersed`,
                labels: ["0<br>Not very immersed", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>More immersed than I've ever felt"],
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>During ${secondVersion} of Spin the Wheel, how <strong>engaged</strong> did you feel in what you were doing?</div>`,
                name: `engaged`,
                labels: ["0<br>Not very engaged", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>More engaged than I've ever felt"],
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>During ${secondVersion} of Spin the Wheel, how <strong>engrossed</strong> did you feel in what you were doing?</div>`,
                name: `engrossed`,
                labels: ["0<br>Not very engrossed", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>More engrossed than I've ever felt"],
                required: true,
            },
        ];
        this.randomize_question_order = false;
        this.scale_width = 700;
        this.data = {round: round};
        this.on_finish = (data) => {
            saveSurveyData(data);
        };
    };

    function MakeEnjoyQs(round) {
        const secondVersion = (round == 1) ? 'Round 1' : 'Round 2';
        this.type = jsPsychSurveyLikert;
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px; color:rgb(109, 112, 114)'>

        <p>Below are a few more questions about ${secondVersion} of Spin the Wheel.</p>

        <p>Instead of asking about immersion and engagement, these questions ask about <strong>enjoyment</strong>.<br>
        Report how much you <strong>enjoyed</strong> ${secondVersion} of Spin the Wheel by answering the following questions.</p></div>`;
        this.questions = [
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How much did you <strong>enjoy</strong> playing ${secondVersion} of Spin the Wheel?</div>`,
                name: `enjoyable`,
                labels: zeroToALot,
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How much did you <strong>like</strong> playing ${secondVersion} of Spin the Wheel?</div>`,
                name: `like`,
                labels: zeroToALot,
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How much did you <strong>dislike</strong> playing ${secondVersion} of Spin the Wheel?</div>`,
                name: `dislike`,
                labels: zeroToALot,
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How much <strong>fun</strong> did you have playing ${secondVersion} of Spin the Wheel?</div>`,
                name: `fun`,
                labels: zeroToALot,
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How <strong>entertaining</strong> was ${secondVersion} of Spin the Wheel?</div>`,
                name: `entertaining`,
                labels: zeroToExtremely,
                required: true,
            },
        ];
        this.randomize_question_order = false;
        this.scale_width = 700;
        this.data = {round: round};
        this.on_finish = (data) => {
            saveSurveyData(data);
        };
    };

   /*
    *
    *   TIMELINES
    *
    */

    p.round_1 = {
        timeline: [ intro_1, spin_round1, new MakeFlowQs(1), new MakeEnjoyQs(1)],
    };

    p.round_2 = {
        timeline: [ intro_2, spin_round2, new MakeFlowQs(2), new MakeEnjoyQs(2)],
    };

   /*
    *
    *   Demographics
    *
    */

    p.demographics = (function() {


        const taskComplete = {
            type: jsPsychInstructions,
            pages: html.tasksComplete,
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

        const email = {
            type: jsPsychSurveyText,
            questions: [{prompt: "<p>Please enter the email address associated with your Amazon.com account.</p><p>If you win the raffle, your $100.00 bonus will be added to this account.</p>", rows: 1, columns: 50, name: "email"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const demos = {
            timeline: [taskComplete, gender, age, ethnicity, english, finalWord, email]
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
        experiment_id: "bJcJE3co0Ejr",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    };

    return p;

}());

const timeline = [exp.consent, exp.round_1, exp.round_2, exp.demographics, exp.save_data];

jsPsych.run(timeline);
