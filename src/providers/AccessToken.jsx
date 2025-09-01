export const setAccessToken = (value) => {
    let name = "_UserJanAIAccess";
    let path = "/";
    if (value) {
        const encodedToken = encodeURIComponent(value);
        document.cookie = `${name}=${encodedToken}; path=${path}`;
    } else {
        // If value is null or undefined, remove the cookie
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    }
};

export const getAccessToken = () => {
    const cookieName = "_UserJanAIAccess";
    const decodedCookie = decodeURIComponent(document.cookie);

    if (decodedCookie) {
        const cookieArray = decodedCookie.split(";");
        const cookie = cookieArray.find((cookie) =>
            cookie.trim().startsWith(cookieName + "=")
        );

        if (cookie) {
            const encodedToken = cookie.split("=")[1];
            return encodedToken;
        }
    }

    return null;
};

export const setRefreshToken = (value) => {
    let name = "_UserJanAIRefresh";
    let path = "/";
    if (value) {
        const encodedToken = encodeURIComponent(value);
        document.cookie = `${name}=${encodedToken}; path=${path}`;
    } else {
        // If value is null or undefined, remove the cookie
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    }
};

export const getRefreshToken = () => {
    const cookieName = "_UserJanAIRefresh";
    const decodedCookie = decodeURIComponent(document.cookie);

    if (decodedCookie) {
        const cookieArray = decodedCookie.split(";");
        const cookie = cookieArray.find((cookie) =>
            cookie.trim().startsWith(cookieName + "=")
        );

        if (cookie) {
            const encodedToken = cookie.split("=")[1];
            return encodedToken;
        }
    }

    return null;
};