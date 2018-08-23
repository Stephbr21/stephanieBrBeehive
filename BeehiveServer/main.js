//console.log('pls work');

//Dependencias
var http = require('http'); //Así se importa un módulo de Node
var url = require('url');
var fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

//Variables
var port = 3000;
var localhost = 'localhost';


var server = http.createServer((request, response) => { //arrow function
    var parseUrl = url.parse(request.url, true);
    //console.log(parseUrl);
    var path = parseUrl.pathname;
    path = path.replace(/^\/+|\/+$/g, '');
    var method = request.method;

    var query = parseUrl.query;
    var headers = request.headers;

    switch (path) {
        case 'users':
            switch (method) {
                case 'OPTIONS':
                    respondToOptions(request, response);
                    break;
                case 'GET':
                    getUsers(request, response);
                    break;
                default:
                    send404(request, response);
                    break;
            }
            break;
        case 'posts':
            switch (method) {
                case 'OPTIONS':
                    respondToOptions(request, response);
                    break;
                case 'GET':
                    getPosts(request, response);
                    break;
                case 'POST':
                    postPosts(request, response);
                    break;
                case 'DELETE':
                    deletePosts(request, response);
                break;
                default:
                    send404(request, response);
                    break;
            }
            break;
        case 'comments':
            switch (method) {
                case 'OPTIONS':
                    respondToOptions(request, response);
                    break;
                case 'GET':
                    getComments(request, response);
                    break;
                case 'POST':
                    postComments(request, response);
                    break;
                default:
                    send404(request, response);
                    break;
            }
            break;
        case 'todos':
            switch (method) {
                case 'OPTIONS':
                    respondToOptions(request, response);
                    break;
                case 'GET':
                    getTodos(request, response);
                    break;
                case 'POST':
                    postTodos(request, response);
                    break;
                case 'PATCH':
                    patchTodos(request, response);
                    break;
                default:
                    send404(request, response);
                    break;
            }
            break;
        default:
            send404(request, response);
            break;
    }

});


server.listen(port, localhost, function () {
    console.log('El servidor está corriendo :3');
});

// LOADING ...
function loadPosts() {
    return new Promise(loadPostsPromiseExecuter);
}

function loadUsers() {
    return new Promise(loadUsersPromiseExecuter);
}

function loadComments() {
    return new Promise(loadCommentsPromiseExecuter);
}

function loadTodos() {
    return new Promise(loadTodosPromiseExecuter);
}

// PROMISES
function loadPostsPromiseExecuter(resolve, reject) {
    fs.readFile(path.resolve(process.cwd(), './data/posts.json'), function (err, data) {
        if (err) {
            reject();
        } else {
            var posts = JSON.parse(data);
            resolve(posts);
        }
    });
}

function loadUsersPromiseExecuter(resolve, reject) {
    fs.readFile(path.resolve(process.cwd(), './data/users.json'), function (err, data) {
        if (err) {
            reject();
        } else {
            var users = JSON.parse(data);
            resolve(users);
        }
    });
}

function loadCommentsPromiseExecuter(resolve, reject) {
    fs.readFile(path.resolve(process.cwd(), './data/comments.json'), function (err, data) {
        if (err) {
            reject();
        } else {
            var comments = JSON.parse(data);
            resolve(comments);
        }
    });
}

function loadTodosPromiseExecuter(resolve, reject) {
    fs.readFile(path.resolve(process.cwd(), './data/todos.json'), function (err, data) {
        if (err) {
            reject();
        } else {
            var todos = JSON.parse(data);
            resolve(todos);
        }
    });
}

// GET
function getUsers(request, response) {
    setResponseHeaders(request, response);
    loadUsers().then(function (users) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(users));
        response.end();
    }).catch(function () {
        send404(request, response)
    });
}


function getPosts(request, response) {
    setResponseHeaders(request, response);
    loadPosts().then(function (posts) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(posts));
        response.end();
    }).catch(function () {
        send404(request, response)
    });
}

function getComments(request, response) {
    setResponseHeaders(request, response);
    loadComments().then(function (comments) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(comments));
        response.end();
    }).catch(function () {
        send404(request, response)
    });
}

function getTodos(request, response) {
    setResponseHeaders(request, response);
    loadTodos().then(function (todos) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(todos));
        response.end();
    }).catch(function () {
        send404(request, response)
    });
}


// POST POST

function savePosts(posts) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.resolve(process.cwd(), './data/posts.json'), JSON.stringify(posts), function (err) {
            if (err) {

            } else {
                resolve();
            }
        })
    });
}

function postPosts(request, response) {
    setResponseHeaders(request, response);
    let buffer = [];
    let post = null;

    request.on('data', function (chunk) {
        buffer.push(chunk);
    });

    request.on('end', function () {
        buffer = Buffer.concat(buffer).toString();
        post = JSON.parse(buffer);

        loadPosts().then(function (posts) {
            posts.unshift(post);            
            savePosts(posts).then(function () {
                response.writeHead(200);
                response.end();
            }).catch(function () {
                send404(request, response);
            });
        }).catch(function () {
            send404(request, response);
        });

    });
}

// POST COMMENTS
function saveComments(comments) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.resolve(process.cwd(), './data/comments.json'), JSON.stringify(comments), function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}

function postComments(request, response) {
    setResponseHeaders(request, response);
    let buffer = [];
    let comment = null;

    request.on('data', function (chunk) {
        buffer.push(chunk);        
    });

    request.on('end', function () {
        buffer = Buffer.concat(buffer).toString();
        comment = JSON.parse(buffer);
    
        loadComments().then(function (comments) {
            comments.unshift(comment);            
            saveComments(comments).then(function () {                                
                response.writeHead(200);
                response.end();
            }).catch(function () {
                send404(request, response);
            });
        }).catch(function () {
            send404(request, response);
        });

    });
}

// POST TODOS
function saveTodos(todos) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path.resolve(process.cwd(), './data/todos.json'), JSON.stringify(todos), function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}

function postTodos(request, response) {
    setResponseHeaders(request, response);
    let buffer = [];
    let todo = null;

    request.on('data', function (chunk) {
        buffer.push(chunk);        
    });

    request.on('end', function () {
        buffer = Buffer.concat(buffer).toString();
        todo = JSON.parse(buffer);
    
        loadTodos().then(function (todos) {
            todos.unshift(todo);            
            saveTodos(todos).then(function () {                                
                response.writeHead(200);
                response.end();
            }).catch(function () {
                send404(request, response);
            });
        }).catch(function () {
            send404(request, response);
        });

    });
}

// UPDATE TODOS

function patchTodos(request, response) {
    setResponseHeaders(request, response);

    let buffer = [];
    let todo = null;

    request.on('data', function (chunk) {
        buffer.push(chunk);
    });

    request.on('end', function () {
        buffer = Buffer.concat(buffer).toString();
        todo = JSON.parse(buffer);
        // console.log(todo);
        
        loadTodos().then(function (todos) {
            for (const element of todos) {
                // console.log(element);
                if (element.id == todo.id) {
            		element.completed = true;
            		break;
                }
            }
            saveTodos(todos).then(function () {
                response.writeHead(200);
                response.end();
            }).catch(function () {
                send404(request, response);
            });

        });
    });
}

// DELETE TODOS
function deletePosts(request, response,id){
    setResponseHeaders(request, response, id);

    loadPosts().then(function (posts) {
        for (const element of posts) {
            if (element.id == post.id) {
                delete posts[id];
                console.log(posts[id]);
                
                break;
            }
        }
        savePosts(posts).then(function () {
            response.writeHead(200);
            response.end();
        }).catch(function () {
            send404(request, response);
        });
    }).catch(function () {
        send404(request, response);
    });
}

// OTHERS
function respondToOptions(request, response) {
    setResponseHeaders(request, response);
    response.writeHead(200);
    response.end();
}

function setResponseHeaders(request, response) {

    var origin = '*';
    if (request.headers['origin']) {
        origin = request.headers['origin'];
    }

    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    if (request.headers['content-type']) {
        response.setHeader('Content-Type', request.headers['content-type'])
    }
    response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Methods, Content-Type');
}

function send404(request, response) {
    setResponseHeaders(request, response);
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end();
}

