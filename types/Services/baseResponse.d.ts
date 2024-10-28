export type BaseResponse<T> = {
    success: boolean;
    message: string;
    next?: number;
    data: T;
};