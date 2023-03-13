import "@hcaptcha/types";

declare global {
  interface Window {
    onVerify: (token: string) => Promise<void>;
  }
}