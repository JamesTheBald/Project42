const port = require("../tail-react-app/src/components/misc.js");


var somePostings = [          // just some data in an array
    {
        id: 1,
        content: 'Get familiar with JS functions and objects before learning React'
    },
    {
        id: 2,
        content: 'The e-book "Refactoring UI" is an excellent, concise intro to UI graphic design'
    },
    {
        id: 3,
        content: 'Take the time to read instructions and error messages carefully'
    }
]

const express = require('express')
const cors=require('cors')                // cors helps us call from other websites.. e.g. to run from 127.0.0.1 instead of localhost
const app = express()                     // create the express app, called app
app.use(express.json());                  // handles reading json, which we need for set posts
app.use(cors());                          // open cors policy... allows us to use either http://localhost or http://127.0.0.1
app.use(express.static('../frontend'))    // serve up our files from the server instead of using the files... html is in ../frontend

const portNum = 8082;
const server = app.listen(portNum, function(){        //J: We need to add backup port and error handling
    let portActual = server.address().port
    console.log(`Helpful Posting Server started`)
    console.log(`Intended port number =`, portNum)
    console.log(`Actual port number = ${portActual}`)
})

app.get('/postings', function(req, res){              // get all postings (postings is plural and we just return the data)
    res.send(somePostings)
})

app.post('/postings', function(req, res){                             // not idempotent: will create a new posting each time it's called
    const newId = somePostings.reduce((max, cur)=> max>cur.id?max:cur.id, 1)+1    // spicy! get the next id with an aggregator... spicy!
    const newPosting= {id: newId, title: req.body.newPosting}         // create the posting
    somePostings.push(newPosting)                                     // put the posting in our data array
    res.send(newPosting)                                              // return the new posting
})

app.get('/posting', function(req, res){                                   // get a specific posting
    const postingNumber = req.query.postingNumber                           // get the posting id from the request query
    const posting = somePostings.find(posting => posting.id == postingNumber)     // spicy? find the posting in our data with that id
    res.send(posting)                                                     // return the posting
})

app.put('/posting', function(req, res){                                           
    const postingNumber = req.query.postingNumber                           // get the posting number (id) from the query
    const postingIndex = somePostings.findIndex(posting => posting.id == postingNumber)   
           // find the index that matches the id ... this should be related to the id for this code, but if the delete endpoint completely removed records then it could change. Best to be safe
    somePostings[postingIndex] = req.body                                   // change the data at the correct index  
    const newPosting = somePostings[postingIndex]                           // get the data out of the array ... it probably matches the data in req.body but probably best to return the real data that we are keeping
    res.send(newPosting)                                                     
})

app.patch('/posting', function(req, res){                                 // update an posting by patching it
    const postingNumber = req.query.postingNumber                           // get the posting number (id) from the query
    const posting = somePostings.find(posting => posting.id == postingNumber)     // spicy? find the posting
    Object.assign(posting, req.body)                                      // spicy! update the posting with Object.assing (look it up, it's helpful but basically a patch)
    res.send(posting)                                                     // return the posting
})

// I went with soft-delete here because it's easier to debug. You could just remove the
// posting from the array and redirect back to the main page
// But, it might be confusing if it didn't delete properly. So soft delete is nice
// Remember: you are in charge of what your server does. You could make another choice in your project
//           you'd just need slightly different server implementation
app.delete('/posting', function(req, res){                                  // delete an posting
    const postingNumber = req.query.postingNumber                           // get the posting number (id) from the query
    const posting = somePostings.find(posting => posting.id == postingNumber)     // get the posting
    posting.state = 'Deleted'                                               // soft delete the posting. Soft delete marks it so it won't get confused as an active posting, but keeps it in the database
    res.send(posting)                                                       // we return the soft-deleted posting, so that we can show the operator that the posting is deleted.
})                                          

