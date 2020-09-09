import dbConnection from "../../loaders/database";

const connection = dbConnection;

before(async () => await connection.create());
//beforeEach(async () => await connection.clear());
after(async () => await connection.close());
