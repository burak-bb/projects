from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/<operation>')
def calculate(operation):
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))

    if operation == "add":
        result = add(a, b)
        return str(result)
    if operation == "sub":
        result = sub(a, b)
        return str(result)
    elif operation == "mult":
        result = mult(a, b)
        return str(result)
    elif operation == "div":
        result = div(a, b)
        return str(result)
