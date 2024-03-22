enum CrudMessages {
	SuccessCreate = 'Successfully created',
	SuccessRead = 'Successfully retrieved',
	SuccessUpdate = 'Successfully updated',
	SuccessDelete = 'Successfully deleted',
	
	ErrorCreate = 'Error while creating',
	ErrorRead = 'Error while retrieving',
	ErrorUpdate = 'Error while updating',
	ErrorDelete = 'Error while deleting',	
}

enum CommonMessage {
	NotFound = 'Not found',
	/**
	 * User needs to be logged in to access this resource
	 */
	NotAuthenticated = 'User needs to be logged in to access this resource',
	/**
	 * User is not authorized to access this resource
	 */
	NotAuthorized = 'User is not authorized to access this resource',
	AlreadyExists = 'User already exists',
	InvalidInput = 'Invalid input data',
	InvalidCredentials = 'Invalid credentials',
	MissingCredentials = 'Missing credentials',

	DatabaseError = 'Database error',
	/**
	 * Internal server error
	 */
	ServerError = 'Internal server error',

	UsernameAvailable = 'Username available',
	UsernameUnavailable = 'Username unavailable',
	
}

enum JWTMessages {
	// JWTExpired = 'JWT expired',
	// JWTInvalid = 'JWT invalid',
	// JWTMissing = 'JWT missing',
	/**
	 * An error occurred while processing the JWT token. Please try again later.
	 */
	JWTError = 'An error occurred while processing the JWT token. Please try again later.',
	/**
	 * Token is invalid or has expired!
	 */
	JWTTokenError = 'Token is invalid or has expired!',
}

enum AuthMessages {
	SuccessLogin = 'Successfully logged in',
	/**
	 * Account Confirmation Token is invalid or has expired! Please request a new confirmation email.
	 */
	AccountConfirmationError = 'Account Confirmation Token is invalid or has expired! Please request a new confirmation email.',
}

enum MailMessages {
	MailSuccessSend = 'Successfully sent mail',
	MailErrorSend = 'Error while sending mail',
	/**
	 * An error occurred while sending the password reset email. Please try again later.
	 */
	EmailPasswordResetError = 'An error occurred while sending the password reset email. Please try again later.',
	/**
	 * An email has been sent to the provided email address with the password reset link.
	 */
	EmailPasswordSend = 'An email has been sent to the provided email address with the password reset link.',
}

export const Message = {
	...CrudMessages,
	...CommonMessage,
	...JWTMessages,
	...AuthMessages,
	...MailMessages,
};