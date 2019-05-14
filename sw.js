/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({ modulePathPrefix: "workbox-v4.3.1" });

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    url: "data/todos.json",
    revision: "13f67f75d97780d166b3c32e2e1097f0"
  },
  {
    url: "index.html",
    revision: "1af99006a6204e9099249ca23ab93fae"
  },
  {
    url: "js/app.js",
    revision: "8f1ac5c0619035a885e431c85f85afcd"
  },
  {
    url: "js/components/inptodo.js",
    revision: "0a6e678b150e0b8f4c1408ba58324edd"
  },
  {
    url: "js/components/todo.js",
    revision: "ac527c719237f91107d768c388c20b51"
  },
  {
    url: "js/connection.js",
    revision: "b221cd686f0786cb9878ea06427fbbad"
  },
  {
    url: "manifest.json",
    revision: "65533679a87073000a4239fe18896912"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({ cacheName: "image-cache", plugins: [] }),
  "GET"
);
