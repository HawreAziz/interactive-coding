import './Resizable.css';
import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableProps } from 'react-resizable';

interface ResizableBoxProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableBoxProps> = ({ direction, children}) => {
    let resizableProps: ResizableProps; 
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [ width, setWidth] = useState(window.innerWidth * 0.75);
    
    useEffect(() => {

        const listener = () => {
            let time: any;
            time = setTimeout(() => {
                setInnerWidth(window.innerWidth);
                setInnerHeight(window.innerHeight);
                if(window.innerWidth * 0.75 < width){
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
            return () => {
                clearTimeout(time);
            }
        }

        window.addEventListener("resize", listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [width]);

    if(direction === "horizontal"){
        resizableProps = {
            className: "resize-horizontal",
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            height: Infinity,
            width,
            resizeHandles: ["e"],
            onResize: (_, data) => {
                setWidth(data.size.width)
            }
        }

    }else{
        resizableProps = {
            maxConstraints:[Infinity, innerHeight * 0.9],
            minConstraints:[Infinity, 90],
            height:100,
            width: Infinity,
            resizeHandles:["s"],
                
        }
    }
    return (
    <ResizableBox {...resizableProps}>
        {children}
    </ResizableBox>
    );   
}


export default Resizable;