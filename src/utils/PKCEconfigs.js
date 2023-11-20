import crypto from 'crypto-js';
// Some random 64 bit long string
export const CODE_VERIFIER = 'AdleUo9ZVcn0J7HkXOdzeqN6pWrW36K3JgVRwMW8BBQazEPV3kFnHyWIZi2jt9gA';
export const CODE_CHALLENGE_METHOD = 'S256';
const base64URLEncode = (str) => {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
const getCodeChallange = (verifier) => {
    return base64URLEncode(crypto.SHA256(CODE_VERIFIER).toString(crypto.enc.Base64));
}
export const CODE_CHALLENGE = getCodeChallange(CODE_VERIFIER);