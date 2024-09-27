/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["README.md","8832d073fa5f62707567136d09a41708"],["about.html","ce0aa47fd5a2c11f4d0540e8b4c7e0d2"],["chapters_DAC2018.json","ea7be04f6b31e4700d89b5eb21efba99"],["chapters_FTLOA.json","5d981bac603c97eb2ee226784dc1ba54"],["code.html","ad8329ada794699f5665eb46c9191556"],["collaborate.html","fd37e9cd52bcf2ab37cfb282fcf810cc"],["contact.html","b8a5706b308ad43c0d01e59560f134b6"],["css/base/_body-element.sass","1b183fb99b61917f82b42a5b463840e2"],["css/base/_fonts.scss","de9e49cf4ac370730e1a2ffeedfdf3f5"],["css/base/_normalize.scss","ce50a3560f765033eed1a4b82c7110b2"],["css/base/_selection-colors.sass","e7388290534b5297380be0785fa99c43"],["css/base/_vars.sass","31f76ae742302a8e54df49ced1c7d055"],["css/bootstrap.min.css","abe91756d18b7cd60871a2f47c1e8192"],["css/fonts/Montserrat-Black.eot","69ab0c572c354cb0f485fd403e766adc"],["css/fonts/Montserrat-Black.svg","f86a4fdb233e1ca195b64712ac9c7cbe"],["css/fonts/Montserrat-Black.ttf","ed72ab3a8171a4479434674dfa752b7c"],["css/fonts/Montserrat-Black.woff","27eccda3ff559946c7da160090cca74c"],["css/fonts/Montserrat-Bold.eot","28f712bd7d9e2287a52d559e69066f7b"],["css/fonts/Montserrat-Bold.svg","5a6aef823dd8d1b22aacd78aebb653d6"],["css/fonts/Montserrat-Bold.ttf","8827ce59fdc0e10a4721ff143ca0dc9b"],["css/fonts/Montserrat-Bold.woff","4e256ac12e4b216d06e89d214e839175"],["css/fonts/Montserrat-Light.eot","dde8ac64217b39e66a66fe9bbc196000"],["css/fonts/Montserrat-Light.svg","f5e955efb2bef154ac6dd150903f2d45"],["css/fonts/Montserrat-Light.ttf","bfe4bbef5d5dc2e44ddc8363ed4eb543"],["css/fonts/Montserrat-Light.woff","f7b7e089826a71c966368fedc1cdba16"],["css/fonts/Montserrat-Regular.eot","f3d640f59cb1b89df51e94c7b2a39084"],["css/fonts/Montserrat-Regular.svg","27e50ffd6a14cbc8221c9dbd3b5208dc"],["css/fonts/Montserrat-Regular.ttf","0f4b206d418c53d82321fe9723ad5217"],["css/fonts/Montserrat-Regular.woff","1c92a5e1aebd06c5ccdbb8a877717c18"],["css/layouts/_grid.sass","dfc930233391eaf23f02cc6341f5adff"],["css/main.css","e2f9056e9dcf4b40d0bd47e64c0d1fe2"],["css/main.sass","8d56db1aa1094708c94023a10a8cc57b"],["css/modules/_about.sass","26acda0db7b37a37ce04d05bc575c741"],["css/modules/_contact.sass","2c61a72015e57912b5d448e6814f2493"],["css/modules/_device-notification.sass","53fe619cc6abac22cef317d238fbf852"],["css/modules/_header.sass","9a811d8756ace85cd92b3292bd9c0689"],["css/modules/_hire.sass","7b66eceead0d6e4aed8b507f82b107eb"],["css/modules/_intro.sass","d9c4167e1696bf87789db0da50da8640"],["css/modules/_outer-nav.sass","5361d64e7f66ad1e311f6e92e78fe762"],["css/modules/_section.sass","b36e6e6240ee70f373c8f2a4647c6797"],["css/modules/_side-nav.sass","cfc394c490225e1a429f5128b39fb4fd"],["css/modules/_work.sass","bffb16dbfb69efb414b6a84b17b0445b"],["css/styles.css","b055216923b5a30b0a9d073559b1e425"],["fonts/KHGummi.otf","107fc2d3bdbc50640e4609447222f267"],["img/50314726_00201_0471_XLarge.jpg","9b1c01ab99df8eb8a462123a476320e1"],["img/Github.png","159ea575b0846aa1c156014a9321bdbe"],["img/Highwind1_opt.png","563076399dfe380d0180ad16874899b4"],["img/LinkedIN.png","7090aeaa5613209cfeeffd7b21a884d2"],["img/Menu_Light.png","87ed07123bcaa8dbb731c8c23285285e"],["img/WEPA.png","685671fe5f5de8597bd07a36dd1424b0"],["img/about-history.jpg","e30a80002afae67edc32d5eb9df61c32"],["img/about-philosophy.jpg","87620fb4bd9a3944f1986b2ee1a9b899"],["img/about-visual.png","f2cf5fbb6bead909c75f6c0bfc8e1ad9"],["img/about-winners.jpg","fcf7411f08445bbda908a9aeacc18ef4"],["img/badge_dark.png","ffb86ba301b00ec5bdfdd21c6258cdbd"],["img/beach.jpeg","776016721faa23362f2df64adcc4c03c"],["img/code.png","1d2179cd60131182482250780ecc1b60"],["img/codeblog.png","2bba08433e55d9ac42b0d0086129860d"],["img/contact-visual.png","6c9ca42310f42a1b8d7877a2a7734b52"],["img/email.png","94f51369e508514b96187a275c03ad94"],["img/favicon.ico","9d5bf1200908a2315227a4e6328da823"],["img/fist.png","be266ae96c04a4bee3d3f2887c4db7ac"],["img/fist_final.png","bdf431c000a82eb23636b410a5a6dcb3"],["img/forsite.webp","1bddd917a018332c3b9d7179a889bcd2"],["img/gfc-logo-12@2x.png","81e65767e692c0c1d62b01fdd1fefd9d"],["img/gfc-logo-12@2x_transp.png","9326d7959709a41c61e111ab346c136b"],["img/hall.jpg","67901b7e1ae14fea9a36472a42b80a8a"],["img/havana.jpg","2cd9662eac9c16c3b38d88fd3d5b1605"],["img/headshot website.png","54d082e5dc99eb738782dfd240cb22fc"],["img/headshot.jpg","0d10623adfaf59cbe3b2c86fe7f366cb"],["img/headshot_website.png","54d082e5dc99eb738782dfd240cb22fc"],["img/kaido_opt.png","5dedf238cbedfbebb988a9fd0d3fceb4"],["img/kevinhart.jpg","8deb32f57021191910de5c3dc6b2895b"],["img/leroy_opt.png","de417235a938a4e60bfea8139847d68b"],["img/light_crystal.svg","9f69da309949ccf68776659ef6017717"],["img/lightning.png","81f6d0a324a1023450786d32ecc1b544"],["img/logo.png","d2ffdc8bc54315acfd5fce15ed8f208f"],["img/mail.png","30a53f5cd1cf33f0b9b61481f287232d"],["img/mc.jpg","b921c391641ae68e3b1048ed1640625e"],["img/nebula.png","8c4a6354c7e7e17742acca3122bffe55"],["img/nostr_192x192.png","a0a1a8c90cf90e414f5e593b94990e7e"],["img/nostr-icon-white-256x256.png","2ebd5802280b5a86d35e647d20267298"],["img/nostr-icon-white-512x512.png","3fe4bd3cbadeaa4a56a601ac19fdba38"],["img/nostr-logo-purple-transparent-928x363.png","ccead219077e5f502699bd59a6bbac66"],["img/pci_avatar.svg","26d150e8750635918f08dd0e872a17bd"],["img/pr_map.png","00d77de18ee5b932468758fcf17e8c6d"],["img/running-nostr.gif","323f363f76da053cb862b766debf2114"],["img/scripts.js","cbea7ea97c28376dea5e0e8338dc325f"],["img/spaceman.png","348e7a839dd1489a5d87929f2ee837af"],["img/work-alex-nowak.jpg","7cf659329fbda17f1742902c872eb4d1"],["img/work-metiew-smith.jpg","ee866377766a047a5784005aa2f395c3"],["img/work-victory.jpg","6ad08a98c2c452d29f44f96a4fb93c62"],["index.html","097832b0cdd2c7891e351d5d7847d1e2"],["index_es.html","aefc3aefc5d49c37cb9c1fe92881bab9"],["js/functions-min.js","972ffa1548ddb564e54184db659ea4a1"],["js/functions.js","3dbf399200547f6346ab276cae0033e3"],["js/nostr.js","1361cbe5fe90a00d49413214c23c583a"],["js/vendor/hammer-2.0.8.js","0cf5ceda17c4bf5304ec19a1f61c6bf7"],["js/vendor/jquery-2.2.4.min.js","2f6b11a7e914718e0290410e85366fe9"],["manifest.json","b1c16e39dd9fe3a35cc4a69e94ee8661"],["service.worker.js","d41d8cd98f00b204e9800998ecf8427e"],["write-policy.py","d89aa6f845975f81947dc1ae89d5b467"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







