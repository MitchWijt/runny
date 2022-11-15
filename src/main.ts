import { App, AssetStaging, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import path from 'path';
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";


export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const now = Date.now().toString();
    const commands = [
        `cp -r /prisma/ ${AssetStaging.BUNDLING_INPUT_DIR}`,
        `cp -r /node_modules/ ${AssetStaging.BUNDLING_INPUT_DIR}`,
        "./node_modules/prisma/build/index.js generate",
        `rm -rf ./node_modules/.prisma`,
        `rm -rf ./node_modules/@prisma/libquery_engine-*`,
        `rm -rf ./node_modules/@prisma/introspection-*`,
        `rm -rf ./node_modules/@prisma/prisma-*`,
        `rm -rf ./node_modules/@prisma/engines/migration-engine-darwin-arm64`,
        `rm -rf ./node_modules/@prisma/engines/migration-engine-debian-openssl-1.1.x`,
        `rm -rf ./node_modules/prisma/prisma-client`,
        `rm -rf ./node_modules/prisma/libquery_engine-linux-arm64-openssl-1.0.x.so.node`,
        `cd ./node_modules/@prisma/engines && ls -a`,
        `cp -r ${AssetStaging.BUNDLING_INPUT_DIR}/index.js ${AssetStaging.BUNDLING_OUTPUT_DIR}`,
        `cp -r ${AssetStaging.BUNDLING_INPUT_DIR}/node_modules ${AssetStaging.BUNDLING_OUTPUT_DIR}`,
        `cp -r ${AssetStaging.BUNDLING_INPUT_DIR}/prisma ${AssetStaging.BUNDLING_OUTPUT_DIR}`
    ].join(" && ");

    const migrationRunnerCode = Code.fromAsset(path.join(__dirname), {
      bundling: {
        image: Runtime.NODEJS_14_X.bundlingImage,
        volumes: [
            { hostPath: path.join(__dirname, "/myApp/prisma"), containerPath: "/prisma" },
            { hostPath: path.join(process.cwd(), 'node_modules', 'prisma'), containerPath: "/node_modules/prisma" },
            { hostPath: path.join(process.cwd(), 'node_modules', '@prisma'), containerPath: "/node_modules/@prisma" },
        ],
        command: ["bash", "-c", commands],
      },
    });

    // TODO: Check if we can stop forcing a remake of the function on every deploy now that we use Code.fromAsset
    //       which incorporates the prisma folder inside the build
    new Function(
        this,
        `AuroraMigrationRunnerLambda-${now}`,
        {
          code: migrationRunnerCode,
          handler: "index.auroraMigrationRunnerHandler",
          functionName: `migrationRunner-${now}`,
          runtime: Runtime.NODEJS_14_X,
          timeout: Duration.minutes(1),
          memorySize: 512,
        }
    );
  }
}

const app = new App();

new MyStack(app, 'migrationRunner', { });

app.synth();