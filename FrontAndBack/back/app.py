from flask import Flask,jsonify, make_response,session,request,render_template,flash,redirect
import random
import string
from flask_bcrypt import Bcrypt 
from flask_cors import CORS, cross_origin
from models import db, User
import tensorflow as tf
import socket
from numpy import load
import numpy as np;
from flask_mail import Mail, Message
from flask_wtf import FlaskForm
from wtforms import PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo, Regexp



class ResetPasswordForm(FlaskForm):
    password = PasswordField('Password', validators=[Regexp('^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$',message="Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"),Length(min=8)] )
    print("password: ",password)
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset Password')

app = Flask(__name__)


# Configure Flask-Mail (replace with your actual credentials)
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'brainiaconnect@gmail.com'
app.config['MAIL_DEFAULT_SENDER'] = 'brainiaconnect@gmail.com'
app.config['MAIL_PASSWORD'] = 'omhqceeedahqyzgs'
#brainiaconnect1!

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


mail = Mail(app)

@app.route("/reset-password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    print(token)
    user = User.query.filter_by(id=token).first()
  
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return jsonify({"error": "Not registered"}), 401
    
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        #flash('Your password has been updated! You are now able to log in', 'success')
        return redirect('http://localhost:3001/login')
    
    return render_template('reset_token.html', title='Reset Password', form=form)
    

@app.route('/forget-password', methods=['POST'])
def forget_password():
  try:
    data = request.get_json()
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Not registered"}), 401
    
    
    reset_token =user.id
    print(reset_token)

    msg_title = "You requested a password reset for your account."
    sender = "brainiaconnect@gmail.com"
    msg = Message(msg_title,sender=sender,recipients=[email])
    msg_body = "Please click on the button below to reset your password:"
    msg.body = ""
    data = {
		'app_name': "BrainiaConnect",
		'title': msg_title,
		'body': msg_body,
        'app_link':f"http://127.0.0.1:5000/reset-password/{reset_token}"
	}

    msg.html = render_template("email.html",data=data)
    mail.send(msg)

    # Generate a random password reset token (replace with a secure generation method)
  

    # Implement logic to store the reset token associated with the email in your database
   

    # Create a message with password reset instructions
    #msg = Message('Password Reset Request', sender='brainiaconnect@gmail.com', recipients=[email])
    #msg.body = f"""
    #You requested a password reset for your account.

    #Please click on the following link to reset your password:

    #http://your_website.com/reset-password/{reset_token}

    #This link will expire in 24 hours.

    #If you did not request a password reset, please ignore this email.
    #"""

    # Send the email
    #mail.send(msg)

    return jsonify({'message': 'A password reset link has been sent to your email'}), 200
  except Exception as e:
    print(e)  # Log the error for debugging
    return jsonify({'message': 'An error occurred'}), 500



@app.route("/@me", methods=["POST"])
def get_current_user():
    user_id = session.get("user_id")
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


@app.route('/prediction', methods=['GET'])
def predict():
    AllData = load('AllData.npy')
    testdata = AllData[:, :, :, 29, 1, 50]
    sizes = AllData.shape
    testdata = np.reshape(testdata, (1,sizes[0], sizes[1], sizes[2]))
    prediction = model.predict(testdata)
    print(np.max(prediction[0]))
    print(np.argmax(prediction[0]))
    print(np.sum(prediction[0]))
    alphabet = string.ascii_lowercase  # Get lowercase alphabet string
    alphabet = list(alphabet)
    num=['1', '2', '3', '4', '5','6', '7', '8', '9', '0']
    alphabet+=["No",'Sound',' ',"Yes"]
    data=alphabet[np.argmax(prediction[0])]
    print(data)


    return jsonify({'prediction':data })
  



@app.route("/get", methods=["GET"])
def get():
  """Returns a random lowercase alphabet character."""
  
 
  
  response = make_response(jsonify(data))

  # Add CORS headers
  response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3001'  # Allow requests from your frontend
  response.headers['Access-Control-Allow-Methods'] = 'GET'  # Allow GET method (adjust if needed)
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type'  # Allow Content-Type header (adjust if needed)

  return response


if __name__ == "__main__" :
    app.run(debug=True)