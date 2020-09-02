export const removeQueryParam = (url): String => {
    return url.substring(0, url.indexOf('?'));
}

export const removeQueryParams = (urls: String[]) : String[] => {
    for(let i=0; i<urls.length; i++){
        urls[i] = removeQueryParam(urls[i]);
    }

    return urls;
}