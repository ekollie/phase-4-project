# phase-4-project
https://dbdiagram.io/d/Compliments-65aae642ac844320ae50c046

<img width="683" alt="Screen Shot 2024-01-21 at 6 24 47 PM" src="https://github.com/ekollie/phase-4-project/assets/142290529/686e6506-f872-4f91-b8c9-e16ffe469843">


# Wireframe
<img width="339" alt="Screen Shot 2024-01-20 at 4 42 16 PM" src="https://github.com/ekollie/phase-4-project/assets/142290529/26dde139-f4ab-4363-ad27-5911ec8a0089">

# API ROUTES
<img width="675" alt="Screen Shot 2024-01-21 at 6 20 37 PM" src="https://github.com/ekollie/phase-4-project/assets/142290529/290d0ca4-5d4a-44f7-a47e-cfe543d0dd51">

# TRELLO
<img width="864" alt="Screen Shot 2024-01-21 at 6 24 02 PM" src="https://github.com/ekollie/phase-4-project/assets/142290529/482c2f3c-fa86-4d1b-9459-9f8bf9cf07e1">


# Running backend

    in phase-4-project directory:
        pipenv install
        pipenv shell

    in server directory:
        flask db init
        flask db migrate
        flask db upgrade

        python seed.py
        python app.py

# Running frontend

    in client directory
        npm install
        npm start (if backend isn't running, there will be an error message)
