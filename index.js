import express, { request } from 'express';
import PrismaClient from '@prisma/client'
import cors from 'cors';


const prisma = new PrismaClient.PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

// Event Listeners 
process.on('uncaughtException', (error, origin) => {
    console.log('uncauht exception');
    console.log(error);
    console.log('exception origin');
    console.log(origin);
    console.log( `app is listening http://localhost:${port}`);
});

process.on('unhandledRejection', (reason, promised) => {
    console.log('Unhandled Rejection at ');
    console.log(promise);
    console.log('Reason');
    console.log(reason);
    console.log( `app is listening http://localhost:${port}`);
});

app.get('/', (req, res)=> {
    res.send('todolist application is running ');
});

app.get("/getall/", async (req, res) => {
    const todo = await prisma.todo.findMany().catch((error) => {
        res.send(`An error occured: ${error.message}`);
    });
    res.json(todo);
  });

app.post('/api/todolist/create', async (req, res) => {
    const todo = await prisma.todo.create({ data: req.body }).then(() => {
        res.send('To Do item was created');
    }).catch((error) =>{
        res.send(`An error occured: ${error.message}`);
    });
});

app.delete('/api/todolist/delete/:name', async (req, res)=>{
    const deleteUser = await prisma.todo.delete({
        where: {
          name: req.params.name,
        },
    }).then(() => {
        res.send(`To Do item ${req.params.name} is deleted`);
    }).catch((error) => {
        res.send(`An error occured: ${error.message}`);;
    });
});

app.listen(port, () => {
    console.log( `app is listening http://localhost:${port}`);
});