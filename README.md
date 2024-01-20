# phase-4-project

https://dbdiagram.io/d/Compliments-65aae642ac844320ae50c046

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
