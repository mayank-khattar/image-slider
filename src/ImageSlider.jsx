/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

function ImageSlider({url}) {
    const [images,setImages] = useState([]);
    const [currentSlide,setCurrentSlide] = useState(0);
    const [error,setErrorMessage] = useState(null);
    const [loading,setLoading] = useState(false)

    async function fetchImages(urlParam) {
        try {
            setLoading(true)
            const response = await fetch(urlParam)
            const data = await response.json();
            console.log(data)

            if(data) {
                setImages(data)
                setLoading(false)
            }
            

        } catch (err) {
            setLoading(false)
            setErrorMessage(err.message)
        }
    }

    useEffect(()=> {
        if(url!=='') {
            fetchImages(url);
        }
    },[url])

    const handleLeftClick = () => {
        setCurrentSlide(currentSlide === 0 ? images.length-1 : currentSlide-1)
    }

    const handleRightClick = () => {
        setCurrentSlide(currentSlide === images.length-1 ? 0 : currentSlide+1)
    }
    if(loading) {
        return <div>Loading</div>
    } else {
        if(error) {
            return <div>Error Message : {error}</div>
        } else {
            return ( 
                <div className="container">
                    <BsArrowLeftCircleFill className="arrow arrow-left" onClick={handleLeftClick}/>
                    <img src={images.at(currentSlide).download_url} alt={images.at(currentSlide).author} height={500} width={700}/>
                    <BsArrowRightCircleFill className="arrow arrow-right" onClick={handleRightClick}/>
                </div>
                
             );
        }
    }
    
}

export default ImageSlider;