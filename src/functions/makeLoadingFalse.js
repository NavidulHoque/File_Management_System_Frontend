export default function makeLoadingFalse(isMounted, setLoading) {
    if (isMounted) {
        setLoading(false)
    }
}