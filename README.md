# Password-Strength

Password Strength Analysis Using Machine Learning Models <br>
[LIVE](https://c4self.onrender.com/)

A password strength analysis system shows how resistant a given password might be to password cracking attempts like brute force and dictionary attacks.
* We help the user to have a strong password which will help him/her to protect from vulnerability.
* Our project will help the user to analyze his/her password.
* Find out the best model for password evaluation.
* Comparative analysis and advantages over existing password evaluation technologies.
* As our project provides both methods, i.e., machine learning as well as standard rules for rating passwords, it can be used to compare both of these methods.
* Our project also tells the user whether his/her password has been breached or not by checking against a huge database of 7 billion+ exposed passwords. By using this feature the user can get to know whether his/her password has been breached or not and thus immediately change it if breached.

## Architecture Design:
![image](https://user-images.githubusercontent.com/70879718/173275817-af092abf-a997-47fc-a9e8-5cfdbca8d184.png)

## Models Used:
* Naïve Bayes
* Random Forest
* Logistics Regression
* Decision Tree
* Neural Networks

## Tech Stack:
We conducted our project in a python 3.9 virtual environment. We used Python command line arguments to create the environment as it supports most of the skiKit libraries which are required in construction of the ML joblib files to be used by the web application. We used the sklearn library to get the models and the Flask container to construct the Web application. Additionally, we also used Enzoic’s Live database which consisted of various compromised credentials using the API key provided by the website to check for the occurrence of the passwords in public domains.

## Future Work:
* A page for generating strong passwords.
