export enum EInputValidation {
	Empty = 0,
	Valid = 1,
	Invalid = 2,
	Taken = 3,
}

export type InputValidity = keyof typeof EInputValidation;

export enum ERequestStatus {
	Idle = 0,
	Loading = 1,
	Success = 2,
	Error = 3,
	Expired = 4,
	Forbidden = 5,
	Unauthorized = 6,
}

export type RequestStatus = keyof typeof ERequestStatus;