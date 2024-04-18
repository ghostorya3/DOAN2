export default function Image({ src, attribute }) {
    return (<>
        <img src={src} className={`w-full h-full ${attribute}`}></img>
    </>)
}