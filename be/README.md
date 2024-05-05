## Our backend API

### Before running the server for the first time

In order to run the application, you need to setup DB correctly. You will need to run either Terminal on Unix system or PowerShell on Windows system (cmd.exe is not compatible with Unix cmdlets).
To do so, do the following when inside the folder named "be":

-   make sure you have navigated into "be" folder
-   run command `npm i`
-   run command `npm run prisma_init` that will setup prisma (you might be prompted to install latest prisma version)
-   now delete file ./prisma/schema.prisma manually or run `rm ./prisma/schema.prisma` using terminal or powershell
-   copy schema from ../schema.prisma into ./prisma/ manually or run `cp ../schema.prisma ./prisma/`
-   run `npm run schema_update` which should create DB file with corresponding schema

Note: this procedure has only been tested on Windows PowerShell, but should function on Unix Terminal too, as it utilizes Unix Terminal commands. PowerShell translates these into PowerShell cmd-lets using default aliases (sign of superiority).

### Mock DB

We have created mock-db.js script that should add mock data into our database. Same sample data were used during our app testing. In order to add these data into you DB run `npm run mock_db`.

### Running server application

In order to run server application run command `npm run start`.
