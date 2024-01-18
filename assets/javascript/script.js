var startButton = document.getElementById("startButton");
var userGuess = document.getElementById("userGuess");
var result = document.querySelector(".result");
var timer = document.getElementById("timer");
var seconds = 8
var winCount = document.getElementById("winCount");
var lossCount = document.getElementById("lossCount");
var countW = parseInt(localStorage.getItem("countW")) || 0;
var countL = parseInt(localStorage.getItem("countL")) || 0;
var wordBank = ["Frontend", "Backend", "Database", "Express", "React", "Angular", "NodeJS", "MongoDB", "MySQL", "Schema", "Server", "Client", "Endpoint", "Framework", "Library", "Bootstrap", "Module", "Package", "Middleware", "Routing", "Validation", "Testing", "Debugging", "Deployment", "Security", "Encryption", "Authentication", "Authorization", "Dependency", "Injection", "Responsive", "Animation", "Observer", "Singleton", "Repository", "Component", "Controller", "Model", "View", "ViewModel", "Stateful", "Stateless", "Asynchronous", "Synchronous", "Callback", "Promise", "Function", "Variable", "Constant", "Closure", "Event", "Listener", "RESTful", "GraphQL", "WebSockets", "Prototype", "Inheritance", "Encapsulation", "Polymorphism", "Abstraction", "Interface", "Debug", "Console", "Breakpoint", "Logging", "Linting", "Continuous", "Integration", "Deployment", "Docker", "Kubernetes", "Versioning", "Git", "GitHub", "Repository", "Forking", "Branching", "Merging", "PullRequest", "Agile", "Scrum", "Kanban", "Sprint", "UserStory", "Backlog", "Wireframe", "Mockup", "Prototype", "Responsive", "MobileFirst", "Progressive", "Enhancement", "Optimization", "Refactoring", "Scalability", "Performance", "LoadBalancer", "DevOps", "Automation", "Cascade"]
timer.textContent = seconds
startButton.addEventListener("click", generateWord);
scoreboard();

// Randomize a word for user to guess //
function generateWord() {
    timer.textContent = seconds
    countdown(seconds);
    result.textContent = userGuess.textContent = "";
    var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    for (var i = 0; i < randomWord.length; i++) {
        var underline = document.createElement("p");
        document.body.children[2].children[1].appendChild(underline);
        underline.setAttribute("class", "blankGuess");
        underline.setAttribute("data-content", randomWord[i]);
    }
}

// Reveal correct guesses with keydown//
document.addEventListener("keydown", keydown);
function keydown(event) {
    var key = event.key.toLowerCase();
    var matchCheck = document.querySelectorAll(".blankGuess");
    for (var j = 0; j < matchCheck.length; j++) {
        if (matchCheck[j].getAttribute("data-content").toLowerCase().match(key)) {
            matchCheck[j].textContent = matchCheck[j].getAttribute("data-content");
            matchCheck[j].setAttribute("class", "correctGuess")
        };
    }
}

// Timer //
function countdown(x) {
    var timeInterval = setInterval(function () {
        x--;
        timer.textContent = x;
        if (x === 0) {
            clearInterval(timeInterval);
            result.textContent = "YOU LOSE!!!";
            result.setAttribute("style", "color: darkred;")
            countL++
            scoreboard();
        } else if ((document.querySelectorAll(".blankGuess").length) === 0) {
            clearInterval(timeInterval);
            result.textContent = "YOU WIN!!!";
            result.setAttribute("style", "color: darkgreen;")
            countW++
            scoreboard();
        }
    }, 1000);
}

// Scoreboard //
function scoreboard() {
    winCount.textContent = countW
    lossCount.textContent = countL
    localStorage.setItem("countW", countW);
    localStorage.setItem("countL", countL);
}

