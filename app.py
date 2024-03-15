from flask import Flask, render_template, flash, request
import joblib as joblib
import os
import hashlib
import requests
import json
import base64

app = Flask(__name__)
port = int(os.environ.get('PORT', 5000))
app.config['SECRET_KEY'] = 'abc123@567$#'

def callEnzoicAPI(password):
    apiKey = 'e4e503120b244d9a9667f3b01e59f159'
    secretKey = 'yvBaGM46MTq-NDPvSa!B+X=Sm4cU@W_X'
    authorizationParameter = apiKey+":"+secretKey
    authorizationParameter = authorizationParameter.encode('ascii')
    authorizationParameter = (base64.b64encode(authorizationParameter)).decode('ascii')
    authorizationParameter = "basic "+str(authorizationParameter)
    password = password.encode('utf-8')
    sha1HashTemp = hashlib.sha1(password)
    sha1Hash = str(sha1HashTemp.hexdigest())
    sha256HashTemp = hashlib.sha256(password)
    sha256Hash = str(sha256HashTemp.hexdigest())
    md5HashTemp = hashlib.md5(password)
    md5Hash = str(md5HashTemp.hexdigest())
    rawData = {'partialSHA1':sha1Hash, 'partialSHA256':sha256Hash, 'partialMD5':md5Hash}
    url = 'https://api.enzoic.com/passwords'
    response = requests.post(url, data = json.dumps(rawData),headers={'content-type':'application/json',
    'authorization':authorizationParameter})
    if(response.status_code == 404):
        print("Not found")
        return (False,0)
    finalResponse = json.loads(response.content.decode('ascii'))
    return (finalResponse["candidates"][0]["revealedInExposure"], finalResponse["candidates"][0]["exposureCount"])


def scoreCalculate(password):
    length = len(password)
    score = 0
    upper = 0
    lower = 0
    numbers = 0
    symbols = 0
    consecutiveLower = 0
    consecutiveUpper = 0
    consecutiveNumber = 0
    for i in range(0,length-1):
        if(password[i].isupper()):
            upper += 1
        elif(password[i].islower()):
            lower += 1
        elif(password[i].isdigit()):
            numbers += 1
        else:
            symbols += 1
        
        if(password[i].isupper() and password[i+1].isupper()):
            consecutiveUpper += 1
        else:
            score = score-consecutiveUpper*2
            consecutiveUpper = 0
        if(password[i].islower() and password[i+1].islower()):
            consecutiveLower += 1
        else:
            score = score-consecutiveLower*2
            consecutiveLower = 0
        if(password[i].isdigit() and password[i+1].isdigit()):
            consecutiveNumber += 1
        else:
            score = score-consecutiveNumber*2
            consecutiveNumber = 0


    score = score + length*4+((length-lower)*2)+((length-upper)*2)+(numbers*4)+symbols*6

    if(numbers==0 and symbols==0):
        score = score - length
    
    if(upper==0 and lower==0 and symbols==0):
        score = score - length
    
    return score



@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/main/', methods=['GET', 'POST'])
def mainpage():
    if request.method == "POST":
        enteredPassword = request.form['password']
    else:
        return render_template('index.html')

    # Load the algorithm models
    DecisionTree_Model = joblib.load('DecisionTree_Model.joblib')
    LogisticRegression_Model = joblib.load('LogisticRegression_Model.joblib')
    NaiveBayes_Model = joblib.load('NaiveBayes_Model.joblib')
    NeuralNetwork_Model = joblib.load('NeuralNetwork_Model.joblib')
    
    Password = [enteredPassword]

    # Predict the strength
    DecisionTree_Test = DecisionTree_Model.predict(Password)
    LogisticRegression_Test = LogisticRegression_Model.predict(Password)
    NaiveBayes_Test = NaiveBayes_Model.predict(Password)
    NeuralNetwork_Test = NeuralNetwork_Model.predict(Password)
    status, count = callEnzoicAPI(enteredPassword)
    score = scoreCalculate(enteredPassword)

    return render_template("main.html", DecisionTree=DecisionTree_Test,
                                        LogReg=LogisticRegression_Test, 
                                        NaiveBayes=NaiveBayes_Test,
                                        NeuralNetwork=NeuralNetwork_Test,
                                        status=status,
                                        count=count,
                                        score=score)

if __name__ == "__main__":
    app.run(host='localhost', port=port, debug=True)
