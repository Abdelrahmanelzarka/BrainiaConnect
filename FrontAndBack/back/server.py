from flask import Flask,jsonify, make_response
import random
import string

app = Flask(__name__)


@app.route("/",methods=["GET"])
def predict():
  """Returns a random lowercase alphabet character."""
  alphabet = string.ascii_lowercase  # Get lowercase alphabet string
  alphabet = list(alphabet)
  num=["Yes",'1', '2', '3', '4', '5','6', '7', '8', '9', '0']
  alphabet+=["No",'Sound',' ']
  random_index = random.randint(0, len(alphabet) -1)  # Generate random index
  data=alphabet[random_index]
  
  
  response = make_response(jsonify(data))

  # Add CORS headers
  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'  # Allow requests from your frontend
  response.headers['Access-Control-Allow-Methods'] = 'GET'  # Allow GET method (adjust if needed)
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'  # Allow Content-Type header (adjust if needed)

  return response


if __name__ == "__main__" :
    app.run(debug=True)
    