import * as _solana_wallet_adapter_base from '@solana/wallet-adapter-base';
import { BaseMessageSignerWalletAdapter, WalletReadyState, WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PublicKey, Transaction } from '@solana/web3.js';

interface SiteMetadata {
    name: string;
    icon: string;
    url: string;
}
declare enum CrossmintEmbedRequestType {
    REQUEST_ACCOUNTS = "crossmint_requestAccounts",
    SIGN_MESSAGE = "crossmint_signMessage",
    USER_REJECT = "crossmint_userReject"
}
interface CrossmintEmbedBaseRequest<CrossmintEmbedBaseRequestDataType> {
    request: CrossmintEmbedRequestType;
    data?: CrossmintEmbedBaseRequestDataType;
}
interface CrossmintEmbedBaseRequestData {
    libVersion: string;
    chain: BlockchainTypes;
    siteMetadata: SiteMetadata;
}
interface CrossmintEmbedRequestAccountData extends CrossmintEmbedBaseRequestData {
}
interface CrossmintEmbedSignMessageData extends CrossmintEmbedBaseRequestData {
    message: Uint8Array;
}
declare type CrossmintEmbedBaseRequestDataType = CrossmintEmbedRequestAccountData | CrossmintEmbedSignMessageData;

interface CrossmintEmbedParams {
    /**
     * Project ID
     * This will return data from the user's Crossmint account under the Project ID.
     * Get yours at {@link https://www.crossmint.com/console/projects/apiKeys | Developer Dashboard}
     * If you don't have a Project ID, you can exclude this parameter or set it to undefined.
     * or set it to "all" to get all wallets from all projects.
     */
    projectId?: string;
    forceWalletSelection?: boolean;
    chain: BlockchainTypes;
    environment?: CrossmintEnvironment;
    autoConnect?: boolean;
    maxTimeAutoConnectMs?: number;
    /**
     * Dapp Metadata
     * If metadata is not provided, it will be extracted from your application automatically
     */
    appMetadata?: AppMetadata;
}
interface AppMetadata {
    name?: string;
    icon?: string;
}
interface CrossmintEmbedConfig {
    libVersion: string;
    projectId?: string;
    forceWalletSelection?: boolean;
    chain: BlockchainTypes;
    environment: CrossmintEnvironment;
    autoConnect: boolean;
    maxTimeAutoConnectMs: number;
    appMetadata?: AppMetadata;
}
declare enum CrossmintEnvironment {
    PROD = "https://www.crossmint.com",
    STAGING = "https://staging.crossmint.com",
    LOCAL = "http://localhost:3001"
}
interface CrossmintStore {
    accounts: {
        [key in BlockchainTypes]: string | null;
    };
}

declare enum BlockchainTypes {
    SOLANA = "solana",
    ETHEREUM = "ethereum",
    POLYGON = "polygon",
    CARDANO = "cardano"
}

declare class CrossmintEmbed {
    private _config;
    private get _frameUrl();
    private constructor();
    static init(config: CrossmintEmbedConfig): CrossmintEmbed;
    login(): Promise<string[] | undefined | null>;
    signMessage(message: Uint8Array): Promise<Uint8Array | undefined | null>;
    signMessages(message: Uint8Array, publicKeys: string[]): Promise<{
        [publicKey: string]: Uint8Array;
    } | undefined | null>;
    cleanUp(): Promise<void>;
    postMessage(postWindow: Window, request: CrossmintEmbedRequestType, data?: Omit<CrossmintEmbedSignMessageData | CrossmintEmbedRequestAccountData, "libVersion" | "chain" | "siteMetadata">, targetOrigin?: string): Promise<void>;
    private getLoginFromIFrame;
}

declare class CrossmintSolanaWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: _solana_wallet_adapter_base.WalletName<"Crossmint">;
    url: string;
    icon: string;
    private _connecting;
    private _publicKey;
    private _forceInstalled;
    private _config;
    private _client?;
    constructor(params: Omit<CrossmintEmbedParams & {
        forceInstalled?: boolean;
    }, "chain">);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
}

declare function networkToCrossmintEnvironment(network: WalletAdapterNetwork): CrossmintEnvironment;

declare class CrossmintEVMWalletAdapter {
    name: _solana_wallet_adapter_base.WalletName<"Crossmint">;
    url: string;
    icon: string;
    private _connecting;
    private _publicKeys;
    private _config;
    private _client?;
    constructor(params: Omit<CrossmintEmbedParams, "chain"> & {
        chain: BlockchainTypes.ETHEREUM | BlockchainTypes.POLYGON;
    });
    get publicKey(): string | null;
    get publicKeys(): string[] | null;
    get connecting(): boolean;
    get connected(): boolean;
    connect(): Promise<string | undefined>;
    disconnect(): Promise<void>;
    signMessage(message: string): Promise<string>;
    signMessageWithAllAddresses(message: string): Promise<{
        [publicKey: string]: string;
    }>;
}

declare enum CardanoNetwork {
    PREVIEW = "preview",
    PREPROD = "preprod",
    MAINNET = "mainnet"
}
declare type CardanoWalletApi = {
    getNetworkId(): Promise<number>;
    getUsedAddresses(): Promise<string[]>;
};

declare class CrossmintCardanoWalletAdapter {
    name: _solana_wallet_adapter_base.WalletName<"Crossmint">;
    url: string;
    icon: string;
    apiVersion: number;
    private _config;
    private _client?;
    private _api?;
    constructor(params: Omit<CrossmintEmbedParams, "chain">);
    isEnabled(): Promise<boolean>;
    enable(): Promise<CardanoWalletApi>;
}

declare function cardanoNetworkToCrossmintEnvironment(network: CardanoNetwork): CrossmintEnvironment;

export { AppMetadata, BlockchainTypes, CardanoNetwork, CardanoWalletApi, CrossmintCardanoWalletAdapter, CrossmintEVMWalletAdapter, CrossmintEmbedBaseRequest, CrossmintEmbedBaseRequestData, CrossmintEmbedBaseRequestDataType, CrossmintEmbedConfig, CrossmintEmbedParams, CrossmintEmbedRequestAccountData, CrossmintEmbedRequestType, CrossmintEmbedSignMessageData, CrossmintEnvironment, CrossmintSolanaWalletAdapter, CrossmintStore, SiteMetadata, cardanoNetworkToCrossmintEnvironment, CrossmintEmbed as default, networkToCrossmintEnvironment };
