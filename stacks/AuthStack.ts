import * as iam from "@aws-cdk/aws-iam";
import * as sst from "@serverless-stack/resources";

export default class AuthStack extends sst.Stack {
	auth;

	constructor(scope: sst.Construct, id: string, props: sst.StackProps) {
		super(scope, id, props);

		const {api, bucket} = props;

		this.auth = new sst.Auth(this, 'Auth', {
			cognito: {
				userPool: {
					signInAliases: {
						email: true,
					}
				}
			}
		});

		(this.auth as sst.Auth).attachPermissionsForAuthUsers([
			api,
			new iam.PolicyStatement({
				actions: ["s3:*"],
				effect: iam.Effect.ALLOW,
				resources: [bucket.bucketArn + '/private/${cognito-identity.amazonaws.com:sub}/*'],
			})
		])

		this.addOutputs({
			Region: scope.region,
			UserPoolId: (this.auth as sst.Auth).cognitoUserPool.userPoolId,
			IdentityPoolId: (this.auth as sst.Auth).cognitoCfnIdentityPool.ref,
			UserPoolClientId: (this.auth as sst.Auth).cognitoUserPoolClient.userPoolClientId,
		})
		
	}
}