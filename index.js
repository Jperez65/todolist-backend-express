import express, { request } from 'express';
import PrismaClient from '@prisma/client'


const prisma = new PrismaClient.PrismaClient();

const app = express();
app.use(express.json());
const port = process.env.PORT;


app.get('/', (req, res)=> {
    res.send('todolist application is running ');
});

app.get("/getall/", async (req, res) => {
    const job = await prisma.todo.findMany().catch((error)=>{
        console.log(error);
        res.send(error);
    });
    res.json(job);
    res.send('Get all have been fetched')
  });

app.post('/api/todolist/create', async (req, res) => {
    const todo = await prisma.todo.create({ data: req.body }).catch((error) =>{
        console.log(error);
        res.send(error);
    });
    res.send('To Do item was created');
});



app.delete('/api/todolist/delete/:id', async (req, res)=>{
    const deleteUser = await prisma.todo.delete({
        where: {
          id: parseInt(req.params.id),
        },
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
    res.send(`To Do item ${req.params.id}`);
});

app.listen(port, () => {
    console.log( `app is listening http://localhost:${port}`);
});