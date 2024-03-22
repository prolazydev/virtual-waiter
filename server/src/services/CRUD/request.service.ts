import { RequestModel } from '../../db/models/Request';

// POST
export const createRequest = async (request: Request) =>
	new RequestModel(request).save();

// GET
export const findAllRequests = async () => await RequestModel.find();

export const findRequestById = (id: string) => RequestModel.findById(id);
export const findRequestsByUserId = (userId: string) => RequestModel.find({ userId });
