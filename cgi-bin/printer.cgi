#!/usr/bin/python

import os
import cgi, cgitb

form = cgi.FieldStorage()

print "Content-type:text/html\r\n\r\n"
print "<h1>Richard Adam Staples</H1>"
print "<h2>Headers sent with request:</h2>"
#cgi.print_environ()
print 'Accept: ' + os.environ['HTTP_ACCEPT'] + '<br>'
print 'Accept-Encoding: ' + os.environ['HTTP_ACCEPT_ENCODING'] + '<br>'
print 'Accept-Lanugage: ' + os.environ['HTTP_ACCEPT_LANGUAGE'] + '<br>'
print 'Cache-Control: ' + os.environ['HTTP_CACHE_CONTROL'] + '<br>'
print 'Connection: ' + os.environ['HTTP_CONNECTION'] + '<br>'
print 'Host: ' + os.environ['HTTP_HOST'] + '<br>'
print 'User-Agent: ' + os.environ['HTTP_USER_AGENT'] + '<br>'
print 'Server-Protocol: ' + os.environ['SERVER_PROTOCOL'] + '<br>'
print 'Query String: ' + os.environ['QUERY_STRING'] + '<br>'
print
