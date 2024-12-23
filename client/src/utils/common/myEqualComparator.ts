export default () => {
    /**
     * Compare two objects via JSON.stringify
     * @param a - first object to compare
     * @param b - second object to compare
     */
    const areObjectsEqual = <T1 = any, T2 = any>(a: T1, b: T2): boolean => {
        const result = JSON.stringify(a) === JSON.stringify(b) ;

        return result;
    }
        
        
    return {
        areObjectsEqual,
    }
}