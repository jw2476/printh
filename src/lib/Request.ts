import type { IncomingRequest } from '@sveltejs/kit';

export interface Request<Body> extends IncomingRequest {
	params: Record<string, string>
	body: Body,
	locals: Record<string, never>
}