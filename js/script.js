var answers         = []; // Provides history of calculations
var variables       = {}; // Provides custom variables defined by end-users
var input           = "calc-input";
var cursorPosition  = 0;
var inputStr        = {"str": '', "begin": '', "end": ''};
var errors          = [];
/* Format
answers[0] = [string, value, errors]
variables["name"] = [string] (this is a string because what if we make use of other variables?)
*/

/* Functions: Aliases */
var expo    = (a, b) => Math.pow(a, b);
var mod     = (a, b) => (a % b);
var sqrt    = a => Math.sqrt(a);
var round   = a => Math.round(a);

/* Functions: One line math commands */
var ans     = (a = answers.length-1) => answers[a][1];
var cubed   = (a) => Math.pow(a, 3);
var pct     = (a, b = 100) => (a / 100 * b);
var percent = (a, b) => pct(a, b);
var squared = (a) => Math.pow(a, 2);
var vars    = (a = "") => eval(variables[a]);

// Summation
// Factorial
// Combinations
// Permutations

/* Functions: Longer math commands */
var avg     = (...args) => { // Obtain an average from as many arguments as possible!
    if (Array.isArray(args)) {
        let val = 0;
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] == 'number') { val += args[i]; } 
            else { return NaN; }
        }
        val = val / args.length;
        return val;
    } else {
        return NaN;
    }
}

var definevars = () => {
    var a = window.prompt("What do you want to name your variable? (Make it a string.)");
    var b = window.prompt("What equations will you apply to it? (Make it a string)");
    vars[a] = b + "";
    a = window.alert("Your new variable can now be called in the calculator with vars('" + a + "')");
    addVariableItem(a, b);
}

/* Functions: Inputs */
var updateInput = () => {
    inputStr["str"] = document.getElementById(input).value;
    inputStr["begin"] = inputStr["str"].slice(0, inputStr["str"].length + cursorPosition);
    inputStr["end"] = inputStr["str"].slice(inputStr["str"].length + cursorPosition, inputStr["str"].length);
    
    document.getElementById(input).value = inputStr["str"];
    document.getElementById(input + 'parent').dataset.value = inputStr["begin"];
}

var addToInput = (str) => {
    updateInput();
    document.getElementById(input).value = inputStr["begin"] + str + inputStr["end"];
    updateInput();
}
var removeFromInput = () => {
    updateInput();
    inputStr["begin"] = inputStr["begin"].slice(0, -1);
    document.getElementById(input).value = inputStr["begin"] + inputStr["end"];
    updateInput();
}
var clearInput = () => {
    updateInput();
    document.getElementById(input).value = "";
    cursorPosition = 0;
    updateInput();
}
var cursorGo = a => {
    if ( cursorPosition + a >= 0 )                                  { cursorPosition = 0; } 
    else if (cursorPosition + a <= (inputStr["str"].length * -1))   { cursorPosition = (inputStr["str"].length * -1); }
    else                                                            { cursorPosition += a; }
    updateInput();
}
var evalEquation = (str = document.getElementById(input).value) => {
    val = eval(str);
    val = (val.isNaN) ? "Error." : val; 
    answers.push([str, val]);
    document.getElementById(input).value = val;
    updateInput();
    cursorGo(0);
    addHistoryItem();
}

/* Populate History */
function addHistoryItem() {
    let chl = document.getElementById('calc-history-list').innerHTML += 
        `<li onclick="addToInput('ans(${answers.length-1})')">
            <span class="equation">${answers[answers.length-1][0]}</span> = 
            <span class="value">${answers[answers.length-1][1]}</span>
        </li>`;
}
function addVariableItem(a, b) {
    let chl = document.getElementById('calc-variables-list').innerHTML += 
        `<li onclick="addToInput('vars(${a + ''})')">
            <span class="equation">${a}</span> = 
            <span class="value">${b}</span>
        </li>`;
}