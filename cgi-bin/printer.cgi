#!/usr/bin/python

import os
import cgi, cgitb

form = cgi.FieldStorage()

print "Content-type:text/html\r\n\r\n"
print "<h1>Richard Adam Staples</H1>"
print "<h2>Headers sent with request:</h2>"
#cgi.print_environ()
print 'Accept: ' + os.environ['HTTP_ACCEPT']
print 'Accept-Encoding: ' + os.environ['HTTP_ACCEPT_ENCODING']
print 'Accept-Lanugage: ' + os.environ['HTTP_ACCEPT_LANGUAGE']
print 'Cache-Control: ' + os.environ['HTTP_CACHE_CONTROL']
print 'Connection: ' + os.environ['HTTP_CONNECTION']
print 'Host: ' + os.environ['HTTP_HOST']
print 'User-Agent: ' + os.environ['HTTP_USER_AGENT']
print 'Server-Protocol: ' + os.environ['SERVER_PROTOCOL']
