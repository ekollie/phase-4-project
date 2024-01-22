# phase-4-project

https://dbdiagram.io/d/Compliments-65aae642ac844320ae50c046

# user stories

As a user, I want to access my profile to view my personal information, review anonymous compliments I have received, and manage their visibility.

As a user, I want to view the anonymous compliments I have received and have the option to make them public by 'hearting' them, so that I can share positive feedback with others if I choose to.

As a user, I want to view other users' profiles to learn more about my colleagues and see any compliments they have chosen to make public.
Posting Anonymous Compliments to Others

As a user, I want to post anonymous compliments to my colleagues’ profiles,  with the understanding that these compliments are initially private to the recipient.

As a user, I want to like public compliments that others have made visible, to show my support and agreement with the positive feedback shared in the workplace.

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
