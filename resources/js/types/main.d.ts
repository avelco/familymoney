import { User } from '.';

export interface FlashMessages {
    message?: string;
}

export interface PageProps {
    [key: string]: unknown;
    auth: {
        user: User;
    };
    flash: FlashMessages;
}
