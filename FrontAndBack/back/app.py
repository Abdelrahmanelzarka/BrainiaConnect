from flask import Flask,jsonify,session,request,render_template,flash,redirect
import string
from flask_bcrypt import Bcrypt 
from flask_cors import CORS
from models import db, User
import tensorflow as tf
import keras
from numpy import load
import numpy as np;
from flask_mail import Mail, Message
from flask_wtf import FlaskForm
from wtforms import PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo, Regexp
import json
from tensorflow.keras.models import model_from_json
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, LayerNormalization, Dropout
from tensorflow.keras.layers import MultiHeadAttention, Layer
from tensorflow.keras.utils import register_keras_serializable




app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'brainiaconnect@gmail.com'
app.config['MAIL_DEFAULT_SENDER'] = 'brainiaconnect@gmail.com'
app.config['MAIL_PASSWORD'] = 'omhqceeedahqyzgs'
app.config['SECRET_KEY'] = 'brainiaConnect'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
 
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True
  
mail = Mail(app)
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
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email,
        "gander": user.gander
    }) 
    
@app.route("/signup", methods=["POST"])
def signup():
    name = request.json["name"]
    age = request.json["age"]
    gander = request.json["gander"]
    email = request.json["email"]
    password = request.json["password"]
 
    user_exists = User.query.filter_by(email=email).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
     
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password,name=name,age=age,gander=gander)
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

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"
 



class ResetPasswordForm(FlaskForm):
    password = PasswordField('Password', validators=[Regexp('^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$',message="Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"),Length(min=8)] )
    print("password: ",password)
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset Password')
    
@app.route("/reset-password/<token>", methods=['GET', 'POST'])
def reset_token(token):
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
        return redirect('http://localhost:3000/login')
    
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

    return jsonify({'message': 'A password reset link has been sent to your email'}), 200
  except Exception as e:
    print(e)
    return jsonify({'message': 'An error occurred'}), 500






    



@register_keras_serializable()
class TransformerBlock(Layer):
    def __init__(self, embed_dim, num_heads, ff_dim, rate=0.1):
        super(TransformerBlock, self).__init__()
        self.att = MultiHeadAttention(num_heads=num_heads, key_dim=embed_dim)
        self.ffn = Sequential(
            [Dense(ff_dim, activation="relu"), Dense(embed_dim),]
        )
        self.layernorm1 = LayerNormalization(epsilon=1e-6)
        self.layernorm2 = LayerNormalization(epsilon=1e-6)
        self.dropout1 = Dropout(rate)
        self.dropout2 = Dropout(rate)

    def call(self, inputs, training):
        attn_output = self.att(inputs, inputs)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(inputs + attn_output)
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        return self.layernorm2(out1 + ffn_output)
 



def load_model():
    global model  
    with open('transformer_model_config (1).json') as json_file:
        loaded_model_json = json_file.read()
        
    model = model_from_json(loaded_model_json, custom_objects={'TransformerBlock': TransformerBlock})
    model.load_weights('transformer_model (1).h5')
    print(model)
    
load_model()

"""
  : 15     
  
0 : 37     1 : 43     2 : 5
3 : 4     4 : 57     5 : 3     6 : 22
7 : 90     8 : 67     9 : 6    

No : 126   Sound : 23     Yes : 26     

a : 16     b : 2
c : 62     e : 8     f : 27     g : 9
h : 29     i : 91     j : 25     k : 21
l : 103     m : 19     n : 7     o : 12
p : 28     q : 77     r : 70     t : 11
u : 17     v : 58     w : 13     x : 40
y : 0     z : 18
"""


@app.route('/prediction', methods=['GET'])
def predict():
    AllData = load('X_test.npy')
    testdata = AllData[9:10]
    prediction = model.predict(testdata)
    
    #print(np.argmax(prediction[0]))
    #print(np.sum(prediction[0]))
    Keyboard=['3','4','5','6', '7', '8', '9', '0']
    Keyboard+=['q', 'w', 'e', 'r', 't', 'y','u', 'i', 'o', 'p'] 
    Keyboard+=['a', 's', 'd', 'f', 'g', 'h','j', 'k', 'l']
    Keyboard+=['z', 'x', 'c', 'v', 'b', 'n', 'm']
    Keyboard+=["Yes","No",'Sound',' ','1', '2']
    data=Keyboard[np.argmax(prediction[0])]
    
    print(data)
    print("probability : ",np.max(prediction[0]))

    return jsonify({'prediction':data })
  



if __name__ == "__main__" :
    app.run(debug=True)