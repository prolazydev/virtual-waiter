import mongoose, { InferSchemaType } from 'mongoose';

const SeedingStatusSchema = new mongoose.Schema({ 
	status: { type: String, default: 'pending', enum: [ 'pending', 'completed' ] },
	seedFor: { type: String, default: 'users', unique: true }, 
}, { timestamps: true });

export type SeedStatus = InferSchemaType<typeof SeedingStatusSchema> & mongoose.Document;
// export type SeedStatus = InferSchemaType<typeof SeedingStatusSchema>;
export const SeedingStatus = mongoose.model('Seeding_Status', SeedingStatusSchema);


// const test: SeedStatus;
