import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dotenv from "dotenv";

dotenv.config();

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dockerFunc = new lambda.DockerImageFunction(this, "DockerFunc", {
      code: lambda.DockerImageCode.fromImageAsset("../api"),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10),
      architecture: lambda.Architecture.ARM_64,
      environment: {
        OPENAI_MODEL: process.env.OPENAI_MODEL ?? "",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
      },
    });

    const brandyApi = new apiGateway.RestApi(this, "RestApi", {
      restApiName: "BrandyAPI",
    });

    brandyApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(dockerFunc),
    });

    // const functionUrl = dockerFunc.addFunctionUrl({
    //   authType: lambda.FunctionUrlAuthType.NONE,
    //   cors: {
    //     allowedMethods: [lambda.HttpMethod.ALL],
    //     allowedHeaders: ["*"],
    //     allowedOrigins: ["*"],
    //   },
    // });

    // new cdk.CfnOutput(this, "FunctionUrlValue", {
    //   value: functionUrl.url,
    // });
  }
}
