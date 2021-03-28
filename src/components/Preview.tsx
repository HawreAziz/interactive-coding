import { useRef, useEffect } from 'react';
import "./Preview.css";

const html = `
  <html>
    <head>
      <style>
        html { background-color: white}
      </style>
    </head>
    <body>
      <div id='root'></div>
      <script>
        window.addEventListener('message', (event) => {
            try{
              eval(event.data)
            }catch (err) {
                const root = document.getElementById('root')
                root.innerHTML = '<div style="color: red; font-size: 20px; padding: 10px">' 
                                 +  err + '</div>'
            }
        }, false)
      </script>
    </body>
  </html>
`


interface PreviewProps {
     code: string;
}

const Preview: React.FC<PreviewProps> = ({ code })  => {
    const iframeRef = useRef<any>();

    useEffect(() => {
        iframeRef.current.srcdoc = html;
        const time = setTimeout(() => {
          iframeRef.current.contentWindow.postMessage(code, '*');
        }
        , 100)
        return () => {
          clearTimeout(time);
        }
    }, [code])

    return (
        <div className="preview_wrapper">
            <iframe 
                style={{ backgroundColor: 'transparent', width: '100%'  }}
                ref={iframeRef} 
                height="100%"
                title="Code Preview" 
                sandbox="allow-scripts" 
                srcDoc={html}
        />
        </div>
    )
}

export { Preview }