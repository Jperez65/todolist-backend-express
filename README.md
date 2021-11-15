# todolist-backend-express
Express node.js backend

## PreReqs
You'll need to update your terminal through Ubuntu LTS 18.04
```bash
sudo apt update
```

Then install node.js
```bash
sudo apt install nodejs
```

if you do not posses npm, node.js manager packager, you must install it from the following command line.

```bash
sudo apt install npm
```

## To get started
To create a new project from scatch create a folder for your project, then navigate to that project in the terminal and type the following  ubuntu command line.
```bash
npm install init
```

You must also install express by inputing this command to your ubuntu terminal.

```bash
npm install express
```

Further more you would need to install an ORM to established a database. For this project I chose the ORM called Prisma. The following code tell you how to install it globally

```bash
npm install -g prisma
```

## RESTful APIs


### Post: 

The following code represent a "post" request to a Prisma ORM

```javascript
app.post('/api/todolist/create', async (req, res) => {
    const todo = await prisma.todo.create({ data: req.body }).then(() => {
        res.send('To Do item was created');
    }).catch((error) =>{
        res.send(`An error occured: ${error.message}`);
    });
});
```
This "post" request would take in and endpoint and a anonymous function where it would contain two variable "req" and "res" then it reponse asynchronous. The function would then hold a variable called "todo" where it will create an instannce for the prisma schema to be fill by "req" variable as it contain data in json format. Furthermore, we would catch any error if creating duplicate data. 

### Get:

The following code represent a http "get" request where it will get all data store inside the database. 
```javascript
app.get("/getall/", async (req, res) => {
    const todo = await prisma.todo.findMany().catch((error) => {
        res.send(`An error occured: ${error.message}`);
    });
    res.json(todo);
  });
```
This "get" request would take in an endpoint and a asynchronous function which takes in an "req" and "res" variable, representing the response and requirement. Inside the function it would used the variable "todo" and used the "todo" schema model and finally called "findMany()" function call. After that we would response back with "res" in json format.





