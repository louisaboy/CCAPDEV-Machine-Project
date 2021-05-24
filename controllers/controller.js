const db = require(`../models/db.js`);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongodb = require(`mongodb`);

function id_check (idnumber) {
    var mult = 8;
    var sum = 0;
    var dlsu = false;
    for (var i = 0; i < idnumber.length; i++) {
        var num = parseInt(idnumber[i]);
        sum += (num * mult);
        mult--;
    }
    if (sum % 11 == 0)
        dlsu = true;
    return dlsu;
}

const controller = {
    CheckID : function(req,res)
    {
        var idNum = req.query.idNum;

        db.findOne('users', {idnum: idNum}, function (result) {
            res.send(result);
        });
    },

    // Open index.hbs
    getEntry : function(req, res) {
        if (req.session.idnum) {
            res.redirect(`/Home`);
        }

        else {
            res.render(`index`);
        }
    },
    
    // Open Login.hbs
    getLogin : function(req, res) {
        if (req.session.idnum) {
            res.redirect(`/Home`);
        }

        else {
            res.render(`Login`);
        }
    },

    // Open Register.hbs
    getRegister : function(req, res) {
        if (req.session.idnum) {
            res.redirect(`/Home`);
        }
        else {
            res.render(`Register`);
        }
    },

    getDirectory : function (req, res) { 
        if (req.session.idnum) {
            db.findMany('profs', { }, {"profName": 1}, null, function(result) {
                if (result != null) {
                    var PROF = result;
    
                    var content = {
                        idnum: req.session.idnum,
                        username : req.session.username,
                        Prof : PROF
                    }
    
                    console.log(req.session.username);
                    res.render('Directory', content);
                }
            });
        }
        else {
            res.redirect(`/login`);
        }
    },

    getPost : function (req, res) {
        if (req.session.idnum) {
            var content = {
                idnum: req.session.idnum,
                username: req.session.username,
                password: req.session.password
            };        
    
            res.render(`Post`, content);
        }
        else {
            res.redirect(`/login`);
        }
    },

    getProf : function (req, res) {
        if (req.session.idnum) {
            profname = req.params.profname;
        
            db.findOne('profs',
                    {profName : profname},
                    
                    function(result){
                        db.findMany('comments',
                        {profName : profname}, null,null,
                        function(result2){
                            console.log("======================");
                            console.log(result2);
                            
                            var tstot = 0;
                            var gstot = 0;
                            var worktot = 0;

                            var tscnt = 0;
                            var workcnt = 0;
                            var gscnt = 0;

                            for(var i = 0; i <result2.length; i++)
                            {
                                if (!isNaN(result2[i].ts)){
                                    tstot += result2[i].ts;
                                    tscnt += 1;    
                                }
                                if (!isNaN(result2[i].gs)){
                                    gstot += result2[i].gs;
                                    gscnt += 1;    
                                }
                                if (!isNaN(result2[i].work)){
                                    worktot += result2[i].work;
                                    workcnt += 1;    
                                }
                                
                            }
                            // if (tscnt == 0) tscnt =1;
                            // if (gscnt == 0) gscnt = 1;
                            // if (workcnt == 0) workcnt =1;

                            var content = {
                                idnum: req.session.idnum,
                                username : req.session.username,
                                Prof : result,
                                comments : result2,
                                ts_rating : (tstot/tscnt).toFixed(2),
                                gs_rating : (gstot/gscnt).toFixed(2),
                                wl_rating : (worktot/workcnt).toFixed(2),
                                tscnt : tscnt,
                                gscnt : gscnt,
                                workcnt : workcnt
                            }

                            res.render(`Prof`, content);   
                        })

                    });
        }
        else {
            res.redirect(`/login`);
        }
    },

    getPersonal : function (req, res) {
        if (req.session.idnum) {
            db.findMany('comments',{posterID : req.session.idnum},null,null,function(result){
                console.log(result);
                res.render(`Personal`, {
                    idnum: req.session.idnum,
                    username: req.session.username,
                    password: req.session.password,
                    comments : result
                });
                
            });
        }
        else {
            res.redirect(`/login`);
        }
    },
    
    getChange : function (req, res) {
        if (req.session.idnum) {
            var content = {
                idnum: req.session.idnum,
                username: req.session.username,
                password: req.session.password
            }
    
            res.render(`Change`, content);
        }
        else {
            res.redirect(`/login`);
        }
    },
    
    // Delete user account
    getDelete : function (req, res) {
        try {
            db.deleteOne(`users`, {"idnum" : req.session.idnum});
            db.deleteMany('comments',{"posterID" : req.session.idnum});
            res.render(`Login`);
        } catch (e) {
            console.log(e);
            res.redirect(`/login`);
        }
    },

    getLogout : function (req, res) {
        req.session.destroy(function (err) {
            if (err) throw err;
            
            res.redirect(`/`);
        });
    },

    // Delete comment
    getDeleteComment : function (req, res) {
        if (req.session.idnum) {
            var _id = new mongodb.ObjectID(req.query._id);
            db.deleteOne(`comments`, {_id: _id, posterID: req.session.idnum, comment: req.query.comment});
        }
        else {
            res.redirect(`/login`);
        }
    },

    // Update comment
    getEditComment : function (req, res) {
        if (req.session.idnum) {
            db.updateOne(`comments`, {posterID: req.session.idnum, comment: req.query.oldComment}, {$set: {comment: req.query.newComment}});
        }
        else {
            res.redirect(`/login`);
        }
    },

    // Voting system (Upvote/Downvote)
    getVote : function (req, res) {
        var _id = new mongodb.ObjectID(req.query._id);  // Get _id

        // Get updaters
        var addUp = req.query.addUp;
        var addDown = req.query.addDown;
        var remUp = req.query.remUp;
        var remDown = req.query.remDown;

        db.findOne(`comments`, {_id: _id}, function (result) {
            var upvote = result.upvote;
            var downvote = result.downvote;

            // Get upvote & downvote
            var upContent = {
                up: upvote.up,
                arrID: upvote.arrID
            }
            var downContent = {
                down: downvote.down,
                arrID: downvote.arrID
            }

            // Update
            if (addUp == "true") {
                upContent.up = upContent.up + 1;
                upContent.arrID.push(req.session.idnum);
            }
            if (addDown == "true") {
                downContent.down = downContent.down + 1;
                downContent.arrID.push(req.session.idnum);
            }
            if (remUp == "true") {
                if (upContent.up > 0)
                {
                    upContent.up = upContent.up - 1;
                    var index = (upContent.arrID).indexOf(req.session.idnum);
                    if (index > -1) {
                        (upContent.arrID).splice(index, 1);
                    }
                }
            }
            if (remDown == "true") {
                if (downContent.down > 0)
                {  
                    downContent.down = downContent.down - 1;
                    var index = (downContent.arrID).indexOf(req.session.idnum);
                    if (index > -1) {
                        (downContent.arrID).splice(index, 1);
                    }
                }
            }

            db.updateOne(`comments`, {_id: _id}, {$set: {upvote: upContent, downvote: downContent}}); // Push update to database
        });
    },

    // Login procedure
    postLogin : function(req, res) {
        var idnum = req.body.idnum;
        var password = req.body.password;

        db.findOne(`users`, {idnum: idnum}, function (result) {
            if (result) {
                // password checking
                bcrypt.compare(password, result.password, function (err, equal) {
                    if (equal) {
                        req.session.idnum = result.idnum;
                        req.session.username = result.username;
                        req.session.password = result.password;

                        console.log(`You have successfully logged in ` + result.username);
                        res.redirect(`/Home`);
                    }
                    else {
                        console.log(`Invalid credentials`);
                        res.render(`Login`);
                    }
                });
            }
            else {
                console.log(`Invalid credentials`);
                var content =
                {
                    error:"Invalid Credentials"
                }
                res.render(`Login`,content);
            }
        });
    },

    // Register procedure
    postRegister : function(req, res) {
        var idnum = req.body.idnum;
        var username = req.body.username;
        var password = req.body.password;

        if (id_check(idnum)) { // if id is legit
            db.findOne(`users`, {"idnum": idnum}, function (result) {
                if (result != null) {
                    console.log(`Invalid credentials.`); 
                    res.redirect(`/Register`);
                }
                else {
                    // password hashing
                    bcrypt.hash(password, saltRounds, function(err, hash) {

                        var person = {
                            idnum: idnum,
                            username: username,
                            password: hash
                        }
        
                        db.insertOne(`users`, person);
                        console.log(`You have been successfully registered, ` + username);
                        res.redirect(`/Login`);
                    });
                }
            });
        }
        else { // if id is not legit
            console.log(`Invalid credentials.`); 
            res.redirect(`/Register`);
        }
    },

    // Update account details
    postChange : function (req, res) {
        var oldPass = req.body.oldPass;
        var newUser = req.body.newUser;
        var newPass = req.body.newPass;

        var old = {
            idnum: req.session.idnum,
            username: req.session.username,
            password: req.session.password
        }
    
        db.findOne(`users`, old, function (result) {
            if (result) {
                // Password checking
                bcrypt.compare(oldPass, result.password, function (err, equal) {
                    if (equal) {
                        bcrypt.hash(newPass, saltRounds, function(err, hash) {
                            req.session.username = newUser;
                            req.session.password = hash;

                            db.updateOne(`users`, {idnum: req.session.idnum}, {$set: {username: newUser, password: hash}});
                            res.redirect(`/Personal`);
                        });
                    }
                    else {
                        console.log(`Invalid credentials`);
                        res.render(`Login`);
                    }
                });
            }
            else {
                console.log("Invalid credentials.");
                res.render(`Change`, old);
            }
        });
    },

    postProf : function (req, res) {
        var profName = req.body.profName;
        var college = req.body.college;
        var ts = parseInt(req.body.ts);
        var work = parseInt(req.body.work);
        var gs = parseInt(req.body.gs);
        var comment = req.body.comment;
        var anon = req.body.anon;

        var prof_item = {
            profName: profName,
            college: college
        }

        var objUp = {
            up: 0,
            arrID: []
        }

        var objDown = {
            down: 0,
            arrID: []
        }

        var comment_item = {
            profName: profName,
            posterID: req.session.idnum,
            ts: ts,
            work: work,
            gs: gs,
            comment: comment,
            anon: anon,
            upvote: objUp,
            downvote: objDown
        }

        console.log(prof_item);
        console.log(comment_item);
    
        db.insertOne(`profs`, prof_item);
        console.log(`You have successfully posted prof: ` + profName);
    
        db.insertOne(`comments`, comment_item);
        console.log(`Added 1 comment in database.`);
    
        setTimeout(function () {
            res.redirect(`/Home`);
        }, 1000);
    },

    postComment : function (req, res) {
        var profName = req.query.profName;
        var ts = parseInt(req.query.ts);
        var work = parseInt(req.query.work);
        var gs = parseInt(req.query.gs);
        var comment = req.query.comment;
        var anon = req.query.anon;
        var content;

        var objUp = {
            up: 0,
            arrID: []
        }

        var objDown = {
            down: 0,
            arrID: []
        }

        var comment_item = {
            profName: profName,
            posterID: req.session.idnum,
            ts: ts,
            work: work,
            gs: gs,
            comment: comment,
            anon: anon,
            upvote: objUp,
            downvote: objDown
        }

        db.insertOne(`comments`, comment_item);
        db.findOne('comments', comment_item, function (result) { 
            content = {
                _id: result._id,
                profName: profName,
                posterID: req.session.idnum,
                ts: ts,
                work: work,
                gs: gs,
                comment: comment,
                anon: anon,
                upvote: objUp,
                downvote: objDown
            };

            res.render("partials\\Comment_Prof.hbs", content, function(err,html) {
                res.send(html);
                console.log(`Added 1 comment in database.`);
            });
        });
    }
}

module.exports = controller; 