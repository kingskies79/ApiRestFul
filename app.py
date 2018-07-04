from flask import Flask, render_template,flash,request,redirect,url_for,session,logging,wrappers

from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from functools import wraps

app = Flask(__name__)

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']= 'root'
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='myflaskapp'
app.config['MYSQL_CURSORCLASS']='DictCursor'

mysql = MySQL(app)

@app.route('/')
def hello():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/articles')
def articles():
    cur = mysql.connection.cursor()
    result = cur.execute("Select * from articles")
    articles= cur.fetchall()

    if result > 0:
        return render_template('articles.html', articles = articles)
    else:
        msg = "No found articles"
        return render_template('articles.html',msg=msg)
    cur.close()


@app.route('/article/<string:id>/')
def article(id):
    cur= mysql.connection.cursor()
    cur.execute("Select * from articles where id=%s", [id])
    article = cur.fetchone()

    return render_template('article.html', article=article)
    

class RegisterForm(Form):
    name= StringField('Name', [validators.Length(min=1, max=50)])
    userName = StringField('Username', [validators.Length(min=4, max=25)])
    email = StringField('Email', [validators.Length(min=6, max=50)])
    password = PasswordField('Password',[validators.DataRequired(), validators.EqualTo('confirm', message='Password does not match')])

    confirm = PasswordField('Confirm Password')


@app.route('/register', methods = ['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        email= form.email.data
        userName = form.userName.data
        password = sha256_crypt.encrypt(str(form.password.data))

        cur = mysql.connection.cursor()

        cur.execute("Insert into users(name, email, username, password) values(%s,%s,%s,%s)",(name,email, userName, password))

        mysql.connection.commit()

        cur.close()

        flash('You are now registered and you can log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET','POST'])
def login():
    cur = mysql.connect.cursor()
    cur.execute("Select username, password from users")
    data = cur.fetchall()
    error=None
    cur.close()
    if request.method == 'POST':
        for row in data:
            if request.form['username']== row['username']:
                if sha256_crypt.verify(request.form['password'], row['password']):
                    session['logged_in'] = True
                    session['username'] = request.form['username']
                    flash('You are now logged in', 'success')
                    return redirect(url_for('dashboard'))
                else:
                    error ='Invalid Credentials. Please try again.'
                    return render_template('login.html', error= error)
        return render_template('login.html')
    return render_template('login.html') 

def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('Unauthorized, Please Login', 'danger')
            return redirect(url_for('login'))
    return wrap

@app.route('/logout')
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('login'))

@app.route('/dashboard')
@is_logged_in
def dashboard():
    cur = mysql.connection.cursor()
    result = cur.execute("Select * from articles")
    articles = cur.fetchall()
    cur.close()
    if result >0:
        return render_template('dashboard.html', articles= articles)
    else:
        msg= "No articles found"
        return render_template('dashboard.html', msg=msg)


class ArticleForm(Form):
    title = StringField('title', [validators.Length(min=1, max=200)])
    body = TextAreaField('body', [validators.Length(min=30)])

@app.route('/add_article', methods=['GET', 'POST'])
@is_logged_in
def add_article():
    form= ArticleForm(request.form)
    if request.method == 'POST' and form.validate():
        title = form.title.data
        body = form.body.data

        cur = mysql.connection.cursor()

        cur.execute("Insert into articles(title, body, author) values (%s, %s, %s)",(title,body,session['username'])) 
        mysql.connection.commit()
        cur.close()
        flash("Article has been added","success")
        return redirect(url_for('dashboard'))
    else:
        return render_template('add_article.html', form=form)


class EditArticle(Form):
    title = StringField('title', [validators.Length(min=1, max=200)])
    body = TextAreaField('body', [validators.Length(min=30)])
@app.route('/edit_article/<string:id>/', methods=['GET', 'POST'])
def edit_article(id):
    form = EditArticle(request.form)
    if request.method=='POST':
        title = form.title.data
        body = form.body.data
        cur = mysql.connection.cursor()
        cur.execute("Update articles set title=%s, body=%s, author=%s where id=%s", (title, body, session['username'], [id]))
        mysql.connection.commit()
        cur.close()
        flash('Article updated', 'success')
        return redirect(url_for('dashboard'))
    cur = mysql.connection.cursor()
    cur.execute("Select * from articles where id =%s", [id])
    article = cur.fetchone()
    cur.close()

    form.title.data = article['title']
    form.body.data = article['body']
    return render_template('edit_article.html', form=form, )

@app.route('/deleted_article/<string:id>/')
def deleted_article(id):
    cur = mysql.connection.cursor()
    cur.execute("Delete  from articles where id=%s", [id])
    mysql.connection.commit()
    cur.close()
    flash('Article has been deleted!', 'success')
    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.secret_key = 'secret123'
    app.run(debug=True)