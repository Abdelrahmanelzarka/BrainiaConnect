from flask import Flask,jsonify, make_response,session,request
import random
import string
from flask_bcrypt import Bcrypt 
from flask_cors import CORS, cross_origin
from models import db, User
import tensorflow as tf
import socket

app = Flask(__name__)


app.config['SECRET_KEY'] = 'brainiaConnect'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
db.init_app(app)
  
with app.app_context():
    db.create_all()
 
@app.route("/")
def hello_world():
    return "Hello, World!"
 
@app.route("/@me", methods=["POST"])
def get_current_user():
    user_id = session.get("user_id")
    
    print(session)

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"
    
@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
 
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
  
    user = User.query.filter_by(email=email).first()
  
    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401
  
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
      
    session["user_id"] = user.id
  
    return jsonify({
        "id": user.id,
        "email": user.email
    })
 


# Define host (usually empty string for listening on all interfaces) and port
HOST = ''
PORT = 1000
data = b''

# Create a TCP socket
#with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
#    s.bind((HOST, PORT))
#    s.listen()
#    conn, addr = s.accept()
#    with conn:
#        print('Connected by', addr)

        # Initialize an empty variable to store received data
        

        # Continuously receive data in a loop (replace 1024 with desired buffer size)
#        while True:
#            recieved_data = conn.recv(1024)
#            if not data:  
#            data += recieved_data  


def load_model():
    global model  
    model = tf.keras.models.load_model('main_net_3.h5 copy') 
    print(model)

load_model()


@app.route('/predict', methods=['GET'])
def predict():
    prediction = model.predict(data)
    data= b''

    return jsonify({'prediction': prediction.tolist()})
  



@app.route("/get",methods=["GET"])
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
    
    



    