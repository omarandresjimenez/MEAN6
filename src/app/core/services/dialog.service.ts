import { Injectable } from '@angular/core';

import * as toastr from 'toastr';

toastr.options.progressBar = true;


/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 */
@Injectable({ providedIn: "root" })
export class DialogService {

  /**
   * Translated, default error message suffix.
   */
  public tryAgainLaterMessage: string;

  public alerts: any[] = [];

  public constructor() {
  }

  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns promise resolving to `true`=confirm or `false`=cancel
   * @deprecated
   */
  public confirm(message?: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      return resolve(window.confirm(message || 'Are you sure to continue?'));
    });
  }


   public alert(message?: string) {
     toastr.error(message );
  }

  public warning(message?: string) {
    toastr.warning(message );
  }

  public success(message: string = 'Success!!') {
    toastr.success(message);
  }

}
