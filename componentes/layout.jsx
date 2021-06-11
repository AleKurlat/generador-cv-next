export default function Layout(props) {
    return (
        <div>
            <div><h1 className="text-center mb-3">Armá tu CV online</h1></div>
            {props.children}
            <div className="alerta">
                App web programada en React / Next.JS
                <a href="https://github.com/AleKurlat" style={{ "textDecoration": "none" }}>https://github.com/AleKurlat</a>
            </div>
        </div>
    )
}