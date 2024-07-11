process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let snickers = {name:"snickers",price:"2.75"}
//gives item before each test
beforeEach(function(){
    items.push(snickers)
})
//clears
afterEach(function(){
    items.length = 0;
});

describe("GET /items",function(){
    test("Gets all the items in list",async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [snickers]})
    });
});

describe("POST /items",function(){
    test("Creates new item in list",async function(){
        const resp = await request(app)
        .post('/items').send({
            name:"twix",price:"2.45"
        });
        
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual(
          {item:
            {name:"twix",price:"2.45"}
          }
       );
    });
});

describe("GET /items/:name",function(){
    test("gets an item by name in url",async function(){
        const resp = await request(app).get(`/items/${snickers.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: snickers})
    });
    test("make sure 404 works if name is invalid",async function(){
        const resp = await request(app).get('/items/0');
        expect(resp.statusCode).toBe(404);
    });
});

describe("PATCH /items/:name",function(){
    test("Updates a name or price of item",async function(){
       const resp = await request(app)
       .patch(`/items/${snickers.name}`)
       .send({
        name: "snickers1",price:"2.75"
       });
       expect(resp.statusCode).toBe(200);
       expect(resp.body).toEqual({
        item: {name: "snickers1",price:"2.75"}
       });
    });
    test("make sure 404 works if name is invalid",async function(){
        const resp = await request(app).get('/items/0');
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name",function(){
    test("deletes an item from list",async function(){
        const resp = await request(app).delete(`/items/${snickers.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message:"Deleted"})
    })
})