var questionNumber, score, allQuestions;

function QuizQuestion (question, optionA, optionB, optionC, optionD, rightAnswerNumber, rightAnswer) {
	this.question = question;
	this.optionA = optionA;
	this.optionB = optionB;
	this.optionC = optionC;
	this.optionD = optionD;
	this.rightAnswerNumber = rightAnswerNumber;
	this.rightAnswer = rightAnswer;
};

var question1 = new QuizQuestion (
	"Is milk good for you?", 
	" A. Yes, because the food pyramid tells me so.", 
	" B. No, because it's very high on fat since one cup of 2% milk has 138 calories.", 
	" C. No, because Harvard School of Public Health have labeled the milk recommendations a \"step in the wrong direction.\" ", 
	" D. B and C only",
	"4",
	"Milk is very high on fat. One cup of 2% milk has 138 calories! This is part of the reason why the Harvard School of Public Health has labeled the milk recommendations as a \“step in the wrong direction.\” "
);

var question2 = new QuizQuestion (
	"What vegetables are a good source of calcium", 
	" A. collards", 
	" B. spinach and bok choy", 
	" C. beans", 
	" D. All of the above", 
	"4",
	"All of these vegetables are a good source of calcium."
);

var question3 = new QuizQuestion (
	"What items provide protein for our bodies?", 
	" A. Meat", 
	" B. Potato", 
	" C. Beans", 
	" D. All of the above", 
	"4",
	"Meat, potatoes, and beans have protein!"
);

var question4 = new QuizQuestion (
	"What is the only vitamin that you can't get from plants?", 
	" A. Vitamin B12", 
	" B. Vitamin C", 
	" C. Vitamin D", 
	" D. All of the above", 
	"1",
	"Vitamin B12 is the only vitamin that you can't get from plants."
);

var question5 = new QuizQuestion (
	"Is too much animal protein bad for our bodies?", 
	" A. Yes, too much animal protein makes our blood acidic.", 
	" B. Yes, animal protein encourages cancer growth.", 
	" C. No, our bodies are designed to eat a lot of meat", 
	" D. A and B only", 
	"4",
	"Our bodies are not really designed to process lots of meat and there are side-effects if we consume too much of it."
);

allQuestions = [question1, question2, question3, question4, question5];

$(document).ready(function() {

	function updateQuestionNumber() {
		questionNumber++;
	};

	function updateScore() {
		score++;
		return score;
	};

	function askPlayAgain() {
		$("#play_again_button").show().on("click", function(){
			play();
		});
		$("#next_question_button").hide();
		$("#answer_message").append(
			'<h2 class="answer"> There are no more questions!...</h2>' + 
			'<p class="answer">Would you like to answer the questions again?</p>'
		);
	};

	function checkIfLastQuestion() {
		if (questionNumber < allQuestions.length) {
			return true;
		}
		else {
			return false;
		}
	};

	$("#next_question_button").on("click", function() {
		if (checkIfLastQuestion()) {
			showNewQuestion();
		} else {
			askPlayAgain();
		}
	});

	function showRightAnswerAndScore() {
 		$("#answer_message").append('<p>' + allQuestions[questionNumber].rightAnswer+ '</p>');
 		$("#score").html("<h3>Your Score is: " + score + " out of 5</h3>");
 		$("#next_question_button").show();
 		$("#answer_button").hide();
	}

	function evaluateAnswer() {
 		if (($("input:radio:checked").val() == allQuestions[questionNumber].rightAnswerNumber)) {
	 		$("#answer_message").show().html('<h2 class="answer">That\'s right!</h2>');
	 		updateScore();
	 	}
	 	else {
	 		$("#answer_message").show().html('<h2 class="answer"> Wrong answer.</h2>');
	 	};
 		showRightAnswerAndScore();
		updateQuestionNumber();
	};

 	$("#answer_button").on("click", function() {
	 	if ($('input[type=radio]:checked').length) {
	 		evaluateAnswer();
	 	} else {
	 		$("#answer_message").show().html('<h2 class="answer"> You have to choose an answer.</h2>');
	 	};
	});
	
	function hideAllExceptQuestionAnswer() {
		$("#answer_message").hide();
		$("#right_answer").hide();
		$("#next_question_button").hide();
		$("#wrong_answer_message").hide();
		$("#play_again_button").hide();
		$("#answer_button").hide();
	};

	function showNewQuestion() {
		hideAllExceptQuestionAnswer();
		$("#answer_button").show();
		$("#question").html('<h2 class="question">' + allQuestions[questionNumber].question + '</h2>');
		$("#options").html(
			"<ul id='questionOptions'>" +
				"<li><input type='radio' name='answer' class='option' value= '1'>" + allQuestions[questionNumber].optionA + "</li>" +
				"<li><input type='radio' name='answer' class='option' value= '2'>" + allQuestions[questionNumber].optionB + "</li>" +
				"<li><input type='radio' name='answer' class='option' value= '3'>" + allQuestions[questionNumber].optionC + "</li>" +
				"<li><input type='radio' name='answer' class='option' value= '4'>" + allQuestions[questionNumber].optionD + "</li>" +
			"</ul>"
		);
	};

	function play() {
		questionNumber = 0;
		score = 0;
		showNewQuestion();
	};

	play();

});
