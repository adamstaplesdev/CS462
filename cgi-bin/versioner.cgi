#!/usr/bin/python

import os
import cgi, cgitb

accepted = os.environ['HTTP_ACCEPT']

print "Content-type: application/json\r\n\r\n"
if accepted == 'application/vnd.byu.cs462.v1+json':
	print '{"version": "v1"}'
if accepted == 'application/vnd.byu.cs462.v2+json':
	print '{"version": "v2"}'
else:
	print 'Version not recognized'
