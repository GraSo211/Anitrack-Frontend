export const logout = async () => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    } finally {
        window.location.href = "/";
    }
};
