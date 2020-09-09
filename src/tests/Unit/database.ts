import dbConnection from "../../dbConnnection";

const connection = dbConnection;

before(async () => await connection.create());

after(async () => await connection.close());
