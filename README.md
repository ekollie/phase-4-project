# phase-4-project

https://dbdiagram.io/d/Compliments-65aae642ac844320ae50c046

# user stories

As a user, I want to access my profile to view my personal information, review anonymous compliments I have received, and manage their visibility.

As a user, I want to view the anonymous compliments I have received and have the option to make them public by 'hearting' them, so that I can share positive feedback with others if I choose to.

As a user, I want to view other users' profiles to learn more about my colleagues and see any compliments they have chosen to make public.
Posting Anonymous Compliments to Others

As a user, I want to post anonymous compliments to my colleagues’ profiles,  with the understanding that these compliments are initially private to the recipient.

As a user, I want to like public compliments that others have made visible, to show my support and agreement with the positive feedback shared in the workplace.

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
