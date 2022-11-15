import { execFile } from 'child_process';
import * as path from 'path';
// import {SecretsManager} from "aws-sdk";
//
// interface SecretCredentials {
//     username: string;
//     password: string;
//     dbname: string;
//     port: string;
// }

let counter = 0;

export const auroraMigrationRunnerHandler = async (event: any) => {

    counter++

    console.log(`COUNTER VAL: ${counter}`)

    try {
        // Available commands are:
        //   deploy: create new database if absent and apply all migrations to the existing database.
        //   reset: delete existing database, create new one, and apply all migrations. NOT for production environment.
        // If you want to add commands, please refer to: https://www.prisma.io/docs/concepts/components/prisma-migrate
        const command: string = event.command ?? "deploy";
        const schema: string = event.schema;

        let options: string[] = schema ? [`--schema=${schema}`] : [];

        if (command == "reset") {
            // skip confirmation and code generation
            options = [...options, "--force", "--skip-generate"];
        }

        process.env.DATABASE_URL = "test";

        // Currently we don't have any direct method to invoke prisma migration programmatically.
        // As a workaround, we spawn migration script as a child process and wait for its completion.
        // Please also refer to the following GitHub issue: https://github.com/prisma/prisma/issues/4703

        const fileToExecute = path.resolve("./node_modules/prisma/build/index.js")
        const commandsToExecuteFileWith = ["migrate", command].concat(options)

        return await new Promise((resolve, _) => {
            execFile(fileToExecute, commandsToExecuteFileWith, (error: any, _, stderr: string) => {
                if (error != null || stderr != null) {
                    console.log(stderr);
                    resolve({
                        success: false,
                        message: `prisma migrate ${command} exited with error ${error.message}`
                    })
                } else {
                    resolve({
                        success: true
                    })
                }
            });
        })
    } catch (err: any) {
        return {
            success: false,
            message: err.message
        }
    }
};

// const fetchConnectionUrl = async (): Promise<string> => {
//     const secretName = process.env.MIGRATION_ROLE_SECRET_NAME as string;
//     const secretCredentials = await fetchSecretValue(secretName);
//     const proxyEndpoint = process.env.RDS_PROXY_ENDPOINT;
//
//     return `postgresql://${secretCredentials.username}:${encodeURIComponent(
//         secretCredentials.password
//     )}@${proxyEndpoint}:${secretCredentials.port}/${
//         secretCredentials.dbname
//     }?schema=public&sslmode=require`;
// };
//
// const fetchSecretValue = async (
//     secretName: string
// ): Promise<SecretCredentials> => {
//     const secretsRequest = await new SecretsManager()
//         .getSecretValue({ SecretId: secretName })
//         .promise();
//     if (secretsRequest.SecretString) {
//         return JSON.parse(secretsRequest.SecretString);
//     } else {
//         throw new Error("Unable to retrieve role secret");
//     }
// };
