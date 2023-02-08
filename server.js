const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Article = require('./models/article')
const articleRouter = require('./routes/article')
const methodOverride = require('method-override');
const port = 3000

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/blog')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req,res) => {
    const article = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', {articles: article})
})

app.use('/articles', articleRouter)

app.listen(port)