
const targetPage = "<all_urls>";

const randint = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);

const accept = `text/html,application/xhtml+xml,application/xml;q=0.${randint(7, 9)},image/avif,image/webp,image/apng,*/*;q=0.${randint(4, 6)},application/signed-exchange;v=b3;q=0.${randint(2, 4)}`;
const acceptLanguage = "en-US,en;q=0.9";
const acceptEncoding = 'gzip, deflate, br';

function rewriteUserAgentHeader(e) {
  for (const header of e.requestHeaders) {
    console.log(e.requestHeaders);
    if (header.name.toLowerCase() === 'accept-language') {
      header.value = acceptLanguage;
    } else if (header.name.toLowerCase() === 'accept') {
      header.value = accept;
    } else if (header.name.toLowerCase() === 'accept-encoding') {
      header.value = acceptEncoding;
    }
  }

  return { requestHeaders: e.requestHeaders };
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  { urls: [targetPage] },
  ["blocking", "requestHeaders", "extraHeaders"]
);
