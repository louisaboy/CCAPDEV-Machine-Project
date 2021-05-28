const express = require(`express`);

const controller = require(`../controllers/controller`);

const app = express();

// Renders/redirects page
app.get(`/`, controller.getEntry);

app.get(`/login`, controller.getLogin);

app.get(`/register`, controller.getRegister);

app.get(`/Home`, controller.getDirectory);

app.get(`/Post`, controller.getPost);

app.get(`/Prof/:profname`, controller.getProf);

app.get(`/Personal`, controller.getPersonal);

app.get(`/Change`, controller.getChange);

app.get(`/Delete`, controller.getDelete);

app.get(`/Logout`, controller.getLogout);

app.post(`/Home`, controller.postLogin);

app.post(`/Register`, controller.postRegister);

app.post(`/Change`, controller.postChange);

app.post(`/postProf`, controller.postProf);

app.get(`/postComment`, controller.postComment);

// Doesn't render/redirect page
app.get(`/getCheckID`, controller.CheckID);

app.get(`/deleteComment`, controller.getDeleteComment);

app.get(`/editComment`, controller.getEditComment)

app.get(`/vote`, controller.getVote);

module.exports = app;