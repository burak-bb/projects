from flask import Flask, request, render_template, redirect, session, flash, url_for
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
RESPONSES_KEY = "response"

app.config["SECRET_KEY"] = "jcdjkcsq"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route("/")
def start_survey():
    return render_template("start.html", survey=survey)

@app.route("/begin")
def survey_begin():
    session[RESPONSES_KEY] = []
    return redirect("/questions/0")

@app.route("/answer", methods=["POST"])
def answers():
    choice = request.form["answer"]
    responses = session[RESPONSES_KEY]
    responses.append(choice)
    session[RESPONSES_KEY] = responses

    if (len(responses) == len(survey.questions)):
        return redirect("complete")
    else:
        return redirect(f"questions/{len(responses)}")
    

@app.route("/questions/<int:qid>")
def show_question(qid):
    response = session.get(RESPONSES_KEY)
    if (response is None):
        return redirect("/")
    if (len(response) == len(survey.questions)):
        return redirect("complete")
    if (len(response) != qid):
        flash(f"invalid question id: {qid}.")
        return redirect(url_for("show_question", qid=len(response)))    
    question = survey.questions[qid]
    qnum = qid + 1
    return render_template("question.html", question=question, qnum=qnum)

@app.route("/complete")
def complete():
    return render_template("completion.html")