export type TError = {
  path: string | number;
  message: string;
}[];
export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TError;
};
