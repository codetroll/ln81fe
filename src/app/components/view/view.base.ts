export abstract class ViewBase {

    isLoading: boolean = false;
    isBusy: boolean = false;
    isSubmitted: boolean = false;
    errorMessage: string = undefined;
    warningMessage: string = undefined;

    protected reset() {
        this.isLoading = false;
        this.isBusy = false;
        this.isSubmitted = false;
        this.errorMessage = undefined;
        this.warningMessage = undefined;
    }

}
