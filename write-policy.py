#!/usr/bin/env python3

import sys
import json

# ENTER YOUR HEX PUBKEY(S) BELOW:
whitelist = {
  "ec965405e11a6a6186b27fa451a2ffc1396ede7883d2ea11c32fbd2c63996966",
  "11493e2efadce058f779ee4bd3b6bf9874fe571622704372b1b4d9051397ab32",
  "60f1a5eb3310076ae334f432bc178f2ed4aac86abd704ee1626d4a283f1abdec",
  "22f11e47397e83cdeb56933aad13a1dd2c4f70ed8c2f5d93dd70b1ea4cdfafa6",
  "02f7fe308859d2d6178ada7caca89c2787e1ee2889378ee6e98d530e75cd77b8",
  "d10a02474e3ff020d46753336e1c436a7373a84f6c22852749dabf63ea505515",
  "c118d1b814a64266730e75f6c11c5ffa96d0681bfea594d564b43f3097813844",
  "8f4761dcd2405aab2455bc66e7a54b8f8e5a88dc645e9717df665d1993b740fc",
  "a4cc1ed588973e8ce1bf25f8cffed29ffc90838f2359531a54416236010e2dc0",
  "e3d9e150b8688085e04a9c7ef079e92078a8f9cd2ce35a36433f34780420b6a3",
}

# ENTER YOUR ALLOWED IP(S) BELOW:
sources = {
  "1.1.1.1",
  "8.8.8.8"
}

# ENTER YOUR ALLOWED TYPE(S) BELOW:
types = {
  "Stream",
  "Import",
  "Sync"
}

def eprint(*args, **kwargs):
  print(*args, **kwargs, file=sys.stderr, flush=True)

def accept(request):
  response = {
    'id' : request['event']['id']
  }

  response['action'] = 'accept'
  r = json.dumps(response,separators=(',', ':')) # output JSONL
  print(r, end='\n', file=sys.stdout, flush=True)

def reject(request):
  response = {
    'id' : request['event']['id']
  }

  response['action'] = 'reject'
  response['msg'] = f"blocked: pubkey {request['event']['pubkey']} not in whitelist | SOURCE: {request['sourceInfo']}"
  r = json.dumps(response,separators=(',', ':')) # output JSONL
  print(r, end='\n', file=sys.stdout, flush=True)

def main():
  for line in sys.stdin:
    request = json.loads(line)

    try:
      if request['type'] == 'lookback':
        continue
    except KeyError:
      eprint("input without type in write policy plugin")
      continue

    if request['type'] != 'new':
      eprint("unexpected request type in write policy plugin")
      continue

    try:
      if not request['event']['id']:
        eprint("input without event id in write policy plugin")
        continue
    except KeyError:
      eprint("input without event id in write policy plugin")
      continue

    try:
      if request['event']['pubkey'] in whitelist:
        accept(request)
        continue
      elif int(request['event']['kind']) == 10002:
        accept(request)
        continue
      elif request['sourceType'] in types:
        accept(request)
        continue
      elif request['sourceInfo'] in sources:
        accept(request)
        continue
      elif request.get("event", {}).get("tags"):
        if p_tags:= [x for x in request['event']['tags'] if x[0] == 'p']:
          pubkeys = [x[1] for x in p_tags]
          if whitelist.intersection(pubkeys):
            accept(request)
            continue
        reject(request)
        continue
      else:
        reject(request)
        continue
    except KeyError:
      eprint("poorly formed event input in write policy plugin")
      continue

if __name__=='__main__':
  main()
