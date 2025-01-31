// src/app.d.ts
import type { JwtPayload } from 'jsonwebtoken';

declare global {
	namespace App {
		interface Locals {
			user: any;
		}
	}
}

export {};
