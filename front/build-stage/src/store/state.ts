export const state = {

    getItem(key: string): string | null {
        const value = window.localStorage.getItem(key)
        return value
    },

    setItem(key: string, value: string): void {
        window.localStorage.setItem(key, value)
    }
    
}
