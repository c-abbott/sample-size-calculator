from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello, World!"}


@app.post("/")
async def post():
    return {"message": "hello from the post route"}


@app.put("/")
async def put():
    return {"message": "hello from the put route"}


@app.get("/items")
async def get_items():
    return {"message": "items"}


@app.get("/items/{item_id}")
async def get_item(item_id: int):
    return {"item_id": {item_id}}
