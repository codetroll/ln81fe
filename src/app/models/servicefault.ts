export enum FaultCode {
    GENERAL_ERROR = 'GENERAL_ERROR',
    NO_DATA = 'NO_DATA',
    IKKE_I_LFM_ERROR = 'IKKE_I_LFM_ERROR',
    CPR_ERROR = 'CPR_ERROR',
    MASTER_MSG023 = 'MASTER_MSG023',
    IUB_GETITEMS = 'IUB-GETITEMS',
    IUB000001 = 'IUB000001',
    IUB000002 = 'IUB000002',
    XMS_ADM326 = 'XMS_ADM326 ',
    IUB_NODATA = 'IUB-NODATA',
    IUB_DATA = 'IUB-DATA',
    ZIUB_BROKER = 'ZIUB_BROKER',
    IUB_MAX = 'IUB-MAX',
    CSV_DOWNLOAD_BUSY = 'CSV_DOWNLOAD_BUSY'
    // Add more codes here
}

export class ServiceFault {

    errorMessage: string;
    errorCode: string;

    constructor() {
        this.errorCode = '0';
        this.errorMessage = '';
    }

    static isError(errorCode: string) {
        switch (errorCode) {
            case FaultCode.CSV_DOWNLOAD_BUSY:
            case FaultCode.IUB_MAX:
                return false;
            default:
                return true;
        }
    }
}
