import { NotAutoPrintError } from '../errors/common-errors';

let prevErrorStack: string | undefined;

const autoLogger = {
  error: (error: Error) => {
    if (
      error &&
      !(error instanceof NotAutoPrintError) &&
      error.stack !== prevErrorStack
    ) {
      console.error('AUTO LOGS:', error);
      prevErrorStack = error.stack;
    }
  },
};

export default autoLogger;
