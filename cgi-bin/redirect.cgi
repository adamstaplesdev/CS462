#!/usr/bin/python

import os
import cgi, cgitb

queryString = os.environ['QUERY_STRING']
if queryString == 'foo':
	print "Location:http://google.com/"
elif queryString == 'bar':
	print "Location:http://bing.com/"
else:
	print "Location:http://youtube.com/"
print #ends the headers
