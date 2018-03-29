import { Injectable } from '@angular/core';
@Injectable()
export class LoggingService {
    logStatusChange(status: string) {
        console.log('A server status changed , new status:' + status);
    }

    logInformation(message: string) {
        console.log(message);
    }

    logWarning(message: string) {
        console.warn(message);
    }

    logError(message: string) {
        console.error(message);
    }
}
