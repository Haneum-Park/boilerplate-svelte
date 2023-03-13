import { writable } from 'svelte/store';

export const captchaToken = writable<string | undefined>(undefined);

export function getCaptchaToken(token: string) {
  captchaToken.subscribe((value) => {
    token = value as string;
  });
}