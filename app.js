const express = require('express');
const pool = require('./database')
const app = express();
const bp = require('body-parser')

app.set('view engine', 'ejs');

app.listen(3000,() => {
    console.log("Server is listening to port 3000")
});

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(__dirname + '/public'));

app.get('/', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM postsinfo ORDER BY id DESC "
        );
        let post = posts.rows;
        res.render('posts',{post:post});
    } catch (err){
        console.error(err.message);
    }
});
app.get('/addnewpost',(req,res) => {
    res.render('addnewpost')
});
app.get('/singlepost/:id', async(req, res) => {
    try {
        console.log("get a post request has arrived");
        const {id} = req.params;
        const posts = await pool.query(
            "SELECT * FROM postsinfo WHERE id =$1", [id]);
        let post = posts.rows[0];
        res.render('singlepost',{post:post});
    } catch (err) {
        console.error(err.message);
    }

});

app.delete('/:id', async(req, res) => {
    try {
        console.log("delete a post request has arrived")
        const { id } = req.params;
        const post = req.body;
        const deletepost = await pool.query("DELETE FROM postsinfo WHERE id = $1", [id]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/addnewpost/', async(req, res) => {

    try {
        console.log("a post request has arrived");
        const post = req.body;
        console.log(post)
        const newpost = await pool.query(
            `INSERT INTO postsinfo(username,description,image,date) values ($1,$2,$3,current_date) RETURNING*`,[
                post.username,post.description,post.image
            ]
    );
        res.redirect("/")

    } catch (err) {
        console.error(err.message);
    }
});


app.use((req, res) => {
    res.status(404).render('404');
});