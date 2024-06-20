type CryptoReturnType = {
    card: {
        hashed: string;
        unhashed: string;
    };
    cvv: {
        hashed: string;
        unhashed: string;
    };
};
export declare function generateCardNumber(): string;
export declare function generateCVV(): string;
export declare const hashingWork: () => CryptoReturnType;
export declare const decrypt: (encryptedData: string) => string;
export {};
