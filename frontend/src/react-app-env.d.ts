/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_FIN_PREP_API_KEY: string;
        REACT_APP_FIN_HUB_API_KEY: string;
    }
}