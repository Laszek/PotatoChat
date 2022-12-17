import * as mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

export let mongoServer;

// For mongodb-memory-server's old version (< 7) use this instead:
// const mongoServer = new MongoMemoryServer(

// Provide connection to a new in-memory database server.
export const connect = async () => {
	// NOTE: before establishing a new connection close previous
	await mongoose.disconnect();

	mongoServer = await MongoMemoryServer.create({
		instance: {
			port: 63475,
		}
	});
	mongoose.set('strictQuery', false)
	const mongoUri = await mongoServer.getUri();
	await mongoose.connect(mongoUri, err => {
		if (err) {
			console.error(err);
		}
		console.log(mongoUri);
	});
};

// Remove and close the database and server.
export const close = async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
};

// Remove all data from collections
export const clear = async () => {
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		await collections[key].deleteMany({});
	}
};
