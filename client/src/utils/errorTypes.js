import { BaseError } from 'make-error'

export class ApiError extends BaseError {
	constructor(cause = {}, filename) {
		const { config = {}, response = {} } = cause
		const { url = 'unknown url', method, params } = config
		const { status, data } = response
		const extendedMessage = `${method} ${url} results with ${status}`
		
		super(extendedMessage, filename)
		this.response = response
		this.arguments = params
		this.responseBody = data
		this.fingerprint = ['ApiError', method, status]
		this.status = status
		
		// @NOTE: workaround to preserve class name after bundling
		//        used when Sentry generates metadata for error event
		this.name = 'ApiError'
	}
}