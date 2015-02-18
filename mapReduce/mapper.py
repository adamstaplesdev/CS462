#!/usr/bin/python
# 
# Adapted from script by Diana MacLean 2011
#
# Mapper script adapted for CS448G from Amazon's example: http://aws.amazon.com/jobflows/2273?_encoding=UTF8&jiveRedirect=1 
#
#

import sys
import re

def main(argv):
  line = sys.stdin.readline().lower()
  pattern = re.compile("[a-zA-Z][a-zA-Z0-9]*")
  stopwords = pattern.findall(open("stop-words.txt").read().lower())
  words = []
  try:
    while line:
      for word in pattern.findall(line):
        word = word.lower()
        if not word in stopwords:
          words.append(word.lower())
      line =  sys.stdin.readline()
  except "end of file":
    return None
  words.sort()
  for word in words:
    print word + "\t" + "1"


if __name__ == "__main__":
  main(sys.argv)
