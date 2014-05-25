/* Module Dependencies */

var express = require('express')
	,stylus = require('stylus')
	,nib = require('nib');

/* Starts express and tells it to use Jade and Stylus. */

var app = express()
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib())
}

/* Tells express that Jade will be used. States where views will be stored. */

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

/* Passes middleware(Express Logger(dev mode), Stylus(CSS preprocessor) functions for Express to use. 
In order to use nib, a custom compile function is passed to Stylus. 
Next, the Express Static middleware for serving static files from 'public'. */

app.use(express.logger('dev'))
app.use(stylus.middleware(
	{	src: __dirname + '/public'
	,	compile: compile
	}
))
app.use(express.static(__dirname + '/public'))

/* Creates a route then sets listen port. */

app.get('/', function (req, res) {
	res.render('index',
	{ title : 'Home' }
	)
})
app.listen(3000)