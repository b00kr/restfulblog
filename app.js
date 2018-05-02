//DECLARE DEPENDANCIES
var express     = require ('express'),
    bodyParser  = require ('body-parser'),
    mongoose    = require ('mongoose');

//BIND EXPRESS TO AN EASY TO USE VARIABLE
var app = express();

//CONFIGURE MONGOOSE TO CONNECT TO MONGODB.  CREATES DB ON FIRST CONNECT AND GOES BACK TO IT AFTERWARDS
mongoose.connect('mongodb://localhost/restful_blog_app');

//APP CONFIG.  CUT PASTE INTO SIMILAR APPS
    app.set('view engine', 'ejs'); //this line allows us to not use the .ejs extention when refering to .ejs files.
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE CONFIG.  MAKE THE SCHEMA AND COMPILE IT INTO A MODEL
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

//RESTFUL ROUTES

//HOME PAGE - REROUTES TO INDEX
app.get('/', function(req,res){
  res.redirect('/blogs');
});

//INDEX - DISPLAY ALL ENTRIES IN DB
app.get("/blogs", function(req,res){
  Blog.find({}, function(err, blogs){
    if (err) {
      console.log('error');
    } else {
      res.render('index', {blogs: blogs});
    };
  });
});



//DECLARE LISTENING PORT, CONFIRM SERVER IS UP AND RUNNING IN CONSOLE
app.listen(3000, function(){
  console.log('SERVER IS RUNNING');
});
