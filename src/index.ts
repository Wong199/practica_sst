import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { Sequelize, DataTypes } from 'sequelize'
import { cors } from 'hono/cors'
import mysql2 from "mysql2"

const app = new Hono()
app.use('*', cors())
console.log (process.env.DATABASE_NAME)
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
// Use CORS middleware with no policy


console.log(process.env.DEV_DATABASE)
const sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule:mysql2,
    host: process.env.DEV_HOST,
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
}); // Example for SQLite, change as needed

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const futbolistas = sequelize.define('Futbolista' ,{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    posicion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

app.post('/api/futbolistas', async (c) => {
    console.log("error")
    const { name, Posicion , Numero } = await c.req.json();
    try {
        await futbolistas.sync();
        const user = await futbolistas.create({ name: name, posicion:Posicion,numero:Numero });
        return c.json({ message: 'User inserted successfully!', user });
    } catch (error) {
        console.log(error)
        const errorMessage = (error as Error).message;
        return c.json({ message: 'Failed to insert user.', error: errorMessage }, 500);
    }
});
// connect to the database
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

export const handler = handle(app)
