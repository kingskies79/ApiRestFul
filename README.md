# This application has need that Mysql is running in localhost.
The setting necessary are:

# Software required

You need that Python, Flask and Mysql are installed in your local machine.

# Create a Mysql db 

    name : 'myflaskapp'


# Create two Tables
    users         with fields id:int (auto-increment), name: varchar, email: varchar, username: varchar, password: varchar, register: timestamp(CURRENT_TIMESTAMP  ).
    articles      with fields id:int (auto-increment), title: varchar, body: text, author: varchar, status: varchar, date: timestamp(CURRENT_TIMESTAMP)  

Open the file app.py and modify it for to connect at your Mysql Database.


app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']= 'root'
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='myflaskapp'
app.config['MYSQL_CURSORCLASS']='DictCursor'

# run application 
please execute the command "python app.py" in your bash console 


# API Service

GET '/article/<articleid>' from  'http://localhost:5000'          return the article with id=<articleid>

GET '/articles'   from 'http://localhost:5000'                    return the articles list.

PUT '/add'       from 'http://localhost:5000'                     add a new article

POST '/update/<articleid>' from 'http://localhost:5000'           update the article with id=<articleid>

DELETE /delete/<articleid>  from 'http://localhost:5000'          delete the article with id=<articleid>