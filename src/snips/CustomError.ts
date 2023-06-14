export class CustomError<T extends string> extends Error {
  name: T;
  message: string;
  cause: any;

  constructor({
    name,
    message,
    cause,
  }: {
    name: T;
    message: string;
    cause?: any;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

type ExampleErrors = 'EASTER_BUNNY_DNE_ERROR' | 'TOOTH_FAIRY_DNE_ERROR';

class ChildhoodBeliefsError extends CustomError<ExampleErrors> {}

function ExampleTryCatch() {
  try {
    throw new CustomError<ExampleErrors>({
      name: 'EASTER_BUNNY_DNE_ERROR',
      message: 'The Easter Bunny Does Not Exist, kid',
    });
  } catch (e) {
    console.error(e);
  }
}
