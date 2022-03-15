
# AUTOMATED MESSAGING SERVICE FOR WHATSAPP

This proyect is a service to sending automated messages to whatsapp using library venom-bot.

## SETTINGS AND INSTALLATION

- clone this repository
- install packages (npm install)
- add a token to the environment variables (AUTH_KEY = key)

## USE API

### 1. SEND TEXT
```
    ROUTE: [ HOST ]/api/whatsapp/send-message
    
    ENTRY:
        header: {
            "authorization": AUTH_KEY
        }
        body:{
            "phoneNumbers": ARRAY OF PHONE NUMBERS,
            "textMessage": STRING
        }
    RESPONSE:{
        "message": STRING,
        "phonesNotShipped": ARRAY,
        "reception": TIME,
        "finished": TIME,
        "error": BOOLEAN
    }
```
```
    ROUTE: [ HOST ]/api/whatsapp/send-image
    
    ENTRY:
        header: {
            "authorization": AUTH_KEY
        }
        body:{
            "phoneNumbers": ARRAY OF PHONE NUMBERS,
            "UrlImage": STRING,
            "Description": STRING
        }
    RESPONSE:{
        "message": STRING,
        "phonesNotShipped": ARRAY,
        "reception": TIME,
        "finished": TIME,
        "error": BOOLEAN
    }
```

## DEPLOY FROM HEROKU

- use heroku cli
- open heroku cli with path of your proyect
- git add .
- git commit -am "message"
- heroku git:remote -a "heroku app"
- heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack
- heroku buildpacks:add heroku/nodejs
- heroku ps:scale web=1
- git push heroku master
- heroku logs -t
- scan the qr code