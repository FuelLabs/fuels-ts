import { error } from '../../utils/logger';

type OnResultFn = () => void;
type OnErrorFn = (reason?: number | Error) => void;

export const onForcExit =
  (onResultFn: OnResultFn, onErrorFn: OnErrorFn) => (code: number | null) => {
    if (code) {
      onErrorFn(code);
      //  process.exit()?
    } else {
      onResultFn();
    }
  };

export const onForcError = (onError: OnErrorFn) => (err: Error) => {
  console.log('onForcError');
  error(err);
  onError(err);
};
