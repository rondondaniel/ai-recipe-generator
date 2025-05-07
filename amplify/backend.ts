import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
    "bedrockDS",
    "https://bedrock-runtime.eu-west-3.amazonaws.com",
    {
      authorizationConfig: {
        signingRegion: "eu-west-3",
        signingServiceName: "bedrock",
      },
    }
  );

  bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
    new PolicyStatement({
      resources: [
        "arn:aws:bedrock:eu-west-3::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
      ],
      actions: ["bedrock:InvokeModel"],
    })
  );
