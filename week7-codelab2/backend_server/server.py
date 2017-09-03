""" Backend Service: Json RPC SERVER"""

import pyjsonrpc

SERVER_HOST = 'localhost'
SERVER_PORT = 4040


class RequestHandler(pyjsonrpc.HttpRequestHandler):
    """RPC server requrest handler"""
    @pyjsonrpc.rpcmethod
    def add(self, num1, num2):  # pylint: disable=no-self-use
        """ Test Method: add fucntion """
        print "add is called with %d and %d" % (num1, num2)
        return num1 + num2


# Threading HTTP SERVER_HOST
HTTP_SERVER = pyjsonrpc.ThreadingHttpServer(
    server_address=(SERVER_HOST, SERVER_PORT),
    RequestHandlerClass=RequestHandler
)

print "Starting HTTP server on %s:%d" % (SERVER_HOST, SERVER_PORT)

HTTP_SERVER.serve_forever()