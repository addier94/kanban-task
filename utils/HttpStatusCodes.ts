export class Http {
  // Success Codes (2xx)
  static success = {
    ok: { code: 200, message: "The request was successful" },
    created: { code: 201, message: "The resource was successfully created" },
    accepted: {
      code: 202,
      message: "The request has been accepted and is being processed",
    },
    noContent: {
      code: 204,
      message: "The request was successful but there is no content to return",
    },
  };

  // Client Error Codes (4xx)
  static clientError = {
    badRequest: {
      code: 400,
      message: "The request could not be understood by the server",
    },
    unauthorized: {
      code: 401,
      message: "You are not authorized to access this resource",
    },
    forbidden: {
      code: 403,
      message: "You don't have permission to access this resource",
    },
    notFound: { code: 404, message: "The requested resource was not found" },
    conflict: {
      code: 409,
      message: "There was a conflict with the current state of the resource",
    },
    unprocessableEntity: {
      code: 422,
      message: "The request was well-formed but contains invalid parameters",
    },
  };

  // Server Error Codes (5xx)
  static serverError = {
    internalServerError: {
      code: 500,
      message: "An unexpected error occurred on the server",
    },
    notImplemented: {
      code: 501,
      message: "The requested functionality is not implemented",
    },
    badGateway: {
      code: 502,
      message:
        "The server received an invalid response from an upstream server",
    },
    serviceUnavailable: {
      code: 503,
      message: "The server is currently unable to handle the request",
    },
    gatewayTimeout: {
      code: 504,
      message:
        "The server did not receive a timely response from an upstream server",
    },
  };
}
