import { error } from '../../utils/logger';

type OnResultFn = () => void;
type OnErrorFn = (reason?: number | Error) => void;

export const onForcExit =
  (onResultFn: OnResultFn, onErrorFn: OnErrorFn) => (code: number | null) => {
    if (code) {
      onErrorFn(new Error(`forc exited with error code ${code}`));
    } else {
      onResultFn();
    }
  };

export const onForcError = (onError: OnErrorFn) => (err: Error) => {
  error(err);
  onError(err);
};
