const http = require('http');
const test = require('ava');
const got = require('got');
const app = require("../index.js")

test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

async function checks_for_body(t, body, statusCode) {
    t.truthy(body, "Body exists")
    t.is(body.id, 0, "Body id exists")
    t.is(body.name, "name", "Body name exists")
    t.is(statusCode, 200, "Status Code is 200")
}


test("GET Author", async (t) => {
    const authorsId = 0
	const { body, statusCode } = await t.context.got.get(`authors/${authorsId}`);
    //console.log(body)
    //console.log(statusCode)
    //checks_for_body(t, body, statusCode);
    t.is(body.message, undefined);
	t.is(statusCode, 200);
});
test("DELETE Author", async (t) => {
    const authorsId = 0
	const { body, statusCode } = await t.context.got.delete(`authors/${authorsId}`);
    console.log(body)
	// t.is(body.message, "It works!");
	t.is(statusCode, 200);
});
test("PUT Author", async (t) => {
    const authorsId = 0
    const requestBody = {
        name : "lala"
    }
	const { body, statusCode } = await t.context.got.put(`authors/${authorsId}`, {json : requestBody});

    t.is(body.name, "name", "Body name exists")
    t.is(body.id, 0, "Body id exists")
	t.is(statusCode, 200);
});

test("GET Authors", async (t) => {

	const { body, statusCode } = await t.context.got.get(`authors`);
    //console.log(statusCode)
    t.truthy(body, "Body exists")
    t.is(body[1].id, 0, "Body id exists")
    t.is(body[1].name, "name", "Body name exists")
    t.is(statusCode, 200, "Status Code is 200")
	// t.is(body.message, "It works!");
	// t.is(statusCode, 200);
});

test("POST Author", async (t) => {
    const requestBody = {
        name : "lala"
    }
	const { body, statusCode } = await t.context.got.post(`authors`, {json : requestBody});
    t.truthy(body, "Body exists")
    t.is(body.name, "name", "Body name exists")
	t.is(statusCode, 200);
    t.is(body.id, 0, "Body id exists")
});

test("DELETE Book", async (t) => {
    const bookId = 0
	const { statusCode } = await t.context.got.delete(`books/${bookId}`);
	// t.is(body.message, "It works!");
	t.is(statusCode, 200);
    
});
test("GET Book", async (t) => {
    const bookId = 0
	const { body, statusCode } = await t.context.got.get(`books/${bookId}`);
    //console.log(body)
    //console.log(statusCode)
    t.truthy(body, "Body exists")
    t.is(body.id, 0, "Body id exists")
    t.is(body.category_id, 1, "Body name exists")
    t.is(statusCode, 200, "Status Code is 200")
	// t.is(body.message, "It works!");
	// t.is(statusCode, 200);
});

test("PUT Book", async (t) => {
    const bookId = 0
    const requestBody = {
        "category_id" : 1,
        "published_year" : 5,
        "id" : 0,
        "title" : "title",
        "author_id" : 6
    }
	const { body, statusCode } = await t.context.got.put(`books/${bookId}`, {json : requestBody});
    t.truthy(body, "Body exists")
    t.is(body.category_id, 1, "Body name exists")
    t.is(body.id, 0, "Body id exists")
	t.is(statusCode, 200);
});

test("GET Books", async (t) => {

	const { body, statusCode } = await t.context.got.get(`books`);
    //console.log(statusCode)
    t.truthy(body, "Body exists")
    t.is(body[1].id, 0, "Body id exists")
    t.is(body[1].category_id, 1, "Category id exists")
    t.is(statusCode, 200, "Status Code is 200")
	// t.is(body.message, "It works!");
	// t.is(statusCode, 200);
});