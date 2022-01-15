import * as sst from '@serverless-stack/resources'

export default class StorageStack extends sst.Stack {
	// Public reference to the table
	// allows us to reference this in other stacks
	bucket;
	table;

	constructor(scope: sst.Construct, id: string, props?: sst.StackProps) {
		super(scope, id, props);

		this.table = new sst.Table(this, 'Notes', {
			fields: {
				userId: sst.TableFieldType.STRING,
				noteId: sst.TableFieldType.STRING,
			},
			primaryIndex: {partitionKey: "userId", sortKey: "noteId"},
		});

		this.bucket = new sst.Bucket(this, "Uploads", {
			s3Bucket: {
				cors: [
					{
						maxAge: 3000,
						allowedOrigins: ["*"],
						allowedHeaders: ["*"],
						allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
					}
				]
			}
		});
	}
	
	
}