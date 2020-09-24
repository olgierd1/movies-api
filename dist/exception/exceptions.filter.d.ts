import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
interface Exception extends Error {
    getStatus(): any;
    response: {
        message: string[];
    };
}
export declare class ExceptionsFilter implements ExceptionFilter {
    catch(exception: Exception, host: ArgumentsHost): void;
}
export {};
