from flask import Flask,jsonify, make_response
import random
import string
import tensorflow as tf
import socket

app = Flask(__name__)



# Define host (usually empty string for listening on all interfaces) and port
HOST = ''
PORT = 1000
data = b''

# Create a TCP socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)

        # Initialize an empty variable to store received data
        

        # Continuously receive data in a loop (replace 1024 with desired buffer size)
        while True:
            recieved_data = conn.recv(1024)
            if not data:  # Check if connection closed
                break
            data += recieved_data  # Append received data to the variable


def load_model():
    global model  # Declare `model` as a global variable
    model = tf.keras.models.load_model('main_net_3.h5 copy') 

load_model()


@app.route('/predict', methods=['GET'])
def predict():
    prediction = model.predict(data)
    data= b''

    return jsonify({'prediction': prediction.tolist()})
  



@app.route("/",methods=["GET"])
def get():
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
    