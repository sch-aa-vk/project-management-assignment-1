import { RootState } from "../store";

export const authSelector = (state: RootState) => state.auth;
export const isAuthenticatedSelector = (state: RootState) => state.auth.isAuthenticated;
export const tokenSelector = (state: RootState) => state.auth.token;
