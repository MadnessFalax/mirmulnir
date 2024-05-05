import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';
import { router as movie } from './movie.js';
import { router as review } from './review.js';
import cors from "cors";

/*
        BACKEND ENTRY POINT
        
        notes:
        - npx prisma studio                                 (for DB GUI view)
        - npx prisma migrate dev --name schema_update       (DB schema update that is named schema_update)
        - npx prisma init --datasource-provider sqlite      (prisma init)
*/

const port = 3001;
const app = express();

app.use(cors());
app.use('/movie', movie);
app.use('/review', review);

app.listen(port, () => {
    console.log(`Project app listening at http://localhost:${port}`);
});
